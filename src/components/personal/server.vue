<template>
  <div id="serve">
    <div class="my_bg">
      <div class="neifixed">
        <div class="guide">▼长按-识别二维码-添加客服微信▼</div>
        <div class="two_code">
          <img :src="qrcode_url">
        </div>
      </div>
      
    </div>
    <div class="hg_bg" @click.stop.prevent="backto" style="
    position: fixed;
    z-index: 10;
    background: #2d3132;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    bottom: 0;
"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token:'',
      qrcode_url:''
    }
  },
  created(){
    this.token=this.$route.query.token
       window.document.title='联系客服'
    this.$axios.get("/wechat/mobile/service?token="+this.token).then(res=>{
      console.log(res)
      this.qrcode_url=res.data.qrcode_url
    })
  },methods:{
    backto(){
      window.history.back()
    }
  }
};
</script>

<style>
body,html{
    height: 100%;
}
#serve{
    height: 100%;
        background: #2d3132;
}
.my_bg {
  background:#2d3132;
  width: 100%;
  position: relative;
  z-index: 30;
}
#serve .neifixed{
  position: fixed;
  width: 90%;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}
.my_bg .guide {
  color: white;
  margin: 0 auto 2rem;
  text-align: center;
}
.my_bg .two_code {
  width: 90%;
  margin: 0 auto;

}
.my_bg .two_code > img {
  width: 100%;
}
</style>
