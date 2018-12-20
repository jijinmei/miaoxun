<template>
  <div>
    <div style="display:none;">{{watch}}</div>
  <ul class="">
    <!--<li class="w228 h450 red pL10 pR10 pB10 pT10 bai" v-for="(item,index) in tree">-->
      <li v-for="(item,index) in tree" v-cloak class="lf w195 h385 bai c777777 cursor sixs relative overflow" v-if="item.objectId!=objectId">

             <router-link :to="{name:'query_tree',params:{id:item.objectId}}" :target="names!='query_tree'?'_blank':''">
              <div class="h250 mT05 mB05 mL05 mR05 overflow relative">
                <img v-if="item.mu_photo.length>0" :src="item.mu_photo[0].url.indexOf('?')!=-1?item.mu_photo[0].url+'|'+imageviews:item.mu_photo[0].url+'?'+imageviews" class="jz">

              </div>
              <div class="f12 mL10 mT10 mR10">
                <p class="f15 bold mB05 c000000 h23 diandiandian1">{{item.mu_name}} <span v-if="item.mu_plant_type" class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">{{item.mu_plant_type}}</span></p>
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

                  <!--<p v-if="item.mu_mj_min||item.mu_mj_max">米径：{{funcSize(item.mu_mj_min,item.mu_mj_max)}}</p>-->
                  <p v-if="item.mu_fzjs">分枝级数：{{item.mu_fzjs}}</p>
                    <p v-if="item.mu_fzs_min||item.mu_fzs_max">分枝数：{{funcSize(item.mu_fzs_min,item.mu_fzs_max)}}</p>
                    <p v-if="item.mu_gs_min||item.mu_gs_max">杆数：{{funcSize(item.mu_gs_min,item.mu_gs_max)}}</p>
                   <p v-if="item.mu_ml_min||item.mu_ml_max">苗龄：{{funcSize(item.mu_ml_min,item.mu_ml_max)}}</p>
                   <p v-if="item.mu_yps_min||item.mu_yps_max">叶片数：{{funcSize(item.mu_yps_min,item.mu_yps_max)}}</p>
                    <!--<p v-if="item.mu_width_min||item.mu_width_max">宽度：{{funcSize(item.mu_width_min,item.mu_width_max)}}</p>-->
                     <!--<p v-if="item.mu_length_min||item.mu_length_max">长度：{{funcSize(item.mu_length_min,item.mu_length_max)}}</p>-->

                      <p v-if="item.mu_yqzj_min||item.mu_yqzj_max">容器直径：{{funcSize(item.mu_yqzj_min,item.mu_yqzj_max)}}</p>
                       <!--<p v-if="item.mu_tqzj_min||item.mu_tqzj_max">土球直径：{{funcSize(item.mu_tqzj_min,item.mu_tqzj_max)}}</p>-->
                        <p v-if="item.mu_zxg_min||item.mu_zxg_max">枝下高：{{funcSize(item.mu_zxg_min,item.mu_zxg_max)}}</p>
                         <!--<p v-if="item.mu_cs_min||item.mu_cs_max">层数：{{funcSize(item.mu_cs_min,item.mu_cs_max)}}</p>-->
                          <!--<p v-if="item.mu_lgg_min||item.mu_lgg_max">裸干高：{{funcSize(item.mu_lgg_min,item.mu_lgg_max)}}</p>-->





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
  </div>
</template>

<script>
  export default {
    data() {
      return {
          objectId:this.$route.params.id,
         imageviews: "imageView2/1/w/185/h/250",
         names:this.$route.name

      }
    },
    props:['tree'],
    computed:{
      watch(){
           this.tree=this.$parent.trees
            // 检测地址栏路由变化
            this.objectId=this.$route.params.id
            this.names=this.$route.name
      }
    },
    methods: {

    },
    mounted: function () {


    }
  }

</script>

<style lang="less" scoped>

  .sixs {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .sixs:nth-child(6n) {
    margin-right: 0px;
  }
</style>
