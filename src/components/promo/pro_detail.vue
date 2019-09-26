<template>
  <div id="products" v-cloak>
    <!-- 轮播图 -->
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item>
        <div class="swiper_img">
          <div
            class="swiper_contant"
            :style="{backgroundImage: 'url(' + item.goods_thumbnail_url + ')',}"
          >
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item v-for="(p,i) of strings" :key="i">
        <div class="swiper_img">
          <div class="swiper_contant" :style="{backgroundImage: 'url(' + p + ')',}">
          </div>
        </div>
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{img_length+1}}</div>
    </van-swipe>
      <!-- 商品信息 -->
    <div class="products_title">
      <p class="content" style="margin-bottom:2vw">
        <span class="disCount">券后{{parseFloat(item.goods_price).toFixed(2)}}元</span>
      </p>
      <p class="title" style="margin-bottom:4px">
        <span class="tobao_icon">
          <img v-if="platform==1" src="../../assets/pingduoduo.svg" />
          <img v-else-if="platform==0" src="../../assets/taobao.svg" />
        </span>
        <span style="vertical-align: middle;">{{item.title}}</span>
      </p>
      <p class="content my_content">
        <span class="bonus">优惠券{{item.coupon_amount|number}}元</span>
        <span class="delprice" v-if="item.min_group_price">原价￥{{item.min_group_price}}</span>
        <span class="sold">销售{{item.sold_quantity|quantity}}件</span>
      </p>
    </div>
    <!--隐藏的淘口令  -->
    <div 
      type="text"
      class="code"
      style="text-align:center;opacity: 0;height:0"
      id="foo"
    ></div>
    <!-- 图文消息 -->
    <div style="width:100%;height:2vw;background: #f1f1f1;"></div>
    <van-tabs   @click="onClick">
      <van-tab title="图文详情">
        <div style="background:white">
          <div class="media_info_imgs"></div>
          <div class="detail">
            <ul id="huan">
              <li v-for="(p,j) in img_detail" :key="j">
                <img :src="p" />
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div style="height:48px;width:100%;"></div>
    <!-- 底部tabar -->
    <van-tabbar :border="false" style="z-index: 1000;height:50px">
      <div class="bar_card">
        <div class="icon_fengxiang" style="width:100%">
          <span
            class="yfenx copycode"
            ref="copyBtn"
            @click="copyPolicyNo()"
             data-clipboard-action="copy"
            id="copycode"
           data-clipboard-target="#foo"
          >
            <span class="icon_size">
              <img style="width:100%;height:100%" src="../../assets/linquan.svg" />
            </span>
            <span>领券</span>
          </span>
        </div>
      </div>
    </van-tabbar>
    <!-- 悬浮球 -->
    <div class="scroll_top" ref="scroll_top" @click="scroll_top">
      <van-icon size="#333" name="arrow-up" />
      <span style="font-size:14px;">顶部</span>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Toast } from "vant";
import card1 from "@/components/card/card1";
import $ from "jquery";
// const jsonp = require('jsonp');

export default {
  components: { card1},
  data() {
    return {
      item: {},
      current: 0,
      img_length: 0,
      promo_id:null,
      strings: [],
      url: "",
      taokouling: null,
      platform:0,
      img_detail: [],
      sourceOrder: null,
    }
  },
  filters: {
    price: function(value) {
      return value.toString().substring(0, 4);
    },
    quantity: function(value) {
      if (value >= 10000) {
        value = Number(value / 10000).toFixed(1) + "万";
      }
      return value;
    },
    number: function(value) {
      if (value == null) {
        value = 0;
      }
      return value;
    }
  },
  created() {
    this.fuzhi();
    this.getdetail();
  },
  mounted() {
    //监听滚轮
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
      if (this.$route.path == "/promo") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          this.$refs.scroll_top.style.bottom = "10%";
          this.$refs.scroll_top.style.opacity = "1";
          this.$refs.scroll_top.style.zIndex = "5";

          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        } else {
          this.$refs.scroll_top.style.bottom = "0";
          this.$refs.scroll_top.style.opacity = "0";
          this.$refs.scroll_top.style.zIndex = "-1";
        }
      }
    };
  },
  methods: {
    onClick(index, title) {
      if (title == "图文消息") {
        this.gettext_img();
      }
    },
    fuzhi() {
      window.scrollTo(0, 0)
      this.promo_id=this.$route.query.promo_id
    },
   
    totop() {
      window.scrollTo(0, 0);
    },
    gettext_img(item) {
        this.$jsonp(
          "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0",
          {
            id: this.goods_id
          }
        ).then(res => {
          if (res.data.pcDescContent.length != 0) {
            let $li = document.getElementById("huan");
            var str = res.data.pcDescContent.split("src").slice(1);
            for (var p of str) {
              if (p.split(`"`)[1].indexOf("//") != -1) {
                if (p.split(`"`)[1].indexOf("gif") == -1) {
                  this.img_detail.push(p.split(`"`)[1]);
                }
              }
            }
          }
        });
    },

    onChange(index) {
      this.current = index;
    },
    getdetail() {
     this.$axios.get("api/goods/promo/detail?id="+this.promo_id).then(res=>{
        this.item=res.data.data
        this.platform=res.data.data.platform
        this.strings=res.data.data.small_images||[]
        this.item.coupon_amount=res.data.data.coupon_amount||res.data.data.coupon_discount
        this.item.title=res.data.data.title||res.data.data.goods_name
        this.goods_id=res.data.data.id||res.data.data.goods_id
        if(this.item.platform==0){
          document.getElementById("foo").innerText=res.data.data.tb_code
          this.gettext_img(this.item)
        }else{
          this.img_detail=this.item.goods_gallery_urls
        }
      })

    },
    scroll_top() {
      window.scrollTo(0, 0);
    },
    copyPolicyNo() {

      if (this.platform == 1) {
       window.location.href=this.item.redirect_url
      } else if(this.platform == 0) {
        if (this.clipboardVideo) {
          this.clipboardVideo.destroy();
        }
      this.clipboardVideo = new Clipboard(".copycode");
        this.clipboardVideo.on("success", e => {
          console.log("成功")
          Toast.clear()
          this.$toast("已复制口伶->打开淘APP领券");
          e.clearSelection();
        });
        this.clipboardVideo.on("error", e => {
          alert("复制口令失败,请重试！");
        });
     
      }
    }
  },
 
  destroyed() {
    if (this.clipboardVideo) {
      this.clipboardVideo.destroy();
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        window.scrollTo(0, 0);
        this.fuzhi();
        this.getdetail();
      },
      deep: true
    },

  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
