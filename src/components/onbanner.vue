<template>
  <div class="products" v-cloak>
    <div class="top_img">
      <img style="width:100%;height:100%" :src="banner_img" />
    </div>
    <van-list
      v-if="$route.query.title=='天猫'||$route.query.title=='拼多多'||$route.query.title=='聚划算'"
      v-model="loading"
      :immediate-check="true"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <card1 :data="bannerlist" />
    </van-list>
    <van-list
      v-if="$route.query.title=='淘抢购'"
      v-model="loading"
      :immediate-check="true"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad1"
    >
      <card2 :data="bannerlist" />
    </van-list>
    <div class="scroll_top" ref="scroll_top" @click="scroll_top">
        <van-icon size="#333" name="arrow-up"/>
        <span style="font-size:14px;">顶部</span>
      </div>
  </div>
</template>

<script>
import card1 from "@/components/card/card1";
import card2 from "@/components/card/card2";
export default {
  components: { card1, card2 },
  data() {
    return {
      theme_id: "",
      url: "",
      loading: false,
      page: 1,
      page_size: 10,
      finished: false,
      title: "",
      bannerlist: [],
      token: ""
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.banner_img = this.$route.query.banner_img;
    this.token = this.$route.query.token;
    if(this.title=="拼多多"){
      window.document.title = "拼多多";
    }else if(this.title=="聚划算"){
      window.document.title="聚划算"
    }else if(this.title=="天猫"){
      window.document.title="天猫"
    }else{
      window.document.title="淘抢购"
    }
    // if(this.title=='拼多多'&&window.sessionStorage.getItem("pdd_page")){
    //   let pdd_position = window.sessionStorage.getItem("pdd_position");
    //   window.scroll(0, pdd_position);
    //   this.page=window.sessionStorage.getItem("pdd_page")
    //   this.bannerlist=JSON.parse(window.sessionStorage.getItem("pdd_bannerlist"))
    // }else if(this.title=='聚划算'&&window.sessionStorage.getItem("jhs_page")){
    //    let jhs_position = window.sessionStorage.getItem("jhs_position");
    //   window.scroll(0, jhs_position);
    //   this.page=window.sessionStorage.getItem("jhs_page")
    //   this.bannerlist=JSON.parse(window.sessionStorage.getItem("jhs_bannerlist"))
    // }else if(this.title=='天猫'&&window.sessionStorage.getItem("tm_page")){
    //   let tm_position = window.sessionStorage.getItem("tm_position");
    //   window.scroll(0, tm_position);
    //   this.page=window.sessionStorage.getItem("tm_page")
    //   this.bannerlist=JSON.parse(window.sessionStorage.getItem("tm_bannerlist"))
    // }else if(this.title=='淘抢购'&&window.sessionStorage.getItem("tqg_page")){
    //   let tqg_position = window.sessionStorage.getItem("tqg_position");
    //   window.scroll(0, tqg_position);
    //   this.page=window.sessionStorage.getItem("tqg_page")
    //   this.bannerlist=JSON.parse(window.sessionStorage.getItem("tqg_bannerlist"))
    // }
  },
    beforeRouteEnter(to,from,next){
    if(to.name=="onbanner"){
     
      next()
    }
  },

  beforeRouteLeave(to,from,next){
     if(from.name=="onbanner"&&from.query.title=='拼多多'){
        let pdd_position = window.scrollY;
        window.sessionStorage.setItem("pdd_position", pdd_position);
       window.sessionStorage.setItem("pdd_bannerlist",JSON.stringify(this.bannerlist))
       window.sessionStorage.setItem("pdd_page",this.page)
     }else if(from.name=="onbanner"&&from.query.title=='聚划算'){
       let jhs_position = window.scrollY;
        window.sessionStorage.setItem("jhs_position", jhs_position);
       window.sessionStorage.setItem("jhs_bannerlist",JSON.stringify(this.bannerlist))
       window.sessionStorage.setItem("jhs_page",this.page)
     }else if(from.name=="onbanner"&&from.query.title=='天猫'){
        let tm_position = window.scrollY;
        window.sessionStorage.setItem("tm_position", tm_position);
       window.sessionStorage.setItem("tm_bannerlist",JSON.stringify(this.bannerlist))
       window.sessionStorage.setItem("tm_page",this.page)
     }else if(from.name=="onbanner"&&from.query.title=='淘抢购'){
       let tqg_position = window.scrollY;
        window.sessionStorage.setItem("tqg_position", tqg_position);
       window.sessionStorage.setItem("tqg_bannerlist",JSON.stringify(this.bannerlist))
       window.sessionStorage.setItem("tqg_page",this.page)
     }
     next()
  },
  methods: {
    onLoad() {
      //滚动加载
      this.finished = false;
      var i = this.page;
      
      if (this.$route.query.title == "天猫") {
          let queryParams3 = new FormData();
      queryParams3.append("page_size", this.page_size);
      queryParams3.append("page", i);
      queryParams3.append("platform", 0);
      queryParams3.append("is_tmall", 1);
        this.$axios
          .post("/pdd/cms/goods", queryParams3, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              this.bannerlist = this.bannerlist.concat(res.data.data);
              this.page++;
              this.loading = false;
            } else {
              this.loading = false;
              this.finished = true;
            }
          });
      }else if(this.$route.query.title=="拼多多"){
            let queryParams1 = new FormData();
            queryParams1.append("page_size", this.page_size);
            queryParams1.append("page", i);
            queryParams1.append("platform", 1);
        this.$axios
          .post("/pdd/cms/goods", queryParams1, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              this.bannerlist = this.bannerlist.concat(res.data.data);
              this.page++;
              this.loading = false;
            } else {
              this.loading = false;
              this.finished = true;
            }
          });
      }else if(this.$route.query.title=="聚划算"){
               let queryParams3 = new FormData();
      queryParams3.append("page_size", this.page_size);
      queryParams3.append("page", i);
      queryParams3.append("platform", 0);
      queryParams3.append("material", 1);
        this.$axios
          .post("/pdd/cms/goods", queryParams3, {
            headers: {
              "access-token": this.token,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              this.bannerlist = this.bannerlist.concat(res.data.data);
              this.page++;
              this.loading = false;
            } else {
              this.loading = false;
              this.finished = true;
            }
          });
      }
    },
    onLoad1() {
      //滚动加载
      this.finished = false;
      var i = this.page;
      console.log(this.$route.query.title)
      if(this.$route.query.title=="淘抢购"){
          let queryParams3 = new FormData();
      queryParams3.append("page_size", this.page_size);
      queryParams3.append("page", i);
      this.$axios
        .post("/pdd/cms/tbk-tqg", queryParams3, {
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          if (res.data.data.length > 0) {
            this.bannerlist = this.bannerlist.concat(res.data.data);
            this.page++;
            this.loading = false;
          } else {
            this.loading = false;
            this.finished = true;
          }
        });
      }
    //   else if(this.$route.query.title=="聚划算"){
    //     let queryParams3 = {};
    //   queryParams3.page_size= this.page_size;
    //   queryParams3.page=i
    //   queryParams3.status=2
    //   this.$axios
    //     .get("/pdd/cms/ju-item", {
    //       headers: {
    //         "access-token": this.token,
    //       }, params:queryParams3
    //     })
    //     .then(res => {
    //       if (res.data.data.length > 0) {
    //         this.bannerlist = this.bannerlist.concat(res.data.data);
    //         this.page++;
    //         this.loading = false;
    //       } else {
    //         this.loading = false;
    //         this.finished = true;
    //       }
    //     });

    //   }
      
    },
    old() {
      let queryParams = new FormData();
      queryParams.append("theme_id", this.theme_id);
      this.$axios
        .post("/pdd/cms/goods-theme", queryParams, {
          headers: {
            "access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.bannerlist = res.data.data;
          console.log(this.bannerlist);
        });
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
.products {
  background: #eee;
  width: 100%;
}
.top_img {
  width: 100%;
  height: 176px;
  display: flex;
  margin-bottom: 12px;
}
.title {
  text-align: left;
  padding-left: 14px;
  font-size: 18px;
  margin-bottom: 14px;
}
.scroll_top {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 50%;
  opacity: 1;
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
}
</style>
