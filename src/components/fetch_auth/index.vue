<template>
  <div>
      跳转淘宝授权...
  </div>
</template>

<script>
  import {showPop} from "../../utils/taobao_pop";

  export default {
    name: "index",
    created(){
      showPop().then(res=>{

        if (!res){
          this.$axios.get('/wechat/top-taobao',{
            params:{
              token:'oogo8sI10YJ8ARB-13fghT9cuDQyXbA'
            }
          }).then(res=>{
            if (res.data.url) {
              window.location.href = 'taobao://'+res.data.url

            }else{
              this.$router.go(-1)
            }
          }).catch(err=>{
            this.$router.go(-1)
          })
        }
      })
    }
  }
</script>

<style scoped>

</style>
