import Vue from 'vue'
import Router from 'vue-router'
// import home from "@/components/home"
import notfound from "@/components/404"
// import search from "@/components/search/search"
// import searchlist from "@/components/search/searchlist"
// import onbanner from "@/components/onbanner"
// import products from '@/components/products/products'
// import promo from '@/components/promo/pro_detail'
// import personal from '@/components/personal/person_index'
// import telphone from '@/components/personal/tel_phone'
// import server from '@/components/personal/server'
// import friend from '@/components/personal/friend_list'
// import qrcode from '@/components/personal/my_qrcode'
// import active from '@/components/activity/618active'
// import xrfl from '@/components/activity/fuli'

// import recommend from '@/components/theme/theme'
// import settlement_records from '@/components/settlement_records/index'
// import my_new_rewards from '@/components/my_rewards/new_index'
// import my_orders from '@/components/my_orders/index'
// import tb_auth from '@/components/fetch_auth/index'


Vue.use(Router)
export default new Router({
//  mode: 'history',
  
  // base:"/pdd/",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {path: "/home", name: "home", component:resolve => require(['@/components/home'],resolve),meta: {
      keepAlive: true // 需要被缓存
    }},
    // 搜索
    {path: "/search", name: "search", component: resolve => require(['@/components/search/search'],resolve)},
    // 一拆多分类
    {path: "/onbanner", name: "onbanner", component:  resolve => require(['@/components/onbanner'],resolve)},
    // 查询列表
    {path: "/searchlist", name: "searchlist", component:   resolve => require(['@/components/search/searchlist'],resolve)},

    //结算记录
    {
      path: "/settlement_records",
      name: "settlement_records",
      component: resolve => require(['@/components/settlement_records/index'],resolve)
    },
    // 收益
    {path:"/my_new_rewards",name:"my_new_rewards",component:resolve => require(['@/components/my_rewards/new_index'],resolve)},
    //我的订单
    {
      path: "/my_orders",
      name: "my_orders",
      component:resolve => require(['@/components/my_orders/index'],resolve)
    },

    //淘宝授权
    {
      path: "/tb_auth",
      name: "tb_auth",
      component: resolve => require(['@/components/fetch_auth/index'],resolve)
    },
    //客服推广
    {
      path:"/recommend",
      name:'recommend',
      component:resolve => require(['@/components/theme/theme'],resolve),
    },
    // 推广页面
    {
      path: "/promo",
       name: "pro_detail", 
       component: resolve => require(['@/components/promo/pro_detail'],resolve)
    },
    {//中间推广二维码
      path: "/theme-promo",
       name: "zjqrcode", 
       component: resolve => require(['@/components/theme/zjqrcode'],resolve)
    },
    //618活动
    { path:"/active",name:"activity",component: resolve => require(['@/components/activity/618active'],resolve)},
      {path:"/welfare",name:"welfare",component:resolve => require(['@/components/activity/fuli'],resolve)},
    //测试 商品详细信息
    {path: "/products", name: "products", component: resolve => require(['@/components/products/products'],resolve)},
    //个人中心
    {path: "/personal", name: "personal", component: resolve => require(['@/components/personal/person_index'],resolve)},
    // 个人手机号绑定
    {path: "/personal/telphone", name: "telphone", component: resolve => require(['@/components/personal/tel_phone'],resolve)},
    // 客服
    {path: "/personal/server", name: "server", component:  resolve => require(['@/components/personal/server'],resolve)},
    // 好友
    {path: "/personal/friend", name: "friend", component:  resolve => require(['@/components/personal/friend_list'],resolve)},
    // 二维码
    {path: "/personal/qrcode", name: "qrcode", component:  resolve => require(['@/components/personal/my_qrcode'],resolve)},
    {path:"/personal/privacy",name:"privacy",component: resolve =>require(["@/components/personal/privacy"],resolve)},
    {path:"/personal/program",name:"program",component:resolve=>require(["@/components/personal/program"],resolve)},
    {path:"/wechat_jupm",name:"wechat",component:resolve=>require(["@/components/wechat_jump"],resolve)},
    {path: "*", component: notfound},
  ],
  // strict: process.env.NODE_ENV !== 'production'
})
