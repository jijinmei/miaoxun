<template>

  <div class="search_list margin bai" style="width:1220px;" v-if="datas!='no'">

 <chats style="display:none;" ref="c1"></chats>


    <div class="h500 relative overflow w100s">
      <div  class="lf relative h500" style="width:900px;">
           <!--<img :src="datas.cover+imageView2"  class="jz w100s">-->
            <img :src="datas.cover.indexOf('?')!=-1?datas.cover+'|'+imageView2:datas.cover+'?'+imageView2"  class="jz w100s">
      </div>

      <div class="w290 h500 rf">
        <p class="f15 mT15 mB05">店铺名</p>
        <p class="f20">{{datas.name}}</p>

        <p class="f15 mT15 mB05">店铺联系人</p>
        <p class="f20">{{datas.contact}}</p>
        <p class="f15 mT15 mB05">联系电话</p>
        <p class="f20">{{datas.contact_number}}</p>
        <!--<img :src="datas.user.avatar" class="cursor w100s">-->
        <hr class="mT55">
        <div class="absolute R00 w290 B00">
          <div class="w50 h50 overflow relative">
             <!--<img :src="datas.user.avatar+image50" class="w100s jz">-->
             <img :src="datas.user.avatar.indexOf('?')!=-1?datas.user.avatar+'|'+image50:datas.user.avatar+'?'+image50" class="w100s jz">
          </div>

          <p class="f15 mT15 mB05">店铺发布者</p>
          <p class="f20">{{datas.user.nickname}}
             <img class="call w30 h30 cursor" src="/static/img/common/call.png"  @click="call_sel(datas)">
          </p>
          <p class="f15 mT15 mB05">店铺发布者电话</p>
          <p class="f20">{{datas.user.mobilePhoneNumber}}</p>

        </div>


        <!--<p class="f15 mT15 mB05">苗圃名片</p>
        <p class="f20 w150 h150 overflow">
          <img :src="datas.user.avatar" class="cursor w100s">
        </p>-->
      </div>
    </div>

    <div class="mT20 mB20 pL20 pR20">
      <p class="border-b f20 pB10 pT10">店铺介绍</p>
      <p class="pT20 pB20">{{datas.intro||moni}}</p>

      <p class="border-b f20 pB10 pT10">主营范围</p>
      <p class="pT20 pB20">
        <span v-for="(item,index) in datas.tags">
          <span  v-for="(item1,index1) in item">
            <span  v-for="(item11,index11) in item1" class="inline pL10 pR10 pT05 pB05 mB10 radius10 c4a83c4 mR10" style="border:1px solid #4a83c4;" >{{item11}}</span>
        </span>
        </span>
      </p>

      <p class="border-b f20 pB10 pT10">展示</p>
      <viewer>
      <ul class="pT20 pB20 overflow">
        <li v-for="(item,index) in datas.pics" class="w287 h287 overflow mB10 tupian relative">
          <!--<img :src="item.url" class="cursor w100s jz preview-img" @click="$preview.open(index,list)" >-->
          <img :src="item.url"  class="viewerimg jz"  style="min-width:100%;min-height:100%;width:100%;">
           <!--<img :src="item.url.indexOf('?')!=-1?item.url+'|'+imageView22:item.url+'?'+imageView22"  class="cursor jz" preview='yuanlinXs' >-->
          <!--<img :src="item.url+imageView22"  v-preview="item.url" :key="index" preview-title-enable="false" preview-nav-enable="true" class="cursor w100s" preview='yuanlinX' >-->
        </li>
      </ul>
      </viewer>
    </div>



    <div class="h300 border pT10 pR10 pL15 pB15">
      <div class="h300 lf" id="allmap" style="width:800px;">
      </div>
      <div class="h300 rf w300">
        <p class="border-b f20 pB10 pT10">店铺地址</p>
        <p class="pT20 pB20" v-if="datas!='no'">{{datas.address.detail_address}}</p>
      </div>
    </div>


    <div class="mT20 mB20 pL20 pR20 overflow">

      <p class="border-b f20 pB10 pT10">全部评论·{{datas2!='no'?datas2.length:''}}</p>
      <ul class="pB15 w100s">
        <li v-for="(item,index) in datas2" class="block border-b pT20 pB20 h95" v-if="datas2!='no'">
          <div class="h70">
            <div class="lf w70 h70 radius50 overflow">
              <!--<img :src="item.user.avatar+imageView3" class="cursor w100s">-->
              <img :src="item.user.avatar.indexOf('?')!=-1?item.user.avatar+'|'+imageView3:item.user.avatar+'?'+imageView3" class="cursor w100s">
            </div>
            <div class="lf mL20">
              <p class="pB05">{{item.user.nickname}}</p>
              <p>{{item.createdAt}}</p>
            </div>
          </div>
          <p class="mT10">{{item.content}}</p>
        </li>

      </ul>

    </div>

    <div class="margin relative f20 pB30 pT30 B00" style="width:1180px;">
      <input type="text" v-model="content" class="h50 border pL20 pR20 outline0 f15" @keyup.enter="fasong" placeholder="发评论..."
        style="width:1080px;">
      <button class="white bg4a83c4 outline w100 h52 border0 center cursor f15 czjz R00" @click="fasong">发送</button>
    </div>


  </div>
