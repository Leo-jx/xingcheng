/* ============================================================
   星城风物志 · 扩展交互
   1) 星城影像馆：分类筛选 + 点击放大灯箱
   2) 测一测你是哪种长沙人：趣味问答 + 结果卡
   3) 星城明信片生成器：canvas 实时合成，可下载 PNG
   4) 全站彩蛋：连点品牌区撒桂花
   依赖：script.js（showPage / toast / localStorage 键前缀 cswf_）
   ============================================================ */
(function () {
  "use strict";
  var KEY = "cswf_";
  function q(s, r) { return (r || document).querySelector(s); }
  function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* =========================================================
     一、星城影像馆
     ========================================================= */
  var GALLERY = [
    { pic: "../images/gallery/firework-night.jpg", cap: "橘子洲焰火", sub: "一城人一起抬头的那几秒", cat: "山水" },
    { pic: "../images/gallery/skyline.jpg", cap: "一江两岸", sub: "晚霞把湘江分成两半", cat: "山水" },
    { pic: "../images/juzizhou.jpg", cap: "洲头夕照", sub: "湘江北去，落日正好", cat: "山水" },
    { pic: "../images/gallery/shuyuan-autumn.jpg", cap: "书院深秋", sub: "银杏落满千年石阶", cat: "古建" },
    { pic: "../images/scenes/kaifu.jpg", cap: "开福寺晨光", sub: "红墙里的一炉香", cat: "古建" },
    { pic: "../images/scenes/dufu.jpg", cap: "江阁夜灯", sub: "一江灯火，半城倒影", cat: "古建" },
    { pic: "../images/scenes/jinggang.jpg", cap: "靖港古镇", sub: "湘江西岸的慢半天", cat: "古建" },
    { pic: "../images/gallery/posijie.jpg", cap: "坡子街夜市", sub: "白烟一起，才算入夜", cat: "市井" },
    { pic: "../images/scenes/chaozong.jpg", cap: "潮宗街午后", sub: "老墙不拆，新店照开", cat: "市井" },
    { pic: "../images/gallery/xiangxiu-craft.jpg", cap: "湘绣·以针代笔", sub: "一根丝线劈成十六分之一", cat: "非遗" },
    { pic: "../images/gallery/huaguxi-stage.jpg", cap: "花鼓戏台上", sub: "锣鼓一起，台下跟着哼", cat: "非遗" },
    { pic: "../images/gallery/iron-flower.jpg", cap: "铜官窑打铁花", sub: "铁水击空，开出金色的树", cat: "非遗" },
    { pic: "../images/gallery/tofu-fry.jpg", cap: "现炸臭豆腐", sub: "黑得发亮，脆得作响", cat: "食味" },
    { pic: "../images/gallery/rice-noodle.jpg", cap: "一碗米粉", sub: "长沙人的一天从这里开始", cat: "食味" },
    { pic: "../images/gallery/crayfish.jpg", cap: "口味虾", sub: "紫苏与剁椒的夜宵主场", cat: "食味" },
    { pic: "../images/scenes/huogongdian.jpg", cap: "火宫殿庙会", sub: "戏台开锣，摊前起火", cat: "市井" }
  ];
  var CATS = ["全部", "山水", "古建", "市井", "非遗", "食味"];
  var galCat = "全部", lbIdx = 0, lbList = [];

  function renderGallery() {
    var grid = q("#galGrid");
    if (!grid) return;
    var list = GALLERY.filter(function (g) { return galCat === "全部" || g.cat === galCat; });
    grid.innerHTML = "";
    list.forEach(function (g, i) {
      var fig = document.createElement("figure");
      fig.className = "gal-card";
      fig.setAttribute("data-i", String(GALLERY.indexOf(g)));
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "放大查看：" + g.cap);
      fig.innerHTML =
        '<img src="' + g.pic + '" alt="' + g.cap + '" loading="lazy">' +
        '<em>' + g.cat + '</em>' +
        '<span class="gal-zoom">＋</span>' +
        '<figcaption><b>' + g.cap + '</b><span>' + g.sub + '</span></figcaption>';
      grid.appendChild(fig);
    });
    var ct = q("#galCount");
    if (ct) ct.textContent = "共 " + list.length + " 帧 · 点击图片可放大";
    qa(".gal-filter").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-cat") === galCat);
    });
  }

  function buildGallery() {
    var bar = q("#galBar");
    if (!bar) return;
    CATS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "gal-filter"; b.setAttribute("data-cat", c);
      b.textContent = c;
      bar.appendChild(b);
    });
    bar.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".gal-filter") : null;
      if (!b) return;
      galCat = b.getAttribute("data-cat");
      renderGallery();
    });
    renderGallery();

    /* 灯箱 DOM */
    var lb = document.createElement("div");
    lb.className = "gal-lightbox"; lb.id = "galLightbox";
    lb.innerHTML =
      '<button class="gal-lb-close" id="galClose" aria-label="关闭">×</button>' +
      '<button class="gal-lb-btn gal-lb-prev" id="galPrev" aria-label="上一张">‹</button>' +
      '<img id="galLbImg" src="../images/gallery/skyline.jpg" alt="">' +
      '<div class="gal-lb-cap"><b id="galLbName"></b><span id="galLbSub"></span><div class="gal-lb-num" id="galLbNum"></div></div>' +
      '<button class="gal-lb-btn gal-lb-next" id="galNext" aria-label="下一张">›</button>' +
      '<div class="gal-lb-tip">← → 切换 · Esc 或点击空白处关闭</div>';
    document.body.appendChild(lb);

    function visibleList() {
      return qa(".gal-card").filter(function (c) { return c.offsetParent !== null; })
        .map(function (c) { return Number(c.getAttribute("data-i")); });
    }
    function show(i) {
      lbList = visibleList();
      if (!lbList.length) return;
      lbIdx = (i + lbList.length) % lbList.length;
      var g = GALLERY[lbList[lbIdx]];
      q("#galLbImg").src = g.pic;
      q("#galLbName").textContent = g.cap;
      q("#galLbSub").textContent = g.sub + " · " + g.cat;
      q("#galLbNum").textContent = (lbIdx + 1) + " / " + lbList.length;
    }
    function open(i) { lb.classList.add("on"); document.body.style.overflow = "hidden"; show(i); }
    function close() { lb.classList.remove("on"); document.body.style.overflow = ""; }

    q("#galGrid").addEventListener("click", function (e) {
      var card = e.target.closest ? e.target.closest(".gal-card") : null;
      if (!card) return;
      lbList = visibleList();
      open(lbList.indexOf(Number(card.getAttribute("data-i"))));
    });
    q("#galGrid").addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest ? e.target.closest(".gal-card") : null;
      if (card) { e.preventDefault(); card.click(); }
    });
    q("#galClose").addEventListener("click", close);
    q("#galPrev").addEventListener("click", function () { show(lbIdx - 1); });
    q("#galNext").addEventListener("click", function () { show(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(lbIdx - 1);
      if (e.key === "ArrowRight") show(lbIdx + 1);
    });
  }

  /* =========================================================
     二、测一测你是哪种长沙人
     ========================================================= */
  var QUIZ = [
    {
      q: "刚到长沙，第一件事你想干嘛？",
      opts: [
        { t: "直奔夜市，先来一份加辣臭豆腐", k: "A" },
        { t: "去岳麓书院，站在讲堂前发会儿呆", k: "B" },
        { t: "等天黑，去江边看两岸亮灯", k: "C" },
        { t: "打开美食清单，按人气排一遍", k: "D" }
      ]
    },
    {
      q: "朋友说「今天走了两万步」，你的反应是？",
      opts: [
        { t: "那得配一顿重口的犒劳自己", k: "A" },
        { t: "正好，把老街的门牌都拍下来了", k: "B" },
        { t: "才两万？夜还长着呢", k: "C" },
        { t: "路上吃了几家？说来听听", k: "D" }
      ]
    },
    {
      q: "手机里最可能存着哪张照片？",
      opts: [
        { t: "一碗红油翻滚的口味虾", k: "A" },
        { t: "爱晚亭檐角与一地枫叶", k: "B" },
        { t: "解放西深夜的霓虹与人潮", k: "C" },
        { t: "糖油粑粑摊前的长队", k: "D" }
      ]
    },
    {
      q: "如果只能带走一样长沙的东西？",
      opts: [
        { t: "一瓶剁椒，回家继续辣", k: "A" },
        { t: "一枚书院的书签或一本旧书", k: "B" },
        { t: "一张演出票根和半夜的江风", k: "C" },
        { t: "塞满行李箱的酱板鸭与伴手礼", k: "D" }
      ]
    }
  ];
  var RESULTS = {
    A: { name: "辣得痛快 · 霸得蛮", tag: "THE FIERY ONE",
      pic: "../images/gallery/posijie.jpg",
      text: "你信奉「不辣不痛快」。长沙于你是一场直来直往的相遇：先被剁椒呛一下，再被糖油粑粑哄回来。点单从不说微辣，排队也排得心甘情愿，骨子里就是本地人最认的那股「霸得蛮」。",
      rec: "推荐去处：坡子街 · 火宫殿 · 夜宵摊", page: "food" },
    B: { name: "书卷气 · 岳麓山下", tag: "THE SCHOLAR",
      pic: "../images/gallery/shuyuan-autumn.jpg",
      text: "你走得很慢，看得很细。别人赶景点，你在书院的楹联前站上十分钟，在简牍博物馆的玻璃柜前想象两千年前的笔迹。长沙最耐看的那部分，恰好留给了愿意停下来的你。",
      rec: "推荐去处：岳麓书院 · 湖南博物院 · 开福寺", page: "spots" },
    C: { name: "夜行动物 · 星城不夜", tag: "THE NIGHT OWL",
      pic: "../images/gallery/firework-night.jpg",
      text: "你的长沙从日落后才开始。江阁亮灯、Livehouse 开场、解放西人声汇拢，越晚越精神。白天可以把行程让给别人，夜里那一整座流光溢彩的城，才是你专程来赴的约。",
      rec: "推荐去处：杜甫江阁 · 湘江夜游 · 氛围卷", page: "night" },
    D: { name: "逛吃达人 · 一口入魂", tag: "THE FOODIE",
      pic: "../images/gallery/crayfish.jpg",
      text: "你把行程表排成了一张菜单。清早扁粉、午后小吃、深夜口味虾，中间还塞得下一杯茶颜。别人问长沙有什么好玩，你先报出七个店名——这座城的味道，被你记得最牢。",
      rec: "推荐去处：太平老街 · 30 味美食签筒", page: "food" }
  };
  var quizStep = 0, quizScore = { A: 0, B: 0, C: 0, D: 0 };

  function renderQuizQuestion() {
    var stage = q("#quizStage");
    if (!stage) return;
    if (quizStep >= QUIZ.length) { showQuizResult(); return; }
    var item = QUIZ[quizStep];
    var html = '<div class="quiz-kicker">QUESTION ' + String(quizStep + 1).padStart(2, "0") + ' / ' + QUIZ.length + '</div>' +
      '<h4 class="quiz-q">' + item.q + '</h4>' +
      '<p class="quiz-hint">凭第一直觉选，别想太多～</p><div class="quiz-opts">';
    item.opts.forEach(function (o, i) {
      html += '<button class="quiz-opt" type="button" data-k="' + o.k + '"><i>' + "ABCD".charAt(i) + '</i><span>' + o.t + '</span></button>';
    });
    html += '</div>';
    stage.innerHTML = html;
    q("#quizNum").textContent = String(quizStep + 1).padStart(2, "0") + " / " + QUIZ.length;
    qa(".quiz-dots i").forEach(function (d, i) { d.classList.toggle("on", i <= quizStep); });
  }

  function showQuizResult() {
    var best = "A";
    ["B", "C", "D"].forEach(function (k) { if (quizScore[k] > quizScore[best]) best = k; });
    var r = RESULTS[best];
    q("#quizResultImg").src = r.pic;
    q("#quizResultTag").textContent = r.tag;
    q("#quizResultName").textContent = r.name;
    q("#quizResultText").textContent = r.text;
    q("#quizResultRec").textContent = r.rec;
    q("#quizGo").setAttribute("data-goto", r.page);
    q("#quizResult").classList.add("on");
    q("#quizShell").classList.add("result-on");
    try { localStorage.setItem(KEY + "quiz", best); } catch (e) { }
    q("#quizNum").textContent = "完成";
    qa(".quiz-dots i").forEach(function (d) { d.classList.add("on"); });
  }

  function resetQuiz(keepResult) {
    quizStep = 0; quizScore = { A: 0, B: 0, C: 0, D: 0 };
    q("#quizShell").classList.remove("result-on");
    q("#quizResult").classList.remove("on");
    if (!keepResult) { try { localStorage.removeItem(KEY + "quiz"); } catch (e) { } }
    renderQuizQuestion();
  }

  function buildQuiz() {
    if (!q("#quizStage")) return;
    /* 进度点与题目数量对齐 */
    var dots = q("#quizDots");
    if (dots) {
      dots.innerHTML = "";
      QUIZ.forEach(function () { dots.appendChild(document.createElement("i")); });
    }
    q("#quizStage").addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".quiz-opt") : null;
      if (!b) return;
      quizScore[b.getAttribute("data-k")]++;
      quizStep++;
      renderQuizQuestion();
    });
    q("#quizReset").addEventListener("click", function () { resetQuiz(false); });
    renderQuizQuestion();
    var saved = null;
    try { saved = localStorage.getItem(KEY + "quiz"); } catch (e) { }
    if (saved && RESULTS[saved]) {
      var note = q("#quizLast");
      if (note) note.textContent = "上次测出：「" + RESULTS[saved].name + "」 · 再测一次看看会不会变";
    }
    q("#quizAgain").addEventListener("click", function () { resetQuiz(false); });
    q("#quizCopy").addEventListener("click", function () {
      var txt = "我在《长沙 · 星城风物志》测出自己是「" + q("#quizResultName").textContent + "」——" + q("#quizResultRec").textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { toast("结果文案已复制"); },
          function () { toast("复制失败，可手动选中文字"); });
      } else { toast("浏览器不支持自动复制，可手动选中文字"); }
    });
  }

  /* =========================================================
     三、星城明信片生成器
     ========================================================= */
  var PC_SCENES = [
    { pic: "../images/juzizhou.jpg", name: "橘子洲" },
    { pic: "../images/gallery/skyline.jpg", name: "一江两岸" },
    { pic: "../images/scenes/dufu.jpg", name: "江阁夜灯" },
    { pic: "../images/gallery/firework-night.jpg", name: "洲头焰火" },
    { pic: "../images/gallery/shuyuan-autumn.jpg", name: "书院深秋" },
    { pic: "../images/scenes/chaozong.jpg", name: "潮宗街" }
  ];
  var PC_SEALS = ["星城", "长沙", "到此一游", "风物志"];
  var pcState = { scene: 0, seal: 0, loaded: {} };

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  function drawPostcard() {
    var cv = q("#pcCanvas");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var W = 1000, H = 660;
    var paper = "#F7F0E1", zhu = "#C3272B", jin = "#B8893B", mo = "#241D18";

    /* 宣纸底 + 细纹理 */
    ctx.fillStyle = paper; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(36,29,24,.035)";
    for (var y = 0; y < H; y += 8) for (var x = (y % 16 ? 4 : 0); x < W; x += 8) ctx.fillRect(x, y, 1, 1);

    /* 双线朱红边框 */
    ctx.strokeStyle = jin; ctx.lineWidth = 2; ctx.strokeRect(22, 22, W - 44, H - 44);
    ctx.strokeStyle = "rgba(195,39,43,.55)"; ctx.lineWidth = 1; ctx.strokeRect(30, 30, W - 60, H - 60);

    /* 抬头 */
    ctx.textAlign = "left";
    ctx.fillStyle = zhu;
    ctx.font = 'bold 40px "STKaiti","KaiTi","SimSun",serif';
    ctx.fillText("星 城 风 物 志", 58, 92);
    ctx.fillStyle = jin;
    ctx.font = '16px Georgia,serif';
    ctx.fillText("CHANGSHA  ·  A POSTCARD FROM THE CITY OF STAR", 60, 118);
    ctx.strokeStyle = "rgba(184,137,59,.6)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(58, 132); ctx.lineTo(W - 58, 132); ctx.stroke();

    /* 主图 */
    var ix = 58, iy = 152, iw = 560, ih = 350;
    ctx.save();
    roundRect(ctx, ix, iy, iw, ih, 8); ctx.clip();
    var img = pcState.loaded[pcState.scene];
    if (img) {
      var ir = img.width / img.height, cr = iw / ih, sw, sh, sx, sy;
      if (ir > cr) { sh = img.height; sw = sh * cr; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / cr; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, ix, iy, iw, ih);
    } else {
      ctx.fillStyle = "#E6D9BF"; ctx.fillRect(ix, iy, iw, ih);
    }
    ctx.restore();
    ctx.strokeStyle = "#FFFCF6"; ctx.lineWidth = 7;
    roundRect(ctx, ix, iy, iw, ih, 8); ctx.stroke();
    ctx.strokeStyle = "rgba(184,137,59,.8)"; ctx.lineWidth = 1;
    roundRect(ctx, ix, iy, iw, ih, 8); ctx.stroke();

    /* 右侧题字区 */
    var rx = 648;
    ctx.fillStyle = "rgba(195,39,43,.08)";
    ctx.fillRect(rx, iy, W - rx - 58, ih);
    ctx.textAlign = "center";
    ctx.fillStyle = mo;
    ctx.font = '30px "STKaiti","KaiTi","SimSun",serif';
    ctx.fillText("山 水 洲 城", (rx + W - 58) / 2, iy + 62);
    ctx.fillStyle = jin; ctx.font = '15px Georgia,serif';
    ctx.fillText("RIVER · HILL · ISLE · CITY", (rx + W - 58) / 2, iy + 88);

    /* 竖排日期 */
    ctx.fillStyle = "rgba(36,29,24,.55)";
    ctx.font = '17px "STKaiti","KaiTi","SimSun",serif';
    var d = new Date();
    var ds = d.getFullYear() + " · " + (d.getMonth() + 1) + " · " + d.getDate();
    ctx.fillText(ds, (rx + W - 58) / 2, iy + 124);

    /* 寄语（自动换行、竖排感用居中横排） */
    var msg = (q("#pcMsg") && q("#pcMsg").value.trim()) || "山水洲城，一日看不尽";
    msg = msg.slice(0, 32);
    ctx.fillStyle = mo;
    ctx.font = '21px "STKaiti","KaiTi","SimSun",serif';
    var lines = [], cur = "";
    for (var i = 0; i < msg.length; i++) {
      cur += msg.charAt(i);
      if (ctx.measureText(cur).width > 250 || msg.charAt(i) === "，") { lines.push(cur); cur = ""; }
    }
    if (cur) lines.push(cur);
    lines = lines.slice(0, 4);
    lines.forEach(function (ln, k) { ctx.fillText(ln, (rx + W - 58) / 2, iy + 178 + k * 34); });

    /* 印章 */
    ctx.save();
    ctx.translate(rx + 34, iy + ih - 78); ctx.rotate(-0.06);
    ctx.fillStyle = "rgba(195,39,43,.9)";
    roundRect(ctx, 0, 0, 76, 76, 10); ctx.fill();
    ctx.strokeStyle = "rgba(255,246,230,.8)"; ctx.lineWidth = 2;
    roundRect(ctx, 6, 6, 64, 64, 7); ctx.stroke();
    ctx.fillStyle = "#FFF6E6"; ctx.textAlign = "center";
    ctx.font = 'bold 26px "STKaiti","KaiTi","SimSun",serif';
    var seal = PC_SEALS[pcState.seal] || "星城";
    if (seal.length <= 2) { ctx.fillText(seal, 38, 48); }
    else { ctx.font = 'bold 19px "STKaiti","KaiTi","SimSun",serif'; ctx.fillText(seal.slice(0, 2), 38, 33); ctx.fillText(seal.slice(2), 38, 58); }
    ctx.restore();

    /* 底部落款 */
    ctx.textAlign = "left";
    ctx.fillStyle = mo; ctx.font = '19px "STKaiti","KaiTi","SimSun",serif';
    var sign = (q("#pcSign") && q("#pcSign").value.trim()) || "寄自长沙";
    ctx.fillText("—— " + sign.slice(0, 14), 58, 560);
    ctx.fillStyle = "rgba(36,29,24,.5)"; ctx.font = '14px "SimSun",serif';
    ctx.fillText("长沙 · 星城风物志    〡    本明信片由网页实时生成，可作课程作品留念", 58, 592);
    ctx.textAlign = "right";
    ctx.fillStyle = jin; ctx.font = '15px Georgia,serif';
    ctx.fillText("No. " + String(pcState.scene + 1).padStart(2, "0") + "  ·  CHANGSHA", W - 58, 592);
  }

  function loadScene(i, cb) {
    if (pcState.loaded[i]) { if (cb) cb(); return; }
    var im = new Image();
    im.onload = function () { pcState.loaded[i] = im; if (cb) cb(); };
    im.onerror = function () { if (cb) cb(); };
    im.src = PC_SCENES[i].pic;
  }

  function buildPostcard() {
    if (!q("#pcCanvas")) return;
    var box = q("#pcScenes");
    PC_SCENES.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "pc-scene" + (i === 0 ? " on" : "");
      b.setAttribute("data-i", String(i));
      b.innerHTML = '<img src="' + s.pic + '" alt="' + s.name + '"><span>' + s.name + '</span>';
      box.appendChild(b);
    });
    box.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".pc-scene") : null;
      if (!b) return;
      pcState.scene = Number(b.getAttribute("data-i"));
      qa(".pc-scene").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      loadScene(pcState.scene, drawPostcard);
    });

    var sealBox = q("#pcSeals");
    PC_SEALS.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "pc-seal" + (i === 0 ? " on" : "");
      b.setAttribute("data-i", String(i)); b.textContent = s;
      sealBox.appendChild(b);
    });
    sealBox.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".pc-seal") : null;
      if (!b) return;
      pcState.seal = Number(b.getAttribute("data-i"));
      qa(".pc-seal").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); drawPostcard();
    });

    ["#pcMsg", "#pcSign"].forEach(function (sel) {
      var el = q(sel); if (el) el.addEventListener("input", drawPostcard);
    });
    q("#pcRandom").addEventListener("click", function () {
      pcState.scene = Math.floor(Math.random() * PC_SCENES.length);
      qa(".pc-scene").forEach(function (x, i) { x.classList.toggle("on", i === pcState.scene); });
      loadScene(pcState.scene, drawPostcard);
      toast("换了一张星城风景");
    });
    q("#pcDownload").addEventListener("click", function () {
      var cv = q("#pcCanvas");
      try {
        var url = cv.toDataURL("image/png");
        var a = document.createElement("a");
        a.href = url; a.download = "星城明信片-" + Date.now() + ".png";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast("明信片已保存，收好这趟旅程");
      } catch (err) {
        toast("当前为本地文件模式，请在画布上右键「图片另存为」");
      }
    });
    loadScene(0, drawPostcard);
  }

  /* =========================================================
     四、跨页定位 + 全站彩蛋
     ========================================================= */
  function bindGoto() {
    qa("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-goto").split(":");
        var page = v[0], anchor = v[1];
        if (typeof showPage === "function") showPage(page, true);
        if (anchor) {
          setTimeout(function () {
            var t = document.getElementById(anchor);
            if (t && t.scrollIntoView) t.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      });
    });
  }

  /* 锚点直达：index.html#gal-block / #quiz-block / #pc-block 可直接跳到对应板块 */
  var ANCHOR_PAGE = { "gal-block": "home", "quiz-block": "home", "pc-block": "me", "heritage-photos": "heritage" };
  function anchorFromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!ANCHOR_PAGE[h]) return;
    var cover = q("#cover"); if (cover) cover.classList.add("hide");
    var lg = q("#login"); if (lg) lg.classList.add("hide");
    if (typeof showPage === "function") showPage(ANCHOR_PAGE[h], true);
    setTimeout(function () {
      var t = document.getElementById(h);
      if (t && t.scrollIntoView) t.scrollIntoView({ behavior: "auto", block: "start" });
    }, 150);
  }

  function bindEgg() {
    var brand = q(".nav-brand");
    if (!brand) return;
    var hits = 0, timer = null;
    brand.style.cursor = "pointer";
    brand.title = "连点五下，有件小事会发生";
    brand.addEventListener("click", function () {
      hits++;
      clearTimeout(timer);
      timer = setTimeout(function () { hits = 0; }, 2600);
      if (hits < 5) return;
      hits = 0;
      var flowers = ["🌼", "🍂", "✦", "🌸"];
      for (var i = 0; i < 26; i++) {
        (function (k) {
          var s = document.createElement("span");
          s.className = "x-petal";
          s.textContent = flowers[k % flowers.length];
          s.style.left = (Math.random() * 100) + "vw";
          s.style.fontSize = (12 + Math.random() * 14) + "px";
          s.style.animationDuration = (3.2 + Math.random() * 2.6) + "s";
          s.style.animationDelay = (Math.random() * 1.1) + "s";
          document.body.appendChild(s);
          setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 7000);
        })(i);
      }
      if (typeof toast === "function") toast("🌼 桂花落了，星城正好");
    });
  }

  /* =========================================================
     启动
     ========================================================= */
  function boot() {
    buildGallery();
    buildQuiz();
    buildPostcard();
    bindGoto();
    bindEgg();
    anchorFromHash();
    window.addEventListener("hashchange", anchorFromHash);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
