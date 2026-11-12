/* ==========================================================
   小戏芽 · 星城 AI 导游（智谱 GLM-4-Flash + 全站网页知识库 RAG）
   - 默认调用同源 /api/chat（Cloudflare Functions / 本地服务），密钥只在服务端
   - 直接给出回答；接口不可用时自动回退内置知识库
   - 依赖：无；不修改任何原有脚本与全局变量
   ========================================================== */
(function () {
  "use strict";

  var CFG_KEY = "xingcheng_ai_v2";
  var DEFAULT = { endpoint: "/api/chat" };

  /* ---------- 内置知识库（离线兜底） ---------- */
  var KB = [
    { k: ["花鼓戏", "戏曲", "唱戏", "妆容", "化妆", "戏服", "小戏芽", "刘海砍樵", "补锅", "打铜锣"],
      a: "（抖抖水袖）这可是我的本行～湖南花鼓戏是湖南最有代表性的地方戏曲，由民间的地花鼓、花灯、采茶调发展而来，用长沙官话演唱，唱腔明快、生活气十足。代表剧目有《刘海砍樵》《打铜锣》《补锅》，伴奏以大筒、唢呐和锣鼓为主。我头上这身绒球头面、绣花袄和长水袖，就是花鼓戏小旦的打扮呀！" },
    { k: ["三日", "三天", "两日", "两天", "一日", "路线", "行程", "怎么玩", "攻略", "安排", "规划"],
      a: "给您排一条顺路的：\n第 1 天｜岳麓山·爱晚亭 → 湖南大学 → 橘子洲看江景 → 杜甫江阁夜景；\n第 2 天｜太平老街 → 天心阁 → 潮宗街 → 化龙池清吧 / 解放西夜生活；\n第 3 天｜湖南省博物院或简牍博物馆 → 谢子龙影像艺术馆 → 文和友吃一顿收尾。\n想慢一点就把第 3 天换成铜官窑古镇或靖港古镇～" },
    { k: ["橘子洲", "橘子", "洲头", "毛主席", "青年毛泽东"],
      a: "橘子洲在湘江江心，坐地铁 2 号线「橘子洲站」最省事，出站换观光小火车到洲头。洲头有青年毛泽东艺术雕塑，秋天橘柚满枝最好看；周末晚上的焰火要提前查当期公告哦。" },
    { k: ["岳麓", "爱晚亭", "岳麓书院", "爬山", "枫叶"],
      a: "岳麓山从东门（湖南大学、岳麓书院一侧）上山最经典：先逛岳麓书院，再沿石阶到爱晚亭，深秋枫叶红透时最好拍。想省力可从南门坐索道或观光车，下山正好去大学城嗦一碗粉。" },
    { k: ["非遗", "湘绣", "菊花石", "铜官窑", "弹词", "剪纸", "棕编", "传承"],
      a: "长沙值得看的非遗不少：湘绣（绣牡丹、芙蓉最出名）、湖南花鼓戏、铜官窑陶瓷烧制、浏阳菊花石雕、长沙弹词、望城剪纸与棕编，还有火宫殿的庙会。网站「非遗」卷里我给它们一一配了小像，点开就能看～" },
    { k: ["好吃", "吃", "美食", "必吃", "臭豆腐", "糖油粑粑", "口味虾", "米粉", "嗦粉", "茶颜", "湘菜", "夜宵", "烧烤"],
      a: "（掰着手指数）清早一碗长沙米粉，配剁椒与酸豆角；白天臭豆腐、糖油粑粑、葱油粑粑边走边吃；傍晚口味虾、小炒黄牛肉、剁椒鱼头；夜里再来点烧烤和一杯茶颜悦色。想省事就去「美食签」抽一签，让星城替你决定今天吃什么！" },
    { k: ["夜", "解放西", "清吧", "livehouse", "酒吧", "文和友", "氛围", "不夜"],
      a: "长沙的夜有四副面孔：解放西最热闹，化龙池的老巷清吧最安静，湘江边 Livehouse 与音乐节最上头，太平街夜市最烟火。想不花钱，就沿杜甫江阁往北走一段江风 Citywalk，灯影桥影全都有～" },
    { k: ["打卡", "拍照", "出片", "ifs", "谢子龙", "潮宗街", "丰盈西里", "文和友"],
      a: "出片率高的几处：谢子龙影像艺术馆的清水混凝土长阶、IFS 楼顶雕塑与日落、潮宗街和丰盈西里的老宅咖啡馆、文和友的复古霓虹楼、超级文和友旁边的老街招牌。上午光线柔、人少，更好拍。" },
    { k: ["交通", "地铁", "怎么去", "机场", "高铁", "长沙南", "黄花机场", "住哪", "住宿"],
      a: "黄花机场可乘磁浮或地铁 6 号线进城；长沙南站坐地铁 2 号线直达五一广场。市内玩以地铁最稳，2 号线串起橘子洲、五一广场、长沙南站。住宿选五一广场 / 黄兴路一带最方便，想安静可住梅溪湖或湘江中路。" },
    { k: ["方言", "长沙话", "娭毑", "伢子", "妹坨", "霸得蛮", "策"],
      a: "教您几句：娭毑是奶奶/老太太，伢子是男孩，妹坨是姑娘，「策」是聊天调侃，「霸得蛮」是肯拼能扛，「了难」是把事情摆平。长沙话听着冲，其实热乎得很～" },
    { k: ["博物馆", "省博", "马王堆", "简牍", "辛追", "开福寺", "第一师范", "天心阁", "靖港", "铜官"],
      a: "室内派可以这样排：湖南省博物院（马王堆汉墓、辛追夫人，需提前预约）→ 长沙简牍博物馆 → 开福寺 → 湖南第一师范旧址。城外想跑远一点，铜官窑古镇与靖港古镇各占半天，唐风窑火和麻石老街两种味道。" },
    { k: ["明信片", "抽签", "影像馆", "测试", "日记", "打卡功能", "网站功能", "玩法"],
      a: "这网页藏了几个小玩意儿：「星城影像馆」能按类别筛图并点开大图，「测一测你是哪种长沙人」四题出结果，「星城明信片」能选底图、写寄语、盖章导出 PNG，还有美食签、打卡和云游日记。慢慢逛，彩蛋也有哦～" },
    { k: ["你好", "你是谁", "介绍", "叫什么", "hi", "hello", "在吗"],
      a: "哟——我是小戏芽，穿花鼓戏衣裳的星城小导游！头上是绒球头面，手里一把洒金折扇，专管长沙的山、水、戏与味。景点、非遗、美食、路线，您只管问～" }
  ];

  /* ---------- DOM ---------- */
  function $(id) { return document.getElementById(id); }
  var panel = $("ipPanel"), entry = $("ipEntry"), closeBtn = $("ipClose"),
      cfgBtn = $("ipSettings"), cfg = $("ipConfig"), cfgClose = $("ipCfgClose"),
      log = $("ipLog"), form = $("ipForm"), input = $("ipText"),
      quick = $("ipQuick"), statusEl = $("ipStatus"),
      epInput = $("ipEndpoint"), saveBtn = $("ipSave"), clearBtn = $("ipClear");

  if (!panel || !entry || !cfg || !statusEl) return;
  var history = [], opened = false, busy = false, health = null;

  /* ---------- 配置 ---------- */
  function getCfg() {
    var c = { endpoint: DEFAULT.endpoint };
    try {
      var s = JSON.parse(localStorage.getItem(CFG_KEY) || "{}") || {};
      if (s.endpoint) c.endpoint = s.endpoint;
    } catch (e) { /* 浏览器禁用存储时用默认值 */ }
    return c;
  }
  function saveCfg(c) {
    try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) { }
  }
  function setStatus(text, cls) {
    statusEl.textContent = text;
    statusEl.className = "ip-status" + (cls ? " " + cls : "");
  }

  /* ---------- 服务状态 ---------- */
  function checkHealth(announce) {
    var ep = getCfg().endpoint;
    if (!ep) { health = null; setStatus("本地知识库", ""); return; }
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
    var opt = { method: "GET" };
    if (ctrl) opt.signal = ctrl.signal;
    fetch(ep, opt).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (d) {
      if (!d || !d.ok || !d.configured) throw new Error("未配置");
      health = d;
      setStatus("AI 在线", "on");
      if (announce) addSys("知识库已加载 " + d.chunks + " 条网页片段 · 检索方式：" + d.retrieval + " · 模型 " + d.model);
    }).catch(function () {
      clearTimeout(timer);
      health = null;
      setStatus("本地知识库", "");
      if (announce) addSys("AI 接口暂未连通，先用内置长沙知识库陪您聊～");
    });
  }

  /* ---------- 消息渲染 ---------- */
  function addMsg(role, text) {
    var row = document.createElement("div");
    row.className = "ip-msg " + (role === "user" ? "me" : "ai");
    var av = document.createElement("span");
    av.className = "ip-mini";
    if (role === "user") {
      av.textContent = "我";
    } else {
      var img = document.createElement("img");
      img.src = "../images/ip/ip-avatar.png"; img.alt = "";
      av.appendChild(img);
    }
    var b = document.createElement("div");
    b.className = "ip-bubble";
    b.textContent = text;
    row.appendChild(av); row.appendChild(b);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return b;
  }
  function addSys(text) {
    var d = document.createElement("div");
    d.className = "ip-sys"; d.textContent = text;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  function addTyping() {
    var b = addMsg("ai", "");
    b.innerHTML = '<span class="ip-typing"><i></i><i></i><i></i></span>';
    return {
      done: function (text) {
        b.textContent = text;
        log.scrollTop = log.scrollHeight;
      }
    };
  }

  /* ---------- 本地知识库 ---------- */
  function localAnswer(q) {
    var best = null, score = 0;
    KB.forEach(function (item) {
      var s = 0;
      item.k.forEach(function (k) { if (q.toLowerCase().indexOf(k.toLowerCase()) >= 0) s += k.length; });
      if (s > score) { score = s; best = item; }
    });
    return best ? best.a :
      "（摇摇水袖）这题我还没学全呢～换个说法试试：「长沙三日怎么玩」「花鼓戏是什么」「必吃美食」「橘子洲怎么去」「非遗有哪些」。\n等 AI 接口连上，我就能翻阅全站网页替您找答案啦！";
  }

  /* ---------- 服务端 RAG 问答 ---------- */
  function askAI(q, c) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 25000);
    var opt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, history: history.slice(-6) })
    };
    if (ctrl) opt.signal = ctrl.signal;
    return fetch(c.endpoint, opt).then(function (r) {
      clearTimeout(timer);
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok || d.error) throw new Error(d.error || ("HTTP " + r.status));
        if (!d.answer) throw new Error("空回复");
        return d;
      });
    }).catch(function (e) { clearTimeout(timer); throw e; });
  }

  /* ---------- 发送 ---------- */
  function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;
    addMsg("user", text);
    history.push({ role: "user", content: text });
    input.value = "";
    var typing = addTyping();
    var c = getCfg();
    var p = (c.endpoint && typeof fetch === "function")
      ? askAI(text, c) : Promise.reject(new Error("无接口"));
    p.then(function (d) {
      typing.done(d.answer);
      history.push({ role: "assistant", content: d.answer });
      setStatus("AI 在线", "on");
    }).catch(function () {
      var ans = localAnswer(text);
      typing.done(ans);
      history.push({ role: "assistant", content: ans });
      setStatus("本地知识库", "");
      addSys("AI 接口没连上，已用内置知识库回答；可在 ⚙ 检查接口地址");
    }).then(function () {
      busy = false;
      log.scrollTop = log.scrollHeight;
    });
  }

  /* ---------- 面板开关 ---------- */
  function openPanel() {
    panel.classList.add("on");
    panel.setAttribute("aria-hidden", "false");
    if (!opened) {
      opened = true;
      addMsg("ai", "哟——我是小戏芽，穿花鼓戏衣裳的星城小导游！如今我读遍了全站网页，长沙的景、戏、味随您问～");
      checkHealth(true);
    }
    setTimeout(function () { try { input.focus(); } catch (e) { } }, 320);
  }
  function closePanel() {
    panel.classList.remove("on");
    panel.setAttribute("aria-hidden", "true");
  }

  entry.addEventListener("click", function () {
    panel.classList.contains("on") ? closePanel() : openPanel();
  });
  closeBtn.addEventListener("click", closePanel);

  form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
  quick.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.classList && t.classList.contains("ip-chip")) send(t.textContent);
  });

  /* ---------- 设置 ---------- */
  function openCfg() { epInput.value = getCfg().endpoint; cfg.hidden = false; }
  function closeCfg() { cfg.hidden = true; }
  cfgBtn.addEventListener("click", function () { cfg.hidden ? openCfg() : closeCfg(); });
  cfgClose.addEventListener("click", closeCfg);

  saveBtn.addEventListener("click", function () {
    var c = { endpoint: (epInput.value || "").trim() || DEFAULT.endpoint };
    saveCfg(c);
    closeCfg();
    addSys("接口已保存：" + c.endpoint);
    checkHealth(false);
  });
  clearBtn.addEventListener("click", function () {
    try { localStorage.removeItem(CFG_KEY); } catch (e) { }
    epInput.value = DEFAULT.endpoint;
    addSys("已恢复默认同源接口 /api/chat");
    checkHealth(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!cfg.hidden) { closeCfg(); return; }
    if (panel.classList.contains("on")) closePanel();
  });

  checkHealth(false);
})();
