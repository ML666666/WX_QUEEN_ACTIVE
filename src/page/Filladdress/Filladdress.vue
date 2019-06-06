<template>
    <div id="FillAddress">
            <div class="bq">
                剩余:&nbsp<span>{{total}}</span>份
            </div>
            <div class="tips">
                尊贵的优博女王，您的专属权益已生效，<br/>马上给身边的准妈妈派送豪礼
            </div>
            <div @click="show=true" class="btn"></div>
            <div class="box">
                <h3>邀请提示：</h3>
                <p>1、您待邀请的准妈妈，需首次注册金币联盟，并拍照上传医院建档相关证明（母子健康手册、准生证明等），审核通过后准妈妈即可领取新客礼包一份，内含优博200g奶粉1听（品类随机发放）、育儿全书1本。</p>
                <p>2、限量派发，先到先得。</p>
            </div>

            <!-- 地址选择器 -->
            <van-popup v-model="popupShow" position="bottom">
                <div class="caozuo">
                    <div @click="popupShow = false" class="btn_6">取消</div>
                    <div @click="makeSure()" class="btn_6">确定</div>
                </div>
                <van-picker :columns="columns" @change="onChange" />
            </van-popup>

            <!-- 礼品选择器 -->
             <van-popup v-model="popupShow_2" position="bottom">
                <div class="caozuo">
                    <div @click="popupShow_2 = false" class="btn_6">取消</div>
                    <div @click="seleGood()" class="btn_6">确定</div>
                </div>
                <van-picker :columns="columns_2" @change="onChange_2" />
            </van-popup>

            <van-popup id='SelectWrapper' v-model="show">
                <div class="Wrapper">
                    <p>请填写真实的收货地址，我门将尽快为您寄出奖品！</p>
                    <input type="text" v-model="username" placeholder="请输入姓名" />
                    <input type="text" v-model="mobile" placeholder="请输入手机号" />
                    <div @click="getShenfen()" class="input" style="position:relative;">
                        <span v-if="provinceName">{{provinceName}}</span>
                        <span v-else>请选择省份</span>
                        <van-icon name="arrow-down" />
                    </div>
                    
                    <div  @click="getCity()" class="input" style="position:relative;">
                        <span v-if="cityName">{{cityName}}</span>
                        <span v-else>请选择城市</span>
                        <van-icon name="arrow-down" />
                    </div>
                    <div @click="getArea()" class="input" style="position:relative;">
                        <span v-if="AreaName">{{AreaName}}</span>
                        <span v-else>请选择地区</span>
                        <van-icon name="arrow-down" />
                    </div>
                    <div @click="getVillage()" class="input" style="position:relative;">
                        <span v-if="VillageName">{{VillageName}}</span>
                        <span v-else>请选择乡镇</span>
                        <van-icon name="arrow-down" />
                    </div>
                    <div class="input" v-if="$route.query.isOldClient == '0' " @click="popupShow_2 = true" style="position:relative;">
                        <span v-if="goodName">{{goodName}}</span>
                        <span v-else>选择礼品</span>
                        <van-icon name="arrow-down" />
                    </div>

                    <input type="text" v-model="address" placeholder="请输入详细地址" />
                    <!-- <input type="text" placeholder="姓名" /> -->
                    <div @click="makeSureFillFrom" class="register">
                        <img style="width:99%; display:block; margin:0 auto;" src="../../../static/bg/btn_14@2x.png" alt="">
                    </div>
                    <p style="text-align:center;">奖品将由活动结束一个月内配送完成,请耐心等待</p>
                </div>
                <van-icon @click="show=false" name="close" />
            </van-popup>

            <van-popup id="alertTips" v-model="alertTips">
                <div class="Wrapper">
                    <h2>提示</h2>
                    <p>活动已结束，感谢参与！</p>
                </div>
                <van-icon @click="alertTips=false" name="close" />
            </van-popup>   

    </div>
