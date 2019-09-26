<template>
  <ul class="bannerlist">
    <li v-for="(item,idx) in data" :key="idx" @click="jump_pdd(item)">
      <div v-if="item.platform==1">
        <div class="img_card">
          <img class="postionimg" :src="item.goods_thumbnail_url" />
        </div>
        <div class="goods_name">
          <span v-if="!item.click_url" style="position:relative;margin-right:18px;">
            <img
              style="width:16px;height:16px;display:inline-block;position:absolute;top:0;"
              src="../../assets/pingduoduo.svg"
            />
          </span>
          {{item.goods_name}}
        </div>
        <div class="after_coupon">
          <div style="margin-bottom:8px;">
            <span class="h_quan">优惠{{(item.coupon_discount||item.coupon_amount)|number}}元</span>
            <span style="margin-left:5vw" class="h_quan">
              返
              <span>{{item.reward.toFixed(2)}}元</span>
            </span>
          </div>
          <div class="h_coupon">
            <span class="new_old">
              <span class="number">￥{{item.goods_price|price}}</span>
              <del class="old_price" v-if="item.min_group_price">￥{{item.min_group_price|price}}</del>
            </span>
            <span class="sold">已售{{item.sold_quantity|quantity}}件</span>
          </div>
        </div>
      </div>
      <div v-if="item.platform==3">
        <div class="img_card">
          <img class="postionimg" :src="item.goods_thumbnail_url" />
        </div>
        <div class="goods_name">
          <span v-if="item.click_url" style="position:relative;margin-right:18px;">
            <img
              style="width:16px;height:16px;display:inline-block;position:absolute;top:0;border-radius: 3px;"
              src="../../assets/wyyx.jpg"
            />
          </span>
          {{item.goods_name}}
        </div>
        <div class="after_coupon">
          <div style="margin-bottom:8px;">
            <span class="h_quan">优惠{{(item.coupon_discount||item.coupon_amount)|number}}元</span>
            <span style="margin-left:5vw" class="h_quan">
              返
              <span>{{item.reward.toFixed(2)}}元</span>
            </span>
          </div>
          <div class="h_coupon">
            <span class="new_old">
              <span class="number">￥{{item.goods_price|price}}</span>
              <del class="old_price" v-if="item.min_group_price">￥{{item.min_group_price|price}}</del>
            </span>
            <span class="sold">已售{{item.sold_quantity|quantity}}件</span>
          </div>
        </div>
      </div>
      <div v-else-if="item.platform==0">
        <div class="img_card">
          <img class="postionimg" :src="item.goods_thumbnail_url" />
        </div>
        <div class="goods_name">
          <span
            v-if="!item.click_url"
            style="position:relative;"
            :class="{myright:$route.query.title!='聚划算'}"
          >
            <img
              v-if="$route.query.title=='天猫'"
              style="width:16px;height:16px;display:inline-block;position:absolute;top:0;"
              src="../../assets/天猫.png"
            />
            <img
              v-else-if="!$route.query.title"
              style="width:16px;height:16px;display:inline-block;position:absolute;top:0;"
              src="../../assets/taobao.svg"
            />
          </span>
          {{item.goods_name}}
        </div>
        <div class="after_coupon">
          <div style="margin-bottom:8px;">
            <span
              class="h_quan"
              v-if="item.coupon_discount&&item.coupon_discount!=0"
              style="margin-right:5vw"
            >优惠{{item.coupon_discount|number}}元</span>
            <span
              class="h_quan"
              v-if="item.coupon_amount&&item.coupon_amount!=0"
              style="margin-right:5vw"
            >优惠{{item.coupon_amount|number}}元</span>
            <span class="h_quan" v-if="item.reward!=undefined">
              返
              <span>{{item.reward.toFixed(2)}}元</span>
            </span>
          </div>
          <div class="h_coupon">
            <span class="new_old">
              <span class="number">￥{{item.goods_price|price}}</span>
              <del class="old_price">￥{{item.min_group_price|price}}</del>
            </span>
            <span class="sold">已售{{item.sold_quantity|quantity}}件</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "card1",
  props: ["data"],
  data() {
    return {
      iscontent: true,
      token: ""
    };
  },
  filters: {
    price: function(value) {
      if (value.toString().substr(3, 1) == ".") {
        value = value.toString().substring(0, 3);
      } else {
        value = value.toString().substring(0, 4);
      }
      return value;
    },
    quantity: function(value) {
      if (value >= 10000) {
        value = Number(value / 10000).toFixed(0) + "万";
      } else if (value >= 1000) {
        value = Number(value / 1000).toFixed(0) + "千";
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
    this.token = this.$route.query.token;
    console.log(this.data);
  },
  methods: {
    jump_pdd(item) {
      var myquery = {
        token: this.token,
        reward: item.reward,
        coupon_discount: item.coupon_discount,
        goods_id: item.goods_id,
        url: item.url,
        platform: item.platform,
        sourceOrder: 0,
        goods_img: item.goods_thumbnail_url
      };
      if (item.top_ten) {
        myquery.top_ten = item.top_ten;
      }
      if (item.click_url) {
        window.location.href = item.click_url;
      } else {
        this.$router.push({
          name: "products",
          query: myquery
        });
      }
    }
  }
};
</script>

<style >
.bannerlist {
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.bannerlist li {
  width: 49%;
  border: 1px solid #f2f2f2;
  background: white;
  margin-bottom: 3px;
}
.img_card {
  width: 100%;
  position: relative;
  height: 0;
  padding-bottom: 100%;
}
.new_old {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-end;
}
.img_card .postionimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.goods_name {
  margin: 6px 8px;
  font-size: 12px;
  line-height: 17px;
  height: 34px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.after_coupon {
  font-size: 12px;
  color: #e02e24;
  padding-left: 8px;
  padding-right: 8px;
  text-align: left;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
}
span.number {
  font-size: 15px;
  white-space: nowrap;
}
.coupon {
  background: #e02e24;
  position: absolute;
  top: 0;
  border: 1px solid #e02e24;
  border-radius: 2px;
  right: 5%;
}
span.beforeprice {
  background: white;
  display: inline-block;
  height: 100%;
}
span.h_quan {
  background: rgba(224, 46, 36, 0.08);
  border-radius: 2px;
  padding: 1px 2px;
}
span.s_quan {
  color: white;
  padding: 0 3px;
}
.h_coupon {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  align-items: flex-end;
  margin-top: 4px;
}
.old_price {
  color: #9c9c9c;
  margin-left: 3px;
  font-weight: 400;
}
span.sold {
  color: #9c9c9c;
  margin-left: 3px;
  white-space: nowrap;
  font-weight: 400;
}
#home .coupon {
  right: 10%;
}
@media screen and (max-width: 320px) {
  #app span.number {
    font-size: 13px;
  }
}
.myright {
  margin-right: 18px;
}
</style>
