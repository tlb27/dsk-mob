<template>
  <van-row  class="list-wrap fz14 shadow-bd">
      <div class="buju-row topju" >
        <div class="mt1"><span v-if="status!='支付成功'"><span class="error">{{status}}</span></span>
        <span v-else ><span class="success">{{status}}</span></span><span style="margin-left:10px;color:red;font-weight:bold;font-size:14px">¥{{price}}</span></div>
        
      </div>
        <div>支付方式：{{type}}</div>
        <div>结算方式：<span style="color:orange">{{settle_mode}}</span></div>
      <van-row class="topju myfont">开始结算：{{start_time}}</van-row>
      <van-row class="topju myfont" v-if="end_time">完成结算：{{end_time}}</van-row>
      <span class="hit topju">{{hint}}</span>
  </van-row>
</template>

<script>
  export default {
    name: "list",
    props:{
      status:{
        type:String,
        default: "",
      },
      hint:{
        type:String,
        default: "",
      },
       end_time:{
        type:String,
        default: "",
      },
       start_time:{
        type:String,
        default: "",
      },
      price:{
        type:[String,Number],
        default:0
      },
      type:{
        type:String,
        default:'微信提现'
      },
      settle_mode:{
        type:String,
        default:''
      },
    }
  }
</script>

<style scoped>
  .list-wrap{
    background-color: #fff;
    padding:1rem .8rem;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom:.8rem;
    width: 95%;
    text-align: left;
    border-radius: 10px;
  }
  .success{
    color: #2AC845;
  }
  .title_time{
    padding:0px 0px 5px;
    border-bottom: 1px solid #eee;
  }
  .buju-col{
    display: flex;
    flex-direction: column;
    align-items: flex-start
  }
  .buju-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .error{
    color: red;
  }
  .topju{
    margin-top: 3px;
  }
  .shadow-bd{
    box-shadow:0 2px #eee
  }
  .hit{
    color: #999;
    font-size: 12px;
  }
  .myfont{
    font-size: 12px;
  }
</style>