html,
body {
  height: 100%;
}
#target {
  opacity: 1;
  z-index: -10;
}
#products .bannerlist {
  padding: 0;
}
#products .share {
  display: flex;
  align-items: center;
  padding: 0 2vw;
  border-radius: 10px 0 0 10px;
  background: #eee;
  color: #999;
  flex-direction: row;
  position: fixed;
  right: 0;
  top: 48%;
}
#products .mycolor {
  color: white;
  border-radius: 4px 4px 0 0;
  padding: 2vw 0;
  background: #f52724;
  background: linear-gradient(90deg, #fea358, #f81f11);
}

#products .bg_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  width: 100%;
  height: 100%;
}
#products .modaltip {
  font-size: 12px;
  padding: 2vw 0;
  background: rgb(250, 250, 231);
}
#products .desc_anchor {
  display: none;
}
#huan p {
  margin: 0;
}
/* #products .hongbao{
  padding: 0;
  width: 60px;
  color: #333;
  position: fixed;
  right: 0%;
  z-index: 1000;
  top:110vw;
   transition-duration: 0.5s;
  height: 60px;
} */
/* #products .hongbao img{
  width: 100%;
  height: 100%;
} */

#products .scroll_top {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 50%;
  opacity: 1;
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
}
#products .lingwai {
  display: flex;
  justify-content: center;
  align-items: center;
}
#products .pateBtn {
  color: white;
  width: 50%;
  padding: 2vw 5vw;
  border-radius: 20px;
  margin: 0 auto;
  background: linear-gradient(90deg, #ff8154, #fc3e58);
}
#products .code {
  margin: 0;
  font-size: 14px;
  text-align: left;
}
#products .tb_icon {
  vertical-align: baseline;
}
#products .modal_title {
  font-size: 14px;
  padding: 2vw 5vw;
}
#products .modal_fix {
  /* position: fixed; */
  width: 90%;
  /* top: 50%; */
  z-index: 100;
  margin: 0 auto;
  /* left: 50%; */
  background: white;
  /* transform: translate(-50%, -50%); */
}
#products {
  padding: 0;
  margin: 0;
  /* background: #f7f7f7; */
  height: 100%;
  /* display: flex;
  flex-direction: column; */
}
#products .tobao_icon {
  display: inline-block;
  vertical-align: middle;
  font-size: 3vw;
  width: 20px;
  height: 20px;
}
#products .tobao_icon img {
  width: 100%;
  height: 100%;
}
#products .info_title {
  border-left: 3px solid #fe4169;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 3px 6px;
  text-align: left;
  margin-bottom: 3px;
}
#products .nei_fixd {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#products .my_content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
#products .swiper_img {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
}
#products .model_content {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
#products .model_theme {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
#products .swiper_img .swiper_contant {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
#products .custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
#products .mytop{
  top: 47%
}
#products .mytop1{
  top: 50%
}
#products .mytop2{
  top: 50%
}
#products .mytop3{
  top: 55%
}
#products .swiper_img .swiper_contant img {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#products .model_content img {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#products .img-box {
  width: 90%;
  height: 0;
  padding-bottom: 90%;
  position: relative;
  background: linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) left bottom,
    linear-gradient(#ae0000, #ae0000) left bottom;
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
  margin: 8px auto;
}
#products .img_code {
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  border: 1px solid #ae0000;
}
#products .img_code img{
  height: 90%;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
