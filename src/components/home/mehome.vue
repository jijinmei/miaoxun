<template>
  <div>
    <headers></headers>

    <div v-show="show=='big'" @click="show='small'" class="f12 w200 bai fixed L00 z_1000" style="top:168px;">
      <img :src="src" alt="" class="w100s">
      <p class="  bai c222222 cursor h20 lh20"> 关闭 </p>
    </div>
    <div v-show="show=='big'" @click="show='small'" class="f12 w200 bai fixed R00 z_1000" style="top:168px;">
      <img :src="src" alt="" class="w100s">
      <p class="  bai c222222 cursor h20 lh20"> 关闭 </p>
    </div>



    <div class="home" style="margin:0 auto;">
      <!--首页卖广告-->
      <!--<div style="width:1220px;" class="margin mT05">
        <ul style="width:1220px;" class="overflow bai block master">
          <li class="lf w301 h120 relative mB05" style="margin-right:5px;" v-for="(item,index) in master" :class="{mR00:index==3||index==7||index==11}">
            <img :src="item" class="w100s cursor jz">
          </li>
        </ul>
      </div>-->
      <!--1.幻灯片////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
      <!-- Swiper -->
      <div style="width:1220px;" class="margin mT10">
        <div style="width:1220px;" class="overflow">
          <div class="h500 relative w100s overflow">
            <div class="swiper-container swiper-container1 z_00">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in huandengpian">
                  <img @click="gonew(item.link,'-1')" :src="item.cover" class="w100s h100s cursor">
                </div>
              </div>

              <div class="swiper-pagination swiper-pagination1"></div>
              <div class="swiper-button-prev swiper-button-prev1 swiper-button-white" style="left:620px;"></div>
              <div class="swiper-button-next swiper-button-next1 swiper-button-white" style="right:620px;"></div>

              <!--两个遮罩层-->
              <div class="h500 absolute L00 T00" style="width:610px;background:#000000;opacity:0.2;z-index:1000;"></div>
              <div class="h500 absolute R00 T00" style="width:610px;background:#000000;opacity:0.2;z-index:1000;"></div>
            </div>

          </div>
        </div>
      </div>


      <div style="width:1220px;margin:0 auto;top:50px;" class="relative">

        <!--2.8大板块-990 65 123.75         990/8   1220/8    ////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <ul style="width:1220px;margin:0 auto;height:180px;" class="block bai">
          <li @click="goRouter(item.urlname,item.tourl)" v-for="(item,index) in bankuai" class="center lf pT36 pB18" style="background:white;width:152.5px;height:117.45px;">
            <!--<router-link :to="{name:item.urlname}" target="_blank" >-->
            <img :src="item.url" class="h72 mB06 cursor">
            <br>
            <span class="f17">{{item.value}}</span>
            <!--</router-link>-->
          </li>

        </ul>


        <!--3.合作名企////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p class="f25 center mB30 mT40">
          <span class="w50 h03 inline relative" style="background: #222;top:-5px;right:15px;"></span> 合作名企
          <span class="w50 h03 inline relative" style="background: #222;top:-5px;left:15px;"></span>
        </p>
        <!-- Swiper -->
        <div class="relative bai pT24 pB24" @mouseenter="shows=1" @mouseleave="shows=0">
          <div class="swiper-container swiper-container2 z_00">
            <div class="swiper-wrapper">
              <div class="swiper-slide overflow w352 h200" v-for="(item,index) in companys">
                <img @click="gonew(item.link,index)" :src="item.cover.indexOf('?')!=-1?item.cover+'|'+image352:item.cover+'?'+image352" class="cursor">

              </div>
            </div>
            <!--<div class="swiper-button-prev swiper-button-black" v-show="shows==1"></div>
        <div class="swiper-button-next swiper-button-black" v-show="shows==1"></div>-->
          </div>


          <div class="swiper-button-prev swiper-button-prev2 swiper-button-black L00" v-show="shows==1"></div>
          <div class="swiper-button-next swiper-button-next2 swiper-button-black R00" v-show="shows==1"></div>
        </div>








        <!--3.1最新苗木///////static/img/home/tree.png//////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p class="f25 left mB18 mT18">最新苗木
          <router-link :to="{name:'no_query_search_tree',params:{queryData:'no'}}" target="_blank"><span class="f15 cursor">更多> </span></router-link>
        </p>
         <!--<listTree :tree="new1" style="width:1240px;" class="margin" v-if="new1.length>0"></listTree>-->
        <ul v-if="new1.length>0" >

          <li v-for="(item,index) in new1" v-cloak class="lf w195 h385 bai c777777 cursor sixs relative" >
            <router-link :to="{name:'query_tree',params:{id:item.objectId}}" target="_blank">
              <div class="h250 mT05 mB05 mL05 mR05 overflow relative">
                <img v-if="item.mu_photo.length>0" :src="item.mu_photo[0].url.indexOf('?')!=-1?item.mu_photo[0].url+'|'+imageviews:item.mu_photo[0].url+'?'+imageviews" class="jz">

              </div>
              <div class="f12 mL10 mT10 mR10">
                <p class="f15 bold mB05 c000000 h23 diandiandian1">{{item.mu_name}} <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">{{item.mu_plant_type}}</span></p>
                  <p>
                  <span v-if="item.mu_price!='-1'" class="c36c748 pR10">
                  ￥{{item.mu_price}}/{{item.unit}}
                </span>
                  <span v-if="item.mu_price=='-1'" class="c36c748 pR10">
                  面议
                </span> 库存 {{item.mu_stock}}
                </p>

                 <p v-if="item.mu_density">密度：{{item.mu_density}}</p>
                 <p v-if="item.mu_mksl">每捆数量：{{item.mu_mksl}}</p>
                  <p v-if="item.mu_zmc_min||item.mu_zmc_max">主蔓长：{{funcSize(item.mu_zmc_min,item.mu_zmc_max)}}</p>
                  <p v-if="item.mu_jgd">{{item.mu_jgd}}</p>

                <p v-if="item.mu_mj_min||item.mu_mj_max">米径：{{funcSize(item.mu_mj_min,item.mu_mj_max)}}</p>
                <p v-if="item.mu_dj_min||item.mu_dj_max">地径：{{funcSize(item.mu_dj_min,item.mu_dj_max)}}</p>
                <p v-if="item.mu_zg_min||item.mu_zg_max">自然高：{{funcSize(item.mu_zg_min,item.mu_zg_max)}}</p>
                <p v-if="item.mu_gf_min||item.mu_gf_max">冠幅：{{funcSize(item.mu_gf_min,item.mu_gf_max)}}</p>


                  <!--<p v-if="item.mu_fzjs">分枝级数：{{item.mu_fzjs}}</p>
                    <p v-if="item.mu_fzs_min||item.mu_fzs_max">分枝数：{{funcSize(item.mu_fzs_min,item.mu_fzs_max)}}</p>
                    <p v-if="item.mu_gs_min||item.mu_gs_max">杆数：{{funcSize(item.mu_gs_min,item.mu_gs_max)}}</p>-->
                   <p v-if="(item.mu_ml_min||item.mu_ml_max)&&item.mu_type=='草坪'" >苗龄：{{funcSize(item.mu_ml_min,item.mu_ml_max).replace('cm','月')}}</p>
                   <p v-if="item.mu_yps_min||item.mu_yps_max">叶片数：{{funcSize(item.mu_yps_min,item.mu_yps_max)}}</p>
                    <p v-if="item.mu_width_min||item.mu_width_max">宽度：{{funcSize(item.mu_width_min,item.mu_width_max)}}</p>
                     <p v-if="item.mu_length_min||item.mu_length_max">长度：{{funcSize(item.mu_length_min,item.mu_length_max)}}</p>

                      <!--<p v-if="item.mu_yqzj_min||item.mu_yqzj_max">容器直径：{{funcSize(item.mu_yqzj_min,item.mu_yqzj_max)}}</p>
                       <p v-if="item.mu_tqzj_min||item.mu_tqzj_max">土球直径：{{funcSize(item.mu_tqzj_min,item.mu_tqzj_max)}}</p>-->
                        <!--<p v-if="item.mu_zxg_min||item.mu_zxg_max">枝下高：{{funcSize(item.mu_zxg_min,item.mu_zxg_max)}}</p>-->
                         <!--<p v-if="item.mu_cs_min||item.mu_cs_max">层数：{{funcSize(item.mu_cs_min,item.mu_cs_max)}}</p>
                          <p v-if="item.mu_lgg_min||item.mu_lgg_max">裸干高：{{funcSize(item.mu_lgg_min,item.mu_lgg_max)}}</p>-->





                <p class="absolute B05 w174" >
                  {{item.mu_ground.gg_name.length>10?item.mu_ground.gg_name.substring(0,9)+'...':item.mu_ground.gg_name}}
                  <span class="rf">
                     {{item.mu_province.substring(0,2)}}{{item.mu_city.length>2?item.mu_city.substring(0,1)+'...':item.mu_city}}
                    </span>
                </p>

              </div>
            </router-link>
          </li>

        </ul>



        <p class="f25 left mB18 mT18">最新花卉
          <router-link :to="{name:'no_query_search_flower',params:{queryData:'no'}}" target="_blank"><span class="f15 cursor">更多> </span></router-link>
        </p>

        <ul v-if="new1.length>0">
          <li v-for="(item,index) in new2" v-cloak class="lf w195 h335 bai c777777 cursor sixs">
            <router-link :to="{name:'query_flower',params:{id:item.objectId}}" target="_blank">
              <div class="h250 mT05 mB05 mL05 mR05 overflow relative">
                <img v-if="item.fl_photo.length>0" :src="item.fl_photo[0].url.indexOf('?')!=-1?item.fl_photo[0].url+'|'+imageviews:item.fl_photo[0].url+'?'+imageviews" class="jz">

              </div>
              <div class="f12 mL10 mT10 mR10">
                <p class="f15 bold mB05 c000000 diandiandian1">{{item.fl_name}} </p>
                <p>
                  <span v-if="item.fl_price!='-1'" class="c36c748 pR10">
                  ￥{{item.fl_price}}/株
                </span>
                  <span v-if="item.fl_price=='-1'" class="c36c748 pR10">
                  面议
                </span> 库存 {{item.fl_stock}}

                </p>

                <p>
                    {{item.fl_flowerfield.gff_name.length>10?item.fl_flowerfield.gff_name.substring(0,9)+'...':item.fl_flowerfield.gff_name}}
                  <span class="rf">
                    <!--{{item.fl_flowerfield.gff_address.province}}{{item.fl_flowerfield.gff_address.city}}-->
                     {{item.fl_flowerfield.gff_address.province.substring(0,2)}}{{item.fl_flowerfield.gff_address.city.length>2?item.fl_flowerfield.gff_address.city.substring(0,1)+'...':item.fl_flowerfield.gff_address.city}}
                    </span>
                </p>

              </div>
            </router-link>
          </li>
        </ul>

        <!--3.3.最新园林资材////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p class="f25 left mB18 mT18" v-if="isceshi==true">最新园林资材 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new3" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/jiancai.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>

          </li>
        </ul>




        <!--3.4.最新清场////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p v-if="isceshi==true" class="f25 left mB18 mT18">最新清场 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new4" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/qingchang.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>
          </li>
        </ul>




        <!--3.5.最新采购////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p v-if="isceshi==true" class="f25 left mB18 mT18">最新采购 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new2" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/buy.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>
          </li>
        </ul>




        <!--3.6.最新招租转让////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p v-if="isceshi==true" class="f25 left mB18 mT18">最新招租转让 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new2" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/let.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>
          </li>
        </ul>



        <!--3.7.最新招聘////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p v-if="isceshi==true" class="f25 left mB18 mT18">最新招聘 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new2" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/recruit.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>
          </li>
        </ul>





        <!--3.8.最新全部分类////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
        <p v-if="isceshi==true" class="f25 left mB18 mT18">最新全部分类 <span class="f15 cursor">更多> </span></p>
        <ul v-if="isceshi==true">
          <li v-for="(item,index) in new2" class="lf w406 h110 bai c777777 cursor" :style="{borderBottom:index==0||index==1||index==2?'1px solid #eee':'none',borderRight:index==0||index==1||index==3||index==4?'1px solid #eee':'none'}">
            <img src="/static/img/home/fenlei.png" class="h100 w56 lf mT05 mB05 mL05 mR05">
            <div class="lf f12 mL10 mT10 w315">
              <p class="f15 bold mB05 c000000">大叶紫薇 <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">假植</span></p>
              <p>米经：8-12cm·自然高：380-480cm·</p>
              <p>冠幅：280-480cm·</p>
              <p><span class="c36c748 pR10">面议</span>库存 200
                <span class="rf">中山</span>
              </p>
              <p>文兴花木场</p>

            </div>
          </li>
        </ul>


      </div>
    </div>
  </div>