</template>
<script>
export default {
    mounted(){
        this.getProvince();
        this.$gob.get('getBalanceNewUserGift').then(res=>{
            if(res.data.code == 10000){
                this.total = res.data.data.blanceNumber;
            }else{
                alert(res.data.msg);
            }
        })
    },
    data(){
        return{
            alertTips:false,

            total:null,

            username:null,
            mobile:null,
            address:null,

            popupShow:false,
            show:true,
            columns:[],
            columnsType:1,
            columnsIndex:0,

            // 省份
            provinceList:[],
            provinceId:null,
            provinceName:null,

            // 市
            cityId:null,
            cityName:null,
            cityList:[],

            // 区
            AreaId:null,
            AreaName:null,
            AreaList:null,

            //街道
            VillageName:null,

            //选择礼品
            columns_2:[
                "优博200g+优博营养育儿全书1本",
                "优博瑞慕200g+优博营养育儿全书1本",
                "优博盖诺安200g+优博营养育儿全书1本"
            ],
            popupShow_2:false,
            goodIndex:0,
            goodName:""
        }
    },
    watch:{
        provinceName(){
            if(this.$route.query.id && this.isFristProvince){
                this.isFristProvince = false;
            }else{
                this.cityId = null;
                this.cityName = null;
                this.AreaId = null;
                this.AreaName = null;
                this.VillageName = null;
                this.VillageId = null;
            } 
        },
        cityName(){
            if(this.$route.query.id && this.isFristCity){
                this.isFristCity = false;
            }else{
                this.AreaId = null;
                this.AreaName = null;
                this.VillageName = null;
                this.VillageId = null;
            } 
        },
        AreaName(){
            if(this.$route.query.id && this.isFristArea){
                this.isFristArea = false;
            }else{
                this.VillageName = null;
                this.VillageId = null; 
            }
        },
    },
    methods:{

        makeSureFillFrom(){

            
            // var userObj = this.$route.query.isOldClient?JSON.parse(this.$gob.getCookie('userInfo')):JSON.parse(this.$gob.getCookie('userInfo_New'));
            if(!this.username){
                alert('请输入用户名');
                return
            }
            if(!this.mobile){
                alert('请输入手机号');
                return
            }
            if(this.mobile.length>11){
                alert('请输入正确的手机号');
                return
            }
            if(!this.provinceName){
                alert('请选择省份');
                return
            }
            if(!this.cityName){
                alert('请选择城市');
                return
            }
            if(!this.AreaName){
                alert('请选择地区');
                return
            }
            if(!this.VillageName){
                alert('请选择街道');
                return
            }
            if(!this.address){
                alert('请输入详细地址');
                return
            }
            var obj = {
                oldUserId:this.$route.query.isOldClient=="1"?this.$gob.getCookie('userid'):0,
                newUserId:this.$route.query.isOldClient=="1"?0:localStorage.getItem('userid'),
                useType:this.$route.query.isOldClient?2:1,
                giftId:this.$route.query.isOldClient=="1"?this.$route.query.giftId:8623,
                username:this.username,
                provinceId:this.provinceId,
                provinceName:this.provinceName,
                cityId:this.cityId,
                cityName:this.cityName,
                areaId:this.AreaId,
                areaName:this.AreaName,
                villageId:this.VillageId,
                villageName:this.VillageName,
                address:this.address,
                mobile:this.mobile,
                giftType:this.$route.query.isOldClient=="1"?null:this.goodName,
            }
            this.$gob.post('applyPrize',obj).then(res=>{
                if(res.data.code == 10000){
                    alert(res.data.msg);
                    if(this.$route.query.isOldClient=="1"){
                        this.$router.push({'name':'toStart'})
                    }else{
                        this.$router.push({'name':'newClientResult'})
                    }
                }else{
                    alert(res.data.msg);
                }
            })
        },
        onChange(picker, value, index){
            this.columnsIndex = index;
        },
        onChange_2(picker, value, index){
            this.goodIndex = index;
        },
        getShenfen(){
            this.columnsType = 1;
            this.popupShow = true;
            this.getProvince();
         },
        getProvince(){
            this.columns = [];
            this.$gob.get('address/getProvinceList').then((res)=>{
                this.provinceList = (res.data.data);//provinceName
                for(var i=0;i<this.provinceList.length;i++){
                    this.columns.push(this.provinceList[i].provinceName)
                }
            })
        },
        getCity(){
            if(!this.provinceName){
                alert("请先选择省");
                return
            }
            this.popupShow = true;
            this.columnsType = 2;
            this.columnsIndex = 0;
            var obj = {
                provId:this.provinceId
            }
            this.columns = [];
            this.$gob.get('address/getCityList',obj).then((res)=>{
                this.cityList = (res.data.data);
                for(var i=0;i<this.cityList.length;i++){
                    this.columns.push(this.cityList[i].cityName)
                }
            })
        },
        getArea(){
            if(!this.cityName){
                alert("请先选择市");
                return
            }
            this.popupShow = true;
            this.columnsType = 3;
            this.columnsIndex = 0;
            var obj = {
                cityId:this.cityId
            }
            this.columns = [];
            this.$gob.get('address/getAreasList',obj).then((res)=>{
                this.AreaList = (res.data.data);
                for(var i=0;i<this.AreaList.length;i++){
                    this.columns.push(this.AreaList[i].areaName)
                }
            })
        },
        getVillage(){
            if(!this.AreaName){
                alert("请先选择区");
                return
            }
            this.popupShow = true;
            this.columnsType = 4;
            this.columnsIndex = 0;
            var obj = {
                areaId:this.AreaId
            }
            this.columns = [];
            this.$gob.get('address/getVillagesList',obj).then((res)=>{
                this.VillageList = (res.data.data);
                for(var i=0;i<this.VillageList.length;i++){
                    this.columns.push(this.VillageList[i].villageName)
                }
            })
        },
        seleGood(){
            this.goodName = this.columns_2[this.goodIndex];
            console.log(this.goodName);
            this.popupShow_2 = false;
        },
        makeSure(){
            if(this.columnsType == 1){
                this.provinceId = this.provinceList[this.columnsIndex].id;
                this.provinceName = this.provinceList[this.columnsIndex].provinceName;
                this.popupShow = false;
                return
            }
            if(this.columnsType == 2){
                this.cityId = this.cityList[this.columnsIndex].id;
                this.cityName = this.cityList[this.columnsIndex].cityName;
                this.popupShow = false;
                return
            }
            if(this.columnsType == 3){
                this.AreaId = this.AreaList[this.columnsIndex].id;
                this.AreaName = this.AreaList[this.columnsIndex].areaName;
                this.popupShow = false;
                return
            }
            if(this.columnsType == 4){
                this.VillageId = this.VillageList[this.columnsIndex].id;
                this.VillageName = this.VillageList[this.columnsIndex].villageName;
                this.popupShow = false;
                return
            }
        },
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #FillAddress{
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
    #FillAddress{
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
#FillAddress{
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
        height: 225px;
        margin: 0 auto;
        background: url('../../../static/bg/box_02@2x.png') no-repeat center center;
        background-size: cover;
        padding: 18px;
        font-size: 24px;
        padding-left: 35px;
        padding-right: 35px;
        h3{
            color: #74461f;
            font-size: 24px;
        }
        p{
            color: #74461f;
            font-size: 24px;
        }
    }
    #SelectWrapper{
         transform: translate(-50%,-50%) scale(0.7);
    }
    @media all and  (min-height:360px){
        #SelectWrapper{
         transform: translate(-50%,-50%) scale(0.7);
        }
    }
    @media all and  (max-height:360px){
        #SelectWrapper{
         transform: translate(-50%,-50%) scale(0.5);
        }
    }
    .van-popup{
        max-height:120% !important;
        overflow-y:inherit;
        border-radius: 8px;
        .Wrapper{
            width: 650px;
            padding-top:60px;
            padding-left: 37px;
            padding-right: 37px; 
            background: #fff;
            p{
                color: #906b58;
                font-size: 26px;
                padding-bottom: 20px;
            }
            input,.input{
                width: 100%;
                height: 85px;
                border-radius: 60px;
                outline: none;
                border: 3px solid #d4b343;
                margin-bottom: 30px;
                padding-left: 33px;
                padding-right: 33px;
                color: #754f00;
                font-size: 28px;
                line-height: 70px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .register{
                width: 100%;
                margin-bottom: 30px;
            }
        }
         .van-picker{
            margin-top: 60px;
            .van-picker-column__item{
                font-size: 28px;
          }
        }
       .caozuo{
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ebedf0;
            height: 60px;
            .btn_6{
                color: #1989fa !important;
                font-size: 28px;
                padding-left: 60px;
                padding-right: 60px;
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
