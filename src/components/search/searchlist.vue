<template>
  <div id="searchlist">
    <div class="topsearch">
      <span class="back">
        <a @click.stop.prevent="backto">
          <van-icon size="20px" color="gray" name="arrow-left"/>
        </a>
      </span>
      <van-search
        style="width:100%;height:100%"
        placeholder="请输入搜索关键词"
        @focus="onfocus"
        v-model="value"
      />
    </div>
    <!-- 导航栏 -->
    <div class="sort">
      <ul>
        <li
          v-for="(item,i) in searchtitle"
          :class="{active : active == i}"
          :key="i"
          @click.stop.prevent="selected($event,i,item)"
        >
          <span v-if="i==3" ref="s_filter">
            {{item}}
            <van-icon name="filter-o" size="12px"/>
          </span>
          <span class="flex_row" v-else-if="i==2">
            {{item}}
            <span class="icon_flex" ref="s_sort">
              <i class="up"></i>
              <i class="down"></i>
            </span>
          </span>
          <span v-else>{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 筛选条件 模态框-->
    <div class="modal" id="modal" v-show="show">
      <div class="modal_from">
        <p class="form_p">优惠券</p>
        <span class="form_active" @click="quan($event)">仅看优惠券的商品</span>
        <p class="form_p">平台</p>
        <p class="paltform">
          <span
            v-for="(item,i) in plats"
            :class="{active1 : active1 == i,leftmrg : i!=0}"
            :key="i"
            class="form_active"
            @click.stop.prevent="plat(item,i)"
          >
          <span style="display:flex;padding:1.5px 0"  v-if="i==0">{{item}}</span>
              <span style="display:flex" v-else-if="i==1"><img  src="../../assets/taobao.svg"  style="width:20px;height:20px"></span>
              <span style="display:flex"  v-else><img src="../../assets/pingduoduo.svg" style="width:20px;height:20px"></span>
          </span>
        </p>
        <p class="form_p">券后价格(元)</p>
        <div class="form_input">
          <van-field
            class="wid"
            :border="true"
            :clearable="true"
            type="number"
            v-model="range_from"
            placeholder="最低价"
            input-align="center"
          />
          <span class="line"></span>
          <van-field
            class="wid"
            :border="true"
            :clearable="true"
            type="number"
            v-model="range_to"
            placeholder="最高价"
            input-align="center"
          />
        </div>
      </div>
      <div>
        <van-button style="width:100%;color:#e02e24" type="default" @click="confirm">完成</van-button>
      </div>
    </div>
    <div class="bg_modal" @click="close" v-show="show"></div>
    <mytoast v-show="mytoast"></mytoast>
    <div class="bg_modal" style="z-index:1001" v-show="loadingshow"></div>
    <!-- 循环列表 -->
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="productslist">
        <card1 :data="searchlist" />
      </div>
    </van-list>
    <!-- 悬浮球 -->
    <div class="scroll_top" ref="scroll_top" @click="scroll_top">
      <van-icon size="#333" name="arrow-up"/>
      <span style="font-size:14px;">顶部</span>
    </div>
  </div>
</template>
<script>
import card1 from "@/components/card/card1";
import { Toast } from "vant";
import mytoast from "@/components/toast"
export default {
  components: { card1,mytoast },
  data() {
    return {
      active: 0,
      active1: 0,
      loading: false,
      finished: false,
      show: false,
      loadingshow:false,
      mytoast:false,
      value: "",
      with_coupon: 0,
      sort_type: 0,
      range_to: "",
      range_from: "",
      plats: ["全部", "淘宝", "拼多多"],
      platform: "全部",
      page: 1,
      page_size: 10,
      total_count: 0,
      searchlist: [],
      token:"",
      searchtitle: ["综合", "销售", "券后价", "筛选"]
    };
  },
  created() {
    this.value=this.$route.query.value
    this.token=this.$route.query.token
    this.getlist();
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
      if (this.$route.path == "/searchlist") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          this.$refs.scroll_top.style.bottom = "5%";
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
    backto() {
      this.$router.push("/home?token="+this.token);
    },
    getlist() { //获取查询列表信息
     this.loadingshow=true
     this.mytoast=true
      let data = new FormData();
      data.append("page", this.page);
      data.append("page_size", this.page_size);
      data.append("with_coupon", this.with_coupon);
      data.append("sort_type", this.sort_type);
      data.append("keyword", this.value);
      this.$axios
        .post("/pdd/cms/goods", data, {
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.searchlist = res.data.data;
          this.total_count = Math.ceil(res.data.total_count / this.page_size);
          console.log(this.total_count)
         this.loadingshow=false
          this.mytoast=false
        });
    },
    onfocus() {
      this.$router.push("/search?token="+this.token+"&value="+this.value);
    },
    close() {
      this.show = false;
    },
    confirm() { //筛选条件确认
      window.scrollTo(0, 0);
      this.page = 1;
      this.close();
      if (
        this.with_coupon == 1 ||
        this.range_to != "" ||
        this.range_from != "" ||
        this.platform.length != 0
      ) {
        this.$refs.s_filter[0].style.color = "#e02e24";
      } else if (
        this.with_coupon == 0 &&
        this.range_to == "" &&
        this.range_from == "" &&
        this.platform == ""
      ) {
        this.$refs.s_filter[0].style.color = "gray";
      }

        this.mytoast=true
         this.loadingshow=true
      let data = new FormData();
      data.append("page", this.page);
      data.append("page_size", this.page_size);
      data.append("with_coupon", this.with_coupon);
      data.append("sort_type", this.sort_type);
      data.append("keyword", this.value);
      data.append("range_from", this.range_from);
      data.append("range_to", this.range_to);
      if (this.platform == 0 || this.platform == 1) {
        data.append("platform", this.platform);
      }
      this.$axios
        .post("/pdd/cms/goods", data, {
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.searchlist = res.data.data;
          this.total_count = Math.ceil(res.data.total_count / this.page_size);
           this.mytoast=false
         this.loadingshow=false
        });
    },
    selected(e, i, item) {  //导航栏选中状态
      this.page = 1;
      if (i == 0) {
        this.sort_type = 0;
        this.$refs.s_sort[0].children[0].style.borderBottom = "4px solid gray";
        this.$refs.s_sort[0].children[1].style.borderTop = "4px solid gray";
      }
      if (i == 1) {
        this.sort_type = 6;
        this.$refs.s_sort[0].children[0].style.borderBottom = "4px solid gray";
        this.$refs.s_sort[0].children[1].style.borderTop = "4px solid gray";
      } else if (i == 2) {
        if (this.sort_type != 9 && this.sort_type != 10) {
          this.sort_type = 9;
          this.$refs.s_sort[0].children[0].style.borderBottom =
            "4px solid #e02e24";
          this.$refs.s_sort[0].children[1].style.borderTop = "4px solid gray";
        } else if (this.sort_type == 9) {
          this.sort_type = 10;
          this.$refs.s_sort[0].children[1].style.borderTop =
            "4px solid #e02e24";
          this.$refs.s_sort[0].children[0].style.borderBottom =
            "4px solid gray";
        } else if (this.sort_type == 10) {
          this.sort_type = 9;
          this.$refs.s_sort[0].children[0].style.borderBottom =
            "4px solid #e02e24";
          this.$refs.s_sort[0].children[1].style.borderTop = "4px solid gray";
        }
      }
      if (i != 3) {
        window.scrollTo(0, 0);
        this.active = i;
        this.searchlist = [];
       this.mytoast=true
         this.loadingshow=true
        let data = new FormData();
        data.append("page", this.page);
        data.append("page_size", this.page_size);
        data.append("with_coupon", this.with_coupon);
        data.append("sort_type", this.sort_type);
        data.append("keyword", this.value);
        data.append("range_from", this.range_from);
        data.append("range_to", this.range_to);
        if (this.platform == 0 || this.platform == 1) {
          data.append("platform", this.platform);
        }
        this.$axios
          .post("/pdd/cms/goods", data, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            this.searchlist = res.data.data;
             this.mytoast=false
         this.loadingshow=false
          });
      } else {
        this.show = !this.show;
      }
    },
    plat(item, i) { //平台选择
      this.active1 = i;
      if (item == "拼多多") {
        this.platform = 1;
      } else if (item == "淘宝") {
        this.platform = 0;
      } else {
        this.platform = "全部";
      }
    },
    quan(e) {
      e.target.style.transitionDuration = "0.3s";
      if (this.with_coupon == 0) {
        (e.target.style.backgroundColor = "#fae4e4"),
          (e.target.style.color = "#e02e24");
        this.with_coupon = 1;
      } else if (this.with_coupon == 1) {
        this.with_coupon = 0;
        (e.target.style.backgroundColor = "#efefef"),
          (e.target.style.color = "#58595b");
      }
    },
    scroll_top() {
      window.scrollTo(0, 0);
    },
    onLoad() {  //滚动加载
      this.finished = false;
        var i = this.page + 1;
        let queryParams3 = new FormData();
        queryParams3.append("page_size", this.page_size);
        queryParams3.append("page", i);
        queryParams3.append("keyword", this.value);
        queryParams3.append("with_coupon", this.with_coupon);
        queryParams3.append("range_from", this.range_from);
        queryParams3.append("range_to", this.range_to);
        if(this.platform==0||this.platform==1){
          queryParams3.append("platform",this.platform)
        }
        this.$axios
          .post("/pdd/cms/goods", queryParams3, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            if(res.data.data.length>0){
              this.searchlist = this.searchlist.concat(res.data.data);
              this.page++;
              this.loading = false;
            }else{
              this.loading = false;
              this.finished = true;
            }
            
          });
    
    }
  }
};
</script>

