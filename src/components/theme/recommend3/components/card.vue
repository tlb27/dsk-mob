<template>
  <div id="card">
    <div class="grid" :class="{beijintu:$route.query.theme_id==261,beijintu1:$route.query.theme_id==263,beijintu2:$route.query.theme_id==266,beijintu3:$route.query.theme_id==267}" v-for="(p,index) of card_data.goods_data" :key="index">
      <div class="grid_col" @click="jumptoproducts(p)">
        <div class="avatar" >
          <img style="vertical-align:middle;margin:0;padding:0;border:none;display:block;float:left" :src="p.goods_img_url">
        </div>
        <div class="myfont pailie" style="margin-bottom:5px;">
          <span v-if="p.coupon_amount!=0" v-show="$route.query.show_promo!=1" :class="{myred:$route.query.show_promo==undefined}" style="margin-right:10px">优惠券￥{{p.coupon_amount|price}}</span>
          <span style="margin-right:12px" v-if="$route.query.show_promo" :class="{myred:$route.query.show_promo==1}">佣金￥{{p.promotion_amount|price2}}</span>
          <span>售价￥{{p.zk_price|price}}</span>
        </div>
        <div class="myfont mywidth">{{p.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card_data", "uniac_id"],
  name: "rcard",
  data() {
    return {};
  },
  filters: {
    price: function(value) {
      var val = Number(value / 1000).toFixed(1);
      return val;
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
    },
    price2: function(value) {
      var val = Number(value / 1000).toFixed(2);
      return val;
    }
  },
  methods: {
    jumptoproducts(item) {
      console.log(item);
      if (this.$route.query.defined == 1 || this.$route.query.is_icon == "1") {
        this.$router.push({
          name: "products",
          query: {
            token: this.$route.query.token,
            reward: Number(item.promotion_amount / 1000),
            coupon_discount: Number(item.coupon_amount / 1000),
            goods_id: item.id,
            url: item.url,
            platform: item.platform,
            sourceOrder: this.$route.query.sourceOrder
          }
        });
      } else {
        //http://wechat.morejoying.com
        if(this.$route.query.uniac_id){
        window.location.href =
          "http://wechat.morejoying.com/wechat/mobile/kf-msg-click?platform=" +
          item.platform +
          "&goods_id=" +
          item.id +
          "&uniac_id=" +
           this.$route.query.uniac_id+"&sourceOrder="+this.$route.query.sourceOrder
          
      }else if(this.$route.query.token){
          window.location.href =
          "http://wechat.morejoying.com/wechat/mobile/kf-msg-click?platform=" +
          item.platform +
          "&goods_id=" +
          item.id +
          "&token=" +
           this.$route.query.token+"&sourceOrder="+this.$route.query.sourceOrder
      }else{
        this.$toast("缺少必要的跳转参数")
      }
      }
    }
  }
};
</script>

<style scoped>
.grid {
  width: 100%;
  padding: 12px 5px;
  box-sizing: border-box;

}
.beijintu{
  background: url(../../../../assets/背景.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.beijintu1{
  background: url(../../../../assets/背景1.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.beijintu2{
  background: url(../../../../assets/背景2.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.beijintu3{
  background: url(../../../../assets/背景3.jpg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle ;
}
.mywidth {
  /* font-size: 1.7rem; */
  height: 2.5rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.myfont {
  width: 90%;
  margin: 0 auto;
  font-style: normal;
  margin-bottom: 5px;
  text-align: left;
}
.grid_col {
  background: white;
  box-sizing: border-box;
  overflow: hidden;
  width: 95%;
  border-radius: 10px;
  -moz-box-shadow: 0px 6px 20px #8a8a8a;
  -webkit-box-shadow: 0px 6px 20px #8a8a8a;
  box-shadow: 0px 6px 20px #8a8a8a;
  margin: 0 auto 20px;
  border: none;
}
.avatar {
  width: 100%;
  margin: 0 auto 5px;
  padding-bottom: 100%;
  overflow:hidden;
  font-size:0;
  height: 0;
  position: relative;
}
.shipei{
  background: #e52727;
}
.pailie {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  font-size: 1.7rem;
  font-weight: bold;
}
.avatar img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.myred{
  color: red;
  font-weight: bold
}
</style>
