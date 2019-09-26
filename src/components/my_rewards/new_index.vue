<template>
  <div id="new_rewards" v-cloak>
    <div class="tab1">
      <div class="total">
        <span style="width:50%;">{{myreword[0].title}}:{{ myreword[0].total_reward }}元</span>
      </div>
      <div class="smalltitle">
        <span style="width:50%;">{{myreword[1].title}}</span>
      </div>
      <div class="rewardslist">
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/weishouhuo.png" />
          </div>
          <div class="lines"></div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[1].items[0].title}}</div>
          <div style="display:flex;">
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
              订单数:
              <span style="color:black;">{{myreword[1].items[0].order_count}}单</span>
            </div>
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw;margin-left:10px">
              返现金额:
              <span style="color:black;">{{myreword[1].items[0].reward}}元</span>
            </div>
          </div>

          <div style="color:#999">{{myreword[1].items[0].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/queshouhuo.png" />
          </div>
          <div class="lines"></div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[1].items[1].title}}</div>
          <div style="display:flex;">
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
              订单数:
              <span style="color:black;">{{myreword[1].items[1].order_count}}单</span>
            </div>
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw;margin-left:10px">
              返现金额:
              <span style="color:black;">{{myreword[1].items[1].reward}}元</span>
            </div>
          </div>
          <div style="color:#999">{{myreword[1].items[1].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/queshouhuo.png" />
          </div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[1].items[2].title}}</div>
           <div style="display:flex;">
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
              订单数:
              <span style="color:black;">{{myreword[1].items[2].order_count}}单</span>
            </div>
            <div style="font-size:4vw;color: #fb6921;margin-top:1vw;margin-left:10px">
              返现金额:
              <span style="color:black;">{{myreword[1].items[2].reward}}元</span>
            </div>
          </div>
          <div style="color:#999">{{myreword[1].items[2].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/jiesuan.png" />
          </div>
          <div class="lines" style="top:65%"></div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">
            {{myreword[1].items[3].title}}
            <span style="font-size:4vw;color:black;margin-top:1vw"></span>
          </div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            金额:
            <span style="color:black">{{myreword[1].items[3].reward}}元</span>
          </div>
          <div style="color:#999">{{myreword[1].items[3].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/jiesuan.png" />
          </div>
          <div class="lines"></div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">
            {{myreword[1].items[4].title}}
            <span style="font-size:4vw;color:black;margin-top:1vw"></span>
          </div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            金额:
            <span style="color:black">{{myreword[1].items[4].reward}}元</span>
          </div>
          <div style="color:#999">{{myreword[1].items[4].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/jiesuan.png" />
          </div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">
            {{myreword[1].items[5].title}}
            <span style="font-size:4vw;color:black;margin-top:1vw"></span>
          </div>
          <div style="font-size:4vw;color:#fb6921;margin-top:1vw">
            金额:
            <span style="color:black">{{myreword[1].items[5].reward}}元</span>
          </div>
          <div style="color:#999">{{myreword[1].items[5].hint}}</div>
        </div>
      </div>
      <div class="rewardslist">
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/sign-in.svg" />
          </div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[2].title}}</div>
          <p style="color:#fb6921;margin:0;">
            累计奖励:
            <span style="color:black">{{myreword[2].reward}}元</span>
          </p>
          <p style="color:#fb6921;margin:0;">
            签到次数:
            <span style="color:black">{{myreword[2].sign_count}}</span>
          </p>
          <p style="color:#fb6921;margin:0;">
            每日签到奖励:
            <span style="color:black">{{myreword[2].reward_per_sign}}元</span>
          </p>

          <p style="color:#999;margin:0;font-size:13px" v-html="myreword[2].hint"></p>
        </div>
      </div>
      <div class="rewardslist" style="margin-top:0px">
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/daijiesuan.png" />
          </div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[3].title}}</div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            好友订单数:
            <span style="color:black">{{myreword[3].friend_order_count}}单</span>
          </div>
          <div style="font-size:4vw;color:#fb6921;margin-top:1vw">
            好友未收货奖励:
            <span style="color:black">{{myreword[3].friend_unrecive}}元</span>
          </div>
          <div style="font-size:4vw;color:#fb6921;margin-top:1vw">
            好友已收货奖励:
            <span style="color:black">{{myreword[3].friend_receive}}元</span>
          </div>
          <div style="font-size:4vw;color:#fb6921;margin-top:1vw">
            已结算奖励:
            <span style="color:black">{{myreword[3].friend_settled}}元</span>
          </div>
          <div style="color:#999">{{myreword[3].hint}}</div>
        </div>
        <div class="card_height"></div>
        <div class="rewardcard">
          <div class="wei_icon">
            <img src="../../assets/tuiguang.png" />
          </div>
          <div class="sanjiao"></div>
          <div style="font-size:4vw;color: rgb(245, 17, 47);">{{myreword[4].title}}</div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            推广商品数:
            <span style="color:black">{{ myreword[4].promo_goods_count }}件</span>
          </div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            推广订单数:
            <span style="color:black">{{ myreword[4].promo_order_count }}单</span>
          </div>
          <div style="font-size:4vw;color: #fb6921;margin-top:1vw">
            推广总收益:
            <span style="color:black">{{ myreword[4].promo_total_reward }}元</span>
          </div>
          <div style="color:#999">{{myreword[4].hint}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      infos: {},
      token: "",
      myreword: [
        {
          title: "累计总收益",
          total_reward: 0.0
        },
        {
          items: [
            {
              hint: "收到商家包裹后，记得在商城APP中确认收货哦~",
              order_count: 0,
              reward: 0,
              title: "未确认收货订单"
            },
            {
              hint:
                "这些订单收益如果满{.2f}元，在本月22号系统将自动转账您的微信零钱中~",
              order_count: 0,
              reward: 0.0,
              title: "上月确认收货订单"
            },
            {
              hint: "",
              order_count: 0,
              reward: 0.0,
              title: "本月确认收货订单"
            },
            {
              hint: "这些金额已经结算到您的微信零钱中~",
              order_count: null,
              reward: 0.0,
              title: "结算成功"
            },
            {
              hint: "如果返现未满5.00元，您可继续下单，满5.00元后一并结算",
              order_count: null,
              reward: 0.0,
              title: "结算中"
            },
            {
              hint: "结算金额过大或结算时系统出错，请联系客服确认转账",
              order_count: null,
              reward: 0.0,
              title: "结算失败"
            }
          ],
          title: "我的下单收益"
        },
        {
          hint: "消息界面回复【签到】签到即可领取每日奖励",
          reward: 0.0,
          reward_per_sign: 0.02,
          sign_count: 0,
          title: "我的签到"
        },
        {
          friend_count: 0,
          friend_order_count: 0,
          friend_receive: 0.0,
          friend_settled: 0.0,
          friend_unrecive: 0.0,
          hint: "好友每次下单您都可以系统的额外返现！",
          title: "我的好友"
        },
        {
          hint: "推广商品,好友领优惠券你拿返现",
          promo_goods_count: 0,
          promo_order_count: 0,
          promo_total_reward: 0,
          title: "我的推广"
        }
      ],
      signin: "",
      fee: null,
      count: 0
    };
  },
  created() {
    this.token = this.$route.query.token;
    window.document.title = "我的收益";
    this.getInfos();
    this.getcheck();
  },
  filters: {
    number: function(value) {
      if (value == null) {
        value = 0;
      }
      return value;
    }
  },
  methods: {
    getInfos() {
      this.$axios
        .post("wechat/mobile/users-pdd-reward?token=" + this.token)
        .then(res => {
          console.log(res);
          this.myreword = res.data.data;
        });
    },
    getcheck() {
      this.$axios
        .get("wechat/mobile/sign-in", {
          headers: {
            "access-token": this.token
          }
        })
        .then(res => {
          console.log(res);

          this.signin = res.data.sign_in;
          this.fee = this.signin.sign_fee;
          if (this.signin.sign_info.length > 0) {
            this.count = this.signin.sign_info.length;
          } else {
            this.count = 0;
          }
        });
    }
  }
};
</script>

