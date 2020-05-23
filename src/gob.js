import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
let gob = {
    getWebUrl:function(){
        if(window.location.href.includes("http://localhost")){
            return "/api/" 
        }
        if(window.location.href.includes("youhuiduo.cn")){
            return "https://xxxxx/"
        }
        if(window.location.href.includes("ujinbi.com")){
            return "https://xxxxxx/"
        }
    },
    webUrl:function(){
        if(window.location.href.includes("localhost:")){
            return ""
        }
        if(window.location.href.includes("youhuiduo.cn")){
            return "https://xxxxx/#/"
        }
        if(window.location.href.includes("ujinbi.com")){
            return "http://xxxxx/#/"
        }
    },
    getUjinbiUrl:function(){
        if(window.location.href.includes("youhuiduo.cn")){
            return "https://wxtest.youhuiduo.cn/"
        }
        if(window.location.href.includes("ujinbi.com")){
            return "http://member.ujinbi.com/"
        }
    },
    // webUrl:"https://gate.ujinbi.com/cd/management/",
    // Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1bUk9MRV9BRE1JTiwgQVVUSF9XUklURV0iLCJleHAiOjE1NDQzMjMxNzd9.5ficRL8DmWkzhL1RfpPmuWvudydMN47PPN2G_jF-7Fb-yfhUasi-nDyMxlOdrYHSZHy3ckngP4bx6VkgU3EFLQ",
    post:function(url,data){
       var _this  = this; 
       return new Promise(function(resolve, reject){
        axios.post(_this.getWebUrl()+url, 
            qs.stringify(data),
        )
        .then(function(res){
            resolve(res);
        })
       })
    },
    get:function(url,data){
       var _this  = this; 
       return new Promise(function(resolve, reject) {
        axios.get(_this.getWebUrl()+url, 
            {
                params:data
            }
        )
        .then(function(res){
            resolve(res);
        })
       })
    },
    getCookie: function(name) {
        return Cookies.get(name)
    },
    setCookie: function(name,value){
        Cookies.set(name, value, { expires: 30 });
    },
    reMoveCookie: function(name){
        Cookies.remove(name);
    },
    isIphone:function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
}

export default gob
