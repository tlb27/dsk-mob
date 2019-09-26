<template>
  <div class="bg-gray">
    <template v-if="showlist">
      <!-- 提现记录 -->
        <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="暂无更多"
              @load="onLoad"
            >
      <list
          v-for="(item,index) in data_lists"
          :key="index"
          :status="item.status"
          :price="item.fee"
          :hint="item.hint"
          :type="item.pay_type"
          :start_time="item.settle_start_time"
          :end_time="item.settle_end_time"
          :settle_mode="item.settle_mode"
      />
        </van-list>
    </template>
    <template v-else>
      <div class="no-record">
        <p>
          暂无结算记录!
        </p>
        <van-button @click="back" size="small" type="warning">
          返回
        </van-button>
      </div>
    </template>
  </div>
</template>

<script>
  import list from './components/list'

  export default {
    name: "index",
    components: {
      list
    },
    data() {
      return {
        token: '',
        data_lists: [],
        page_size:15,
        page_no:1,
        showlist:true,
        loading: false,
        finished: false,
      }
    },
    created() {
      this.token = this.$route.query.token
         window.document.title='结算记录'
    },
     mounted() {
      this.getList()
    },
    methods: {
      onLoad(){
         const data = new FormData()
        data.append('token', this.token)
        data.append("page_size", this.page_size)
        data.append("page_no",this.page_no+1)
        this.$axios.post('/wechat/mobile/users-cash-list', data,{
          headers: {
            "access-token": this.token,
          }
        })
          .then(res => {
            if(res.data.error==0){
              this.data_lists = this.data_lists.concat(res.data.data.list||[])
              this.page_no++
              this.loading = false;
              if(res.data.data.list.length<this.page_size){
                this.finished=true
              }
            }else{
              this.loading = false;
              this.finished = true;
            }
          })
      },
      back(){
        this.$router.go(-1)
      },
      getList() {
        const data = new FormData()
        data.append('token', this.token)
        data.append("page_size", this.page_size)
        data.append("page_no",1)
        this.$axios.post('/wechat/mobile/users-cash-list', data,{
          headers: {
            "access-token": this.token,
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.error==0){
                this.data_lists = res.data.data.list||[]
               if(this.data_lists.length>0){
                 this.showlist=true
               }else{
                 this.showlist=false
               }
            }else{
              this.showlist=false
            }
          })
      }
    }
  }
</script>

<style scoped>
  .bg-gray {
    background-color: #f7f7f7;
    padding-top:.8rem;
  }

  .no-record {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 18px;
  }

</style>
