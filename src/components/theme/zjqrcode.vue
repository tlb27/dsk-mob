<template>
  <div id="serve" v-cloak>
    <div id="top_guess">
      <!-- <p class="mycolor">长按保存下方图片,或转发给您的好友</p>
      <p class="mycolor"></p> -->
      </div>
   
    <div id="poster">
       <h2 class="title_tip">
        你的好友“{{info.nickname}}”向您推荐
      </h2>
      <div class="baipiao">
           <div class="avatar">
                <img :src="info.avatar">
            </div>
          <div  class="title">
              <span style="color:orange;">推荐理由:</span><span >{{info.theme_title}}</span>
          </div>
          <div class="red_bg">
              <div class="code_bg">
                    <div id="QRCodeNone" class="img_code" style="display:none"></div>
                    <div class="img_code" id="qrcode" ></div>
              </div>
              <div class="haibao_tip" >▲长按二维码▲</div>
          </div>
      </div>
    </div>
      <P style="color:orange;font-size:3.5vw;padding:5px;line-height:19px">长按上方图片选择(保存图片)或(转发给好友),好友下单后,<br/>您会获得相应的奖励哦~~分享至群聊或朋友圈,可获取更多奖励</P>
      <div id="jia"></div>
  </div>
</template>

<script>
import html2canvas from "../../assets/js/html2canvas.min";//dom元素截图插件

export default {
  data(){
    return{
      token:'',
      qrcode_url:'',
      showask:true,
      info:{}
    }
  },
  created(){
    this.token=this.$route.query.token
       window.document.title='推广二维码'
    
    this.$axios.get("/wechat/query-user?token="+this.token+"&theme_id="+this.$route.query.theme_id+"&theme_type="+this.$route.query.theme_type).then(res=>{
      console.log(res)
      if(res.data.error==0){
          this.info=res.data.data
          if(this.info.theme_title.indexOf("<br>")){
            this.info.theme_title=this.info.theme_title.replace("<br>","")
          }
          this.qrcode_url=res.data.data.url
           setTimeout(()=>{
          this.qrcodesc()
          },10)
          setTimeout(()=>{
            this.canvas()
          },500)
      }
    })
     
  },methods:{
    backto(){
      window.history.back()
    },
     qrcodesc() { //生成二维码
     console.log(this.qrcode_url)
      this.$QRCodeSC(this.qrcode_url);
    },
      canvas() { //生成推广海报
      var width = document.getElementById("poster").offsetWidth;
      var height = document.getElementById("poster").offsetHeight;
      var cloneDom = document.getElementById("poster").cloneNode(true);
      cloneDom.style.width = 80 + "%";
      cloneDom.style.height = height + "px";
      cloneDom.style.position = "absolute";
      cloneDom.style.top = document.getElementById("top_guess").offsetHeight+"px";
       cloneDom.style.left = '10%';
      cloneDom.style.zIndex = "-100";
      document.getElementById("jia").appendChild(cloneDom);
      var canvasBox = document.createElement("canvas");
      var scale = window.devicePixelRatio;
      var rect = document.getElementById("poster").getBoundingClientRect();
      canvasBox.width = width * scale;
      canvasBox.height = height * scale;
      canvasBox.style.width = width + "px";
      canvasBox.style.height = height + "px";
      canvasBox.getContext("2d").scale(scale, scale);
      canvasBox.getContext("2d").translate(rect.left, rect.top);

      var opts = {
        scale: scale,
        canvas: canvasBox,
        useCORS: true
      };
      html2canvas(cloneDom, opts).then(function(canvas) {
        let base64ImgSrc = canvas.toDataURL("image/png");
        document.getElementById("poster").innerHTML =
          // document.getElementById("poster").appendChild(canvas)
          "<img class='bg_img' style='width:100%;margin:0;padding:0' src=" + base64ImgSrc + ">";
      });
    },
  }
};
</script>

<style scoped>
#serve{
  background: rgba(0,0,0,0.7);
  overflow: hidden;
  position: fixed;
  top: 0%;
  left: 0;
  right: 0;
  bottom: 0;
}
#poster{
  overflow:hidden;
  box-sizing: border-box;
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
.mycolor{
  color: white
}
.title_tip{
    color: white;
    font-family:Helvetica;
    padding:10px;
    box-sizing: border-box; 
    font-size: 4.5vw;
    margin-bottom: 50px;
}
.avatar{
    width: 19vw;
    height: 19vw;
    border: 2px solid white;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%)
}
     
#poster{
  background: orangered;
  display: flex;
  flex-direction: column
}
.huise{
    background: #eee;
    border-radius: 10px;
    padding: 10px;
    text-align: left
}
#top_guess{
  font-size: 3.5vw;
}
.haibao_tip{
    color: white;
    margin-top: 5px;
    font-size: 12px;
}
[v-cloak]{
    display: none
}
.avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.tishi{
background: white;
padding: 16px;
}
.baipiao{
  width: 100%;
  box-sizing: border-box;
    background: white;
    border-radius: 10px 10px 0 0;
    position: relative;
    padding:0px 16px 0px;
}
.img_code{
  display: flex;
}
.title{
    margin-top:12vw;
    font-size: 4.5vw;
    margin-bottom: 10px;
    font-weight: bold;
}
.red_bg{
    background: #fd4441;
    width:100%;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 10px;
}
.code_bg{
    background: white;
    min-width: 115px;
    min-height: 115px;
    width: 20vw;
    height: 20vw;
    margin:  0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
