<template>
  <div class="bai">

    <div class="bai pL10 pR10 margin" style="width:1200px;" v-if="tree!='no'">
      <p class="f15 c666666 pB10 pT50 border-b pL10 pR10">
        <router-link :to="{name:'query_ground',params:{id:tree.mu_ground.objectId}}" target="_blank"><span class="cursor hover">{{tree.mu_ground.gg_name}}苗圃场</span> </router-link>
        >
        <span class="c36c748">{{tree.mu_name}}</span></p>

      <div class=" mT30" style="height:520px;">
        <div class="w300  lf pT11 pB11 pL10 pR10 mR07" style="height:436px;">
          <div class="w298 h363 border overflow relative">
            <!--<img :src="nowimg.indexOf('?')!=-1?nowimg+'|'+imageView22:nowimg+'?'+imageView22" class="jz cursor" >-->
            <!--<img :src="nowimg" class="jz cursor w100s" preview='bigtreesx'>-->
            <viewer>
              <img :src="nowimg" class="jz viewerimg w100s">
            </viewer>
            <!--class="w298 h363"-->
          </div>
          <!--轮播图-->
            <viewer >
          <div class="relative w300 mT05 h68" id="viewers">
            <div class="swiper-container swiper-containerf z_00">
              <div class="swiper-wrapper">
                <div class="swiper-slide overflow w62 h62 docs-pictures" v-for="(item,index) in tree.mu_photo" @mouseenter="enterurl(item)">
                  <!--<img :src="item.url" class="jz cursor w100s" preview='treesx'>-->
                  <!--<img :src="item.url"  :data-original="item.url" class="jz cursor w100s" >-->
                  <!--<viewer style="cursor: -webkit-zoom-in;cursor: zoom-in;">-->
                    <img  :data-original="item.url" :src="item.url" class="jz viewerimg w100s">
                  <!--</viewer>-->
                <!--<img :src="item.url" class="jz cursor w100s" preview='treesx'>-->
                  <!--w62 h62 <img :src="item.url.indexOf('?')!=-1?item.url+'|'+imageView2:item.url+'?'+imageView2" class="jz cursor" preview='treesx'> -->
                </div>

              </div>
              <div class="swiper-button-prev swiper-button-prevf swiper-button-black" v-show="tree.mu_photo.length>0"></div>
              <div class="swiper-button-next swiper-button-nextf swiper-button-black" v-show="tree.mu_photo.length>0"></div>
            </div>




          </div>
           </viewer>
        </div>
        <div class=" lf mL10 border-t pT15 pB15 pL10 pR10" style="width:516px;height:431px;">
          <p class="f25 mB15 bold diandiandian1">{{tree.mu_name}}</p>
          <div class="h300 pT05 pB05 pL20 pR20 bgf5f5f5 c999999 f14">
            <p class="mT13 mB13" v-if="tree.mu_type">
              <span class="inline w60">种类</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{tree.mu_type}}</span>
            </p>
            <p class="mB13" v-if="tree.mu_plant_type">
              <span class="inline w60">种植情况</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{tree.mu_plant_type}}</span>
            </p>
            <p class="mB13" v-if="tree.mu_mj_min||tree.mu_mj_max">
              <span class="inline w60">米径</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{funcSize(tree.mu_mj_min,tree.mu_mj_max)}}</span>
            </p>
            <p class="mB13" v-if="tree.mu_dj_min||tree.mu_dj_max">
              <span class="inline w60">地径</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{funcSize(tree.mu_dj_min,tree.mu_dj_max)}}</span>
            </p>
            <p class="mB13" v-if="tree.mu_zg_min||tree.mu_zg_max">
              <span class="inline w60">自然高</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{funcSize(tree.mu_zg_min,tree.mu_zg_max)}}</span>
            </p>
            <p class="mB13" v-if="tree.mu_gf_min||tree.mu_gf_max">
              <span class="inline w60">冠幅</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{funcSize(tree.mu_gf_min,tree.mu_gf_max)}}</span>
            </p>
            <p class="mB13 diandiandian1" v-if="tree.common_names">
              <span class="inline w60">常用名</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{tree.common_names}}</span>
            </p>

            <p class="mB13" v-if="tree.createdAt">
              <span class="inline w60">创建时间</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{tree.createdAt}}</span>
            </p>
            <p class="mB13" v-if="tree.createdAt">
              <span class="inline w60">所在地区</span>
              <span class="mL15 mR15">:</span>
              <span class="mL15">{{tree.mu_province}}{{tree.mu_city}}</span>
            </p>

          </div>
          <p class="mT20">
            <span class="f20 c777777">价格：</span>
            <span class="f20 cff2b2b">{{tree.mu_price==-1?"面议":"￥"+tree.mu_price}}</span>
            <span class="f12 c999999">(库存{{tree.mu_stock}}株)</span>
          </p>
        </div>
        <div class="rf border w260 relative pL20 pR20 pT10 pB10" style="height:432px;">
          <div class="radius50 w70 h70 overflow margin">
            <img :src="tree.mu_ground.gg_ico.indexOf('?')!=-1?tree.mu_ground.gg_ico+'|'+imageView70:tree.mu_ground.gg_ico+'?'+imageView70"
              class="w100s">

          </div>

          <div class="h400 w100s" style="border-radius:0 !important;">
            <p class="f15 mT15 mB05">苗圃场：<span class="f20">{{tree.mu_ground.gg_name}}</span></p>
            <p class="f15 mT15 mB05">联系人：<span class="f20">{{tree.mu_ground.gg_contacts}}</span></p>
            <p class="f15 mT15 mB05">联系电话：<span class="f20">{{tree.mu_ground.gg_contact_number}}</span></p>
            <!--<img :src="datas.user.avatar" class="cursor w100sstyle="border-bottom:3px dashed #cccccc;"">-->
            <hr class="mT25 mB25">
            <div class="w250">
              <div class="radius50 w70 h70 overflow margin"><img :src="tree.user.avatar.url.indexOf('?')!=-1?tree.user.avatar.url+'|'+imageView2:tree.user.avatar.url+'?'+imageView2"
                  class="cursor w100s"></div>
              <p class="f15 mT15 mB05">发布者：<span class="f20">{{tree.user.nickname}}
                              <img class="call w30 h30 cursor" src="/static/img/common/call.png"  @click="call_sel(tree)">
                              </span></p>
              <p class="f15 mT10">发布者电话： <span class="f20">{{tree.user.mobilePhoneNumber}}</span></p>
            </div>
          </div>
        </div>
      </div>


      <div class="mB45">
        <p class="f14 c000000 border-b pB12 mB20">同场苗木</p>
        <listTree :tree="trees" style="width:1240px;" class="margin" v-if="trees!='no'"></listTree>
      </div>

      <chats style="display:none;" ref="c1"></chats>
    </div>
    <div v-show="0">{{watch}}</div>
  </div>
