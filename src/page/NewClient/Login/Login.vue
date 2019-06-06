<template>
    <div id="newClientLogin">
        <div style="margin-bottom:0px" class="tips">
            您的好友<span>{{oldClientName}}</span>给你派壕礼啦！
        </div>
        <div class="tips">
            认证成功后即可领取价值248元的优博新客大礼包！
        </div>
        <div class="inputWrapper">
            <div style="position:relative;">
                <input placeholder="请输入手机号" v-model="mobile" class="input"/>
                <div v-if="time == 120" @click="getVcode" class="getCode">
                    获取验证码
                </div>
                <div v-else class="getCode">
                    {{time}}s
                </div>
            </div>
            <input  v-model="vcode" placeholder="请输入验证码" class="input"/>
            <div  @click="register" class="btn">
                <img src="../../../../static/bg/btn_02@2x.png" />
            </div>
        </div>
        <div class="tips_2">
            登记手机号完成登记注册，并拍照上传医院建档相关证明（母子健康手册、准生证明、B超等），系统审核通过后即可领取新客礼包一份，内含优博系列200g奶粉1听，《优博营养育儿全书》（上册）1本
        </div>
        <van-popup v-model="showTips">
                <p>今日新客礼包已派完,请明天再来吧!</p>
                <div class="btn">
                    <img src="../../../../static/bg/btn_13@2x.png" />
                </div>
                <van-icon @click="showTips=false" name="close" />
        </van-popup>

        <van-popup v-model="showTips_2">
                <p>新客礼包已派完</p>
                <div class="btn">
                    <a href="https://member.ujinbi.com/xjyx/index?v=8270269655#index">
                        <img src="../../../../static/bg/btn_13@2x.png" />
                    </a>
                </div>
                <van-icon @click="showTips_2=false" name="close" />
        </van-popup>

        <van-popup v-model="showAlert">
            <p>很遗憾，该手机已注册金币联盟</p>
            <p>您不符合活动参与条件。</p>
                <van-icon @click="showAlert=false" name="close" />
        </van-popup>

        <van-popup id="alertTips" v-model="alertTips">
                <div class="Wrapper">
                    <h2>提示</h2>
                    <p>新客礼包已派完，活动结束！</p>
                </div>
                <van-icon @click="alertTips=false" name="close" />
        </van-popup> 

    </div>    
