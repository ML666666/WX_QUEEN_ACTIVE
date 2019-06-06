<template>
    <div id="main">
       <rule_2></rule_2>
       <div class="tips">活动期间积满<span>388</span>，立即成为女王!</div>
       <div v-if="userInfo" class="bar_bg">
           <div v-if="userInfo.totalGold<388" :style="{width:(userInfo.totalGold-0)/388*100 +'%' }" class="bar"></div>
           <div v-if="userInfo.totalGold>388" :style="{width:100 +'%' }" class="bar"></div>
           <span>{{userInfo.totalGold}}/388</span>
       </div>
       <div class="buttom">
           <a href="http://member.ujinbi.com/user/account"><div class="btn"></div></a>
           <rule></rule>
       </div>
    </div>    
</template>
<script>
import rule from '../../components/rule'
import rule_2 from '../../components/rule_2'
export default {
    components:{
        rule,
        rule_2
    },
    data(){
        return {
            userInfo:null
        }
    },
    mounted(){
        var obj = {
                userId:this.$gob.getCookie('userid'),
        }
        this.$gob.post('getOldUserInfo',obj).then(res=>{

                if(res.data.code == 10000){

                    this.$gob.setCookie('userInfo',JSON.stringify(res.data.data));
                    this.userInfo = JSON.parse(this.$gob.getCookie('userInfo'));
                    if(this.userInfo.totalGold>=388){
                        this.$router.push({'name':'toStart'});
                    }         
                }else{
                    alert(res.data.msg);
                }
        })
        
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #main{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_M6AZ42gAAKmNgASGyk510.jpg') no-repeat center center;
        background-size: cover;
        height: 1624px;
        padding-top: 920px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
@media all and  (max-height:736px){
    #main{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_GCAGayDAAJO2TXVNoo478.jpg') no-repeat center center;
        background-size: cover;
        height: 1495px;
        padding-top: 910px;
        .bar_bg{
            margin-bottom: 100px;
        }
    }
}
#main{
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    .tips{
        font-size: 28px;
        color: #672601;
        font-weight: 700;
        margin-bottom: 5px;
        span{
            font-size: 32px;
            color: #6c1da9;
        }
    }
    .bar_bg{
        width: 688px;
        height: 50px;
        background: url('../../../static/bg/line_bg@2x.png') no-repeat center center;
        background-size: cover;
        position: relative;
        .bar{
            top: 25px;
            transform: translateY(-50%);
            left: 5px;
            position: absolute;
            border-radius: 60px;
            width: 50%;
            height: 41px;
            background: url('../../../static/bg/line_01@2x.png') no-repeat center center;
            position: absolute;
        }
        span{
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: #fff;
                font-size: 26px;
        }
    }
    .buttom{
        .btn{
            width: 430px;
            height: 115px;
            background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_LSAfM-UAAAosiKniz0508.png') no-repeat center center;
            background-size: cover;
            border-radius: 60px;
        }
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
