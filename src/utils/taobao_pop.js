export function showPop() {
  function is_weixin() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }

  let isWeixin = is_weixin();
  let winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;

  function loadHtml() {
    let div = document.createElement('div');
    div.id = 'weixin-tip';
    div.innerHTML = `<p style="padding: 0;margin: 0;width:100%;height:100%;"><img style="width:100%;heigth:100%;" src="${require('@/assets/1.jpg')}" alt="微信打开"/></p>`;
    document.body.appendChild(div);
  }

  function loadStyleText(cssText) {
    let style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(cssText));
    } catch (e) {
      style.styleSheet.cssText = cssText; //ie9以下
    }
    let head = document.getElementsByTagName("head")[0]; //head标签之间加上style样式
    head.appendChild(style);
  }

  let cssText = "#weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}";
  return new Promise((resolve, reject) => {
    if (isWeixin) {
      loadHtml();
      loadStyleText(cssText);
    }
    resolve(isWeixin)
  })

}




