<template>
  <div v-cloak class="top">
    <div class="top_search" >
      <div class="modal" id="modal" v-show="showdis">
        <div class="modal_from">
          <p class="form_p">选择平台：</p>
          <p class="paltform">
            <span
              v-for="(item,i) in plats"
              :class="{active1 : active3 == i}"
              :key="i"
              class="form_active"
              @click.stop.prevent="platchoose(item,i)"
            >
              <span style="padding: 8px 20px;display:inline-block" v-if="i==0">{{item}}</span>
              <span
                style="padding: 7px 20px;display:inline-block;display:flex;align-items:center"
                v-else-if="i==1"
              >
                <img src="../../assets/taobao.svg" style="width:20px;height:20px" />
              </span>
              <span
                style="padding: 7px 20px;display:inline-block;display:flex;align-items:center"
                v-else
              >
                <img src="../../assets/pingduoduo.svg" style="width:20px;height:20px" />
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="bg_modal" @click="cales" v-show="showdis"></div>
      <!-- <div
        class="home_btn"
        v-if="userInfo.taobao_enable==1"
        ref="top_leftbtn"
        @click.stop.prevent="toach($event)"
      >
        <div class="tp_icon">
          <div v-show="iconshow" class="allplat">
            <span>全部</span>
            <span :class="{xuan:xuanshow}" style="transition: all 0.3s;">
              <van-icon size="4vw" color="#7d7e80" name="arrow-down" />
            </span>
          </div>
          <img style="width:25px;height:25px" v-show="iconshow1" src="../../assets/taobao.svg" alt />
          <img
            style="width:25px;height:25px"
            v-show="iconshow2"
            src="../../assets/pingduoduo.svg"
            alt
          />
        </div>
      </div> -->
      <div  style="height:24px"
        class="bg_search"
        :class="{t_width:userInfo.taobao_enable==1}"
        @click.stop.prevent="showsearch"
      >
        <van-icon color="#9c9c9c" size="20px" name="search" />
        <span style="color:#9c9c9c;font-size:18px;box-sizing:border-box">{{text}}</span>
      </div>
    </div>
  </div>
</template>

<script >
import { Toast } from "vant";
export default {
  name: "myheader",
  props: ["text", "token", "opt_id", "userInfo"],
  data() {
    return {
      value: "",
      platform: "全部",
      firstplatform: "全部",
      active3: 0,
      iconshow: true,
      iconshow1: false,
      iconshow2: false,
      bottomshow: true,
      mtloading: false,
      page: 1,
      xuanshow: false,
      page_size: 10,
      plats: ["全部", "淘宝", "拼多多"],
      showdis: false,
      dis: true
    };
  },
  methods: {
    showsearch() {
      this.$router.push("/search?token=" + this.token);
    },
    toach(e) {
      this.xuanshow = !this.xuanshow;
      this.showdis = !this.showdis;
      if (this.platform == 1) {
        this.active3 = 2;
      } else if (this.platform == 0) {
        this.active3 = 1;
      } else {
        this.active3 = 0;
      }
    },
    cales() {
      this.showdis = false;
      this.xuanshow = false;
    },
    platchoose(item, i) {//平台选择并请求接口
      this.active3 = i;
      if (i == 0) {
        this.platform = "全部";
        (this.iconshow = true),
          (this.iconshow1 = false),
          (this.iconshow2 = false);
      } else if (i == 1) {
        this.platform = 0;
        (this.iconshow = false),
          (this.iconshow1 = true),
          (this.iconshow2 = false);
      } else {
        this.platform = 1;
        (this.iconshow = false),
          (this.iconshow1 = false),
          (this.iconshow2 = true);
      }
      this.showdis = false;
      window.scrollTo(0, 0);
      this.myloading = true;
      this.$emit("listentochild", {
        myloading: this.myloading
      });
      let data = new FormData();
      data.append("page", this.page);
      data.append("page_size", this.page_size);
      if (this.opt_id != "") {
        data.append("opt_id", this.opt_id);
        this.dis = false;
      } else {
        this.dis = true;
      }
      if (this.platform == 0 || this.platform == 1) {
        data.append("platform", this.platform);
      }
      this.$axios
        .post("/pdd/cms/goods", data, { //请求商品列表
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.myloading = false;
          this.$emit("listentochild", {//子组件传递给父组件参数
            platform: this.platform,
            data: res.data.data,
            dis: this.dis,
            myloading: this.myloading
          });
        });
    },
  }
};
</script>

<style >
[class*="van-hairline"]::after {
  border: 0;
}
.van-tabbar-item__icon {
  font-size: 25px;
}
[v-cloak] {
  display: none;
}
#selectval {
  color: red;
  background: white;
  border-radius: 5px;
  margin: 0px 4px;
  outline: none;
}
/*  */
#home .el-select {
  width: 40%;
}
#home .top .top_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
#home .allplat {
  font-size: 14px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
}
#home .el-input__inner {
  height: 30px;
  line-height: 30px;
  font-size: 3vw;
}
#home .el-input__icon {
  line-height: 30px;
}
#home .xuan {
  transform: rotate(180deg);
  transition: all 0.3s;
}
#home .top .home_btn {
  border-radius: 20%;
  padding: 0 1vw;
  height: 100%;
  color: rgb(224, 46, 36);
  width: 15%;
}
#home .bg_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  width: 100%;
  height: 100%;
}
#home .modal {
  position: fixed;
  top: 79px;
  left: 0;
  background: white;
  width: 100%;
  z-index: 500;
  border-top: 1px solid #f4f4f4;
}
#home .modal_from {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
}
#home .form_p {
  width: 100%;
  text-align: left;
  margin: 0 0 13px;
  font-size: 13px;
  color: #58595b;
}
#home .paltform {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#home .paltform span.active1 {
  background-color: #fae4e4;
  color: #e02e24;
}
#home .form_active {
  background: #efefef;
  align-self: flex-start;

  border-radius: 3px;
  color: #58595b;
  margin-right: 5vw;
  font-size: 13px;
  margin-bottom: 10px;
}
#home .tp_icon {
  display: inline-block;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 100%;
}
#home .all_icon {
  /* position:absolute;
  top: 0; */
  vertical-align: middle;
  width: 18px;
  height: 18px;
}
#home .top .left_padding {
  padding-left: 2vw;
}
#home .t_width {
  width: 85%;
}
</style>
