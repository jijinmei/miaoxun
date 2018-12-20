<template>
  <div class="search_yuanlin">

    <div class="search_list margin bai" style="width:1220px;">
      <div class="h400" style="background:url(/static/img/home/25.png) repeat;"></div>
      <!--<span class="c999999">全部店铺:</span>-->
      <ul class="f15 mT50 mB20">
        <li class="mR20 mL20" :class="{c4a83c4:-1==yuanlin_wai_index}" @click="changes_wai(-1,'')">全部</li>
        <li v-for="(item,index) in yuanlin_wai" class="mR20 cursor mB20" :class="{c4a83c4:index==yuanlin_wai_index}" @click="changes_wai(index,item)">{{item}}</li>
      </ul>

      <ul class="f15 mB50" v-show="yuanlin_wai_index!=-1">
        <li class="mR20 mL20" :class="{c4a83c4:-1==yuanlin_nei_index}" @click="changes_nei(-1,'')">全部</li>
        <li v-for="(item,index) in yuanlin_nei" :class="{c4a83c4:index==yuanlin_nei_index}" class="mR20 cursor mB20" @click="changes_nei(index,item)">{{item}}</li>
      </ul>

      <!--搜索框-->
      <div class="relative pL100 pR20">
        <!--<input type="text" name="title" requi lay-verify="requi" placeholder="查找关键字" autocomplete="off" class="layui-input">-->
        <input type="text" v-model="searchkey" class="h50 border pL10 pR10 outline0 f15" @keyup.enter="sousuo('yes')" placeholder="查找关键字"
          style="width:900px;">
        <button class="white bg4a83c4 outline w78 h52 border0 center czjz R120 cursor f15" @click="sousuo('yes')">搜索</button>
      </div>

      <ul class="market mT50">

        <li class="w560 h300 pL20 pR20 mL06 border cursor mB06 " v-for="(item,index) in markets">
          <router-link :to="{name:'yuanlinX',params:{objectId:item.objectId}}" target="_blank" @click="objectId=item.objectId">
            <div class="h145 mB20 mT20">
              <div class="w154 h88 lf bgeeeeee overflow relative">
                <img :src="item.cover.indexOf('?')!=-1?item.cover+'|'+imageView2:item.cover+'?'+imageView2" alt="" class="jz">

              </div>
              <div class="w320 h100s rf relative ">
                <p class="bold f23 mB30">{{item.name}}</p>
                <span v-if="indexs11==0||indexs11==1" v-for="(item11,indexs11) in item.tagss" class="c4a83c4 pL10 pR10 bold h30 lh30 mR10 mB10 lf"
                  style="border:1px solid #4a83c4;border-radius:10px;">{{item11}}</span>
                <span v-if="item.tagss.length>2" class="c4a83c4 pL10 pR10 bold h30 lh30 mR10 mB10 lf" style="border:1px solid #4a83c4;border-radius:10px;">+{{item.tagss.length-2}}</span>
                <!--<span v-for="(item1,indexs1) in item.tags[0]" class="spans">-->
                <!--{{indexs1}}-->
                <!--<span  v-for="(item11,indexs11) in item1" class="c4a83c4 pL10 pR10 bold pT03 pR03 mR10 mB10 lf" style="border:1px solid #4a83c4;border-radius:10px;">{{item11}}</span>-->
                <!--<span   class=" c4a83c4 pL10 pR10 bold pT03 pR03 mR10 mB10 lf" style="border:1px solid #4a83c4;border-radius:10px;">+{{returns(item.tags[0])-2}}</span>-->
                <!--</span>-->
                <p class="absolute R20 B20 c777777"><span>{{item.address.province}}</span>{{item.address.city}}</p>
              </div>
            </div>

            <div class="h95 border-t mB20">
              <!--<viewer>-->
              <ul class="mT20">
                <li>
                  <div class="relative w560" @mouseenter="shows=index" @mouseleave="shows=-1">
                    <div class="swiper-container swiper-container2 z_00" :class="'swiper'+index">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide overflow bgeeeeee" v-for="(item2,index2) in item.pics">
                          <!--{{index2}}-->
                          <img :src="item2.url.indexOf('?')!=-1?item2.url+'|'+imageView22:item2.url+'?'+imageView22" class="cursor jz viewerimg">

                        </div>

                      </div>
                    </div>


                    <div class="swiper-button-prev swiper-button-prev2 swiper-button-black L00" :class="'prev'+index" v-show="shows==index"></div>
                    <div class="swiper-button-next swiper-button-next2 swiper-button-black R00" :class="'next'+index" v-show="shows==index"></div>

                  </div>
                </li>
              </ul>
              <!--</viewer>-->
            </div>
          </router-link>
        </li>

      </ul>




      <!--分页-->
      <div id="pages" class="pT30 pB20 pL30 margin"></div>


    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        yuanlin: [],//总数据
        yuanlin_wai: [],//一级列表
        yuanlin_wai_index: -1,//一级列表下标
        yuanlin_wai_name: '',//一级列表下标
        yuanlin_nei: [],//二级列表
        yuanlin_nei_index: -1,//二级列表下标
        yuanlin_nei_name: '',//二级列表下标
        // 店铺列表
        imageView2: 'imageView2/1/w/154/h/88',
        imageView22: 'imageView2/1/w/88/h/88',
        searchkey: '',
        markets: [],
        shows: -1,

        pics: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]




      }
    },
    computed: {

    },
    methods: {
      returns(item) {
        var length = 0
        for (var key in item) {
          console.log(key)
          length += item[key].length

        }
        return length
        // console.log(length)
      },
      toswiper() {
        setTimeout(function () {
          var ccc = $(".swiper-container2")
          for (var index = 0; index < ccc.length; index++) {
            var swiper = new Swiper('.swiper' + index, {
              pagination: '.swiper-pagination',
              slidesPerView: 5,
              slidesPerColumn: 1,
              paginationClickable: true,
              prevButton: '.prev' + index,
              nextButton: '.next' + index,
              spaceBetween: 10
            });
          }

        }, 500)
      },
      pages(page) {
        var that = this;
        // var channel=(this.yuanlin_wai_index==-1&&this.yuanlin_nei_index==-1?'':(this.yuanlin_wai_name||this.yuanlin_nei_name))
        var channel = this.yuanlin_nei_name || this.yuanlin_wai_name
        $.get(this.$store.state.v3 + 'assets', { 'channel': channel, 'searchkey': this.searchkey, 'page': page, 'limit': limitS }, function (data) {
          if (data.status) {
            that.markets = data.results.data
            for (var ii = 0; ii < that.markets.length; ii++) {
              that.markets[ii].tagss = []

              for (var index = 0; index < that.markets[ii].tags.length; index++) {

                var obj = that.markets[ii].tags[index]
                var totalkey = Object.keys(obj).length
                Object.keys(obj).forEach((item, indexs) => {
                  for (var jj = 0; jj < obj[item].length; jj++) {
                    that.markets[ii].tagss.push(obj[item][jj])
                  }


                })

              }

            }
            that.toswiper();
            layui.use('laypage', function () {
              var laypage = layui.laypage;
              //执行一个laypage实例
              laypage.render({
                elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
                limit: limitS,
                // curr:location.hash.replace('?!fenye=', ''), //获取起始页,
                // hash: 'fenye', //自定义hash值
                layout: ['prev', 'page', 'next', 'count', 'skip'],
                prev: '<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                next: '下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                // hash: 'page', //自定义hash值
                count: data.results.count, //数据总数，从服务端得到
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
        })
      },
      changes_wai(index, item) {

        this.yuanlin_wai_index = index
        this.yuanlin_wai_name = item
        if (item == '') {
          this.yuanlin_nei = []
          this.yuanlin_nei_name = ''
        } else {
          this.yuanlin_nei = this.yuanlin[index][item]
        }

        // 请求一级分类的内容
        this.pages(1)

      },
      changes_nei(index, item) {
        this.yuanlin_nei_index = index
        this.yuanlin_nei_name = item
        //  请求二级分类的内容
        this.pages(1)


      },
      sousuo: function () {
        this.pages(1)
      },
      https(page) {
        var that = this;
        // var channel=(this.yuanlin_wai_index==-1&&this.yuanlin_nei_index==-1?'':(this.yuanlin_wai_name||this.yuanlin_nei_name))
        var channel = this.yuanlin_nei_name || this.yuanlin_wai_name
        $.get(this.$store.state.v3 + 'assets', { 'channel': channel, 'searchkey': this.searchkey, 'page': page, 'limit': limitS }, function (data) {
          if (data.status) {

              that.markets = data.results.data
            for (var ii = 0; ii < that.markets.length; ii++) {
              that.markets[ii].tagss = []

              for (var index = 0; index < that.markets[ii].tags.length; index++) {

                var obj = that.markets[ii].tags[index]
                var totalkey = Object.keys(obj).length
                Object.keys(obj).forEach((item, indexs) => {
                  for (var jj = 0; jj < obj[item].length; jj++) {
                    that.markets[ii].tagss.push(obj[item][jj])
                  }


                })

              }

            }
            that.toswiper();

          }else{

          }
        })

      }
    },
    mounted: function () {
      var that = this;
      $.get(this.$store.state.v2 + '/types.json', function (data) {
        for (var index = 0; index < data.length; index++) {
          console.log(data[index]);
          for (var key in data[index]) {
            that.yuanlin_wai.push(key)
          }
        }

        that.yuanlin = data;

      })



      this.pages(1)





    }
  }

</script>
<style lang="less" scoped>
  .market {
    width: 1220px;
  }


  .market>li:nth-child(n) {
    float: left;
  }
  /*swiper*/

  .swiper-container2 {
    width: 500px;
    height: 75px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    height: 25px;
  }


  .swiper-container2 .swiper-slide {
    height: 75px;
  }
</style>
