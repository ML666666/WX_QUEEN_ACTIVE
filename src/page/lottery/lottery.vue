<template>
    <div id="Lottery">

        <van-popup v-model="failToLottery">
                <p class="tips">哎呀</p>
                <p  class="tips">差一点就中奖了</p>
                <div class="btn_2">
                    <a href="https://member.ujinbi.com/xjyx/index?v=8270269655#index">
                        <img src="../../assets/cj_btn_02.png" alt="">
                    </a>    
                </div>
                <van-icon @click="failToLottery = false" name="close" />
        </van-popup>

        <van-popup id="bd_wrapper" v-model="successToLottery">
                <img class="bg" v-if="type == 8621" src="../../assets/cj_tc_zj_01.png" alt="">
                <img class="bg" v-if="type == 8619" src="../../assets/cj_tc_zj_03.png" alt="">
                <img class="bg" v-if="type == 8617" src="../../assets/cj_tc_zj_02.png" alt="">
                <div class="t">请于3月10日前通知闺蜜登录活动页面领取奖品，逾期视为放弃领取。</div>
                <van-icon @click="successToLottery = false" name="close" />
        </van-popup>

        <van-popup id="Loading"  v-model="loading">
            <img src="../../assets/cj_tanchuang.png" alt="">
        </van-popup>

        <div @click="lottery" class="btn">
            <img src="../../assets/cj_btn.gif" alt="">
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            type:8621,//8619口红 8617黄金吊坠 8621电饭煲
            isLottery:false,
            failToLottery:false,
            successToLottery:false,
            loading:false
        }
    },
    methods:{
        lottery(){
            var _this = this;
            var obj = {
                newUserId:parseInt(localStorage.getItem('userid'))
            }
            this.loading = true;
            this.$gob.post('commitLottery',obj).then(res=>{
                this.loading = false; 
                if(res.data.code != 10000){
                    alert(res.data.msg);
                    return
                }
                if(res.data.code ==10000){
                    if(res.data.data.result){
                        this.isLottery = true;   
                        this.successToLottery = true;
                        this.type = res.data.data.giftId;
                    }else{
                        this.failToLottery = true;
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #Lottery{
        width: 750px;
        height: 1754px;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/11/sKYBaFxw37eAVXi9AAUMQvx6KVA216.jpg') no-repeat center center;
        background-size: cover;
        padding-top:1120px;
    }
}
@media all and  (max-height:736px){
     #Lottery{
        width: 750px;
        height: 1384px;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/11/sKYBaFxw38WAZnCYAARmW78m1ds046.jpg') no-repeat center center;
        background-size: cover;
        padding-top:1100px;
    }
}
#Lottery{
    .btn{
        margin: 0 auto;
        width: 610px;
        img{
            width: 100%;
            height: auto;
        }
    }
    #bd_wrapper{
        width: 510px !important;
        padding: 0 !important;
        .bg{
            width: 510px;
        }
        .t{
            position: absolute;
            left: 50%;
            transform: translate(-50%,23%) scale(0.7);
            text-align: center;
            color: #652b00;
            font-weight: 600;
            font-size: 32px;
            bottom: 34px;
            width:670px;
        }
    }
    #Loading{
        width: auto;
        height: auto;
        background: transparent;
        padding: 0px;
        img{
            width: 627px;
            height: auto;
        }
    }
    .van-popup{
        width: 650px;
        padding: 87px 80px;
        overflow-y:inherit;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .tips{
            text-align: center;
            color: #652b00;
            font-weight: 600;
            font-size: 32px;
        }
        .btn_2{
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
