<template>
  <div id="products" v-cloak>
    <!-- 轮播图 -->
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item>
        <div class="swiper_img">
          <div
            class="swiper_contant"
            :style="{backgroundImage: 'url(' + item.goods_thumbnail_url + ')',}"
          ></div>
        </div>
      </van-swipe-item>
      <van-swipe-item v-for="(p,i) of strings" :key="i">
        <div class="swiper_img">
          <div class="swiper_contant" :style="{backgroundImage: 'url(' + p + ')',}">
            <!-- <img :src="p"> -->
          </div>
        </div>
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{img_length+1}}</div>
    </van-swipe>
    <!--商品详情  -->
    <div class="products_title">
      <p class="content" style="margin-bottom:2vw">
        <span class="disCount" >￥{{parseFloat(item.goods_price).toFixed(2)}}</span>
        <span class="disCount">
          <span
            class="bonus"
            v-if="item.coupon_amount!=0"
            style="font-size:4vw;padding:0 2vw"
          >优惠{{item.coupon_amount|number}}元</span>
        </span>
      </p>
      <p class="title" style="margin-bottom:4px">
        <span class="tobao_icon">
          <img v-if="$route.query.platform==1" src="../../assets/pingduoduo.svg" />
          <img v-else-if="$route.query.platform==0"  src="../../assets/taobao.svg" />
        </span>
        <span style="vertical-align: middle;">{{item.goods_name}}</span>
      </p>
      <p class="content my_content">
        <span class="bonus" v-if="reward">返现￥{{parseFloat(reward).toFixed(2)}}</span>
        <span class="bonus" v-else>返现￥0</span>
        <span class="delprice" v-if="item.min_group_price">原价￥{{item.min_group_price}}</span>
        <span class="sold">销售{{item.sold_quantity|quantity}}件</span>
      </p>
    </div>
    <!-- 海报模态框 -->
    <van-popup
      v-model="show"
      :overlay="false"
      round
      position="bottom"
      :style="{ height: '11%',background:'#eee' }"
    >
      <div
        style="height:100%;width:100%;display:flex;align-items:flex-end;flex-direction: column;justify-content:flex-end;"
      >
      10*/0.3*0.5
        <div class="bottom_font" style="color:black;">长按图片发送给朋友，或保存到手机</div>
        <div class="bottom_font" style="color:#FF6600;margin-bottom:3px">
          <span v-if="item.coupon_amount==0||item.coupon_amount==null">好友领券购买</span>
          <span v-else>好友领券立减{{item.coupon_amount|number}}元</span>
          ，{{(parseFloat(reward)*5/3).toFixed(2)}}元返现归您哦！
        </div>
      </div>
      <!-- <div style="background:white;width:100%;height:40%;display:flex;align-items:center;justify-content:center;" @click="closeqrcore">取消</div> -->
    </van-popup>
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      cancelButtonText="关闭"
      :showCancelButton="true"
      cancelButtonColor="#ff9527"
      id="haibao"
      style="width:80%;box-shadow:0px 0px 7px -2px rgba(0,0,0,.7);bottom:9%;transform: translate3d(-50%,0,0);top:auto"
      closeOnClickOverlay
    >
      <div style="bakcground:red;width:100%;box-sizing: border-box;">
        <div id="poster">
          <div class="swiper_img">
            <div class="model_theme">
              <img style="width:100%;height:100%" :src="item.goods_thumbnail_url" />
            </div>
          </div>
          <div class="buju">
            <div style="width:56%;padding-left:5px;box-sizing: border-box;">
              <p
                class="title"
                style="text-align:left;margin:8px 0px 5px 0;font-size:3vw;max-height:15vw;overflow: hidden;line-height:5vw"
              >
                <span class="tobao_icon" style="width:4vw;height:4vw">
                  <img v-if="$route.query.platform==1" src="../../assets/pingduoduo.svg" />
                  <img v-else-if="$route.query.platform==0" src="../../assets/taobao.svg" />
                </span>
                <span style="vertical-align: middle;">{{item.goods_name}}</span>
              </p>
              <p style="margin:0;text-align:left">
                <span class="model_disCount">
                  <span style="font-size:3vw">券后￥</span>
                  <span style="font-weight:bold">{{parseFloat(item.goods_price).toFixed(2)}}</span>
                </span>
              </p>
              <p class="model_fee" style="margin:0;text-align:left">
                <span class="model_old" style="margin-right:4px">
                  <del>￥{{item.min_group_price}}</del>
                </span>
                <span class="model_quan" style="margin-right:4px" v-if="item.coupon_amount!=0">
                  <span class="model_font">券</span>
                  <span style="padding:0 3px;">{{item.coupon_amount|number}}元</span>
                </span>
                <span class="model_old">销售{{item.sold_quantity|quantity}}件</span>
              </p>
            </div>
            <div style="width:44%;">
              <div class="img-box">
                <div id="QRCodeNone" class="img_code" style="display:none"></div>
                <span class="img_code" id="img_code" style="font-size:3vw" v-if="bg_url">{{bg_url}}</span>
                <div class="img_code" id="qrcode" v-else></div>
              </div>
            </div>
          </div>
          <div style="background: #ffcfcf;color: #aa4847;padding:3px 0">
            <span class="koulin">
              <span>
                长按识别二维码,
                <span v-if="$route.query.platform==0">复制口伶,打开手机</span>
              </span>
              <img
                v-if="$route.query.platform==0"
                style="width:10px;height:10px;"
                src="../../assets/taobao.svg"
              />
              <span>领券购买</span>
              <div class="model_sanjiao"></div>
            </span>
          </div>
        </div>
      </div>
    </van-dialog>
    <!-- 隐藏淘口令 不显示 -->
    <div
      type="text"
      class="code"
      ref="copytext"
      style="text-align:center;opacity: 0;height:0"
      id="target"
    />
    <!-- 图文消息 -->
    <div style="width:100%;height:2vw;background: #f1f1f1;"></div>
    <van-tabs v-model="active1" sticky @click="onClick">
      <van-tab title="相似推荐" v-if="show_recommand" >
        <div  style="background:white">
          <div id="xiangsi" style="padding:2vw;"></div>
          <div v-show="needshow1" style="width:100%;padding:2vw;text-align:center">暂无推荐相关商品</div>
          <card1 v-show="!needshow1" :data="recomend_data" />
        </div>
      </van-tab>
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
    <!-- 底部tabar栏 -->
    <van-tabbar :border="false" style="z-index: 1000;height:50px">
      <div class="bar_card">
        <div class="backhome" v-show="$route.query.sourceOrder==7?false:true" @click="toHome">
          <van-icon size="20px" name="shop-o" />
          <span>首页</span>
        </div>
        <div class="icon_fengxiang" :class="{sxewidth:$route.query.sourceOrder==7}">
          <span class="myorange" v-show="$route.query.sourceOrder==7?false:true" @click="gettuiguan">
            <span class="icon_size">
              <img style="width:100%;height:100%" src="../../assets/fenxiang.svg" alt />
            </span>
            <span>推广</span>
          </span>
          <span
            class="myred copycode"
            :class="{sxewidth:$route.query.sourceOrder==7}"
            ref="copyBtn"
            @click="copyPolicyNo()"
            id="copycode"
            :data-clipboard-text="taokouling"
          >
            <span class="icon_size">
              <img style="width:100%;height:100%" src="../../assets/linquan.svg" />
            </span>
            <span>领券</span>
          </span>
        </div>
      </div>
    </van-tabbar>
    <div id="jia"></div>
    <!-- 浮动球 -->
    <div class="scroll_top" ref="scroll_top" @click="scroll_top">
      <van-icon size="#333" name="arrow-up" />
      <span style="font-size:14px;">顶部</span>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";//复制插件 
