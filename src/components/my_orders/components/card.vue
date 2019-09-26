<template>
    <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
    :finished-text="orderLists.length>0?'没有更多了':'暂无数据'"
    :offset="100"
    class="card"
  >
  <div>
    <template v-for="(list,index) in orderLists">
      <div class="mb5" :key="index">
        <div class="title align-center space-between">
          <div class="align-center fz12">
            <span v-if="list.status===0||list.orderStatus===0">未收货</span>
            <span
              v-if="list.status===1||list.status===2||list.status===3||list.orderStatus===1||list.orderStatus===2||list.orderStatus===3"
            >已收货</span>
            <span v-if="list.status===4||list.orderStatus===4">已结算</span>
            <span v-if="list.status===-1||list.orderStatus < 0">订单无效</span>
          </div>
          <div class="create_time">下单时间:{{list.order_pay_time||list.createTime}}</div>
        </div>
        <van-card   tags="标签" >
          <div slot="thumb">
            <div class="icon_img">
              <img v-if="list.goods_thumbnail_url" :src="list.goods_thumbnail_url">
              <img v-else src="../../../assets/notfinend.jpg">
            </div>
          </div>
          <div slot="title">
            <div class="p_title">
                <span v-if="list.platform==1" >
                  <img class="img_taobao" src="../../../assets/pingduoduo.svg">
                </span>
                <span v-if="list.platform==0">
                  <img class="img_taobao" src="../../../assets/taobao.svg">
                </span>
              {{list.title||list.goods_name}}
            </div>
          </div>
          <div slot="price">
            <span class="red">
              <span>返现:¥ {{list.reward_fee||list.goodsBonus}}</span>
              <span>付款:¥ {{list.order_amount||list.goodsPrice}}</span>
            </span>
          </div>
          <div slot="desc">
            <div class="sn_order">订单号:{{list.order_sn||list.orderId}}</div>
          </div>
          <div slot="tags"></div>
          <div  slot="footer" class="footer">
            <div class="button mycolor" style="margin-right:7px;" v-if="list.platform==1" @click="express(list.order_sn)">查看物流</div>
            <div class="button mycolor" style="margin-right:7px;"  @click="Again1(list)">分享商品</div>

            <div class="button" @click="Again(list)">再来一单</div>
          </div>
        </van-card>
      
      </div>
    </template>
    <div class="scroll_top" v-cloak ref="scroll_top" @click="scroll_top">
      <van-icon size="#333" name="arrow-up"/>
      <span style="font-size:14px;">顶部</span>
    </div>
    </div>
  </van-list>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "card",
  props: {
    showCard: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 0
    },
    token: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hasMore: true,
      imageURL: "",
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      orderLists: [],
      loadingStatus: true
    };
  },
  created() {
    
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
      if (this.$route.path == "/my_orders") {
        //滚动条到底部的条件
        if (scrollTop > windowHeight) {
          this.$refs.scroll_top.style.bottom = "9%";
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
    getOrderList(data) {
      return new Promise((resolve, reject) => {
        const data2 = new FormData();
        data2.append("pageIndex", data.pageIndex++);
        data2.append("pageSize", data.pageSize);
        if(this.status!=10){
         data2.append("status", data.status);
        }
        data.token && data2.append("token", data.token);
        console.log(data2)
        this.$axios
          .post("/wechat/mobile/users-order", data2)
          .then(res => {
            if (res.data.page_count < this.pageIndex) {
              this.finished = true;
              return resolve(res.data);
            }
            this.loadingStatus = true;
            resolve(res.data);
          })
          .catch(err => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);

            this.loading = false;

            this.pageIndex = this.pageIndex - 1;
            Toast("加载数据失败");
          });
      });
    },
    onLoad(res) {
      if (this.loadingStatus) {
        this.loadingStatus = false;
        this.loading = true;
        const data = {
          pageIndex: this.pageIndex++,
          pageSize: this.pageSize,
          token: this.token
        };
        if(this.status!=10){
         data.status=this.status
        }
        console.log(data)
        this.getOrderList(data).then(res => {
          this.orderLists = this.orderLists.concat(res.data);
          this.loading = false;
        });
      }
    },
    error(err) {
      console.log(err);
    },
    Again(list){
      if(list.platform==0){
        this.$router.push({
          name:"products",
          query:{
            token:this.token,
            goods_id:list.goods_id,
            platform:list.platform
          }
        })
      }else{
         var data = {};
        if (this.$route.query.uniac_id) {
          data.uniac_id = this.$route.query.uniac_id;
        }
        this.$axios
          .get(
            "/pdd/cms/goods-details?goods_id=" +list.goods_id,
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
      }
    },
    Again1(list){
      this.$router.push({
        name:"products",
        query:{
          token:this.token,
          goods_id:list.goods_id,
          platform:list.platform,
          showqrcode:true
        }
      })
    },
    express(orderid) {
      window.location.href =
        "https://mobile.yangkeduo.com/order.html?order_sn=" + orderid;
    },

    scroll_top() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.card {
  background-color: #eee;
  text-align: left;
}
.p_title{
  line-height: 16px;
    max-height: 32px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.icon_img{
    position: relative;
    width:100%;
    height: 100%;
    margin-right: 10px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.icon_img img{
    border: 0;
    max-width: 100%;
    max-height: 100%;
}
.red {
  color: #666;
  /* font-weight: bold; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 3px;
}
.van-card__price {
  width: 100%;
  font-weight: 400
}
.van-card__content {
}
.mb5 {
  width: 95%;
  border-radius: 7px;
  overflow: hidden;
  margin: 0 auto 1rem
}
.create_time {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 12px;
  font-weight: 400;
}
.van-card__title {
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}
.van-card__bottom {
  line-height: 18px;
}
.van-card__bottom {
}
.img_taobao {
  width: 16px;
  height: 16px;
  float: left;
  margin-right: 2px
}

.sn_order {
  font-weight: 400;
  margin-top: 3px;
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.img_taobao img {
  width: 100%;
  height: 100%;
}
.align-center {
  display: flex;
  align-items: center;
}
.van-card__header {
}
.space-between {
  justify-content: space-between;
}

.van-card:not(:first-child) {
  margin-top: 0;
}

.title {
  padding: 6px 15px;
  background-color: #fff;
  height: 2.4rem;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 0;
  /* border-top: 1px solid #ebedf0; */
  background-color: #fff;
}

.button {
  overflow: hidden;
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  color: #f95e01;
  border:0.5px solid #f95e01;
  padding: 2px 7px;
  box-sizing: content-box;
}
.mycolor{
  color: #323233;
  border:0.5px solid #999;
}
.fz12 {
  font-size: 12px;
}
.van-card {
  background: white;
  padding: 0 15px;
      border-radius: 0 0 7px 7px;
}

/* 回到顶部 */
.card .scroll_top {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 50%;
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
  text-align: center;
}
</style>