</template>

<script>
  import listTree from "./listTree.vue";
  import chats from "./search_news.vue";
  export default {
    data() {
      return {
        imageView2: "imageView2/1/w/62/h/62",
        nowimg: '',
        imageView22: "imageView2/1/w/298/h/363",
        tree: 'no',
        trees: 'no',
        page: 1,
        limit: 1000,
        imageView70: 'imageView2/1/w/70/h/70'
      }
    },
    components: {
      "listTree": listTree,
      "chats": chats
    },
    computed: {
      watch() {
        // 检测到地址栏路由发生变化就去重新请求当前路由id的树
        if (this.$route.params.id != this.tree.objectId) {
          this.gettree();
        }
      }
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
      getground() {
        var that = this;
        $.ajax({
          url: Boss + "ground/" + this.tree.mu_ground.objectId + "/tree",
          data: { limit: that.limit, page: that.page, 'include': 'other' },
          timeout: 15000,
          type: "GET",
          success: function (data) {
            console.log("更多苗木获取：成功");
            console.log(data)
            that.trees = data.results.data;
          }
        })
      },
      toswiper() {
        setTimeout(function () {
          var swiper = new Swiper('.swiper-containerf', {
            pagination: '.swiper-pagination',
            slidesPerView: 4,
            centeSlides: false,
            slidesPerColumn: 1,
            paginationClickable: true,
            prevButton: '.swiper-button-prevf',
            nextButton: '.swiper-button-nextf',
            spaceBetween: 13
          });
          // $('#viewer').viewer();
        }, 500)
      },
      enterurl(item) {
        // alert(item.url)
        this.nowimg = item.url
      },
      gettree() {
        var that = this;
        $.ajax({
          url: Boss + "tree/" + that.$route.params.id,
          data: { 'sessiontoken': that.$store.state.user.sessiontoken },
          type: "GET",
          success: (data) => {

            console.log(data)
            if (data.status) {
              that.tree = data.results;
              // that.nowimg=data.results.mu_photo[0].url
              that.nowimg = (data.results.mu_photo.length != 0 ? data.results.mu_photo[0].url : '')
              that.toswiper()
              that.getground()
            } else {
              layuiError(data)
            }

          }
        })
      }

    },
    mounted: function () {
      this.gettree();
      //  var ViewerDom = document.getElementById('viewers');
      // var viewer = new Viewer(ViewerDom, {
      //   // 相关配置项,详情见下面
      // });
      //  this.getTs();
    }
  }

</script>

<style lang="less" scoped>
  /*swiper*/

  .swiper-containerf {
    width: 300px;
    height: 68px;
  }

  .swiper-button-nextf,
  .swiper-button-prevf {
    height: 20px;
  }


  .swiper-containerf .swiper-slide {
    height: 68px;
  }

  .swiper-containerf .swiper-slide:hover {
    box-shadow: 0 0 10px rgba(0, 0, 1, 0.5);
  }

  .hover:hover {
    color: red;
  }
</style>
