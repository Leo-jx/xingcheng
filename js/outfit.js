/* ============================================================
   卷七 星城穿搭 · 卷八 星城居住 —— 四季切换与预算筛选
   依赖 script.js 的 backCover()，独立运行不破坏原有逻辑
   ============================================================ */
(function(){
  function bindBackCover(){
    if(typeof window.backCover !== "function"){
      setTimeout(bindBackCover,300);return;
    }
    ["#backCover10","#backCover11"].forEach(function(sel){
      var b=document.querySelector(sel);
      if(b && !b.dataset.coverBound){
        b.dataset.coverBound="1";
        b.addEventListener("click",window.backCover);
      }
    });
  }
  bindBackCover();

  /* ---------- 四季穿搭切换 ---------- */
  var tabs=document.querySelectorAll(".wear-tab");
  var panels=document.querySelectorAll(".wear-panel");
  if(tabs.length&&panels.length){
    tabs.forEach(function(t){
      if(t.dataset.wearBound) return;
      t.dataset.wearBound="1";
      t.addEventListener("click",function(){
        var s=this.getAttribute("data-season");
        tabs.forEach(function(x){x.classList.toggle("on",x===t);});
        panels.forEach(function(p){
          p.classList.toggle("on",p.id==="wear-"+s);
        });
      });
    });
  }

  /* ---------- 居住预算筛选 ---------- */
  var bbs=document.querySelectorAll(".stay-bb");
  var cards=document.querySelectorAll(".stay-card");
  if(bbs.length&&cards.length){
    bbs.forEach(function(b){
      if(b.dataset.stayBound) return;
      b.dataset.stayBound="1";
      b.addEventListener("click",function(){
        var key=this.getAttribute("data-budget");
        bbs.forEach(function(x){x.classList.toggle("on",x===b);});
        cards.forEach(function(c){
          var fits=(c.getAttribute("data-budget")||"").split(",");
          var hit=fits.indexOf(key)>=0;
          c.classList.toggle("hit",hit);
          c.classList.toggle("dim",!hit);
        });
      });
    });
    /* 默认选中「舒服住」 */
    var mid=document.querySelector('.stay-bb[data-budget="mid"]');
    if(mid) mid.click();
  }
})();
