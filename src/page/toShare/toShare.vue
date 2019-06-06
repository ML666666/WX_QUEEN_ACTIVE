<template>
    <div id="toShare">

            <van-popup id="alertTips" v-model="alertTips">
                <div class="Wrapper">
                    <h2>提示</h2>
                    <p>新客礼包已派完，活动结束！</p>
                </div>
                <van-icon @click="alertTips=false" name="close" />
            </van-popup> 


            <Rule_2></Rule_2>
            <div class="bq">
                剩余:&nbsp<span>{{total}}</span>份
            </div>
            <div class="tips">
                尊贵的优博女王，您的专属权益已生效，马上给身边的准妈妈派送壕礼。
            </div>
            <div @click="toShow" class="btn"></div>
            <div class="box">
                <h3>邀请提示：</h3>
                <p>您待邀请的准妈妈 ，需首次注册金币联盟，并拍照上传医院建档相关证明（母子健康手册、准生证明、B超等），审核通过后准妈妈即可免费领取价值248元的新客礼包一份，内含优博系列200g奶粉1听，《优博营养育儿全书》（上册）1本。每天数量有限，先到先得。</p>
            </div>
            <div v-if="show" class="mask">
                <p>点击右上角，马上给身边准妈妈派送壕礼。</p>
                <img src="../../../static/bg/step_1.png" />
                <div @click="show=false" class="btn_3">我知道了</div>
            </div>   
    </div>
</template>
<script>
import Rule_2 from '../../components/rule_2'
import wx from 'weixin-js-sdk'
export default {
    components:{
        Rule_2
    },
    data(){
        return{
            show:false,
            total:0,
            alertTips:false
        }
    },
    mounted(){
        if(window.location.href.includes('&isShare=')){
            this.$gob.setCookie('oldClientName',this.$route.query.oldClientName);
            this.$gob.setCookie('oldClientId',this.$route.query.oldClientId);
            localStorage.setItem('oldClientName',this.$route.query.oldClientName);
            localStorage.setItem('oldClientId',this.$route.query.oldClientId);
            window.location.href = this.$gob.webUrl()+'getNewClientOpenId'
        }
        this.$gob.get('getBalanceNewUserGift').then(res=>{
            if(res.data.code == 10000){
                this.total = res.data.data.blanceNumber;
            }else{
                alert(res.data.msg);
            }
        })
        var obj = {
            url:window.location.href.split('#')[0]
        }
        this.$gob.get('getJsApiInfo',obj).then(res=>{
            if(res.data.code == 10000){
                this.wxInit(res.data.data);
            }else{
                alert(res.data.msg);
            }
        })
    },
    methods:{
        toShow(){
            var now  = new Date();
            if(now>new Date(Date.parse("2019/3/12 0:0:0"))){
                this.alertTips = true;
                return
            }else{
                this.show = true;
            }
        },
        wxInit(sd){
            let nikeName = null;
            let index = null;
            if(localStorage.getItem('shareIndex')){
                index = parseInt(localStorage.getItem('shareIndex'));
            }else{
                localStorage.setItem('shareIndex',1);
                index = 1;
            }

            if(localStorage.getItem('Oldnickname')){
                nikeName = localStorage.getItem('Oldnickname');
            }else{
                nikeName = localStorage.getItem(`TOldnickname${index}`);
            }
            
            let links=(window.location.href+'?isShare=1'+'&oldClientName='+
            encodeURIComponent(nikeName)+'&oldClientId='+
            this.$gob.getCookie('userid')+'&isShare=1'); 
             //分享出去的链接

            let title='女王节 派壕礼';  //分享的标题
            let desc='完成孕妈身份认证，即可领取价值248元优博新客礼品一份。'; //分享的详情介绍
            let imgUrl='https://gate.youhuiduo.cn/jinbi/M00/00/0F/sKYBaFxvlJCACC-pAAUZ4SblN2Q137.png'; 
            wx.config({
                debug: false,
                appId: sd.appId,
                timestamp: sd.timestamp,
                nonceStr: sd.nonceStr,
                signature: sd.signature,
                jsApiList: [
                    'onMenuShareTimeline','onMenuShareAppMessage'
                ]
            }); 
            wx.ready(()=>{
               wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link:links, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function (){
                        localStorage.setItem('shareIndex',++index);
                        var store = null;
                        if(localStorage.getItem(`TOldnickname${index-1}`)){
                            store = localStorage.getItem(`TOldnickname${index-1}`);
                        }else{
                            store = localStorage.getItem(`Oldnickname`);
                        }
                        localStorage.setItem(`TOldnickname${index}`,store);
                        localStorage.removeItem('Oldnickname');
                        console.log(localStorage.getItem('Oldnickname'))
                        alert("分享成功");
                    },
                    cancel: function (){}
               });
                //微信分享菜单测试
               wx.onMenuShareAppMessage({
                    title:title, // 分享标题
                    desc: desc, // 分享描述
                    link: links, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function (){
                        localStorage.setItem('shareIndex',++index);
                        var store = null;
                        if(localStorage.getItem(`TOldnickname${index-1}`)){
                            store = localStorage.getItem(`TOldnickname${index-1}`);
                        }else{
                            store = localStorage.getItem(`Oldnickname`);
                        }
                        localStorage.setItem(`TOldnickname${index}`,store);
                        localStorage.removeItem('Oldnickname');
                        console.log(localStorage.getItem('Oldnickname'))
                        alert("分享成功");
                    },
                    cancel: function (){
                    }
               });

               wx.error(function(res){
                   alert(JSON.stringify(res));
               })
            })
        }
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #toShare{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_TaAHl2MAAKOsg_ub4E961.jpg') no-repeat center center;
        background-size: cover;
        height: 1624px;
        padding-top: 765px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
