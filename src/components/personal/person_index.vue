<template>
  <div id="person" v-cloak>
    <div class="bg">
      <div class="conter">
        <div class="top_hold">
          <div class="avater">
            <img :src="userinfo.avatar">
          </div>
          <div class="phone">
            <span class="uname"><van-icon size="4.5vw" style="margin-right:1vw" name="user-o" /><span>{{userinfo.nickname}}</span></span>
            <span class="tel">
              <span class="yibanrow" v-if="userinfo.phone!=''"><van-icon size="4.5vw" style="margin-right:1vw" name="phone-o" /><span>{{userinfo.phone}}</span></span>
              <span v-else>
                <a style="color:white" @click="gotel" >
                  <van-icon style="float:left;margin-right:1vw" size="5vw" name="edit"/>请绑定手机号
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 六宫格 -->
    <div class="bg_color"></div>
    <div class="card_more">
      <ul class="card_grid">
        <li class="card_li">
          <router-link :to="{name:'my_new_rewards',query:{token}}">
            <img src="../../assets/myshouyi.svg" style="width:32px;height:32px">
            <span>我的收益</span>
          </router-link>
        </li>
        <li class="card_li">
          <router-link :to="{name:'my_orders',query:{token}}">
            <img src="../../assets/order.svg" style="width:32px;height:32px">
            <span>我的订单</span>
          </router-link>
        </li>
        <li class="card_li right_border">
          <router-link :to="{name:'settlement_records',query:{token}}">
            <img src="../../assets/count_fee.svg" style="width:32px;height:32px">
            <span>结算记录</span>
          </router-link>
        </li>
        <li class="card_li">
          <a @click.stop.prevent="friend">
            <img src="../../assets/friend.svg" style="width:32px;height:32px">
            <span>好友列表</span>
          </a>
        </li>
        <li class="card_li">
          <router-link :to="{name:'program',query:{minipro_img:userinfo.minipro_img}}">
            <img src="../../assets/小程序.svg" style="width:32px;height:32px">
            <span>小程序</span>
          </router-link>
        </li>

        <li class="card_li right_border">
         <router-link :to="{name:'privacy',query:{token}}">
            <img style="width:32px;height:32px" src="../../assets/隐私.svg">
            <span>隐私声明</span>
           </router-link> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      userinfo: {},
    };
  },
  created() {
    this.token=this.$route.query.token
   window.document.title = "个人中心";
    this.getinfo();
  },
  methods: {
    gotel() {
      this.$router.push("/personal/telphone?token=" + this.token);
    },
    getinfo() {
      this.$axios
        .get("/wechat/mobile/personal?token=" + this.token)
        .then(res => {
          this.userinfo = res.data;
        });
    },
    friend() {
      this.$router.push("/personal/friend?token=" + this.token);
    },
  }
};
</script>

<style>
html,
body {
  height: 100%;
}

[v-cloak] {
  display: none;
}

#person {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}

#person a {
  text-decoration: none;
  color: white;
}
#person .yibanrow{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#person .bg {
  width: 100%;
  position: relative;
  /* background: url(/wechat/static/image/mobweb/person/background.png) no-repeat; */
  background-size: 100% 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fb6921;
}

#person .conter {
  height: 70%;
  width: 85%;
  position: relative;
  margin: 2rem auto;
}

#person .top_hold {
  position: relative;
  width: 100%;
  float: left;
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
}

#person .avater {
  width: 20%;
  padding-bottom: 20%;
  height: 0;
  position: relative;
}

#person .avater img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  border-radius: 10%;
}

#person .phone {
  padding-left: 1rem;
  display: flex;
  width: 70%;
  justify-content: space-around;
  flex-direction: column;
}

#person .uname,
#person .tel {
  color: white;
  text-align: left;
  font-size: 4vw;
}
#person .uname{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#person .grid {
  display: flex;
  position: relative;
  background: white;
  padding: 0.5rem 0;
}

#person .grid_col {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  text-align: center;
}

#person .grid_col .tip {
  color: #6f6f6f;
  font-size: 4vw;
}

#person .grid_col .sfont {
  font-size: 3.5vw;
}

#person .grid_col .tip_price {
  color: #f95e01;
  font-size: 4.5vw;
  font-weight: 500;
}

#person .icon_my {
  position: absolute;
  right: 0;
  top: 30%;
}

#person .bg_color {
  background: #f7f7f7;
  width: 100%;
  padding-bottom: 3%;
}

#person .card_more {
  width: 100%;
  background: white;
}

#person .card_grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.card_grid .card_li {
  padding: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.333%;
  box-sizing: border-box;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}

#person .card_grid .card_li a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
}

.card_grid .card_li span {
  font-size: 4vw;
  margin-top: 1vw;
}

#person .card_grid .right_border {
  border-right: 0px;
}

#person .card_grid .bottom_border {
  border-bottom: 0px;
}

#person .recommend {
  width: 100%;
  background: #f7f7f7;
  padding-top: 3vw;
}

.tip_title {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.tip_title .line {
  display: inline-block;
  width: 40%;
  border-top: 1px solid #ccc;
}

.tip_title .text {
  font-size: 4vw;
  color: #686868;
  vertical-align: middle;
}

.recomend_img {
  width: 95%;
  margin: 3vw auto 0;
}

.recomend_img img {
  width: 100%;
  border-radius: 5px;
}
</style>
