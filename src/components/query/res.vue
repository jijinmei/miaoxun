<template>
  <!--<router-link  :to="{name:'query_tree',params:{id:tree.objectId}}"  target="_blank">-->
  <router-link :to="{name:'query_tree',params:{id:tree.objectId}}" target="_blank">

    <div class="tree left" :class="{h403:isground,showbr:el_bool.all_br}" @mouseenter="change_bool('all_br',true)" @mouseleave="change_bool('all_br',false)">
       <div style="display:none;">{{watch}}</div>
      <div v-if="tree">
        <div>
          <img :src="tree.mu_photo.length>0?(tree.mu_photo[0].url.indexOf('?')!=-1?tree.mu_photo[0].url+'|'+imageView2:tree.mu_photo[0].url+'?'+imageView2):''"
            draggable="false">

        </div>
        <div>

          <p class="f15 bold mB05 c000000 h23 diandiandian1">{{tree.mu_name}} <span class="c36c748 f12" style="padding:2px 5px;border:1px solid #36c748;border-radius:3px;">{{tree.mu_plant_type}}</span></p>


          <p v-if="tree.mu_density">密度：{{tree.mu_density}}</p>
          <p v-if="tree.mu_mksl">每捆数量：{{tree.mu_mksl}}</p>
          <p v-if="tree.mu_zmc_min||tree.mu_zmc_max">主蔓长：{{funcSize(tree.mu_zmc_min,tree.mu_zmc_max)}}</p>
          <p v-if="tree.mu_jgd">{{tree.mu_jgd}}</p>

          <p v-if="tree.mu_mj_min||tree.mu_mj_max">米径：{{funcSize(tree.mu_mj_min,tree.mu_mj_max)}}</p>
          <p v-if="tree.mu_dj_min||tree.mu_dj_max">地径：{{funcSize(tree.mu_dj_min,tree.mu_dj_max)}}</p>
          <p v-if="tree.mu_zg_min||tree.mu_zg_max">自然高：{{funcSize(tree.mu_zg_min,tree.mu_zg_max)}}</p>
          <p v-if="tree.mu_gf_min||tree.mu_gf_max">冠幅：{{funcSize(tree.mu_gf_min,tree.mu_gf_max)}}</p>

          <!--<p v-if="tree.mu_mj_min||tree.mu_mj_max">米径：{{funcSize(tree.mu_mj_min,tree.mu_mj_max)}}</p>-->
          <p v-if="tree.mu_fzjs">分枝级数：{{tree.mu_fzjs}}</p>
          <p v-if="tree.mu_fzs_min||tree.mu_fzs_max">分枝数：{{funcSize(tree.mu_fzs_min,tree.mu_fzs_max)}}</p>
          <p v-if="tree.mu_gs_min||tree.mu_gs_max">杆数：{{funcSize(tree.mu_gs_min,tree.mu_gs_max)}}</p>
          <p v-if="tree.mu_ml_min||tree.mu_ml_max">苗龄：{{funcSize(tree.mu_ml_min,tree.mu_ml_max)}}</p>
          <p v-if="tree.mu_yps_min||tree.mu_yps_max">叶片数：{{funcSize(tree.mu_yps_min,tree.mu_yps_max)}}</p>
          <p v-if="tree.mu_width_min||tree.mu_width_max">宽度：{{funcSize(tree.mu_width_min,tree.mu_width_max)}}</p>
          <p v-if="tree.mu_length_min||tree.mu_length_max">长度：{{funcSize(tree.mu_length_min,tree.mu_length_max)}}</p>

          <p v-if="tree.mu_yqzj_min||tree.mu_yqzj_max">容器直径：{{funcSize(tree.mu_yqzj_min,tree.mu_yqzj_max)}}</p>
          <p v-if="tree.mu_tqzj_min||tree.mu_tqzj_max">土球直径：{{funcSize(tree.mu_tqzj_min,tree.mu_tqzj_max)}}</p>
          <p v-if="tree.mu_zxg_min||tree.mu_zxg_max">枝下高：{{funcSize(tree.mu_zxg_min,tree.mu_zxg_max)}}</p>
          <p v-if="tree.mu_cs_min||tree.mu_cs_max">层数：{{funcSize(tree.mu_cs_min,tree.mu_cs_max)}}</p>
          <p v-if="tree.mu_lgg_min||tree.mu_lgg_max">裸干高：{{funcSize(tree.mu_lgg_min,tree.mu_lgg_max)}}</p>

                <p>
                  <span v-if="tree.mu_price!='-1'" class="c36c748 pR10">
                  ￥{{tree.mu_price}}/{{tree.unit}}
                </span>
                  <span v-if="tree.mu_price=='-1'" class="c36c748 pR10">
                  面议
                </span> 库存 {{tree.mu_stock}}
                </p>
          <p class="absolute B05 w192 right">
                     {{tree.mu_province.substring(0,2)}}{{tree.mu_city.length>2?tree.mu_city.substring(0,1)+'...':tree.mu_city}}
          </p>


        </div>
        <div>
          <div class="w24 h24 overflow">
            <img :src="tree.mu_ground.gg_ico.indexOf('?')!=-1?tree.mu_ground.gg_ico+'|'+imageView3:tree.mu_ground.gg_ico+'?'+imageView3"
              draggable="false">

          </div>
          <span>{{tree.mu_ground.gg_name}}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        imageView2: 'imageView2/1/w/207/h/276',
        imageView3: 'imageView2/1/w/24/h/24',
        el_bool: { all_br: false }
      }
    },
    props: {
      tree: {
        type: Object,
        "default": function () {
          return {};
        }
      },
      isground: {
        type: Boolean,
        "default": function () {
          return false;
        }
      },
    },
    computed:{
          watch(){
            this.tree=this.$parent.tarr;
          }
    },
    methods: {

      // show_tree(){
      //     let that = this;
      //     // window.open(URL+'query/tree/'+that.tree.objectId)
      //     // this.$router.push({name:"query_tree",params:{id:that.tree.objectId}});
      //     localStorage.setItem("show_tree",JSON.stringify(that.tree));
      // },
      change_bool(what, _bool) {
        let that = this;
        this.el_bool[what] = _bool;

      },
    },
    mounted: function () {
    }
  }

