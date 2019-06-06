<template>
    <div id="newClientMain">
        <div class="tips">
            <span>准妈妈</span><div>您好！&nbsp 完成新客认证，领取壕礼！！</div>
        </div>
        <div class="box_1 box">
            <img class="banner" src="../../../assets/title_03@2x.png" />
            <p class="tips">拍照上传证明文件，系统审核通过后即可免费领取优博提供的新客大礼包一份。</p>
            <div class="upLoadWrapper">
                <div class="ImgWrapper">
                    <div v-if="userInfo.userStatus == 1" class="icon">
                        <img src="../../../../static/bg/seal_03@2x.png" alt="">
                    </div>
                    <!-- 待审核 -->
                    <div  v-if="userInfo.userStatus == 2"  class="icon">
                        <img src="../../../../static/bg/seal_05@2x.png" alt="">
                    </div>
                    <!-- 审核失败 -->
                    <div  v-if="userInfo.userStatus == 3"  class="icon">
                        <img src="../../../../static/bg/seal_04@2x.png" alt="">
                    </div>
                    <!-- 已通过 -->
                    <div  v-if="userInfo.userStatus == 4"  class="icon">
                        <img src="../../../../static/bg/seal_04@2x.png" alt="">
                    </div>
                    <!-- 已领取 -->
                    <div v-if="userInfo.picture1" class="item">
                        <img  class="img" :src="userInfo.picture1">
                    </div>
                    <div v-if="userInfo.picture2" class="item">
                        <img class="img"  :src="userInfo.picture2">
                    </div>
                    <div v-if="userInfo.picture3" class="item">
                        <img class="img"  :src="userInfo.picture3">
                    </div>
                </div>
                <div class="upLoadTips">
                    <template v-if="userInfo.userStatus != 2">
                        请上传1-3张清晰的医院开具的怀孕建档证明（如母子健康手册、B超单、准生证明等）
                    </template>
                    <template v-else>
                        {{userInfo.authComment | filterStr}}
                    </template>
                </div>
            </div>
                <div v-if="userInfo.userStatus == 1" class="btn">
                    <img src="../../../../static/bg/bnt_10@2x.png" style="width:100%" />
                </div>
                <!-- 待审核 -->
                <div @click="toReUpLoad"  v-if="userInfo.userStatus == 2"   class="btn">
                    <img src="../../../../static/bg/btn_16(1).png" style="width:100%" alt="">
                </div>
               <!-- 审核失败  btn_18.png-->
                <div @click="toFillAddress"  v-if="userInfo.userStatus == 3"  class="btn">
                    <img src="../../../../static/bg/btn_18.png" style="width:100%" alt="">
                </div>
                <!-- 已通过 -->
                <div @click="toCheckAdress" v-if="userInfo.userStatus == 4" class="btn">
                    <img src="../../../assets/btn_12@2x.png" style="width:100%" />
                </div>
                <!-- 已领取 -->
        </div>

        <div class="box_2 box">
            <img class="banner" src="../../../assets/title_04@2x.png" />
            <div  v-if="userInfo.userStatus >= 3" class="toLottery">
                <img @click="toLottery" v-if="userInfo.drawStatus == 1" src="../../../../static/bg/btn_11@2x.png" >
                <img v-else src="../../../assets/btn_15.png" >
            </div>
             <p v-else class="tips">您成功领取新客礼包后，即可帮助闺蜜抽奖有机会赢取大奖！</p>
        </div>

        <div class="buttomTips">
            请收藏该链接地址，方便您查看审核结果及领取新客礼包。
        </div>

        <van-popup v-model="showAlert">
            <p class="h2">很遗憾，该手机已注册金币联盟</p>
            <span class="p1">优博总部将于24小时内公布审核结果！请耐心等待！</span>
            <span class="p2">温馨提示：请收藏该地址，方便后续领取新客礼包及抽奖。</span>
                <van-icon @click="showAlert=false" name="close" />
        </van-popup>
    </div>    