</template>
<script>
import Cookies from 'js-cookie'
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return{
            showTips:false,
            showAlert:false,
            mobile:null,
            timer:null,
            time:120,
            vcode:null,
            showTips_2:false,
            oldClientName:null,
            isLoading:false,
            alertTips:false
        }
    },
    mounted(){
        this.oldClientName = localStorage.getItem('oldClientName');
    },
    methods:{
        toPush(){
            this.$gob.get('getNewUserByUserId',{newUserId:localStorage.getItem('userid')}).then(res=>{
                    this.isLoading = false;
                    if(res.data.data){
                        this.$router.push({'name':'newClientResult'});
                    }else{
                        this.$router.push({'name':'newClientMain'});
                    }
            })
        },
        isOver(){
            var now  = new Date();
            if(now>new Date(Date.parse("2019/3/12 0:0:0"))){
                this.alertTips = true;
                return
            }
        },
        register(){
             this.isLoading = true;
             if(!this.isLoading){
                 return
             }
             if(!this.mobile){
                alert("请输入手机号");
                return
             }
             if(!this.vcode){
                alert("请输入验证码");
                return
             }
             var obj = {
                mobile:this.mobile,
                token:this.$gob.getCookie('token'),
                vcode:this.vcode,
                isFromNew:1
             }
             axios.post(`${this.$gob.getUjinbiUrl()}Register/LoginByVcode`,qs.stringify(obj)).then(res=>{
                if(res.data.code == "10000"){
                    this.$gob.setCookie('userid',res.data.data.userid);
                    localStorage.setItem('userid',res.data.data.userid);
                    if(res.data.data.regfrom == 22){
                        if(res.data.data.isNewReg){
                            this.$gob.get('getBalanceNewUserGift').then(res=>{
                            if(res.data.code == 10000){
                                if(res.data.data.dayLimit <= 0){
                                    this.isOver();
                                    this.isLoading = false;
                                    if(res.data.data.dayLimit <= 0 || res.data.data.blanceNumber <= 0){
                                        this.isOver();
                                        this.showTips_2 = true;
                                    }else{
                                        this.showTips = true;
                                    }
                                }else{
                                    if(res.data.data.blanceNumber <= 0){
                                        this.isOver();
                                        this.showTips_2 = true;
                                        return;
                                    }
                                    Cookies.set('mobile',this.mobile,{ expires: 7, path: '/sy_queen_2019'});
                                    if(this.$gob.getCookie('isNewClient') == "1"){
                                        this.toPush();
                                        return
                                    }else{
                                        this.$gob.setCookie('isNewClient',1);
                                        this.$gob.post('reduceBalanceNewUserGift');
                                        this.toPush();
                                    }   
                                }
                            }else{
                                this.isLoading = false;
                                alert(res.data.msg);
                            }
                            })
                        }else{
                            Cookies.set('mobile',this.mobile,{ expires: 7, path: '/sy_queen_2019'});
                            this.toPush();
                        }
                        // this.$router.push({'name':'newClientMain'});
                    }else{
                        this.showAlert = true;
                        this.isLoading = false;
                        this.$gob.setCookie('isNewClient',0);
                        // this.$router.push({'name':'Index'});
                        
                    }
                }else{
                    this.isLoading = false;
                    alert(res.data.msg);
                }
             })
        },
        getVcode(){
            if(!this.mobile){
                alert("请输入手机号");
                return
            }
            var obj = {
                mobile:this.mobile,
                token:this.$gob.getCookie('token')
            }
            axios.post(`${this.$gob.getUjinbiUrl()}Register/GetMobileCodeForLogin`,qs.stringify(obj)).then(res=>{
                if(res.data.code == "10000"){
                    this.timer = setInterval(()=>{
                        this.time--;
                        if(this.time == 0){
                            this.time = 120;
                            clearInterval(this.timer);
                        }
                    },1000)
                }else{
                    alert(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang="less">

@media all and  (min-height:736px){
    #newClientLogin{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs7ruAXN_sAAKOsg_ub4E587.jpg') no-repeat center center;
        background-size: cover;
        height: 1510px;
        padding-top: 785px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
@media all and  (max-height:736px){
    #newClientLogin{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs7o2AbWNzAAJjAcef9d8070.jpg') no-repeat center center;
        background-size: cover;
        height: 1495px;
        padding-top: 840px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
#newClientLogin{
    display: flex;
    flex-direction: column;
    align-items: center;
    #alertTips{
        max-height:120% !important;
        overflow-y:inherit;
        border-radius: 8px;
        border:6px solid #ebb416;
        padding: 0px 0px !important;
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
    .tips{
        font-size: 30px;
        font-weight: 700;
        color: #682c02;
        span{
            color: #8d51ae;
        }
        margin-bottom: 18px;
    }
    .inputWrapper{
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .getCode{
                right: 15px;
                top: 53px;
                transform: translateY(-50%);
                position: absolute;
                width: 171px;
                height: 79px;
                line-height: 79px;
                text-align: center;
                color: #fff;
                font-size: 28px;
                font-weight: 800;
                background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs716AYQg1AAAyHWCIaW8780.png') no-repeat center center;
                background-size: cover;
                border-radius: 60px;
            }
            .input{
                height: 102px;
                width: 574px;
                border:6px solid #e9d379;
                border-radius: 60px;
                background: #fff;
                margin-bottom: 20px;
                font-size: 28px;
                font-weight: 800;
                padding-left: 40px;
            }
            .btn{
                height: 102px;
                width: 570px;
                border-radius: 60px;
                background: #fff;
                margin-bottom: 20px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
    }
    .tips_2{
        margin-top: 20px;
        width: 620px;
        text-align: center;
        font-size: 24px;
        color: #74462a;
        font-weight: 800;
    }
    .van-popup{
        width: 650px;
        padding: 87px 80px;
        overflow-y:inherit;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            text-align: center;
            color: #652b00;
            font-weight: 600;
            font-size: 32px;
        }
        .btn{
            margin-top: 60px;
            width: 490px;
            img{
                width: 100%;
                height: auto;
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
