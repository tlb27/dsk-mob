<template>
  <div id="home">
    <myHeader
      text="搜索商品"
      :opt_id="opt_id"
      :token="token"
      :userInfo="userInfo"
      @listentochild="makeplat"
    />
    <div class="wrap">
      <van-tabs
        v-model="active1"
        animated
        :swipeable="true"
        title-active-color="#e02e24"
        :line-width="30"
        @change="getcontent"
      >
        <van-tab v-for="(item,index) in title" :key="index" :title="item.opt_name">
          <van-swipe
            class="banner"
            indicator-color="#e02e24"
            v-if="dis"
            :touchable="true"
            :autoplay="3000"
          >
            <van-swipe-item class="banner_he" v-for=" (item,j) in banner" :key="j">
              <img style="width:100%;height:100%" :src="item.image_url" @click="jump(item)">
            </van-swipe-item>
          </van-swipe>
          <div class="grid" v-if="dis">
            <ul>
              <li v-for="(item,c) of icon_list" :key="c">
                <a @click="toicon(item,c)">
                  <span class="recommed">
                    <img :src="item.img">
                  </span>
                  <span>{{item.title}}</span>
                </a>
              </li>
            </ul>
          </div>
          <taobao :showTaobao.sync="showTaobao" v-if="showTaobao&&index===0"></taobao>
          <div class="bg_card">
            <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <card1 :data="card_list"/>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  
     <div class="scroll_top" ref="scroll_top" @click="scroll_top">
        <van-icon size="#333" name="arrow-up"/>
        <span style="font-size:14px;">顶部</span>
      </div>
        <div class="scroll_top" style="display:flex;justify-content: center;" ref="scroll_top2" @click="order">
        <span style="font-size:14px;">我的</span>
      </div>
    <mytoast v-show="mytoast"></mytoast>
    <div class="bg_modal" style="z-index:1001" v-show="loadingshow"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import myHeader from "@/components/header/header";
import mytoast from "@/components/toast"
import card1 from "@/components/card/card1";
import taobao from "./taobao_auth";
import { Toast, PullRefresh } from "vant";

