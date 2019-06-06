<template>
    <div id="Login">
       <Rule_2></Rule_2>
       <div @click="toStart" class="toStart">
           <img src="../../../static/bg/btn_01@2x.png" alt="">
       </div>
       <div class="button">
           <Rule></Rule>
       </div>
    </div>
</template>
<script>
import Rule_2 from '../../components/rule_2'
import Rule from '../../components/rule'
export default {
    components:{
        Rule,
        Rule_2
    },
    mounted(){
    },
    data(){
        return{
        
        }
    },
    methods:{
        toStart(){
            // var now = new Date();
            // if(now<new Date(Date.parse("2019/3/1 10:0:0")) || now>new Date(Date.parse("2019/3/10 24:0:0"))){
            //     alert("活动将于3月1日 10:00正式启动，敬请期待！");
            //     return
            // }
            let userid = this.$gob.getCookie('userid');
            var obj = {
                userId:this.$gob.getCookie('userid'),
            }
            if(parseInt(userid) == 0){
                this.$router.push({'name':'register'});
                return
            }
            this.$gob.post('getOldUserInfo',obj).then(res=>{
                // if(res.data.code == 40007){
                //     this.$router.push({'name':'toGetGold'});
                //     return
                // }控制面板
                if(res.data.code == 10000){
                    console.log(res.data.data);
                    this.$gob.setCookie('userInfo',JSON.stringify(res.data.data));
                    if(parseInt(res.data.data.totalGold) >= 388){
                        this.$router.push({'name':'toStart'})
                    }else{
                        this.$router.push({'name':'toGetGold'})
                    }
                }else{
                    alert(res.data.msg);
                }
            })
            // this.$router.push({'name':'main'});
        }
    }
}
</script>
<style lang="less">
@media all and  (min-height:736px){
    #Login{
        position: relative;
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs7VGAJJoFAAJhJKnEsRM963.jpg') no-repeat center center;
        background-size: cover;
        height: 1624px;
        padding-top:1090px;
        .toStart{
            margin: 0 auto;
            width: 430px;
            img{
                width: 100%;
                height: auto;
            }
        }
        .button{
            margin-top: 80px;
            width: 100%;
            height: 325px;
        }
    }
}
@media all and  (max-height:736px){
    #Login{
        position: relative;
        width: 100%;
        background: url('https://gate.youhuiduo.cn/jinbi/M00/00/0D/sKYBaFxs7WeAEOsQAAIneGRyT2A801.jpg') no-repeat center center;
        background-size: cover;
        height: 1334px;
        padding-top:922px;
        .toStart{
            margin: 0 auto;
            width: 430px;
            img{
                width: 100%;
                height: auto;
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
