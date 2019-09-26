<template>
  <div class="bt10 auth">
    <div class="title">淘宝授权</div>
    <div>更多优惠券，更便捷的服务</div>
    <div class="content">
      <div class="auth-tips">授权后：</div>
      <div>为您提供海量淘宝优惠券</div>
      <div>淘宝订单自动同步，无需手动绑定</div>
    </div>
    <div class="footer">
      <button>暂不需要，只看拼多多商品</button>
      <button @click="toAuth">去授权</button>
    </div>
  </div>
  <!--<van-panel class="panel" title="淘宝授权" desc="更多优惠券,更便捷的服务">-->
    <!--<div class="content">-->
      <!--<div class="auth-tips">授权后：</div>-->
      <!--<div>为您提供海量淘宝优惠券</div>-->
      <!--<div>淘宝订单自动同步，无需手动绑定</div>-->
    <!--</div>-->
  <!--</van-panel>-->
</template>

<script>
  export default {
    name: "taobao_auth",
    props: {
      showTaobao: {
        type: Boolean,
        default: true
      },
    },
    methods:{
      toAuth(){

        this.$router.push({
          name:'tb_auth'
        })
        this.$emit('update:showTaobao',false)
        return false
      }
    }
  }
</script>

<style scoped>
  .panel{
    text-align: left;
  }
  .bt10 {
    border-top: 10px solid #f4f4f4;
  }
  .auth{
    padding:0 5%;
    background-color: #fff;
  }
  .title{
    font-size: 2.4rem;
    /*margin-bottom: 5px;*/
  }
  .content{
    text-align: left;
    line-height: 20px;
  }
  .auth-tips ~div{
    text-indent: 2em;
  }
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  button{
    border:1px solid #eeeeee;
    background-color: #fafafa;
    padding: 6px 12px ;
    border-radius:4px
  }
  button:active{
    background-color: #f2f2f2;
  }
</style>
