<template>
  <ul class="bannerlist">
    <li v-for="(item,idx) in data" :key="idx" @click.prevent="jump_pdd(item)">
      <div class="img_card">
        <img class="postionimg" :src="item.goods_thumbnail_url" />
      </div>
      <div v-if="$route.query.title=='淘抢购'" class="name_price">
          
        <div class="goods_name">
            <!-- <span style="position:relative;margin-right:18px;">
            <img v-if="$route.query.title=='淘抢购'"
              style="width:16px;height:16px;display:inline-block;position:absolute;top:0;"
              src="../../assets/掏抢购.png"
            >
          </span> -->
          {{item.goods_name}}</div>
        <div class="after_coupon">
          <div style="margin-bottom:4px;position:relative">
            <van-progress
              color="OrangeRed"
              :show-pivot="false"
              :percentage="parseInt((item.sold_quantity/item.total_amount)*100)"
            />
            <span class="sold">已抢{{item.sold_quantity||0}}件</span>
            <span class="sold_right">{{parseInt((item.sold_quantity/item.total_amount)*100)}}%</span>
          </div>
         
          <div class="time">
            <span>开始时间:{{item.start_time}}</span>
            <span>结束时间:{{item.end_time}}</span>
          </div>
           <div class="h_coupon">
            <span class="new_old">
              <span class="number">抢购价<span style="font-size:14px">{{item.goods_price|price}}</span>元</span>
              <del class="old_price">￥{{item.zk_final_price|price}}</del>
            </span>
            <span class="h_quan" v-if="(item.coupon_discount||item.coupon_amount)!=0">优惠{{(item.coupon_discount||item.coupon_amount)|number}}元</span>
          </div>
        </div>
      </div>
      <div v-if="$route.query.title=='聚划算'" class="name_price">
        <div
          class="goods_name"
          style="margin-left:0;margin-right:0;font-weight:bold"
        >{{item.goods_name}}</div>
        <div class="caocao">
          <div class="jiesaok">
            <span class="jiesao">{{item.item_usp_list.string.join(",")}}</span>
          </div>
        </div>
        <div class="caocao">
          <span
            class="h_quan"
            style="color: #e02e24;background: rgba(224, 46, 36, 0.08);font-size:12px;margin:3px 0;"
          >优惠{{(item.coupon_discount||item.coupon_amount)|number}}元</span>
        </div>
        <div class="caocao" style="justify-content: space-between;">
          <div class="caocao1">
            <span class="number">￥{{item.goods_price|price}}</span>
            <del class="old_price" style="margin-left:10px;">￥{{item.zk_final_price|price}}</del>
          </div>
          <div class="gobuy" @click.stop="gobuy(item)">马上抢</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "card2",
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
        value = Number(value / 10000).toFixed(1) + "万";
      } else if (value >= 1000) {
        value = Number(value / 1000).toFixed(1) + "千";
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
    gobuy(item) {
      this.$router.push({
        name: "products",
        query: {
          token: this.token,
          coupon_discount: item.coupon_discount || item.coupon_amount,
          goods_id: item.goods_id,
          platform: item.platform,
          title:item.goods_name,
          goods_thumbnail_url:item.goods_thumbnail_url,
            goods_price:item.goods_price,
            zk_final_price:item.zk_final_price,
          sourceOrder: 0
        }
      });
    },
    jump_pdd(item) {
      if (this.$route.query.title == "淘抢购") {
        this.$router.push({
          name: "products",
          query: {
            token: this.token,
            coupon_discount: item.coupon_discount,
            goods_id: item.goods_id,
            platform: item.platform,
            sourceOrder: 0
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.bannerlist {
  width: 100%;
  box-sizing: border-box;
  padding: 0 3%;
}
.bannerlist li {
  width: 100%;
  margin-bottom: 11px;
  background: white;
  padding: 2%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 5px;
}
.img_card {
  width: 30%;
  position: relative;
  height: 0;
  padding-bottom: 30%;
}
.new_old {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
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
  line-height: 14px;
  height: 14px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.name_price {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: 3%;
}
.after_coupon {
  font-size: 12px;
  color: #e02e24;
  padding-left: 8px;
  padding-right: 8px;
  text-align: left;
  box-sizing: border-box;
  position: relative;
}
span.number {
  font-size: 12px;
  white-space: nowrap;
  color: #e02e24;
  font-weight: bold;
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
  /* background: rgba(224, 46, 36, 0.08); */
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
.time {
  color: #9c9c9c;
  display: flex;
  flex-direction: column;
}
.van-progress {
  height: 14px;
  background: LightSalmon;
}
.old_price {
  color: #9c9c9c;
  margin-left: 3px;
  font-weight: 400;
}
span.sold {
  color: white;
  margin-left: 5px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 10px;
  position: absolute;
  top: 0px;
}
span.sold_right {
  color: Red;
  margin-left: 5px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 12px;
  position: absolute;
  top: -1px;
  right: 2%;
}
.jiesao {
  font-size: 12px;
  border: 1px solid #e02e24;
  text-align: left;
  margin-left: -12px;
}
.jiesaok {
  color: #e02e24;
  transform: scale(0.8);
}
.caocao {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.gobuy {
  background: #ff3030;
  color: white;
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 5px;
}
.caocao1 {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
@media screen and (max-width: 320px) {
  #app span.number {
    font-size: 13px;
  }
}
</style>