export default {
  components: { myHeader, card1, taobao,mytoast },
  name: "home",
  data() {
    return {
      includedComponents: "home",
      active: 0,
      active1: 0,
      active2: 0,
      isLoading: false,
      loading: false,
      finished: false,
      showTaobao: false,
      loadingshow:false,
      mytoast:false,
      list: [],
      card_list: [],
      save_card_list: [],
      banner: [],
      dis: true,
      title: [],
      page: 1,
      keyword: "",
      total_count: 0,
      opt_id: "",
      opt_name: "",
      page_size: 10,
      token: "",
      platform: "全部",
      arr: ["精选"],
      userInfo: {},
      icon_list:[],
    };
  },
  created() {
    if (this.$route.name == "home") {
      this.active = 0; 
    }
    this.token = this.$route.query.token;
    this.$axios
      .get("/pdd/cms/tb-setting", {
        headers: {
          "access-token": this.token
        }
      })
      .then(res => {
        this.userInfo = res.data.data;
      });
    // 标签类
    let queryParams = new FormData();
    queryParams.append("parent_opt_id", "0");
    this.$axios
      .post("/pdd/cms/goods", queryParams, {
        headers: {
          "access-token": this.token,
          "Content-Type": "application/x-www-form-urlencoded"
        } //设置header信息
      })
      .then(res => {
        this.title = res.data.data;
        this.title.unshift({ opt_name: "清仓", opt_id: -11 });
        this.title.unshift({ opt_name: "精选" });
      });
      // icon
      this.$axios.get("/pdd/cms/icon-list", {
        headers: {
          "access-token": this.token
        }
      }).then(res=>{
        this.icon_list=res.data.data
      })
    //检测是不是自定义主题id
    this.check()

    // 首页加载
    let queryParams2 = new FormData();
    queryParams2.append("page_size", this.page_size);
    queryParams2.append("page", this.page);
    this.$axios
      .post("/pdd/cms/goods", queryParams2, {
        headers: {
          "access-token": this.token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        this.card_list = res.data.data;
        this.total_count = Math.ceil(res.data.total_count / this.page_size);
      });
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
      if (this.$route.path == "/home") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          this.$refs.scroll_top2.style.bottom = "3%";
          this.$refs.scroll_top2.style.opacity = "1";
          this.$refs.scroll_top2.style.zIndex = "5";

          this.$refs.scroll_top.style.bottom="13%"
          this.$refs.scroll_top.style.opacity = "1";
          this.$refs.scroll_top.style.zIndex = "5";


          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        } else {
          this.$refs.scroll_top2.style.bottom = "-10%";
          this.$refs.scroll_top2.style.opacity = "0";
          this.$refs.scroll_top2.style.zIndex = "-1";
           this.$refs.scroll_top.style.bottom="-10%"
          this.$refs.scroll_top.style.opacity = "0";
          this.$refs.scroll_top.style.zIndex = "-1";
        }
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    let position = window.scrollY;
    window.sessionStorage.setItem("scrollweizhi", position); //离开路由时把位置存起来
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let position = window.sessionStorage.getItem("scrollweizhi");
      window.scroll(0, position);
      window.document.title = "优惠商城";
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
      if (vm.$route.path == "/home") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          vm.$refs.scroll_top2.style.bottom = "3%";
          vm.$refs.scroll_top2.style.opacity = "1";
          vm.$refs.scroll_top2.style.zIndex = "5";

          vm.$refs.scroll_top.style.bottom="13%"
          vm.$refs.scroll_top.style.opacity = "1";
          vm.$refs.scroll_top.style.zIndex = "5";


          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        } else {
          vm.$refs.scroll_top2.style.bottom = "-10%";
          vm.$refs.scroll_top2.style.opacity = "0";
          vm.$refs.scroll_top2.style.zIndex = "-1";
           vm.$refs.scroll_top.style.bottom="-10%"
          vm.$refs.scroll_top.style.opacity = "0";
          vm.$refs.scroll_top.style.zIndex = "-1";
        }
      }
    }
      // 为div元素重新设置保存的scrollTop值
    });
  },
  methods: {
    topersonal(){
      this.$router.push({
        name:"personal"
      })
    },
    //检查主题
    check(){
      this.$axios
      .get("pdd/cms/check-theme", {
        headers: {
          "access-token": this.token
        }
      })
      .then(res => {
        this.lunbo(res.data);
      });
    },
    lunbo(res) {
      // 轮播

      //  queryParams1.append("platform ", this.platform);
      this.$axios
        .post("/pdd/cms/goods-theme", res, {
          headers: {
            "access-token": this.token
          }
        })
        .then(res => {
          this.banner = res.data.data;
        });
    },
    onLoad() {
      var i = this.page + 1;
      // 异步更新数据
      // if (i <= this.total_count) {
      let queryParams3 = new FormData();
      queryParams3.append("page_size", this.page_size);
      queryParams3.append("page", i);
      if (this.opt_name != "精选") {
        queryParams3.append("opt_id", this.opt_id);
      }
      if (this.platform == 0 || this.platform == 1) {
        queryParams3.append("platform", this.platform);
      }
      this.$axios
        .post("/pdd/cms/goods", queryParams3, {
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          if (res.data.data != null) {
            this.card_list = this.card_list.concat(res.data.data);
            this.page++;
            this.loading = false;
            if(res.data.data.length<this,page_size){
              this.finished=true
            }
          } else {
            this.loading = false;
            this.finished = true;
          }
        });

        
    },

    getcontent(index, title) {
      window.scrollTo(0, 0);
      if (index != 0) {
          this.dis = false;
      }else{
        this.dis=true
      }
      if (this.save_card_list.length == 0) {
        this.save_card_list.push({
          title: this.title[this.active2].opt_name,
          card_list: this.card_list,
          platform: this.platform,
          total_count: this.total_count
        });

        this.finished = false;
       
         this.mytoast=true
         this.loadingshow=true
        this.card_list = [];
        this.opt_id = this.title[index].opt_id;
        this.opt_name = this.title[index].opt_name;
        this.page = 1;
        if (index == 0) {
          this.dis = true;
        } else {
          this.dis = false;
        }
        let queryParams2 = new FormData();
        if (title != "精选") {
          queryParams2.append("opt_id", this.title[index].opt_id);
        }
        queryParams2.append("page_size", this.page_size);
        queryParams2.append("page", this.page);
        if (this.platform == 0 || this.platform == 1) {
          queryParams2.append("platform", this.platform);
        }
        this.$axios
          .post("/pdd/cms/goods", queryParams2, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            this.card_list = res.data.data;
            this.total_count = Math.ceil(res.data.total_count / this.page_size);
            // toast.clear();
        
            this.mytoast=false
            this.loadingshow=false
          });
      } else {
        // console.log("有缓存，开始判断");
        if (this.arr.indexOf(this.title[this.active2].opt_name) == -1) {
          //找不到
          this.arr.push(this.title[this.active2].opt_name);
          this.save_card_list.push({
            title: this.title[this.active2].opt_name,
            card_list: this.card_list,
            platform: this.platform,
            total_count: this.total_count
          });
        } else {
          var idx = this.arr.indexOf(this.title[this.active2].opt_name);
          this.save_card_list[idx].card_list = this.card_list;
          this.save_card_list[idx].platform = this.platform;
          this.total_count = this.save_card_list[idx].total_count;
        }
        if (this.arr.indexOf(this.title[index].opt_name) != -1) {
          //找的到,读取内存

          var idx = this.arr.indexOf(this.title[index].opt_name);
          if (this.title[index].opt_name != "精选") {
            this.opt_id = this.title[index].opt_id;
          } else {
            this.opt_id = "";
          }
          if (this.platform == this.save_card_list[idx].platform) {
            this.card_list = this.save_card_list[idx].card_list;
            this.total_count = this.save_card_list[idx].total_count;
          } else {
            this.finished = false;
        //    var toast = Toast({
        //   message: '自定义图标',
        //    icon: 'https://img.yzcdn.cn/vant/logo.png'
        // });
            //  toast.clear()
            
            this.mytoast=true
            this.loadingshow=true
            this.card_list = [];
            this.opt_id = this.title[index].opt_id;
            this.opt_name = this.title[index].opt_name;
            this.page = 1;

            let queryParams2 = new FormData();
            if (title != "精选") {
              queryParams2.append("opt_id", this.title[index].opt_id);
            }
            queryParams2.append("page_size", this.page_size);
            queryParams2.append("page", this.page);
            if (this.platform == 0 || this.platform == 1) {
              queryParams2.append("platform", this.platform);
            }
            this.$axios
              .post("/pdd/cms/goods", queryParams2, {
                headers: {
                  "access-token": this.token,
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              .then(res => {
                this.card_list = res.data.data;
                this.total_count = Math.ceil(
                  res.data.total_count / this.page_size
                );
                // toast.clear();
                this.mytoast=false
                this.loadingshow=false
              });
          }
        } else {
          //找不到
          this.finished = false;
          
          this.mytoast=true
          this.loadingshow=true
          this.card_list = [];
          this.opt_id = this.title[index].opt_id;

          this.opt_name = this.title[index].opt_name;
          this.page = 1;

          let queryParams2 = new FormData();
          if (title != "精选") {
            queryParams2.append("opt_id", this.title[index].opt_id);
          }
          queryParams2.append("page_size", this.page_size);
          queryParams2.append("page", this.page);
          if (this.platform == 0 || this.platform == 1) {
            queryParams2.append("platform", this.platform);
          }
          this.$axios
            .post("/pdd/cms/goods", queryParams2, {
              headers: {
                "access-token": this.token,
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(res => {
              this.card_list = res.data.data;
              this.total_count = Math.ceil(
                res.data.total_count / this.page_size
              );
              this.mytoast=false
              this.loadingshow=false
            });
        }
      }
      this.active2 = this.active1;
    },

    makeplat(data) {
      console.log(data)
      if (data.platform == 0 || data.platform == 1) {
            this.platform = data.platform;
        }
      if(data.data){
        this.card_list = data.data;
      }
        this.dis = data.dis;
        this.myloading=data.myloading
        if(this.myloading){
             this.mytoast=true
            this.loadingshow=true
        }else{
          this.mytoast=false
            this.loadingshow=false
        }
      this.finished = false;
      this.page = 1;
    },
    jump(item) {
      if (item.banner_discern == 1) {
        if(item.goods_id!=null){
           var data={
              token:this.$route.query.token,
              banner_id:item.banner_id,
               defined:item.defined
            }
            this.$axios.get("/pdd/pdd/selection",{ //跳转前记录这次访问
              headers: {
              },
              params: data
            }).then(res=>{
              if(res.data.error==0){
                this.$router.push({ //然后跳转商品详细页面
                name: "products",
                  query: {
                    token: this.token,
                    goods_id: item.goods_id,
                    platform:item.platform,
                    sourceOrder:0
                  }
                });
              }
          })
        }else{
          this.$router.push({ //当自定义banner的内容为列表时候跳转
            name: "recommend",
            query: {
              token: this.token,
              theme_id: item.theme_id,
              banner_id:item.banner_id,
              defined:item.defined,
              theme_type:item.theme_type,
              sourceOrder:0
            }
          });
        }
      } else {
        this.$router.push({//跳转拼多多的banner
          name: "onbanner",
          query: {
            token: this.token,
            id: item.id,
            url: item.image_url,
            title: item.title
          }
        });
      }
    },
    toicon(item,i){
      if(item.title=="淘抢购"||item.title=="拼多多"||item.title=="聚划算"||item.title=="天猫"){
        this.$router.push({//跳转拼多多的banner
            name: "onbanner",
            query: {
              token: this.token,
              title: item.title,
              banner_img:item.banner_img
            }
          })
      }else{
          var data={seat:i+1}
      this.$axios.post("/pdd/cms/icon-read",data,{
              headers: {
                "access-token": this.token,
                "Content-Type": "application/json"
              }
            }).then(res=>{
              if(item.url.indexOf("recommend")!=-1){
                  window.location.href = item.url+"&token="+this.token+"&is_icon=1&sourceOrder=0"
              }else{
                window.location.href = item.url
              }
      })
      }
    },
    order() {
      this.$router.push({
        name: "personal",
        query: { token: this.token },
        params: { barshow: true }
      });
    },
   
    scroll_top() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
.top {
  position: fixed;
  z-index: 100;
  right: 0;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: content-box;
  background: white;
}
.top_search {
  width: 100%;
  background: white;
  padding: 6px 0;
  box-sizing: content-box;
}
#home .bg_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  width: 100%;
  height: 100%;
}
#home .bg_search {
  width: 100%;
  display: flex;
  margin: 0 auto;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  border-radius: 20px;
  padding: 6px 0;
  box-sizing: content-box;
}
/*  */
.scroll_top {
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
/*  */

#home .van-tabs__wrap {
  top: 44px;
  left: 0;
  right: 0;
  z-index: 110;
  overflow: hidden;
  position: fixed;
}

#home .van-tab {
  max-width: 50px;
  height: 35px;
  line-height: 35px;
}
#home .van-tabs__wrap--scrollable .van-tabs__nav {
  height: 35px;
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 100;
}

#home .van-tabs__line {
  bottom: 2px;
}
#home .van-tabs--line {
  margin-top: 80px;
  padding-top: 0px;
}
#home .van-tabs__nav--line {
  padding: 0;
}
#home .van-tabs__content--animated{
  padding-top:0;
}
#home .van-tabs__nav {
  padding-left: 5px;
}
#home .van-tabs--line .van-tabs__wrap {
  height: 35px;
}
/*  */
#home .banner {
  background: white;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  position: relative;
}
#home .model_img{
  width: 100%;
}
#home .model_img img{
  width: 100%;
}
#home .model_close{
  margin-top:10px;
  width: 10%;
  height: 10%;
}
#home .model_close img{
  width: 100%;
  height: 100%;
}
#home .model_flex{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items:center;
}
#home .banner .van-swipe__track{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.grid {
  width: 100%;
  padding: 12px 5px;
  background: white;
  box-sizing: border-box;
}
.grid ul {
  list-style: none;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.grid ul li {
  width: 25%;
}
.grid ul li a {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.grid ul li span {
  font-size: 10px;
}
.grid ul li span.recommed {
  width: 40px;
  display: inline-block;
  height: 40px;
  margin-bottom: 8px;
}
span.recommed img {
  width: 100%;
  height: 100%;
}
#home .bg_card {
  background: #f4f4f4;
  padding-top: 8px;
}
#home .bannerlist {
  padding: 0;
}
#home .bannerlist li {
  width: 49%;
  border: 1px solid #f2f2f2;
  margin-bottom: 11px;
  background: white;
  margin-bottom: 3px;
}
/* #home .goods_name {
    height: 17px;
  } */
#home .after_coupon {
  padding: 0 8px;
}
#home span.number {
  font-size: 15px;
}
</style>