<style  scoped>
#new_rewards {
  height: 100%;
  background: #eee;
}
.tab1 {
  padding: 4vw 3vw;
  background: #eee;
}
[v-cloak] {
  display: none;
}
.gray_font {
  font-weight: bold;
}
.total {
  text-align: left;
  font-size: 5vw;
  color: rgb(245, 17, 47);
}
.smalltitle {
  text-align: left;
  padding-left: 10px;
  color: rgb(245, 17, 47);
  margin-top: 10px;
  font-size: 4.5vw;
}
.card_height {
  width: 100%;
  height: 3vh;
  position: relative;
}
.rewardslist {
  margin-top: 4vw;
  padding-left: 16vw;
  position: relative;
}
.van-tabs__wrap {
  z-index: 120;
}
.lines {
  height: 100%;
  border-right: 1px solid rgb(245, 17, 47);
  position: absolute;
  left: -9.5vw;
  top: 56%;
  z-index: 90;
}
.rewardcard {
  position: relative;
  text-align: left;
  background: white;
  padding: 2vw;
  box-shadow: 0 4px 5px -1px grey;
}
.sanjiao {
  border: 1.5vw solid transparent;
  border-right: 1.5vw solid white;
  position: absolute;
  left: -3vw;
  top: 50%;
  transform: translateY(-50%);
}
.wei_icon {
  border: 1px solid #d81e06;
  position: absolute;
  border-radius: 50%;
  padding: 2vw;
  left: -14vw;
  background: #eee;
  width: 5vw;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vw;
  z-index: 100;
}
.wei_icon img {
  width: 100%;
  height: 100%;
}
</style>
