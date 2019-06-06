<template>
    <div id="getOpenId">
    </div>
</template>
<script>
import gob from '../gob.js'
export default {
    data:function(){
        return{
            url:""
        }
    },
    mounted(){
        var openid = null;
        var userid = null;
        var mobile = null;
        var unionid = null;
        var nickname = null;
        var token = null;
        var _this = this;
        if(this.$gob.getCookie('openid') || this.$route.query.openid){
             if(this.$gob.getCookie('openid')){
                 openid = this.$gob.getCookie('openid');
                 userid = this.$gob.getCookie('userid');
                 mobile = this.$gob.getCookie('mobile');
                 unionid = this.$gob.getCookie('unionid');
                 nickname = this.$gob.getCookie('nickname');
                 token = this.$gob.getCookie('token');
             }else if(this.$route.query.openid){
                 openid = this.$route.query.openid;
                 userid = this.$route.query.userid;
                 mobile = this.$route.query.mobile;
                 unionid = this.$route.query.unionid;
                 nickname = this.$route.query.nickname;
                 token = this.$route.query.token;
             }
             var exp = new Date();
             exp.setTime(exp.getTime() + 3600 * 60 * 24 *10);//过期时间6分钟
             document.cookie = 'openid=' + openid + ";expires=" + exp.toGMTString();
             document.cookie = 'userid=' + userid + ";expires=" + exp.toGMTString();
             document.cookie = 'mobile=' + mobile + ";expires=" + exp.toGMTString();
             document.cookie = 'unionid=' + unionid + ";expires=" + exp.toGMTString();
             document.cookie = 'nickname=' + nickname + ";expires=" + exp.toGMTString();
             document.cookie = 'token=' + token + ";expires=" + exp.toGMTString();
             this.$router.replace({'name':'newClientMain'});
            //  if(userid == 0){
            //  }else{
            //     //this.$router.replace({'name':'newClientMain'});
            //     var obj = {
            //         newUserId:this.$gob.getCookie('userid')
            //     }
            //     this.$gob.get('getNewUserByUserId',obj).then(res=>{
            //         if(res.data.data.userStatus){
            //             this.$router.replace({'name':'newClientResult'});
            //         }else{
            //             this.$router.replace({'name':'newClientMain'});
            //         }
            //     })
            //  }
             return
        }else{
            var openidUrl = "https://wxtest.youhuiduo.cn/xjyx/TryAutoLogin3"
            var url = openidUrl + '?fromUrl=' +  encodeURIComponent(gob.webUrl()+'getNewClientOpenId'); 
            window.location.href = url;
            return
        }
        if(openid == null) {
            var openidUrl = "https://wxtest.youhuiduo.cn/xjyx/TryAutoLogin3"
            var url = openidUrl + '?fromUrl=' +  encodeURIComponent(gob.webUrl()+'getNewClientOpenId'); 
            window.location.href = url;
        }
    }
}
</script>
<style lang="less">
#getOpenId{

}
</style>
