<template>
    <div id="newClientMain">
        <div class="tips">
            <span>准妈妈</span><div>您好！&nbsp 完成新客认证，领取壕礼！！</div>
        </div>
        
        <div v-if="loading" class="upLoadIng">
            <van-loading class="loading" size="36px" />
            <p>上传中...</p>
        </div>

        <div class="box_1 box">
            <img class="banner" src="../../../assets/title_03@2x.png" />
            <p class="tips">拍照上传证明文件，系统审核通过后即可免费领取优博提供的新客大礼包一份。</p>
            <div class="upLoadWrapper">
                <div class="ImgWrapper">
                    <div
                     @touchstart="toDelete(index)" @touchmove="gotouchmove" @touchend="gotouchend"
                     @click="showImg(index)" 
                     v-for="(v,index) in imgList" 
                     class="item">
                        <img src="../../../assets/delete.png" class="close" />
                        <img class="img" :src="v">
                    </div>
                    <label v-if="imgList.length<3" for="imgFile" class="upLoad item">
                        <img class="img"  src="../../../../static/bg/upload@2x.png">
                    </label>
                </div> 
                <input @change="upLoadImg"  style="display:none" name="file" id="imgFile" accept="image/*" type="file" />
                <div class="upLoadTips">
                    请上传1-3张清晰的医院开具的怀孕建档证明（如母子健康手册、B超单、准生证明等）
                </div>
            </div>
             <div @click="toSubmit" class="btn">
                    <img src="../../../../static/bg/btn_09@2x.png" style="width:100%" />
             </div>
        </div>

        <div class="box_2 box">
            <img class="banner" src="../../../assets/title_04@2x.png" />
            <p class="tips">您成功领取新客礼包后，即可帮助闺蜜抽奖有机会赢取大奖！</p>
        </div>

        <div class="buttomTips">
            请收藏该链接地址，方便您查看审核结果及领取新客礼包。
        </div>
        
        <van-popup v-model="showAlert">
            <p class="h2">上传成功！</p>
            <span class="p1">系统将于24小时内公布审核结果！</span>
            <span class="p2">请收藏该链接地址，留意审核结果及领取新客礼包！</span>
            <van-icon @click="showAlert=false" name="close" />
        </van-popup>
        
    </div>    
</template>
<script>
var timeOutEvent=0;//定时器 
import { ImagePreview } from 'vant';
import axios from 'axios'
export default {
    data(){
        return{
            showAlert:false,
            nickname:null,
            oldClientId:null,
            oldClientName:null,
            sign:null,
            imgIndex:0,
            loading:false,
            imgList:[]
        }
    },
    watch:{
        showAlert:function(val,oldval){
            if(!this.showAlert){
                 this.$router.push({'name':'newClientResult'});
            }
        }
    },
    mounted(){
        this.nickname = localStorage.getItem('nickname');
        this.oldClientId = localStorage.getItem('oldClientId');
        this.oldClientName = localStorage.getItem('oldClientName');
        this.$gob.get('getBalanceNewUserGift').then(res =>{
            if(res.data.code == 10000){
                this.sign = res.data.data.sign;
            }else{
                alert(res.data.msg);
            }
        });
    },
    methods:{
        toSubmit(){
            if(this.imgList.length==0){
                alert('请至少上传一张图片');
                return
            }
            var _this = this;
            var obj = {
                newUserId:parseInt(localStorage.getItem('userid')),
                wxNickName:localStorage.getItem('nickname'),
                picture1:_this.imgList[0],
                picture2:_this.imgList[1]?_this.imgList[1]:null,
                picture3:_this.imgList[2]?_this.imgList[2]:null,
                wxOpenId:_this.$gob.getCookie('openid'),
                wxUnionId:_this.$gob.getCookie('unionid'),
                oldUserId:_this.$gob.getCookie('oldClientId'),
                newUserMobile:_this.$gob.getCookie('mobile')
            }
            this.$gob.post('submitNewUserInfo',obj).then(res=>{
                if(res.data.code == 10000){
                    // alert('提交信息成功');
                    this.showAlert = true;
                }else{
                    alert(res.data.msg);
                }
            })
        },
        showImg(index){
             ImagePreview({images:this.imgList,startPosition:index});
        },
        toDelete(index){
            let that = this;
            clearTimeout(timeOutEvent);//清除定时器
            timeOutEvent = 0;
            timeOutEvent = setTimeout(()=>{
            //执行长按要执行的内容，
            // this.imgList
               if(confirm("是否删除该图片?") == true){
                    // this.imgList[key] = 0;     //如果用户单击了确定按钮 
                    var tList = this.imgList;
                    tList[index] = 0;
                    this.imgList = [];
                    for(var i=0;i<tList.length;i++){
                        if(tList[i]){
                            this.imgList.push(tList[i])
                        }
                    }
                    this.imgIndex = this.imgList.length;
               }
            },600);//这里设置定时
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gotouchend(){
            clearTimeout(timeOutEvent);
            if(timeOutEvent!=0){
            //这里写要执行的内容（尤如onclick事件）
            }
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
        gotouchmove(){
            clearTimeout(timeOutEvent);//清除定时器
            timeOutEvent = 0;
        },
        upLoadImg(e){
            if(this.imgList.length>=3){
                 alert("上传图片不能超过3张");
                 return
            }
            let file = e.target.files[0];           
            let param = new FormData(); 
            param.append('file',file,file.name);
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            }; 
            this.loading = true;
            axios.post('https://gate.ujinbi.com/file_dfs/File/Upload',
            param,
            {
                 headers: {
                     'ZhaoQiLai-Token': this.sign,
                 }
            },
            config).then(res=>{
                if(res.data.code == "10000"){
                       this.loading = false;
                       this.$set(this.imgList,this.imgIndex,res.data.data.dic.picfullpath)
                       this.imgIndex++;
                       alert('上传成功')
                }else{
                    alert("上传失败");
                    this.loading = false;

                }
            }).catch(err=>{
                alert(err);
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
    .upLoadIng{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(0,0,0, 0.7);
        width: 180px;
        height: 180px;
        z-index: 10000;
        border-radius: 6px;
        .loading{
            display: block;
            margin: 0 auto;
            margin-top: 40px;
        }
        p{
            color: #fff;
            text-align: center;
            font-size: 28px;
            margin-top: 10px;
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
                justify-content: space-around !important;;
                margin-bottom: 20px;
                .item{
                    display: block;
                    width: 157px;
                    height: 157px;
                    border-radius: 4px;
                    position: relative;
                    border:2px solid #a256b1;
                    background: #fff;
                    margin-right: 36.5px;
                    .close{
                        width: 32px;
                        height: 32px;
                        top: -16px;
                        right: -16px;
                        position: absolute;
                    }
                    .img{
                        width: 100%;
                        height: 157px !important;
                        border-radius: 4px;
                    }
                }
                .item:last-child{
                    margin-right: 0px !important;
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
