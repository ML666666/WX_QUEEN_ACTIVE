<template>
    <div id="newClientIndex">
        <p class="tips">你的好友<span>{{oldClientName}}</span>给你派壕礼啦!</p>
        <p class="tips">认证成功后即可领取价值248元的优博新客大礼包!</p>
        <div @click="toResult" class="btn">
            <img src="../../../assets/btn_07@2x.png" alt="">
        </div>
        <p class="content">
            登记手机号完成登记注册，并拍照上传医院建档相关证明（母子健康手册、准生证明、B超等），系统审核通过后即可领取新客礼包一份，内含优博系列200g奶粉1听，《优博营养育儿全书》（上册）1本
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            oldClientName:null,
        }
    },
    mounted(){
        this.oldClientName = localStorage.getItem('oldClientName');
        if(localStorage.getItem('oldClientId') == localStorage.getItem('userid')){
            alert('老客用户不能分享给自己哦！')
            return
        }
    },
    methods:{
        toResult(){
            if(localStorage.getItem('oldClientId') == localStorage.getItem('userid')){
                alert('老客用户不能分享给自己哦！')
                return
            }
            if(this.$gob.getCookie('userid') == 0){
                this.$router.push({'name':'newClientLogin'});
            }else{
                this.$router.push({'name':'newClientLogin',query:{'isOldClient':1}});
            }
        }
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #newClientIndex{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs_TaAHl2MAAKOsg_ub4E961.jpg') no-repeat center center;
        background-size: cover;
        height: 1624px;
        padding-top: 865px;
    }
}
@media all and  (max-height:736px){
    #newClientIndex{
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs-wuAHpFpAAIkqVCEows793.jpg') no-repeat center center;
        background-size: cover;
        height: 1495px;
        padding-top: 960px;
    }
}
#newClientIndex{
    .tips{
        text-align: center;
        font-size: 30px;
        color: #6a2d00;
        font-weight: 700;
        span{
            color: #9874b3;
        }
    }
    .btn{
        width: 570px;
        margin: 0 auto;
        margin-top: 29px;
        margin-bottom: 42px;
        img{
            width: 100%;
        }
    }
    .content{
        font-size: 24px;
        color: #6a2d00;
        text-align: center;
        padding-left: 50px;
        padding-right: 50px;
    }
}
</style>
