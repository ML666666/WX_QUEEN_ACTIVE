<template>
       <div class="_guize">
           <img @click="show = true" class="_guize_img" src="../../static/bg/guize@2x.png" alt="">
           <van-popup id='_guize_Wrapper' v-model="show">
               <div class="_guize_Wrapper">
                   <h2>活动规则</h2>
                   <ul>
                       <li>
                           <i>1.</i>
                           <span>活动时间：2019年3月1日~3月10日。</span>
                       </li>
                       <li>
                           <i>2.</i>
                           <span>活动产品包括：法版优博、法版优博瑞慕、法版优博盖诺安、优博妈咪孕产妇、优博布瑞弗尼系列的产品。</span>
                       </li>
                       <li>
                           <i>3.</i>
                           <span>活动内容：活动期间，购买活动产品并新增积分达到388分及以上，即可升级为优博女王，并享有女王专属权益。</span>
                       </li>
                       <li>
                           <i>权益1：</i>
                           <span>优博女王邀请的准妈妈还可以免费申领价值248元的优博新客礼包，内包含优博系列200克奶粉1听、《优博营养育儿全书》。每天数量有限，先到先得。</span>
                       </li>
                       <li>
                           <i>权益2：</i>
                           <span>优博女王每成功邀请1位准妈妈，就可以获得1次抽奖机会，由准妈妈帮您抽奖，有机会得到专属壕礼。</span>
                       </li>
                       <li>
                           <i>4.</i>
                           <span>邀请的准妈妈朋友帮您抽奖，有机会获得优博女王专属壕礼：</span><br>
                           <span>-&nbsp黄金吊坠1个，价值1,000元</span><br>
                           <span>-&nbspYSL圣罗兰口红1个，价值350元</span><br>
                           <span>-&nbsp美的智能电饭煲1个，价值300元</span>
                       </li>
                       <li>
                           <i>5.</i>
                           <span>奖品将由活动结束后1个月内完成配送，请耐心等待</span>
                       </li>
                       <li>
                           <i>6.</i>
                           <span>非100%中奖，活动最终解释权归圣元优博所有</span>
                       </li>
                       <li>
                           <i>7.</i>
                           <span>客服热线：400 818 2829  咨询时间：9:00~17:30</span>
                       </li>
                       <li>
                           <i>8.</i>
                           <span>获得实物奖品，请3.10前于活动页面准确填写收货地址，逾期视为放弃领取资格。</span>
                       </li>
                   </ul>
               </div>
               <van-icon @click="show=false" name="close" />
           </van-popup>    
       </div> 
</template>
<script>
export default {
    data(){
        return{
            show:false
        }
    }
}
</script>
<style lang="less">
._guize{
    ._guize_img{
        width: 131px;
        position: absolute;
        height: auto;
        right: 0px;
        top: 70px;
        z-index: 100;
    }
    #_guize_Wrapper{
        transform: translate(-50%,-50%) scale(1);
        overflow-y:inherit;
        border-radius: 8px;
        border-radius: 20px;
        color: #672d02;
        border:7px solid #e8d486;
        .van-icon-close{
            position: absolute;
            bottom: -70px;
            left: 50%;
            font-size: 48px;
            color: #Fff;
            transform: translateX(-50%);
        }
        ._guize_Wrapper{
            width: 600px;
            padding: 15px;
            overflow-y:scroll;
            max-height: 850px;
            h2{
                font-size: 42px;
                margin-bottom: 15px;
                text-align: center;
            }
            ul{
                li{
                    font-size: 28px;
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>
