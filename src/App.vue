<template>

  <div id="app" >
    <!--<transition :name="this.$store.state.transitioner">-->

      <router-view  />

<!--<keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
    <router-view/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>-->


    <!--</transition>-->
    <!--<chat v-if="el_bool.chat"></chat>-->
     <chats></chats>
     <bottom class="mT50"></bottom>
<!--跟目录加这个标签容器，才能在整个网站调用图片放大-->
      <!--<lg-preview></lg-preview>-->
  <!--<div v-show="show=='small'"  @click="show='big'" class="f12 w00 h470 bai fixed L00 overflow"  style="top:168px;">
    <img src="http://imgad0.pconline.com.cn/ivy/image/20189/29/15382288437450.jpg" alt="" class="w30 h450">
    <p class="absolute B00 bai c222222 cursor h20 lh20"> 展开 </p>
    </div>
  <div v-show="show=='small'"  @click="show='big'" class="f12 w00 h470 bai fixed R00 overflow" style="top:168px;">
     <img src="http://imgad0.pconline.com.cn/ivy/image/20189/29/15382288437450.jpg" alt="" class="w30 h450">
    <p class="absolute B00 bai c222222 cursor h20 lh20"> 展开 </p>
    </div>-->

   <!--<div v-show="show=='big'" @click="show='small'" class="f12 w200 bai fixed L00"  style="top:168px;">
      <img :src="src"  alt="" class="w100s">
    <p class="  bai c222222 cursor h20 lh20"> 关闭 </p>
     </div>
  <div v-show="show=='big'"  @click="show='small'" class="f12 w200 bai fixed R00" style="top:168px;">
     <img :src="src" alt="" class="w100s">
    <p class="  bai c222222 cursor h20 lh20"> 关闭 </p>
    </div>-->
  </div>
</template>

<script>
// import chat from "./components/common/chat.vue";
import chats from "./components/query/search_news.vue";
import bottom from "./components/common/bottom.vue";
export default {
  name: 'app',
  data(){
    return{
      // show:'big',
      // src:"../static/img/home/80.png",
      el_bool:{chat:false}
     }
  },
  components:{
    "chats":chats,
    'bottom':bottom
  },
  methods:{

     others11(){
 alert('调用fu')
      },
     //父组件调用子组件的方法：我要发布的方法
others1(){
  // 父元素调用子元素
  // console.log(22222222222)
  alert('调用子')
  this.$refs.c1.others11()
  return

   let xx = this.$refs.soutit;
     if(xx != undefined){
       this.$refs.soutit.otherChats();
     }

}
  },
  mounted:function(){
    let that = this;
    // 1.5秒后加载 聊天

    // let user = localStorage.setItem("user");
    // if(user!=null&&user!='null'){
    //   this.$store.state.user = user;
    // }
  }
}
</script>

<style >
@import './assets/css/common.css';
@import './assets/css/commonPc.css';
/*@import './assets/css/layui.css';*/
  #app{
    width:100%;
    min-width:1260px;
    /*overflow-y:scroll;*/
    margin:0 auto;
    /* background: #F2F2F2; */
  }

  .fade-enter-active {
    position:relative;
    transition: all 1s ease;
    left:0;
  }
  .fade-enter{
  	left:100%;
  }
  .fade-leave{
    left:-100%;
  }
  .fade2-enter-active {
    position:relative;
    transition: all 1s ease;
    left:0;
  }
  .fade2-enter{
  	left:-100%;
  }
  .fade2-leave{
    left:100%;
  }



</style>