<style>
.sort {
  clear: both;
  width: 100%;
  position: fixed;
  top: 45px;
  z-index: 1000;
  height: 35px;
  background: white;
  border-bottom: 1px solid #f4f4f4;
}
.sort ul {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.sort ul li {
  width: 25%;
  color: gray;
}
.sort ul li.active {
  color: #e02e24;
}
.topsearch {
  width: 100%;
  display: flex;
  height: 45px;
  z-index: 1000;
  background: white;
  box-sizing: content-box;
  position: fixed;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.productslist {
  margin-top: 80px;
  padding: 8px 0 0;
  background: #f4f4f4;
}
.back {
  padding: 8px 0 8px 6px;
  display: flex;
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
#searchlist .bannerlist {
  padding: 0;
}

#searchlist .bannerlist li {
  width: 49.5%;
  border: 0;
  background: white;
  margin-bottom: 11px;
  margin-bottom: 3px;
}
#searchlist .bg_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  width: 100%;
  height: 100%;
}
#searchlist .modal {
  position: fixed;
  top: 80px;
  background: white;
  width: 100%;
  z-index: 500;
}
#searchlist .modal_from {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
}
#searchlist .form_p {
  width: 100%;
  text-align: left;
  margin: 0 0 8px;
  font-size: 13px;
  color: #58595b;
}
#searchlist .form_active {
  background: #efefef;
  align-self: flex-start;
  padding: 8px 20px;
  border-radius: 3px;
  color: #58595b;
  font-size: 13px;
  margin-bottom: 10px;
}
#searchlist .paltform span.active1 {
  background-color: #fae4e4;
  color: #e02e24;
}
#searchlist .form_input {
  color: #efefef;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
#searchlist .wid {
  background: #efefef;
  border-radius: 5px;
}
#searchlist .line {
  width: 30px;
  box-sizing: border-box;
  height: 1px;
  margin: 0 10px;
  border-top: 1px solid #d2d2d2;
}
#searchlist .van-cell {
  padding: 5px 15px;
}
.up {
  border: 4px solid transparent;
  border-bottom: 4px solid gray;
}
.down {
  margin-top: 3px;
  border: 4px solid transparent;
  border-top: 4px solid gray;
}
.icon_flex {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.flex_row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#searchlist .paltform {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#searchlist .paltform span.leftmrg {
  margin-left: 20px;
}
</style>
