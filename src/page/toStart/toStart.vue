<template>
    <div id="toStart">
        <rule_2></rule_2>
        <van-popup v-model="alertTips">
            <div class="Wrapper">
                <h2>提示</h2>
                <p>活动已结束，感谢参与！</p>
            </div>
            <van-icon @click="alertTips=false" name="close" />
        </van-popup>    
        
        <div @click="toShare" class="btn"></div>
        <div class="buttom">
            <rule></rule>
            <div class="tab">
                <div class="tabItemWrapper">
                    <div :class="{active:!isActive}" @click="isActive = !isActive" class="tabItem">女王召唤记录</div>
                    <div :class="{active:isActive}" @click="isActive = !isActive"  class="tabItem">女王壕礼记录</div>
                </div>
                <div v-if="isActive" class="tabWrapper tabWrapper_1">
                    <div v-if="Recommend.length > 0" v-for="v in Recommend" class="item">
                        <img v-if="v.recommendStatus == 1" src="../../../static/bg/seal_01@2x.png" class="type" alt="">
                        <img v-if="v.recommendStatus == 2" src="../../../static/bg/seal_05@2x.png" class="type" alt="">
                        <img v-if="v.recommendStatus == 3" src="../../../static/bg/seal_04@2x.png" class="type" alt="">
                        <img v-if="v.recommendStatus == 4" src="../../../static/bg/seal_02@2x.png" class="type" alt="">
                        <div class="data">{{v.dateString}}</div>
                        <div class="tips">
                            <template v-if="v.recommendStatus == 1">
                                {{v.newUserWXNickname | filterName}}已成功提交资料,待审核。
                            </template>
                            <template v-if="v.recommendStatus == 2">
                                {{v.newUserWXNickname | filterName}}已成功提交资料,但审核失败,准妈妈可重新上传。
                            </template>
                            <template v-if="v.recommendStatus == 3">
                                {{v.newUserWXNickname | filterName}}已成功提交资料,审核通过,但未填地址。
                            </template>
                            <template v-if="v.recommendStatus == 4">
                                {{v.newUserWXNickname | filterName}}已成功领取您派送的大礼包。
                            </template>
                        </div>   
                    </div>
                    <div v-if="Recommend.length == 0" class="notThing">
                        ~暂无数据~
                    </div>
                </div>
                <div v-else class="tabWrapper tabWrapper_2">
                    <div v-if="DrawList.length > 0" v-for="v in DrawList" class="item">
                        <div class="data">{{v.dateString}}</div>
                        <div v-if="v.win" class="tips">{{v.newUserWXNickname | filterName}}为您抽奖1次,成功中得{{v.giftName}}</div> 
                        <img v-if="!v.applyPrize && v.win" @click="toFillAddress(v)" class="btn_1" src="../../../static/bg/btb_05@2x-2.png" />
                        <img v-if="v.applyPrize && v.win" @click="toCheckAddress(v)" class="btn_1" src="../../../static/bg/btn_17.png" />
                        <div v-if="!v.win" class="tips">{{v.newUserWXNickname | filterName}}为您抽奖1次,很遗憾没能中奖</div> 
                    </div>
                    <div v-if="DrawList.length == 0" class="notThing">
                        ~暂无数据~
                    </div>
                </div>
            </div>
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
    mounted(){
        var obj = {
            userId:this.$gob.getCookie('userid')
        }
        let p1 = this.$gob.get('getRecommendHistory',obj)
        let p2 = this.$gob.get('getDrawHistory',obj)
        Promise.all([p1,p2]).then(res=>{
            console.log(res[1].data.data)
             this.Recommend = (res[0].data.data);
             this.DrawList = (res[1].data.data);
        })
    },
    filters:{
        filterName:function(val){
            if(val.length<8){
                return val
            }else{
                return (val.substring(0,7) + '...')
            }
        }
    },
    data(){
        return{
            alertTips:false,
            isActive:true,
            DrawList:[],
            Recommend:[],
            t:"效仿烦烦烦反反复复烦烦烦"
        }
    },
    methods:{
        toShare(){
            if(!window.location.href.includes('http://localhosts')){
                var now  = new Date();
                if(now>new Date(Date.parse("2019/3/12 0:0:0"))){
                    this.alertTips = true;
                    return
                }
            }
            

            let totalGold = JSON.parse(this.$gob.getCookie('userInfo')).totalGold;
            if(parseInt(totalGold)>388){
                    this.$router.push({'name':'toShare',query:{'oldClient':this.$gob.getCookie('userid')}})
            }else{
                    this.$router.push({'name':'toGetGold'})
            }   

        },
        toFillAddress(v){
            this.$router.push({'name':'FillAddress',query:{'isOldClient':'1','giftId':v.giftId}})
        },
        toCheckAddress(v){
             var obj = {
                userId:this.$gob.getCookie('userid'),
                userType:2
            }
            this.$gob.get('getDeliveryInfo',obj).then(res=>{
                if(res.data.code == 10000){
                    if(res.data.data.deliveryCode){
                        window.location.href = `http://m.kuaidi100.com/index_all.html?postid=${res.data.data.deliveryCode}&type=${res.data.data.expressCarrier}`
                    }else{
                        alert("尚未发货，请耐心等待！");
                    }
                }else{
                    alert(res.data.msg);
                }
            })
        }
    }
}
</script>
<style lang="less">
#toStart{
    position: relative;
    width: 100%;
    height: 1825px;
    background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs97uAVtM1AALElj3dfzQ562.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 923px;
    .van-popup{
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
    .btn{
        width: 490px;
        height: 115px;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs9-iAE6AlAAAsxbDwdbs585.png') no-repeat center center;
        background-size: cover;
    }
    .buttom{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        .tab{
            margin-top: 35px;
            width: 690px;
            // height: 460px;
            background: #b7904a url('../../../static/bg/title_bg_01.png') repeat-x;
            background-size: 344px;
            border-radius: 6px;
            padding: 10px;
            .tabItemWrapper{
                width: 100%;
                display: flex;
                height: 80px;
                .active{
                    background: transparent !important;
                    color: #fff !important;
                }
                .tabItem{
                    flex: 1;
                    height: 100%;
                    line-height: 80px;
                    text-align: center;
                    background: #fff;
                    font-size: 30px;
                    font-weight: 800;
                    color: #662c01;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                }
            }
            .tabWrapper{
                width: 100%;
                background: #fff;
                padding: 26px;
                height: 380px;
                overflow-y: scroll;
                position: relative;
                .notThing{
                    font-size: 32px;
                    padding-top: 30px;
                    text-align: center;
                }
                .icon{
                    position: absolute;
                    width: 81px;
                    height: auto;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 10px;
                }
                .item{
                    height: 120px;
                    border-bottom: 2px dashed #b78e49;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;
                    position: relative;
                    .data{
                        font-size: 26px;
                        color: #652602;
                        font-weight: 700;
                    }
                    .tips{
                        font-size: 26px;
                        color: #652602;
                        font-weight: 700;
                        width: 65%;
                    }
                    .type{
                        position: absolute;
                        width: 81px;
                        height: 81px;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                    }
                    .btn_1{
                        position: absolute;
                        width: 183px;
                        height: 75px;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        border-radius: 60px;
                    }
                }
                .item:last-child{
                    border:none;
                }
                border-radius: 6px;
            }
            .tabWrapper_1{
                border-top-left-radius: 0px;
            }
        }
    }
}
</style>
