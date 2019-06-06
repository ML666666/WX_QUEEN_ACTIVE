<template>
  <div id="app">
    <transition :name="fade">
          <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
        var _this=this;
        document.body.addEventListener('focusin',function(){
            //软键盘弹出的事件处理
            if(_this.isIphone()){
                window.scroll(0,0);
            }
        })
 
        document.body.addEventListener('focusout', function(){
            //软键盘收起的事件处理
            if(_this.isIphone()){
                window.scroll(0,0);
            }
        })

        if(window.location.href.includes('localhost:')){
          this.$gob.setCookie('mobile','13926285338');
          this.$gob.setCookie('nickname','666');
          this.$gob.setCookie('openid','oz9kYuDkbn2KaASTlAtRJVAR01x8');
          this.$gob.setCookie('token','SVkycWNseUZOcXhYQjV0b0FLL2RoTmVkMlhuanRlU0VGaFowZUw5MmFYUHpXWmlKVmtQUHRLMFJmZjNWdWJMNnVJZ0loOEFRM3M4UjNTMDBKYTljSXI3R1IwOUFKWEpPM3I2eDBPc1pGa1JXVE0yWE1FelQ4Z2pMZ0puMHJYSE9zRmFtMm5UVEduY3FIdU5HS09vY01jcXpLWDl3OGZidnJlUVY4ZFA0ZzBOcEdyQzJVVzhPbkE9PQ==')
          this.$gob.setCookie('unionid','okRPsjhGpyCSiKNN5tUdvXUe_zZE');
          // this.$gob.setCookie('userid','3747761');
          this.$gob.setCookie('userid','3701597');
        }

        
  },
  data:function(){
    return{
      active: 0,
      fade:"fade"
    }
  },
  methods:{
    isIphone:function(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
  }
}
</script>

<style lang="less">
body{
   background: rgb(231, 230, 230);
}
#app {
  width: 750px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background: url('../static/img/bg.jpg');
  *{
    margin:0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .fade-enter{
     opacity: 0;
  }
  .fade-enter-active{
    transition: all 0.4s;
  }
  .fade-leave{
    opacity: 0;
  }
  .fade-leave-active{
    transition: all 0.4s ease-in;
  }
  .van-tabbar{
    height: 100px;
    border-top: 1px solid rgb(136, 134, 134);
    .van-tabbar-item{
      font-size: 28px;
      .van-info{
        padding: 6px;
        font-size: 24px;
      }
    }
    .van-tabbar-item__icon{
      font-size: 34px;
      margin-bottom: 5px;
    }
  }
  ::-webkit-input-placeholder{color: #754f00;}    /* 使用webkit内核的浏览器 */
  :-moz-placeholder{color: #754f00;}                  /* Firefox版本4-18 */
  ::-moz-placeholder{color: #754f00;}                  /* Firefox版本19+ */
  :-ms-input-placeholder{color: #754f00;}           /* IE浏览器 */
}

</style>