</template>

<script>
  import headers from "../common/headers.vue";
  //  import listTree from "../query/listTree.vue";
  export default {
    data() {
      return {
        'ispublish':1,
        master: [
          'https://itaomiao-img.aitaomiao.com/img/nursery/2018/05/29/17/1527585691094EvOB.png',
          'https://itaomiao-img.aitaomiao.com/img/nursery/2018/05/25/17/1527240617238clSz.png',
          'https://itaomiao-img.aitaomiao.com/img/nursery/2018/05/25/15/1527234573174ogO3.png',
          'https://itaomiao-img.aitaomiao.com/img/nursery/2016/06/14/19/1465905028977vX5L.jpg'
          ],
        src: "../static/img/home/80.png",
        show: 'big',
        isceshi: false,
        limit6: 30,
        // imageview1: "?imageView2/1/w/56/h/100",
        imageviews: "imageView2/1/w/185/h/250",
        image352: "imageView2/0/w/352/h/200",
        shows: 0,//合作名企的左右箭头是否显示，鼠标放上显示，离开不显示
        huandengpian: [],//首页幻灯片
        bankuai: [//8大板块
          { value: '绿化苗木', url: "/static/img/home/71.png", urlname: 'no_query_search_tree', tourl: 'query/search_tree/' },
          { value: '花卉盆景', url: "/static/img/home/72.png", urlname: 'no_query_search_flower', tourl: 'query/search_flower/' },
          { value: '园林资材', url: "/static/img/home/73.png", urlname: 'no_query_search_yuanlin', tourl: 'query/search_yuanlin/' },
          { value: '花木清场', url: "/static/img/home/74.png", urlname: 'no_query_search_clear', tourl: 'query/search_clear/' },
          { value: '采购大厅', url: "/static/img/home/75.png", urlname: 'no_query_search_caigou', tourl: 'query/search_caigou/' },
          { value: '招租转让', url: "/static/img/home/76.png", urlname: 'no_query_search_rent', tourl: 'query/search_rent/' },
          { value: '园林英才', url: "/static/img/home/77.png", urlname: 'who' },
          { value: '工程机械', url: "/static/img/home/78.png", urlname: 'no_query_search_car', tourl: 'query/search_car/' }
        ],
        companys: [],
        //8大板块各自板块的前6个最新商品
        new1: [],//最新苗木
        new2: [1, 2, 3, 4, 5, 6],//最新花卉
        new3: [1, 2, 3, 4, 5, 6],//最新园林资材
        new4: [1, 2, 3, 4, 5, 6],//最新清场
        new5: [1, 2, 3, 4, 5, 6],//最新采购
        new6: [1, 2, 3, 4, 5, 6],//最新招租转让
        new7: [1, 2, 3, 4, 5, 6],//最新招聘
        new8: [1, 2, 3, 4, 5, 6]//最新全部分类
      }
    },
    components: {
      "headers": headers
      //  "listTree": listTree
    },
    methods: {
      gonew(url,index) {
         window.open(url)
        // if(index=='-1'){
        //     window.open(url)
        // }else{
        //   // if(index==0){
        //   //   // this.$router.push({ name: 'mehome' })
        //   //    window.open(URLS+'mehome')
        //   // }else{
        //      window.open(url)
        //   // }
        // }

      },
      goRouter(urlname, tourl) {
        if (urlname == 'who') {//招聘求职
          layui.use('layer', function () {
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            layer.open({
              type: 1
              , title: false //不显示标题栏
              , closeBtn: false
              , area: '300px;'
              , shade: 0.4
              , id: 'LAY_layuipro' //设定一个id，防止重复弹出
              , btn: ['我要招人', '我要找工作']
              , btnAlign: 'c'
              , moveType: 1 //拖拽模式，0或者1
              , shadeClose: true
              , content: '<div class="center f20 pT25 pB15">请选择招聘或者求职</div>'
              , success: function (layero) {
                // alert(2)
                var btn = layero.find('.layui-layer-btn');
                btn.find('.layui-layer-btn0').attr({
                  href: URLS + 'query/search_jobQ/no'
                  , target: '_blank'
                });
                btn.find('.layui-layer-btn1').attr({
                  href: URLS + 'query/search_jobZ/no'
                  , target: '_blank'
                });
              }
            });
          })
        } else {
          window.open(URLS + tourl + "no")
        }
      },
      homepage() {
        var that = this;
        $.get(Boss+'page', {
          'name': 'home',
          'version': '2',
          'modules_name': "poster@desktop,sponsor,topic,slider,tree,flowers"
        },
          function (data) {
            console.log(data)
            if (data.status) {
              // 首页幻灯片
              that.huandengpian = data.results.slider
              setTimeout(function () {
                var swiper = new Swiper('.swiper-container1', {
                  // autoplay:5000,
                  speed: 1000,
                  autoplayDisableOnInteraction: false,
                  loop: true,
                  centeredSlides: true,
                  slidesPerView: 2,
                  pagination: '.swiper-pagination1',
                  paginationClickable: true,
                  prevButton: '.swiper-button-prev1',
                  nextButton: '.swiper-button-next1'
                });
              }, 500)

              //2.合作名企
              that.companys = data.results.poster
              setTimeout(function () {
                var swiper = new Swiper('.swiper-container2', {
                  // pagination: '.swiper-pagination2',
                  slidesPerView: 3,
                  slidesPerColumn: 2,
                  paginationClickable: true,
                  prevButton: '.swiper-button-prev2',
                  nextButton: '.swiper-button-next2',
                  spaceBetween: 24
                });
              }, 1000)
            } else {
              layuiError(data)
            }

          })
      },

      homedata() {
        var that = this;
        $.ajax({
          url: Boss + "tree",
          type: "GET",
          data: { 'limit': that.limit6,'ispublish':that.ispublish},
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.new1 = data.results.data;

            } else {
              layuiError(data)
            }
          },
          error: function (data) {
            layuiError(data)
          }
        })
        // $.get(Boss+'page',{'version':'v2','name':'home','modules_name':"poster,sponsor,slider,tree,flowers"},function(data){
        //       //  that.huandengpian=data.results
        // })

        $.ajax({
          url: Boss + "flowers",
          type: "GET",
          data: { 'limit': that.limit6,'ispublish':that.ispublish },
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.new2 = data.results.data;
            } else {
              layuiError(data)
            }
          },
          error: function (data) {
            layuiError(data)
          }
        })



      }

    },
    mounted: function () {
      // 首页页面数据
      this.homepage()
      // 首页数据
      this.homedata()

    }
  }

</script>

<style lang="less" scoped>
  /*幻灯片*/

  .sixs {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .sixs:nth-child(6n) {
    margin-right: 0px;
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-container1 {
    height: 500px;
    width: 2440px !important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  /*.swiper-container1 .swiper-slide-duplicate{height:500px !important;width:610px !important;}*/
  /*.swiper-container1 .swiper-slide-active{height:500px !important;width:1220px !important;}*/
  /*合作名企*/

  .swiper-container2 {
    width: 1104px !important;
    height: 198px !important;
    /*424*/
  }

  .swiper-container2 .swiper-slide {
    height: 87px !important;
    /*200*/
  }
  /*.master>li{margin-right:5px;}
  .master>li:nth-child(3){margin-right:0px;}
    .master>li:nth-child(7){margin-right:0px;}
      .master>li:nth-child(11){margin-right:0px;}*/
</style>
<style>
  .layui-layer-iframe .layui-layer-btn,
  .layui-layer-page .layui-layer-btn {
    padding-top: 10px;
    padding-bottom: 25px !important;
  }

  .layui-layer-btn .layui-layer-btn0 {
    border-color: #4cafb6 !important;
    background-color: #4cafb6 !important;
    color: #fff;
  }
</style>