</script>

<style lang="less" scoped>
  .h403 {
    height: 403px !important;
  }

  .showbr {
    /*border:1px solid #B2421B !important;*/
  }

  .tree {
    cursor: pointer;
    background: white;
    width: 224px;
    display: inline-block;
    border-radius: 6px;
    margin: 0 20px 20px 0;
    height: 447px;
    border: 2px solid #F4F5F7;
    overflow: hidden;
    &>div:nth-of-type(1) {

      &>div:nth-of-type(1) {
        width: 203px;
        margin: 10px auto;
        height: 276px;
        overflow: hidden; // border-radius: 6px;
        &>img:nth-of-type(1) {
          height: 100%;
          position: relative;
        }
      }

      &>div:nth-of-type(2) {

        position: relative;
        padding: 0px 16px 7px;
        height: 100px;
        &>span:nth-of-type(1) {
          display: inline-block;
          font-size: 20px;
          vertical-align: middle;
          color: #333;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &>span:nth-of-type(2) {
          display: inline-block;
          font-size: 14px;
          color: #60B346;
          vertical-align: middle;
          position: relative;
          right: 4px;
        }
        &>span:nth-of-type(3) {
          display: inline-block;
          font-size: 14px;
          color: #BBBBBB;
          float: right;
        }
        &>p {
          font-size: 12px;
          color: #999899;
          margin: 0;
        }
        &>p:nth-of-type(1) {
          margin-top: 2px !important;
        }
        &>p:nth-of-type(2) {
          // margin-top: 3px !important;
        }
        &>div:nth-of-type(1) {

          position: absolute;
          bottom: 6px;

          &>span:nth-of-type(1) {
            color: #74B22B;
            font-size: 17px;
          }
          &>span:nth-of-type(2) {
            color: #999899;
            font-size: 13px;
            display: inline-block;
            margin-left: 13px;
          }
        }
      }

      &>div:nth-of-type(3) {
        border-top: 1px solid #EEEEEE;
        width: 200px;
        padding: 9px 13px;
        &>div:nth-of-type(1) {
          width: 24px;
          height: 24px;
          overflow: hidden;
          border-radius: 25px;
          display: inline-block;
          vertical-align: middle;
          &>img:nth-of-type(1) {
            width: 24px;
          }
        }
        &>span:nth-of-type(1) {
          display: inline-block;
          vertical-align: middle;
          font-size: 15px;
          color: #4A494B;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 170px;
        }
      }
    }
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
</style>
