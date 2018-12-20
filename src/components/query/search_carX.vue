<template>
  <div class="margin relative f15 B00 search_clearX" style="width:1220px;" v-if="datas.length!=0">
 <chats style="display:none;" ref="c1"></chats>
    <div class="h500">
      <div class="lf bai pL20 pR20 pB30 pT30 overflow h440" style="width:740px;">
        <!--<p class="f20 bold mB30">{{datas.title}}</p>-->

        <!--<p class="mB30 ca2ce36">
                招租描述
              </p>
              <p class="mB30">
                 {{datas.content}}
              </p>-->

        <!-- Swiper -->
        <div class="swiper-container swiper-container1 z_00">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in datas.pics">
              <img :src="item.url+imageView1" alt="" class="w100s jz">
            </div>
            <!--<div class="swiper-slide overflow"  style="">
             <img src="/static/img/home/banner.jpg" alt=""  style="animation:banner 40s linear infinite;height: 560px;">
          </div>-->
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination swiper-pagination1"></div>
          <div class="swiper-button-prev swiper-button-prev1 swiper-button-white"></div>
          <div class="swiper-button-next swiper-button-next1 swiper-button-white"></div>
        </div>
        <!--<div class="h300 overflow mB30">
                <img :src="datas.pics[0].url" alt="" class="w100s">
              </div>-->


      </div>

      <div class="w386 h440 rf bai pL20 pR20 pB30 pT30 overflow relative">
        <!--<div style="border-top-left-radius:10px;border-bottom-right-radius:10px;border:1px solid #222222;" class="cursor center w100 h30 lh30 absolute R20 T20">招租</div>-->
        <p class="f15 mT15 mB05">联系人</p>
        <p class="f20">{{datas.contact}}</p>
        <p class="f15 mT15 mB05">联系电话</p>
        <p class="f20">{{datas.contact_number}}</p>
        <hr class="mT45 mB45">
        <div class="w290">
          <div class="w50 h50 overflow">
            <img :src="datas.user.avatar" class="w50">
          </div>

          <p class="f15 mT15 mB05">发布者</p>
          <p class="f20">{{datas.user.nickname}}
              <img class="call w30 h30 cursor" src="/static/img/common/call.png"  @click="call_sel(datas)">
          </p>
          <p class="f15 mT15 mB05">发布者电话</p>
          <p class="f20">{{datas.user.mobilePhoneNumber}}</p>
          <p class="f15 mT15 mB05">发布时间</p>
          <p class="f20">{{datas.createdAt}}</p>

        </div>
      </div>
    </div>


 <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f20 bold mB10">{{datas.classification.type}}</p>
 <p class="f18 mB10">
          <span v-if="datas.classification.width&&(datas.classification.type=='运输车辆'||datas.classification.type=='随车吊')">车厢长{{datas.classification.width}}米</span>
          <span v-if="datas.classification.width&&datas.classification.weight" class="bold">·</span>
          <span  v-if="datas.classification.weight&&datas.classification.type!='挖机'">吊重{{datas.classification.weight}}吨</span>
          <span  v-if="datas.classification.weight&&datas.classification.type=='挖机'">吨位{{datas.classification.weight}}吨</span>
     </p>
        <span class="c777777">服务地区：</span>
              <span v-for="(item2,key2,index2) in datas.area">
                <span v-for="(item22,key22,index22) in item2">
                   <span v-for="(item3,key3,index3) in item22" class="mR10 c4cafb6 radius10 f12 pT04 pB04 pL08 pR08" style="border:1px solid #4cafb6;">{{item3}}</span>
                </span>
              </span>
    </div>
 <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f15 bold mB20">车辆备注</p>
      <p class="c777777">{{datas.remark||'TA什么都没有留下'}}</p>
    </div>




  <p class="f15 bold pT30 pB30 border-b pL20 bai mT10">发布人的其他车辆</p>
<listcar :datas="datas"> </listcar>




  </div>
</template>

<script>
    import chats from "./search_news.vue";
  import listcar from './listcar.vue';
  export default {
    data() {
      return {
        imageView1: "?imageView2/1/w/740",
        datas: []
      }
    },

    components:{'listcar':listcar,"chats":chats},
    methods: {
       //联系卖家
      call_sel(item) {
        console.log(item)
        // return
        let that = this;
        if (localStorage.getItem("user") == null) {
          this.$store.state.login_el_bool = true;
        } else {
          // 点击头像调用对话函数
           console.log(vm)
            this.$refs.c1.otherChats(item)

        }


      },
      swipers() {
        //1.首页幻灯片
        var swiper = new Swiper('.swiper-container1', {
          pagination: '.swiper-pagination1',
          paginationClickable: true,
          prevButton: '.swiper-button-prev1',
          nextButton: '.swiper-button-next1',
          // autoplay: 500,
          // loop:true,
          effect: 'fade'
        });
      },
      xiangxi() {
        var that = this;
        $.get(Boss + 'carriage/' + this.$route.params.objectId, function (data) {
          if(data.status){
            console.log('详情')
            console.log(data)
             that.datas = data.results;
          }else{
            layuiError(data)
          }


        })
      }

    },
    mounted: function () {
      this.xiangxi()
      this.swipers()
    }
  }

</script>

<style lang="less" scoped>
  /*幻灯片*/

  .swiper-container {
    width: 100%;
    height: 100%;
  }
  /*.swiper-container1 {
    max-width: 1920px;
    min-width: 1260;
    height: 560px;
    width: 100%;
  }*/
</style>
