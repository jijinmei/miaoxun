<template>
  <div class="margin relative f15 pB30 pT30 B00 bai pL06 pR06 search_clear" style="width:1208px;">

    <div class="relative mB30 mL54" style="width:1100px;">
      <input type="text" v-model="searchKey" class="h50 border pL20 pR20 outline0 f15" @keyup.enter="sousuo" placeholder="搜索职位"
        style="width:970px;">
      <button class="white bga2ce36 outline w100 h52 border0 center cursor f15 czjz R00" @click="sousuo">搜索</button>
    </div>
    <!--清场列表-->

    <ul class="overflow bai" id="clear" style="width:1208px;">
      <li v-for="(item,index) in datas" class="w560 h210 pL20 pB20 pT20 pR20 border cursor mB06" >
        <router-link :to="{name:'clearX',params:{objectId:item.objectId}}" target="_blank">

               <div class="relative w560" @mouseenter="shows=index" @mouseleave="shows=-1" style="z-index:0;">
                  <div class="swiper-container swiper-container2 z_00" :class="'swiper'+index">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide overflow radius10" v-for="(item2,index2) in item.pics">
                        <img :src="item2.url.indexOf('?')!=-1?item2.url+'|'+imageView2:item2.url+'?'+imageView2"
                  class="w200 h100 cursor">

                      </div>

                    </div>
                  </div>


                  <div class="swiper-button-prev swiper-button-prev2 swiper-button-black L00" :class="'prev'+index" v-show="shows==index"></div>
                  <div class="swiper-button-next swiper-button-next2 swiper-button-black R00" :class="'next'+index" v-show="shows==index"></div>

                </div>

          <p class="bold mT20 mB10 f20">{{item.title}}</p>
          <p class="">{{item.contact}}</p>
        </router-link>
      </li>
    </ul>


    <div style="width:1208px;" class="margin bai">
      <div id="pages" class="pT30 pB20 pL30 margin"></div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        shows:-1,
        searchKey: "",
        imageView2: 'imageView2/1/w/200/h/100',
        datas: []//清场列表
      }
    },
    methods: {
                  toswiper(){
        setTimeout(function(){
  var ccc=$(".swiper-container2")
  for (var index = 0; index < ccc.length; index++) {
             var swiper = new Swiper('.swiper'+index, {
              pagination: '.swiper-pagination',
              slidesPerView: 3,
              centeredSlides:false,
              slidesPerColumn: 1,
              paginationClickable: true,
              prevButton: '.prev'+index,
              nextButton: '.next'+index,
              spaceBetween: 10
            });
  }

},500)
      },
      sousuo() {
        this.https(1)
      },
      https(page) {
        var that = this

        // Jobs - 查看清场列表
        $.ajax({
          url: Boss + "article",
          type: "GET",
          data: {
            'searchkey': that.searchKey,//
            'page': page,
            'category':'清场',
            'limit': limitS
            // 'sessiontoken':sessiontoken
          },
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.datas = data.results.data;
               that.toswiper();

            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.message);
              });
            }
          }
        })

      },
      pages(page) {
        //首次请求数据，并构建分页
        var that = this;

        // Jobs - 查看清场列表
        $.ajax({
          url: Boss + "article",
          type: "GET",
          data: {
            'searchkey': that.searchKey,//
            'page': page,
            'limit': limitS,
            'category':'清场'
            // 'sessiontoken':sessiontoken
          },
          headers: {
            "role": "seller",
          },

          success: function (data) {
            if (data.status) {

              that.datas = data.results.data;
               that.toswiper();
              var count = data.results.count;
              layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                  elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
                  limit: 20,
                  // curr:location.hash.replace('?!fenye=', ''), //获取起始页,
                  // hash: 'fenye', //自定义hash值
                  layout: ['prev', 'page', 'next', 'count', 'skip'],
                  prev: '<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                  next: '下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                  // hash: 'page', //自定义hash值
                  count: count, //数据总数，从服务端得到
                  jump: function (obj, first) {
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if (!first) {
                      console.log('切换对应页数据')
                      that.page = obj.curr
                      that.https(obj.curr)
                    } else {
                      // 如果是首次
                      console.log('首次啥也不干')
                      //that.https(1)
                    }
                  }
                });
              });
            }
          },
          error: function (data) {

          },
        })
      }
    },
    mounted: function () {
      this.pages(1)

    }
  }

</script>

<style lang="less" scoped>
  #clear>li:nth-child(n) {
    float: left;
  }

  #clear>li:nth-child(2n) {
    float: right;
  }

    /*swiper*/
  .swiper-container2 {
    width: 500px;
    height: 100px;
  }
.swiper-button-next, .swiper-button-prev{height: 25px;}


  .swiper-container2 .swiper-slide {
    height: 100px;
  }
</style>
