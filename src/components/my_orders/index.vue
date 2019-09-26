<template>
  <van-tabs class="tabs" style="height:100%;background:#eee" sticky swipeable :line-width="50" background="#eee"  v-model="active">
    <van-tab title="所有订单">
      <div class="clear_border"></div>
      <myCard :show-card="active===0" :token="token" :status="10"/>
    </van-tab>
    <van-tab title="未收货">
      <div class="clear_border"></div>
      <myCard :show-card="active===1" :token="token" :status="5"/>
    </van-tab>
    <van-tab title="已收货">
      <div class="clear_border"></div>
      <myCard :show-card="active===2" :token="token" :status="1"/>
    </van-tab>
    <van-tab title="已结算">
      <div class="clear_border"></div>
      <myCard :show-card="active===3" :token="token" :status="4"/>
    </van-tab>
    <van-tab title="已失效">
      <div class="clear_border"></div>
      <myCard :show-card="active===4" :token="token" :status="-3"/>
    </van-tab>
  </van-tabs>
</template>

<script>
  import {showPop} from '@/utils/taobao_pop'
  import myCard from './components/card'

  export default {
    name: "index",
    components:{
      myCard
    },
    data() {
      return {
        active: 0,
        token:''
      }
    },
    created(){
      this.token = this.$route.query.token
      window.document.title="我的订单"
    },
    methods:{
      showPop,
    }
  }
</script>

<style scoped>
.tabs{
  min-height:99vh;
  margin-bottom: 0;
  box-sizing:border-box;
}
.clear_border{
  border-bottom: 5px solid #eee
}
</style>
