// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import jsonp from "vue-jsonp"
import axios from 'axios';
import QRCode from 'qrcodejs2';

Vue.prototype.$axios=axios
Vue.use(Mint);
Vue.use(Vant);
Vue.use(jsonp);
const QRCodeSC = (url) => {
  var qrcode = new QRCode(document.getElementById("QRCodeNone"), { // qrcode  html为标签id
    width: 100, // 长度
    height: 100, // 宽度
    text: url // 内容
    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas)
    // background: '#f0f'
    // foreground: '#ff0'
  })
  var myCanvas = document.getElementsByTagName('canvas')[0];
  var img = convertCanvasToImage(myCanvas);
  document.getElementById("qrcode").appendChild(img)
  // return qrcode
}
function convertCanvasToImage(canvas){
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
Vue.prototype.$QRCodeSC = QRCodeSC

import { Search } from 'mint-ui';

Vue.component(Search.name, Search);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
