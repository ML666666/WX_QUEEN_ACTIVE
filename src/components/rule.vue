<template>
    <div id='rule'>
        <div class="item">
            <img src="../../static/bg/title_01@2x.png" class="title" alt="">
            <span>成功激活女王权益的会员，可免费向身边的准妈妈朋友派送新客大礼包。</span>
        </div>
        <div class="item">
            <img src="../../static/bg/title_02@2x.png" class="title" alt="">
            <span>成功领取您派送新客礼包的准妈妈，可以帮您抽奖，有机会为您抽中壕礼。</span>
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="less">
#rule{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 50px;
    .item{
        width: 329px;
        height: 205px;
        background: url('../../static/bg/box_01.png') no-repeat center center;
        background-size: cover;
        position: relative;
        padding-top: 84px;
        padding-left: 20px;
        padding-right: 20px;
        span{
                color: #723d07;
        }
        .title{
            position: absolute;
            width: 251px;
            height: auto;
            top:14px;
            left: -20px;
            font-size: 24px;
        }
    }
}
</style>