import { Toast } from "vant";
import card1 from "@/components/card/card1";
import $ from "jquery";
import html2canvas from "../../assets/js/html2canvas.min";//dom元素截图插件
export default {
  components: { card1 },
  data() {
    return {
      active1: 0,
      item: {},
      current: 0,
      goods_id: "",
      show: false,
      token: "",
      coupon_discount: 0,
      reward: 0,
      img_length: 0,
      strings: [],
      url: "",
      taokouling: null,
      show_sorce:true,
      top_ten:"",
      uniac_id: "",
      show_recommand: true,
      img_detail: [],
      recomend_data: [],
      needshow1: false,
      sourceOrder: null,
      bg_url: null,
      code_url: ""
    };
  },
  filters: {
    price: function(value) {
      return value.toString().substring(0, 4);
    },
    quantity: function(value) {
      if (value >= 10000) {
        value = Number(value / 10000).toFixed(1) + "万";
      }else if(value>=1000){
        value=Number(value/1000).toFixed(1)+"千"
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
    window.document.title="优惠商城"
    this.fuzhi();
    if (this.$route.query.show_recommand == 1) {
      //当外部访问时判断 决定显示或隐藏相似推荐
      this.show_recommand = false;
    }
    if (this.$route.query.sourceOrder == 7) {
      //当外部访问时判断 决定显示或隐藏相似推荐
      this.show_recommand = false;
    }
    if (this.$route.query.showqrcode) {
      this.gettuiguan();
    }
    
    this.gettext_img();
    this.getdetail();
    if(this.$route.query.goods_thumbnail_url){
      this.item.goods_thumbnail_url = this.$route.query.goods_thumbnail_url
    }
    if(this.$route.query.goods_price){
      this.item.goods_price = this.$route.query.goods_price
    }
    if(this.$route.query.min_group_price){
      this.item.min_group_price = this.$route.query.min_group_price
    }
    if(this.$route.query.title){
      this.item.goods_name = this.$route.query.goods_name
    }
    if(this.$route.query.coupon_amount){
      this.item.coupon_amount = this.$route.query.coupon_discount
    }
  },
  mounted() {
    this.clipboardVideo = new Clipboard(".copycode");
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
      if (this.$route.path == "/products") {
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
    toHome() {
      this.$router.push({
        name: "home",
        query: {
          token: this.token
        }
      });
    },
    qrcodesc() { //生成二维码
      this.$QRCodeSC(this.code_url);
    },
    share() {
      this.show = true;
      setTimeout(() => {
        this.qrcodesc();
        console.log(document.getElementById("qrcode"));
      }, 10);
      setTimeout(() => {
        this.canvas();
      }, 500);
    },
    canvas() { //生成推广海报
      var width = document.getElementById("poster").offsetWidth;
      var height = document.getElementById("poster").offsetHeight;
      var cloneDom = document.getElementById("poster").cloneNode(true);
      cloneDom.style.width = width + "px";
      cloneDom.style.height = height + "px";
      cloneDom.style.position = "absolute";
      cloneDom.style.top = "0px";
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
          "<img class='bg_img' src=" + base64ImgSrc + ">";
      });
    },
    fuzhi() {  //变量初始化操作
      window.scrollTo(0, 0);
      this.top_ten=this.$route.query.top_ten&&this.$route.query.top_ten
      this.goods_id = this.$route.query.goods_id;
      this.reward = this.$route.query.reward;
      this.coupon_discount = this.$route.query.coupon_discount;
      this.uniac_id = this.$route.query.uniac_id;
      this.token = this.$route.query.token;
      this.url = this.$route.query.url;
      this.platform = this.$route.query.platform;
      this.sourceOrder = this.$route.query.sourceOrder;
    },
    getrecomend(item) {  //相似推荐
      let data_rec = new FormData();
      data_rec.append("with_coupon", "1");

      data_rec.append("page", 1);
      data_rec.append("page_size", 50);
      data_rec.append("keyword", item.goods_name);
      this.$axios
        .post("pdd/cms/goods", data_rec, {
          headers: {
            "Access-Token": this.token
          }
        })
        .then(res => {
          this.recomend_data = res.data.data;
          if (this.recomend_data && this.recomend_data.length == 0) {
            this.needshow1 = true;
          }
        });
    },
    totop() {
      window.scrollTo(0, 0);
    },
    gettext_img() {  //获取淘宝商品图文详情
      if (this.$route.query.platform == 0) { //只有淘宝
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
      }
    },

    onChange(index) {
      this.current = index;
    },
    gettuiguan() {  //获取二维码跳转路径
      var data = {};
      this.goods_id *= 1;
      this.platform *= 1;
      data.platform = this.platform;
      data.goods_id = this.goods_id;
      data.token = this.token;
      data.pro_type = 4;
      if (this.code_url == "") {
        this.$axios
          .post("/api/goods/promo/generate", data, {
            headers: {
              "access-token": this.token
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.error == 0) {
              this.code_url = res.data.data.promo_url;
              this.share();
            } else {
              this.$toast("此产品暂无法推广，请尝试其他商品！");
            }
          });
      } else {
        this.share();
      }
    },
    getdetail() {  //获取商品价格等信息
      let data = {};
      data.goods_id = this.goods_id;
      if (this.$route.query.coupon_discount) {
        data.coupon_amount = this.coupon_discount;
      }
      if (this.$route.query.uniac_id) {
        data.uniac_id = this.uniac_id;
      }
     
      if (this.$route.query.platform == 1) {
        this.$axios
          .get("/pdd/cms/goods-particulars", {
            headers: {
              "Access-Token": this.token
            },
            params: data
          })
          .then(res => {
            if (res.data.error == 0) {
              if (res.data.data.error) {
                this.$toast("商品已经下架或过期");
                this.$router.back(-1);
              }
              this.item = res.data.data;
              if (this.$route.query.reward) {
                this.reward = this.$route.query.reward;
              } else {
                this.reward = this.item.reward;
              }
              this.item.coupon_amount = this.item.coupon_discount;

              this.img_detail = res.data.data.goods_gallery_urls
                ? res.data.data.goods_gallery_urls
                : "";
              this.img_length = this.strings.length;
              this.getrecomend(this.item);
            } else {
              this.$toast("商品已经下架或过期");
              this.$router.back(-1);
            }
          });
      } else if (this.$route.query.platform == 0) {
        this.$axios
          .get("pdd/cms/tbk-item", {
            headers: {
              "Access-Token": this.token
            },
            params: data
          })
          .then(res => {
            if (res.data.error == 0) {
              this.item = res.data.data[0];
              if (this.$route.query.reward) {
                this.reward = this.$route.query.reward;
              } else {
                this.reward = this.item.reward;
              }
              if (this.$route.query.goods_img) {
                this.item.goods_thumbnail_url = this.$route.query.goods_img;
              }
              this.strings = res.data.data[0].small_images
                ? res.data.data[0].small_images
                : "";
              this.img_length = this.strings.length;
              this.getrecomend(this.item);
            } else {
              if(this.$route.query.goods_price){
                 this.getrecomend(this.item);
              }else{
              this.$toast("商品已经下架或过期");
              }
              // this.$router.back(-1);
            }
          });
      }
    },
    // closeqrcore(){
    //   this.show=false
    // },
    scroll_top() {
      window.scrollTo(0, 0);
    },
    getcopydata(event) { //由于复制插件的特殊性 请求为同步 ——因此会造成网页等等请求后才渲染
      var data = {};
      if (this.$route.query.uniac_id) {
        data.uniac_id = this.uniac_id;
      }
      data.title = this.item.title||this.item.goods_name;
      data.goods_id = this.goods_id;
      // if (this.$route.query.url) {
      //   data.url = this.item.url;
      // } else {
      //   if (this.item.url) {
      //     data.url = this.item.url;
      //   }
      // }
      data.platform = this.$route.query.platform;
      data.logo = this.item.goods_thumbnail_url;
      if (this.$route.query.sourceOrder != undefined) {
        data.sourceOrder = this.$route.query.sourceOrder;
      }
      if(this.$route.query.top_ten != undefined){
         data.top_ten = this.$route.query.top_ten;
      }

      var _this = this;
      $.ajax({
        url: "pdd/cms/tbk-tpwd",
        type: "post",
        data: data,
        dataType: "json",
        async: false,
        success: function(res) {
          if (res.error == 0) {
            var target = _this.$refs.copytext;
            target.innerText = res.data.tpwd;
            _this.taokouling = res.data.tpwd;
          } else {
            _this.$toast(res.msg);
          }
        },
        error: function() {
          _this.$toast("生成淘口令失败,请重试！");
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Access-Token", _this.token);
        }
      });
    },
    copyPolicyNo() { //复制淘口令
      if (this.$route.query.platform == 1) { //若为拼多多 就跳转拼多多页面
        var data = {};
        if (this.$route.query.uniac_id) {
          data.uniac_id = this.$route.query.uniac_id;
        }
        if (this.$route.query.sourceOrder != undefined) {
          data.sourceOrder = this.$route.query.sourceOrder;
        }
    
        this.$axios
          .get(
            "/pdd/cms/goods-details?goods_id=" + this.$route.query.goods_id,
            {
              headers: {
                "access-token": this.token
              },
              params: data
            }
          )
          .then(res => {
            if (res.data.data) {
              window.location.href = res.data.data[0].url;
            } else {
              this.$toast(res.data.data.msg);
            }
          });
      } else if (this.$route.query.platform == 0){ //若为淘宝 使用复制插件
        if (this.clipboard) {
          this.clipboard.destroy();
        }
        this.clipboard = new Clipboard(".copycode", {
          text: c => {
            if (!this.taokouling) {
              var res = this.getcopydata();
            }
            return this.taokouling;
          }
        });
        this.clipboard.on("success", e => {
          Toast.clear();
          this.$toast("已复制口伶->打开淘APP领券");
          e.clearSelection();
        });
        this.clipboard.on("error", e => {
          alert("复制口令失败,请重试！");
        });
      }
    }
  },

  destroyed() { //在销毁页面阶段需要同时销毁创建的复制实力
    if (this.clipboardVideo) {
      this.clipboardVideo.destroy();
    }
  },
  watch: {
    $route: {//深度监听路由若发生变化，再次请求接口
      handler: function(val, oldVal) {
        window.scrollTo(0, 0);
        this.fuzhi();
        this.getdetail();
      },
      // 深度观察监听
      deep: true
    }
   
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
  width: 90%;
  z-index: 100;
  margin: 0 auto;
  background: white;
}
#products {
  padding: 0;
  margin: 0;
  height: 100%;
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
#products .mytop {
  top: 38%;
}
#products .mytop1 {
  top: 43%;
}
#products .mytop2 {
  top: 45%;
}
#products .mytop3 {
  top: 48%;
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
  background: white;
  transform: translate(-50%, -50%);
  width: 90%;
  border: 1px solid #ae0000;
}
#products .img_code img {
  height: 90%;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  width: 80%;
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
#products .myred:hover {
  cursor: pointer;
}
#products .myred {
  background: #f52724;
  display: flex;
  font-size: 4.5vw;
  background: linear-gradient(90deg, #ff6666, #fd2e2f);
  color: white;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60%;
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
  height: 100%;
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
#products  .sxewidth{
  width: 100%
}
</style>



