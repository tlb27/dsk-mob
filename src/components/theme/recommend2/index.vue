<template>
  <div id="recommend" v-cloak>
    <div class="header_top">
      <div class="title_start">
        <div class="title_img">
          <img :src="card_data.theme_img">
        </div>
      </div>
      <!-- <div class="tuiguang_btn" v-if="$route.query.show_promo==1"  @click="toshare">
        <img class="share_icon" src="../../../assets/fenxiang.svg">推广
      </div> -->
    </div>
  
    <rcard :card_data="card_data" :uniac_id="uniac_id" ></rcard>
    <div style="width:1px;height:1px"></div>
     <div v-show="$route.query.theme_id" class="scroll_top" v-cloak ref="scroll_top" @click="scroll_top">
      <van-icon size="#333" name="arrow-up"/>
      <span style="font-size:14px;">顶部</span>
    </div>
  </div>
</template>

<script>
import rcard from "./components/recommend";
export default {
  components: { rcard },
  data() {
    return {
      card_data: [],
      page: 1,
      page_size: 10,
       uniac_id:"",
       theme_id:"",
       token:""
    };
  },
  created() {
    this.uniac_id=this.$route.query.uniac_id?this.$route.query.uniac_id:this.$route.query.unaic_id
    this.theme_id=this.$route.query.theme_id
    this.token=this.$route.query.token
    var data={}
      if(this.$route.query.uniac_id||this.$route.query.unaic_id){
      data.uniac_id=this.$route.query.uniac_id?this.$route.query.uniac_id:this.$route.query.unaic_id
    }
    if(this.$route.query.banner_id){
      data.banner_id=this.$route.query.banner_id
    }
    if(this.$route.query.theme_id){
      data.theme_id=this.$route.query.theme_id
    }
    if(this.$route.query.token){
      data.token=this.$route.query.token
    }
    console.log(data)
    if(this.$route.query.defined){//商城轮播跳转到主题
      this.$axios.get("/pdd/pdd/selection?defined="+1,{
          headers: {
          },
          params: data
        }).then(res=>{
          this.card_data=res.data.data
      })
    }else{
      this.$axios.get("/pdd/pdd/selection?",{//外部推广
          headers: {
          },
          params: data
        }).then(res=>{
          this.card_data=res.data.data
      })
    }
       
    
    window.onscroll = () => {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (this.$route.path == "/recommend") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          this.$refs.scroll_top.style.bottom = "9%";
          this.$refs.scroll_top.style.opacity = "1";
          this.$refs.scroll_top.style.zIndex = "5";
          this.$refs.scroll_top.style.right = "2%";
          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        } else {
          this.$refs.scroll_top.style.bottom = "0";
          this.$refs.scroll_top.style.opacity = "0";
          this.$refs.scroll_top.style.zIndex = "-1";
          this.$refs.scroll_top.style.right = "2%";
        }
      }
    };
  },
  methods:{
    scroll_top() {
      window.scrollTo(0, 0);
    },
    toshare(){
      window.location.href="https://wechat.morejoying.com/wechat/theme/pdd-theme-promo?theme_type="+this.$route.query.theme_type+"&theme_id="+this.theme_id+"&uniac_id="+this.uniac_id
    }
  }
};
</script>

<style  scoped>
#recommend {
  background: #eee;
}
[v-cloak]{
  display: none
}

.title_img {
  width: 100%;
  padding-bottom: 40%;
  height: 0;
  position: relative;
}

.title_img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.time_author {
  display: flex;
  justify-content: flex-start;
}
.header_title {
  margin-bottom: 3vw;
  text-align: left;
  font-size: 5vw;
  font-weight: bold;
}
.daynow {
  color: rgb(0, 82, 140);
}
.author {
  color: #999999;
  margin-left: 4vw;
}
.title_start {
  text-align: left;
  width: 100%;
}
.scroll_top {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 50%;
  z-index: -1;
  border: 1px solid #d1d1d1;
  background: rgba(255, 255, 255, 0.7);
  width: 35px;
  color: #333;
  position: fixed;
  right: 8%;
  transition-duration: 0.5s;
  opacity: 0;
  bottom: 0;
  height: 35px;
  text-align: center;
}
.header_top{
  position: relative;
}
.tuiguang_btn{
  padding: 5px 12px;
  border-radius: 5px;
  color: white;
  text-align: center;
  background: gradient(linear, left top, left bottom, from(orange), to(rgb(255, 117, 4)));
  background: -webkit-gradient(linear, left top, left bottom, from(orange), to(rgb(255, 117, 4)));
  position: absolute;
  -webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
  right:2%;
  bottom: 3%;
  display: flex;
  align-items: center;
}
.share_icon{
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
</style>

