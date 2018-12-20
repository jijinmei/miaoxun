<template>
  <div class="margin relative f15 B00 search_clearX" style="width:1220px;" v-if="datas.length!=0">
    <chats style="display:none;" ref="c1"></chats>
    <div class="h500">
      <div class="lf bai pL20 pR20 pB30 pT30 h440" style="width:740px;">
        <p class="f20 bold mB30">{{datas.title}}</p>

        <p class="mB30 ca2ce36">
          招租描述
        </p>
        <p class="mB30">
          {{datas.content}}
        </p>
        <div class="h300 overflow mB30">
          <img :src="datas.pics[0].url" alt="" class="w100s">
        </div>
        <!--<div class="h300 overflow mB30" v-for="(item,index) in datas.pics">
                <img :src="item.url" alt="" class="w100s">
              </div>-->


      </div>

      <div class="w386 h440 rf bai pL20 pR20 pB30 pT30 overflow relative">
        <div style="border-top-left-radius:10px;border-bottom-right-radius:10px;border:1px solid #222222;" class="cursor center w100 h30 lh30 absolute R20 T20">招租</div>
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
            <img class="call w30 h30 cursor" src="/static/img/common/call.png" @click="call_sel(datas)">
          </p>
          <p class="f15 mT15 mB05">发布者电话</p>
          <p class="f20">{{datas.user.mobilePhoneNumber}}</p>
          <p class="f15 mT15 mB05">发布时间</p>
          <p class="f20">{{datas.createdAt}}</p>

        </div>
      </div>
    </div>



    <div class="mT10 bai pL20 pR20 block">
      <p class="border-b f20 pB10 pT10">展示</p>
      <viewer>
      <ul class="pT20 pB20 overflow">
        <li v-for="(item,index) in datas.pics" class="w287 h287 overflow mB10 tupian relative">
          <!--<img :src="item.url" class="cursor w100s jz preview-img" @click="$preview.open(index,list)" >-->
          <img :src="item.url" class="viewerimg jz" preview='rentXs' style="min-width:100%;min-height:100%;width:100%;">
          <!--<img :src="item.url+imageView22"  v-preview="item.url" :key="index" preview-title-enable="false" preview-nav-enable="true" class="cursor w100s" preview='yuanlinX' >-->
        </li>
      </ul>
      </viewer>
    </div>




  </div>
</template>

<script>
  import chats from "./search_news.vue";
  // import lists from './listZ.vue';
  export default {
    data() {
      return {
        // imageview1:"?imageView2/1/w/250/h/150",
        datas: []
      }
    },
    components: {
      "chats": chats
    },
    // components:{'lists':lists},
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
      xiangxi() {
        var that = this;
        $.get(Boss + 'article/' + this.$route.params.objectId, function (data) {
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
    }
  }

</script>

<style lang="less" scoped>
  .tupian {
    margin-right: 10px;
  }

  .tupian:nth-child(4n) {
    margin-right: 0px;
  }
</style>