</template>
<script>
export default {
    filters:{
        filterStr(val){
            if(val.length<40){
                return val
            }else{
                return val.subSting(0,36) + '...'
            }
        }
    },
    data(){
        return{
            showAlert:false,
            nickname:null,
            oldClientId:null,
            oldClientName:null,
            userInfo:{},
            AdressObj:{}
        }
    },
    mounted(){
        this.nickname = localStorage.getItem('nickname');
        this.oldClientId = this.$gob.getCookie('oldClientId');
        this.oldClientName = this.$gob.getCookie('oldClientName');
        this.$gob.get('getNewUserByUserId',{newUserId:localStorage.getItem('userid')}).then(res=>{
            this.userInfo = res.data.data;
        })
    },
    methods:{
        toLottery(){
            this.$router.push({'name':'lottery'})
        },
        toReUpLoad(){
            this.$router.push({'name':'newClientreLoad'})
        },
        toFillAddress(){
            this.$router.push({'name':'FillAddress',query:{'isOldClient':0}})
        },
        toCheckAdress(){
            var obj = {
                userId:localStorage.getItem('userid'),
                userType:1
            }
            this.$gob.get('getDeliveryInfo',obj).then(res=>{
                if(res.data.code == 10000){
                    if(res.data.data.deliveryCode){
                        window.location.href = `http://m.kuaidi100.com/index_all.html?postid=${res.data.data.deliveryCode}&type=${res.data.data.expressCarrier}`
                    }else{
                        alert("尚未发货，请耐心等待");
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
#newClientMain{
    background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs7g-APKI_AAJIpzHCzdQ084.jpg') no-repeat center center;
    background-size: cover;
    height: 1754px;
    width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 540px;
    .toLottery{
        margin: 0 auto;
        width:610px; 
        margin-top: 120px;
        img{ 
            width: 100%;
        }
    }
    .tips{
        font-size: 26px;
        font-weight: 700;
        color: #692c00;
        display: flex;
        span{
            display: block;
            // display: inline-block;
            max-width: 140px;
            overflow: hidden;
            color: #a356b1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
        }
    }
    .box{
        position: relative;
        .banner{
            position: absolute;
            top: 29px;
            left: -20px;
            width: 418px;
        }
    }
    .box_1{
        margin-top: 80px;
        width: 688px;
        height: 689px;
        background: url('../../../../static/bg/box_03@2x.png') no-repeat center center;
        background-size: cover;
        margin-bottom: 32px;
        padding-top:120px;
        padding-left: 40px;
        padding-right: 40px;
        .upLoadWrapper{
            width: 100%;
            padding: 30px;
            background: #feefff;
            margin-top: 30px;
            padding-bottom: 10px;
            margin-bottom: 20px;
            .ImgWrapper{
                display: flex;
                justify-content: space-around !important;
                position: relative;
                .icon{
                    position: absolute;
                    top:0px;
                    right: 0px;
                    width: 100px;
                    z-index: 1000;
                    img{
                        width: 100px;
                        height: auto;
                    }
                }
                .item{
                    display: block;
                    width: 157px;
                    height: 157px;
                    border-radius: 4px;
                    position: relative;
                    border:2px solid #a256b1;
                    .close{
                        position: absolute;
                    }
                    .img{
                        width: 100%;
                        height: auto;
                        border-radius: 4px;
                    }
                }
                .upLoad{
                    border-color: transparent;
                }
            }
            .upLoadTips{
                width: 507px;
                color: #a457b4;
                font-size: 26px;
                margin: 0 auto;
                margin-bottom: 10px;
            }
            .btn{
                margin-top: 20px;
                margin: 0 auto;
                width: 559px;
                position: relative;
                .content{
                    font-style: 68px;
                    position: absolute;
                    color: #fff;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
    }
    .box_2{
        width: 688px;
        height: 284px;
        background: url('../../../../static/bg/box_04@2x.png') no-repeat center center;
        background-size: cover;
        margin-bottom: 30px;
        .tips{
            margin: 0 auto;
            padding: 0 50px;
            margin-top: 140px;
            text-align: center;
        }
    }
    .buttomTips{
        font-size: 26px;
        color: #692c00;
        padding: 0 20px;
        margin-bottom: 10px;
        text-align: center;
    }
    .van-popup{
        width: 650px;
        padding: 87px 15px;
        overflow-y:inherit;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .h2{
            text-align: center;
            color: #652b00;
            font-weight: 600;
            font-size: 32px;
        }
        .p1{
            text-align: center;
            color: #652b00;
            font-size: 28px;
            margin-top: 10px;
        }
        .p2{
            text-align: center;
            color: #777777;
            font-size: 24px;
            margin-top: 10px;
        }
        .btn{
            margin-top: 60px;
            width: 490px;
            margin-bottom: 30px;
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
