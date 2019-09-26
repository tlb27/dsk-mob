<template>
  <div id="search">
    <div>
      <form action="/">
        <van-search
          id="input"
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          background="#eee"
          @search="onSearch"
          @cancel="onCancel"
          @focus="onfocus"
          @blur="fixScroll"
          @input="oninput"
        >
          <div v-if="issearch" slot="action" @click="onSearch">搜索</div>
        </van-search>
      </form>
    </div>
    <div class="klword" v-show="!showkword">
        <ul class="kword_list">
            <li v-for="(title,w) of kword_list" :key="w" @click.stop.prevent="onkword(title[0])"><span style="vertical-align: baseline;">{{title[0]}}</span><span class="list_img"><img style="color:red" src="../../assets/top_left.svg"></span></li>
        </ul>
    </div>
    <div v-show="showkword" class="hot">
      <p style="text-align:left;margin-bottom:15px;">热门搜索</p>
      <div v-for="(item,index) in hot_tabs" >
        <van-tag
          color="#f8f8f8"
          class="tabs"
          @click="tabsearch(item.tip)"
          v-cloak
          round
        >{{item.tip}}</van-tag>
      </div>
      <p class="history">
        搜索历史
        <span style="float:right">
          <img src="../../assets/delete.svg" style="width:13px;height:13px" @click="deleted()">
        </span>
      </p>
      <div v-for="(item,index) in more_tabs" >
        <van-tag
          color="#f8f8f8"
          text-color="black"
          class="tabs"
          @click="tabsearch(item)"
          v-cloak
          round
        >{{item}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { saveSearch } from "@/assets/cache.js"; //保存查询记录
import storage from "good-storage";//缓存

export default {
  data() {
    return {
      value: "",
      issearch: false,
      hot_tabs: [],
      more_tabs: [],
      showkword:true,
      token:"",
      value:"",
      kword_list:[]
    };
  },
  created() {
      this.token=this.$route.query.token
      this.value=this.$route.query.value

      if (this.value!= ""&&this.value!=undefined) {
        this.issearch = true;
        this.showkword=false
        if(this.value!=undefined){
          this.gettaobao()
        }
      } else {
        this.issearch = false;
        this.showkword=true
      }
   //请求热门搜索接口
    this.$axios
      .get("/pdd/cms/top-keywords", {
        headers: {
          "access-token":this.token
        }
      
      })
      .then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.hot_tabs.push({ tip: res.data.data[i] });
        }
      });
    let searches = storage.get("_search_");
    if (searches != undefined) {
      this.more_tabs = searches;
    }
  },
  mounted() {
     window.scrollTo(0, 0);
    document.getElementById("input").focus();
  },
  methods: {
    fixScroll(){
      let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          window.scrollTo(0, 0);
        }
    },
    onCancel() {
      // window.history.back()
      this.$router.push("/home?token="+this.token)
    },
    onkword(title){
      this.value=title
      saveSearch(this.value);
      this.$router.push("/searchlist?value="+this.value+"&token="+this.token)
    },
    onSearch() {
      if (this.value != "") {
        saveSearch(this.value);
        this.$router.push("/searchlist?value="+this.value+"&token="+this.token)
      }
    },
    tabsearch(tip) {
      this.value = tip;
      saveSearch(this.value);
      this.onSearch();
    },
    deleted() {
      storage.remove("_search_");
      this.more_tabs = [];
    },
    onfocus() {
      let searches = storage.get("_search_");
      if (searches != undefined) {
        this.more_tabs = searches;
      }
    },
    gettaobao(){
      this.$jsonp("https://suggest.taobao.com/sug",
            {q:this.value,
            code: 'utf-8'}
          ).then((res)=>{
           this.kword_list=res.result
          })
    },
    oninput() {
      if (this.value.trim() == "") {
        this.issearch = false;
        this.showkword=true
      } else {
        this.issearch = true;
        this.showkword=false
      }
      this.gettaobao()
    }
  }
};
</script>

<style>
#search{
  height:100%;
  background:#eee;
}
#search .klword{
  height: 100%;
  background: white;
  border-radius: 15px;
}
#search .van-search__content{
  background: white
}
#search .list_img{
  display: inline-block;
  width: 6vw;
  height:6vw;
  vertical-align: baseline;
}
#search .list_img img{
  width:100%;
  height: 100%;
}
#search .hot {
  overflow: hidden;
  padding: 0 15px;
  height: 100%;
  border-radius: 15px;
  background: white;
}
#search .kword_list{
  list-style: none;
  text-align: left;
  padding:3vw 5vw 
}
#search .kword_list li{
  padding: 2vw 0;
border-bottom: 1px solid #eee;
display: flex;
justify-content: space-between;
align-items:center;
}
#search .van-tag {
  float: left;
  padding: 8px 15px;
  border-radius: 20px;
  color: black;
  font-size: 13px;
  margin: 0 5px 10px 0;
}
#search .history {
  margin-bottom: 20px;
  clear: both;
  text-align: left;
}
</style>