@media all and  (max-height:736px){
    #toShare{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs-wuAHpFpAAIkqVCEows793.jpg') no-repeat center center;
        background-size: cover;
        height: 1495px;
        padding-top: 860px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
#toShare{
       position: relative;
       .mask{
       position: fixed;
       top: 0px;
       left: 0px;
       right: 0px;
       bottom: 0px;
       background: rgba(0,0,0,0.7);
       z-index: 10000;
       img{
           width: 270px;
           margin-top: 60px;
           transform: translateX(370px);
       }
       p{
           font-size: 32px;
           margin-top: 30px;
           color: #fff;
           text-align: right;
           padding-right: 30px;
       }
       .btn_3{
           color: #fff;
           font-size: 32px;
           line-height: 65px;
           width: 270px;
           border-radius: 42px;
           border: 2px solid #fff;
           text-align: center;
           margin: 0 auto;
           margin-top: 40px;
       }
    }
    .bq{
        width: 230px;
        height: 48px;
        background: url('../../../static/bg/biaoqian_bg@2x.png') no-repeat center center;
        background-size: cover;
        margin: 0 auto;
        line-height: 48px;
        text-align: center;
        font-size: 26px;
        font-weight: 700;
        color: #fff;
        span{
            color: #f7d593;
        }
    }
    .tips{
        font-size: 32px;
        font-weight: 700;
        color: #672c00;
        margin-top: 53px;
        text-align: center;
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
        span{
            color: #8b52ac;
        }
    }
    .btn{
        width: 430px;
        height: 115px;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs-yCADjW7AAAyNVmoDqE168.png') no-repeat center center;
        background-size: cover;
        margin: 0 auto;
        margin-top: 21px;
        margin-bottom: 30px;
    }
    .box{
        width: 686px;
        height: 265px;
        margin: 0 auto;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/14/sKYBaFx1FiCAGZIzAAApx8i0O74081.png') no-repeat center center;
        background-size: cover;
        padding: 18px;
        font-size: 24px;
        padding-left: 35px;
        padding-right: 35px;
        padding-top:25px ;
        h3{
            color: #74461f;
            font-size: 24px;
        }
        p{
            color: #74461f;
            font-size: 24px;
        }
    }
    #alertTips{
        max-height:120% !important;
        overflow-y:inherit;
        border-radius: 8px;
        border:6px solid #ebb416;
        .Wrapper{
            width: 550px;
            padding-top:40px;
            padding-bottom:40px;
            padding-left: 37px;
            padding-right: 37px; 
            background: #fff;
            h2{
                color: #5b1692;
                font-size: 36px;
                text-align: center;
                margin-bottom: 30px;
            }
            p{
                text-align: center;
                color: #5b1692;
                font-size: 28px;
                padding-bottom: 20px;
            }
        }
        .van-icon-close{
            position: absolute;
            bottom: -70px;
            left: 50%;
            font-size: 48px;
            color: #Fff;
            transform: translateX(-50%);
        }
    }
    .van-popup{
        overflow-y:inherit;
        border-radius: 8px;
        transform: translate(-50%,-50%);
        .Wrapper{
            width: 650px;
            padding-top:60px;
            padding-left: 37px;
            padding-right: 37px; 
            p{
                color: #906b58;
                font-size: 25px;
                padding-bottom: 20px;
            }
            input{
                width: 100%;
                height: 100px;
                border-radius: 60px;
                outline: none;
                border: 3px solid #d4b343;
                margin-bottom: 30px;
                padding-left: 33px;
            }
            .register{
                width: 100%;
                margin-bottom: 30px;
            }
        }
        .van-icon-close{
            position: absolute;
            bottom: -70px;
            left: 50%;
            font-size: 48px;
            color: #Fff;
            transform: translateX(-50%);
        }
    }
}
</style>
