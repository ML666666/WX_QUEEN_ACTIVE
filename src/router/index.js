import Vue from 'vue'
import Router from 'vue-router'
import TIndex from '@/page/Index/Index'
import toGetGold from '@/page/toGetGold/toGetGold'
import register from '@/page/register/register'
import toStart from '@/page/toStart/toStart'
import FillAddress from '@/page/Filladdress/Filladdress'
import newClientLogin from '@/page/NewClient/Login/Login'
import newClientMain from '@/page/NewClient/main/main'
import newClientResult from '@/page/NewClient/result/result'
import newClientreLoad from '@/page/NewClient/reLoad/reLoad'
import getOpenId from '@/page/getOpenId'
import getNewClientOpenId from '@/page/getNewOpenId'
import toShare from '@/page/toShare/toShare'
import lottery from '@/page/lottery/lottery'
import newClientIndex from '@/page/NewClient/index/index'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'getOpenId',
      component: getOpenId
    },
    {
      path: '/getOpenId',
      name: 'getOpenId',
      component: getOpenId
    },
    {
      path: '/newClient/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/getNewClientOpenId',
      name: 'getNewClientOpenId',
      component: getNewClientOpenId
    },
    {
      path: '/newClient/newClientIndex',
      name: 'newClientIndex',
      component: newClientIndex
    },
    {
      path: '/newClient/newClientreLoad',
      name: 'newClientreLoad',
      component: newClientreLoad
    },
    {
      path: '/newClient/newClientResult',
      name: 'newClientResult',
      component: newClientResult
    },
    {
      path: '/newClient/newClientLogin',
      name: 'newClientLogin',
      component: newClientLogin
    },
    {
      path: '/newClient/newClientMain',
      name: 'newClientMain',
      component: newClientMain
    },
    {
      path: '/toShare',
      name: 'toShare',
      component: toShare
    },
    {
      path: '/toStart',
      name: 'toStart',
      component: toStart
    },
    {
      path: '/FillAddress',
      name: 'FillAddress',
      component: FillAddress
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/Index',
      name: 'Index',
      component: TIndex
    },
    {
      path: '/toGetGold',
      name: 'toGetGold',
      component: toGetGold
    }
  ]
})

function is_weixn(){ 
  if(location.href.includes('http://localhost:')){
    return true
  } 
  var ua = navigator.userAgent.toLowerCase(); 
  if(ua.match(/MicroMessenger/i)=="micromessenger") { 
    return true; 
  } else { 
    return false; 
  } 
}
  
router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  if(is_weixn()){
    // var now = new Data();
    // if(now>new Date(Date.parse("2019/3/1 10:0:0")) && now<new Date(Date.parse("2019/3/10 24:0:0"))){
    //   next()
    // }else{
    //   if(to.name =="Index" || to.name == "getOpenId"){
    //     next();
    //   }
    // }
    next();
  }else{
    alert("请在微信客户端打开该H5");
    next(false);
  }
 
})

export{
  router
}