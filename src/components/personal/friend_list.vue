<template>
  <div id="friend">
    <table></table>
    <div class="bg_fenx" v-if="showbg">
      <h4 style="color:#666;font-size:6vw">你还没有邀请过好友！</h4>
      <div class="bg_text">
        <van-button @click.stop.prevent="tomyqrcode" type="warning">去邀请好友</van-button>
      </div>
    </div>
    <div class="friend_grid" v-if="!showbg">
      <div class="bg_clear"></div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了,点击下方按钮" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
        <div class="friends_list" v-for="(item,i) in list" :key="i">
          <div class="friend_avater">
            <img :src="item.avatar">
          </div>
          <div class="friend_title">
            <div class="friend_row">
              <span class="small_font">{{item.nickname}}</span>
              <span class="small_font">关注时间:{{item.created_time|time}}</span>
            </div>
            <div class="friend_row">
              <span class="small_font">订单数:{{item.order_count}}</span>
              <span class="small_font">我的奖金:{{item.friend_reward}}元</span>
            </div>
          </div>
        </div>
       
      </van-list>
       <van-button v-show='finishtext' @click.stop.prevent="tomyqrcode" type="warning">去邀请好友</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showbg: false,
      list: [],
      loading: false,
      finished: false,
      token:"",
      page_no:1,
      page_size:10,
      finishtext:false
    };
  },
  created() {
    window.document.title="好友列表"
    this.token=this.$route.query.token
  },
  filters:{
    time:function(value){
      var val=value.split(" ")[0]
      return val
    },
    phone:function(value){
      if(value==""){
        var val="未设置"
      }else{
        var val=value
      }
      return val
    }
  },
  methods: {
  tomyqrcode(){
    this.$router.push({
      name:"qrcode",
      query:{token:this.token}
    })
  },
  onLoad() {
      // 异步更新数据
      let data =new FormData()
      data.append("token",this.token)
      data.append("page_no",this.page_no)
      data.append("page_size",this.page_size)
      this.$axios.post("wechat/mobile/friends-list",data).then(res=>{
        if(res.data.count==0){
          this.showbg=true
        }
        this.list=this.list.concat(res.data.data)
        this.page_no++
        this.loading=false
        console.log(res)
        if (res.data.data.length < this.page_size) {
          this.loading = false;
          this.finished = true;
          this.finishtext=true;
        }
      })
        // 加载状态结束

        // 数据全部加载完成
        
    }
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
#friend {
  height: 100%;
  background: #eeeeee;
}
#friend .bg_fenx {
  width: 90%;
  margin: 50% auto;

  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
#friend .bg_clear {
  width: 100vw;
  height: 4vw;
}
#friend .bg_text {
  color: #555555;
}
#friend .bg_text > .mybtn {
  color: white;
  font-size: 15px;
  width: 50%;
  border-radius: 5px;
  background: #fb5e19;
}
#friend .friend_grid {
  width: 100%;
}
#friend .friends_list {
  width: 100%;
  background: rgba(250, 255, 255, 0.87);
  display: flex;
  flex-direction: row;
  padding: 2vw 0 2vw 5vw;
  box-sizing: border-box;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}
#friend .friend_avater {
  width: 15%;
  padding-bottom: 15%;
  height: 0;
  position: relative;
}
#friend .friend_avater img {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10%;
  top: 0;
  left: 0;
}
#friend .friend_title {
  width: 80%;
  display: flex;
  color: #666;
  flex-direction: column;
  align-items: flex-start;
}
#friend .friend_title .friend_row {
  margin-bottom: 2vw;
  width: 100%;
  font-size: 3vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#friend .small_font {
  width: 50%;
  text-align: left;
}
</style>
