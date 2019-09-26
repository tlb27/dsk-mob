<template>
  <div id="recommend3" v-cloak>
    <div class="top_bg" :class="{yetou:$route.query.theme_id==261,yetou1:$route.query.theme_id==263,yetou2:$route.query.theme_id==266,yetou3:$route.query.theme_id==267}">
      <h2 class="title" :class="{white_color:$route.query.theme_id==267}" v-html="card_data.title"></h2>
      <div class="sharerow" :class="{white_color:$route.query.theme_id==267}" v-if="$route.query.show_promo==1">
        <span style="display:flex;align-items: center">
          <span style="font-size:12px;">
          好友购买成功，佣金全归自己，点击推广
          </span>
          <img class="share_icon" v-if="$route.query.theme_id==267" src="../../../assets/右箭头1.svg" />
          <img class="share_icon" v-else src="../../../assets/右箭头.svg" />
        </span>
        <span class="share_btn" @click="toshare">
          <img class="share_icon" src="../../../assets/fenxiang.svg" />
          <span>推广</span>
        </span>
      </div>
    </div>
    <rcard :card_data="card_data" :uniac_id="uniac_id"></rcard>
  </div>
</template>

<script>
import rcard from "./components/card";
export default {
  components: { rcard },
  data() {
    return {
      card_data: [],
      page: 1,
      page_size: 10,
      uniac_id: "",
      theme_id: "",
      token: ""
    };
  },
  created() {
    // this.uniac_id=this.$route.query.uniac_id
    this.uniac_id = this.$route.query.uniac_id
      ? this.$route.query.uniac_id
      : this.$route.query.unaic_id;
    console.log(this.uniac_id);
    this.theme_id = this.$route.query.theme_id;
    this.token = this.$route.query.token;
    var data = {};
    if (this.$route.query.uniac_id || this.$route.query.unaic_id) {
      data.uniac_id = this.$route.query.uniac_id
        ? this.$route.query.uniac_id
        : this.$route.query.unaic_id;
    }
    if (this.$route.query.banner_id) {
      data.banner_id = this.$route.query.banner_id;
    }
    if (this.$route.query.theme_id) {
      data.theme_id = this.$route.query.theme_id;
    }
    if (this.$route.query.token) {
      data.token = this.$route.query.token;
    }
    if (this.$route.query.defined) {
      //商城轮播跳转到主题
      this.$axios
        .get("/pdd/pdd/selection?defined=" + 1, {
          headers: {},
          params: data
        })
        .then(res => {
          this.card_data = res.data.data;
        });
    } else {
      this.$axios
        .get("/pdd/pdd/selection?", {
          //外部推广
          headers: {},
          params: data
        })
        .then(res => {
          this.card_data = res.data.data;
        });
    }
  },
  methods: {
    toshare() {
      //https://wechat.morejoying.com
      window.location.href =
        "https://wechat.morejoying.com/wechat/theme/pdd-theme-promo?theme_type=" +
        this.$route.query.theme_type +
        "&theme_id=" +
        this.theme_id +
        "&uniac_id=" +
        this.uniac_id;
    }
  }
};
</script>

<style  scoped>
[v-cloak] {
  display: none;
}
.top_bg{
  overflow: hidden;

}
.yetou{
  background: url(../../../assets/页头.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.yetou1{
  background: url(../../../assets/页头1.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.yetou2{
  background: url(../../../assets/页头2.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.yetou3{
  background: url(../../../assets/页头3.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.title {
  padding: 20px 0 0 5vw;
  text-align: left;
  margin-top: 0;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.sharerow {
  margin-bottom: 10px;
  text-align: center;
  padding-left:  16px;
  display: flex;
  align-items: center

}
.share_btn {
  padding: 3px 10px;
  border-radius: 5px;
  background: gradient(
    linear,
    left top,
    left bottom,
    from(orange),
    to(rgb(255, 117, 4))
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(orange),
    to(rgb(255, 117, 4))
  );
  -webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.15);
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.15);
  color: white;
  /* margin-left: 5px; */
  font-size: 12px;
  display: flex;
  align-items: center
}
.share_icon {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.white_color{
  color: white
}
</style>

