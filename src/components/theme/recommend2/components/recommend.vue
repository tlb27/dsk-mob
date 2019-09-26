<template>
  <div id="recommend_card" v-cloak>
      
    <div class="card_gird">
       <div class="card_border" v-for="(p,index) of card_data.goods_data" :key="index">
      <div class="transverse" @click.stop.prevent="jumptoproducts(p)">
        <div class="fengmian">
          <img class="fengmian_img" :src="p.goods_img_url">
        </div>
        <div class="more_price">
          <div class="card_title">
            <span v-if="p.platform==0">
              <img
                style="width:14px;height:14px;vertical-align: text-bottom;"
                src="../../../../assets/taobao.svg"
              >
            </span>
            <span v-if="p.platform==1">
              <img
                style="width:14px;height:14px;vertical-align: text-bottom;"
                src="../../../../assets/pingduoduo.svg"
              >
            </span>
            {{p.title}}
          </div>
           <div class="card_wenan">
            <div class="old">
              <del>原价￥{{p.price|price}}</del>
            </div>
            <div>
              <span class="old">月销{{p.volume|quantity}}件</span>
            </div>
          </div>
          <div class="lingquan">
            <span v-if="p.coupon_amount!=0" class="font_quan">
              <span style="font-weight:bold">{{p.coupon_amount|price}}元</span>
              <span style="color:#999999;">优惠券</span>
            </span>
          </div>
          <div class="card_wenan">
            <div style="display:flex;justify-content: center;align-items: center">
              <span class="quanhou_price">￥{{p.zk_price|price}}</span>
            </div>
            <div class="jiangjin" style="display:flex;">
              <span>
                <span style="vertical-align:baseline;">佣金</span>
                <span
                  style="font-weight: bold;vertical-align:baseline;"
                >￥{{p.promotion_amount|price2}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rcard",
  props: ["card_data", "uniac_id"],
  data() {
    return {};
  },
  created() {
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
      console.log(item)
      if (this.$route.query.defined == 1||this.$route.query.is_icon=="1") {
        
        this.$router.push({
          name: "products",
          query: {
            token: this.$route.query.token,
            reward: Number(item.promotion_amount/1000),
            coupon_discount: Number(item.coupon_amount/1000),
            goods_id: item.id,
            url: item.url,
            platform:item.platform,
            sourceOrder: this.$route.query.sourceOrder
          }
        })
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
[v-cloak] {
  display: none;
}
.card_border {
  width: 49.5%;
  background: white;
  position: relative;
  margin-bottom: 1vw;
}
.card_gird{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 15px;
}

#recommend_card{
  padding:0 2vw;
}
.lingquan {
  width: 100%;
  height: 4vw;
  margin-bottom: 4px;
  display: flex;
  box-sizing: border-box;
}

.card_wenan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1vw;
  box-sizing: border-box;
  margin-bottom: 4px;
}
.jiangjin {
  border-radius: 2px;
  padding: 0 1vw;
  font-size: 4vw;
  background: #fff2f2;
  color: #f52724;
}
.font_quan {
  font-size: 4vw;
  color: #f52724;
  justify-content: flex-start;
  display: flex;
  align-items: center;
}
.jump {
  width: 50%;
  height: 90%;
  color: white;
  display: flex;
  font-size: 4.5vw;
  align-items: center;
  justify-content: space-around;
}
.bg_url {
  display: flex;
  justify-content: space-between;
  background: url("../../../../assets/quan.png") no-repeat;
  background-size: 100% 100%;
  width: 93vw;
  height: 11vw;
}
.more_price {
  padding:2px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.line {
  width: 100%;
  border-top: 1px solid #dddddd;
}
.transverse {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}
.t_line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  background: #f52724;
  color: white;
  font-size: 4vw;
  padding: 0 3vw;
  width: 50vw;
}
.fengmian {
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  position: relative;
}
.fudong {
  background: #fb6921;
  position: absolute;
  color: white;
  top: 0;
  border-radius: 5px;
  left: 12%;
  transform: translate(-50%, -50%);
  font-size: 5vw;
  padding: 0 3vw;
}
.old {
  color: #999999;
  vertical-align: baseline;
  font-size: 3.5vw;
}
.quanhou {
  margin: 1vw 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vw;
}
.describe {
  text-align: left;
  margin: 3vw 0;
}
.quanhou_price {
  color: #f52724;
  display: inline-block;
  vertical-align: baseline;
  font-size: 4.5vw;
  font-weight: bold;
  vertical-align: baseline;
}
.fengmian_img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.card_title {
  margin-bottom: 4px;
  line-height: 20px;
  font-size: 3.5vw;
  height: 40px;
  text-align: left;
  color: #333333;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
