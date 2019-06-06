<template>
    <div id="Register">
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
            <input v-model="vcode" placeholder="请输入验证码" class="input"/>
            <div @click="register" class="btn">
                <img src="../../../static/bg/btn_02@2x.png" alt="">
            </div>
        </div>
        <div class="button">
           <Rule></Rule>
       </div>
    </div>    
</template>
<script>
import Cookies from 'js-cookie'
import axios from 'axios'
import qs from 'qs'
import Rule from '../../components/rule'
import rule_2 from '../../components/rule_2'
export default {
    components:{
        Rule,
        rule_2
    },
    data(){
        return{
            mobile:null,
            timer:null,
            time:120,
            vcode:null,
        }
    },
    methods:{
        register(){
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
                isFromNew:0
             }
             axios.post(`${this.$gob.getUjinbiUrl()}Register/LoginByVcode`,qs.stringify(obj)).then(res=>{
                if(res.data.code == "10000"){
                    Cookies.set('userid', res.data.data.userid, { path: '/sy_queen_2019' });
                    localStorage.setItem('_userid',res.data.data.userid);
                    // if(res.data.data.regfrom == 22){
                    this.$router.push({'name':'Index'});
                    // }
                }else{
                    alert(res.data.msg)
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
            //http://member.ujinbi.com
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
    #Register{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_PWAXqmGAAGp750TuJs017.jpg') no-repeat center center;
        background-size: cover;
        height: 1624px;
        padding-top: 539px;
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
                margin-bottom: 50px;
                font-size: 28px;
                font-weight: 800;
                padding-left: 40px;
            }
            .btn{
                height: 102px;
                width: 570px;
                border-radius: 60px;
                margin-bottom: 120px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
        .button{
            width: 100%;
            height: 325px;
        }
    }
}
@media all and  (max-height:736px){
    #Register{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs-_CAHLlHAAFWeLiEefo000.jpg') no-repeat center center;
        background-size: cover;
        height: 1334px;
        padding-top: 499px;
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
                margin-bottom: 50px;
                font-size: 28px;
                font-weight: 800;
                padding-left: 40px;
            }
            .btn{
                height: 102px;
                width: 570px;
                border-radius: 60px;
                background: #fff;
                margin-bottom: 140px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
        .button{
            margin-top: 5px;
            width: 100%;
            height: 285px;
        }
    }
}
</style>
