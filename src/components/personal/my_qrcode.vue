<template>
  <div id="qrcode">
    <div class="bg">
      <div class="up_bg">1.邀请朋友使用微信扫描</div>
      <div class="up_bg">2.长按图片-发送给朋友</div>
      <div class="up_bg">3.长按图片-保存图片-发送到朋友圈</div>
      <div id="myqrcode" class="poster">
        <img class="bg_img" src="../../assets/bg.jpg">
        <img id="code" class="qr_code" :src="code_url">
      </div>
      <div class="down_bg">*扫描二维码并关注公众号的用户,将成为您的好友*</div>
      <div class="down_bg">*好友在公众号购买商品,您将获得系统的额外奖励*</div>
    </div>
    <div @click="backto" style="
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #444748;
    z-index: 10;
"></div>
    <!-- <div class="my_fenxiang">
      在公众号内回复【<span style="color:#f95e01">邀请</span>】<br>获取邀请二维码
    </div> -->
  </div>
</template>
<script>
import html2canvas from "../../assets/js/html2canvas.min";

export default {
  data() {
    return {
      bg_url: "",
      code_url: "",
      token:""
    };
  },
  created(){
    this.token=this.$route.query.token
    window.document.title="邀请好友"
    let data=new FormData()
    data.append("token",this.token)
    this.$axios.post("/wechat/mobile/my_qrcode",data).then(res=>{
      this.code_url=res.data.code_url
      this.bg_url=res.data.bg_url
      this.canvas()

    })
  },
  mounted(){
  },
  methods: {
    backto(){
      window.history.back()
    },
    canvas() {
      let qr_code = document.getElementById("code");
      html2canvas(document.getElementById("myqrcode")).then(function(canvas) {
        let base64ImgSrc = canvas.toDataURL("image/png");
        document.getElementById("myqrcode").innerHTML ="<img class='bg_img' style='width:100%;margin:0 auto' src=" + base64ImgSrc + ">";
      });
    } 
  }
};
</script>

<style scoped>
html,body{
    height: 100%;
}
#qrcode{
    height: 100%;
    background: #444748;
    /* background: #eee; */
}
#qrcode .bg {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position:fixed;
  z-index: 30;
  left: 50%;
  top: 50%;
  width: 90%;
  transform: translate(-50%,-50%)
}

#qrcode .bg .poster {
  position: relative;
  width: 75%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

#qrcode .bg .poster .bg_img {
  width: 100%;
  margin: 0.5rem auto;
}

#qrcode .bg .poster .qr_code {
  position: absolute;
  width: 37%;
  margin: 0.5rem auto;
  margin-left: 1%;
  top: 49%;
}

#qrcode .up_bg {
  color: white;
  width: 100%;
  text-align: center;
  margin-bottom: 0.3rem;
}

#qrcode .down_bg {
  color: white;
  width: 100%;
  font-size: 0.6rem;
  text-align: center;
}
#qrcode .my_fenxiang{
  width: 70%;
  font-size: 5vw;
  /* color: white; */
  color: rgb(102, 102, 102);
  margin:0 auto;
  position: relative;
  top:30%;
}
</style>