</template>

<script>
      import chats from "./search_news.vue";
  export default {
    data() {
      return {

        objectId: '',
        datas:'no',
        datas2: 'no',
        content: '',
        moni: '暂无',
        imageView2: 'imageView2/1/w/900/h/500',
        imageView3: 'imageView2/1/w/70/h/70',
        imageView22: 'imageView2/1/w/287/h/287',
        image50: 'imageView2/1/w/50/h/50'




      }
    },

  components: {
      "chats":chats
    },
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
      // 点击图片触发预览方法
handleClose () {
        console.log('close event')
      },
      // 发送评论
      fasong() {
        var that = this;
        if (this.content==false) {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg('评论内容不能为空');
              });
              return
        }
          $.post(Boss + 'comment', { 'cid': this.objectId, 'content': this.content, 'sessiontoken': this.$store.state.user.sessiontoken }, function (data) {
            if (data.status) {
               that.content='';
               that.pinglun();
            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.results.message);
              });


            }
          })

      },
      // 评论
      pinglun() {
        var that = this;
        $.get(Boss + 'comment', function (data) {
          if(data.status){
                that.datas2 = data.results.data;
          }else{
            layuiError(data)
          }

        })
      },
      getData() {
        var that = this;
        this.objectId = this.$route.params.objectId;
        $.get(Boss + 'assets/' + this.objectId, function (data) {

          if(data.status){
            console.log('详情')
            console.log(data)
             that.datas = data.results;
            //  alert(that.datas.length)
               setTimeout(function () {
            //1.首页幻灯片
            var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              prevButton: '.swiper-button-prev',
              nextButton: '.swiper-button-next',
              // autoplay: 500,
              // loop:true,
              effect: 'fade'
            });

            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(that.datas.address.point.longitude, that.datas.address.point.latitude);
            map.centerAndZoom(point, 15);

            //创建小狐狸
            var pt = new BMap.Point(that.datas.address.point.longitude, that.datas.address.point.latitude);
            var myIcon = new BMap.Icon("../../static/img/common/ditu.png", new BMap.Size(300, 157));
            var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
            map.addOverlay(marker2);              // 将标注添加到地图中



          }, 500)
          }else{
            layuiError(data)
          }


        })





      }



    },
    mounted: function () {
      this.getData()
      this.pinglun()




    }
  }

</script>
<style lang="less" scoped>
  .swiper-container {
    width: 1220px;
    height: 400px;
  }

  .swiper-pagination-bullet-active {
    background: black !important;
  }

  .tupian {
    margin-right: 10px;
  }

  .tupian:nth-child(4n) {
    margin-right: 0px;
  }
</style>