#products .products_title {
  padding: 12px 12px;
  background: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
#products .products_title p {
  margin: 0;
}
#products .model_fee {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#products .products_title .title {
  text-align: left;
  font-size: 4.5vw;
  margin-bottom: 3vw;
}
#products .products_title .content {
  text-align: left;
  font-size: 3.5vw;
  display: flex;
  justify-content: space-between;
}
#products .products_title .content .disCount {
  color: #f52724;
  font-size: 5vw;
}
#products .model_disCount {
  color: #f52724;
  font-size: 4vw;
}
#products .model_old {
  color: #999;
  font-size: 3vw;
  -webkit-text-size-adjust: none;
  font-size: 10px;
  margin: 0;
}
#products .model_quan {
  border: 0.3px solid #f52724;
  color: #f52724;
  -webkit-text-size-adjust: none;
  font-size: 9px;
  box-sizing: border-box;
}
#products .model_font {
  background: #f52724;
  color: white;
  padding: 0 2px;
  -webkit-text-size-adjust: none;
  font-size: 9px;
  box-sizing: border-box;
  display: inline-block;
}
#products .products_title .content .delprice {
  color: #c7c4c4;
}
#products .koulin {
  -webkit-text-size-adjust: none;
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
#products .products_title .content .sold {
  color: #999;
  margin-left: 2vw;
}
#products .products_title .content .bonus {
  color: #f52724;
  background: #fff2f2;
  text-align: center;
  border-radius: 1vw;
  display: inline-block;
  font-size: 3.5vw;
}
#products .tb_quan {
  padding: 3.5vw;
  background-color: white;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
}
#products .tb_bg_quan {
  padding: 3.5vw;
  background-color: white;
}
#products .nei_quan {
  width: 93vw;
  height: 20vw;
}
#products .quan {
  width: 93vw;
  height: 20vw;
  background: url(../../assets/quan.png) no-repeat;
  background-size: 100%;
  display: flex; 
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}
#products .media_info_imgs {
  padding: 2vw 0;
}
#products .bg_img {
  width: 100%;
}
#products .buju {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background: white;
  justify-content: space-between;
}
#products #poster {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
#products #poster > img {
  width: 100%;
}
#products .backhome {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
}
#products .footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 13vw;
  background: #fff;
  border-top: 1px solid #f3f3f3;
  z-index: 999;
  display: flex;
}
#products .model_sanjiao {
  border: 9px solid transparent;
  border-bottom: 9px solid #ffcfcf;
  position: absolute;
  top: 0;
  transform: translate(50%, -100%);
  right: 22%;
}
#products .footer2 {
  width: 100vw;
  height: 13vw;
  background: #fff;
  border-top: 1px solid #f3f3f3;
  z-index: 999;
  display: flex;
}
#products .footer_bg {
  height: 13vw;
  width: 100%;
}
#products .footer .go,
#products .footer2 .go {
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-90deg, #f52724, #ff6147);
  background-size: 100%;
  font-size: 5vw;
}
#products .img_text {
  width: 100%;
  padding: 4vw 0;
}
#products .quan_money {
  padding-left: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f52724;
  width: 66%;
}
#products .quan_money span {
  font-size: 9vw;
}

#products .icon_fengxiang {
  width: 100%;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#products .icon_size {
  width: 5vw;
  vertical-align: baseline;
  height: 5vw;
  margin-right: 4px;
}
#products .get_quan {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  font-size: 5vw;
  height: 100%;
}
#products .quan_tip {
  font-size: 3vw;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* width: 35% */
}
#products .quan_tip p {
  margin: 0;
}
#products .yfenx:hover{
  cursor: pointer;
}
#products .yfenx {
  background: #f52724;
  display: flex;
  font-size: 4.5vw;
  background: linear-gradient(90deg, #ff6666, #fd2e2f);
  color: white;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
#products .detail {
  display: flex;
  width: 100%;
}
#products .detail ul {
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
}
#products .detail ul li img {
  width: 100%;
}

#products .time {
  display: flex;
  flex-direction: row;
  padding-right: 2vw;
  flex-wrap: wrap;
  line-height: 22px;
  color: gray;
  font-size: 4vw;
}
#products .detail ul li {
  width: 100%;
}
#products .bar_card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
#products .myorange {
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, #ff9527, #ff6600);
  align-items: center;
  font-size: 4.5vw;
  height: 100%;
  width: 40%;
}
#products .bottom_font {
  color: #999;
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin-bottom: 2px;
}
</style>



