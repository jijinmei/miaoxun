<template>
  <div>
    <ul class="same w100s" v-if="trees!='no'" >
        <li  v-for="(item,index) in trees" class="cursor pL07 pR07 pT07 pB07 lf mR10 border h212 w146" v-if="item.objectId!=objectId">
            <router-link :to="{name:'query_tree',params:{id:item.objectId}}">
            <div class="h130 w130 overflow relative">
                <!--<img :src="item.mu_photo[0].url+imageview130" draggable="false" class="jz">-->
                 <img :src="item.mu_photo.length!=0?(item.mu_photo[0].url.indexOf('?')!=-1?item.mu_photo[0].url+'|'+imageView130:item.mu_photo[0].url+'?'+imageView130):''" draggable="false" class="jz">
            </div>
            <div>
                <!--<span>{{item.show1}}</span>-->
                <p class="f12 c666666 mT10">{{item.mu_name}}
                  (
                    <span v-if="item.mu_jgd">几斤袋:{{item.mu_jgd}}</span>
                     <span v-if="item.mu_mj_min||item.mu_mj_max">米径:<span v-show="item.mu_mj_min!=item.mu_mj_max">{{item.mu_mj_min}}-</span>{{item.mu_mj_max}}cm</span>
                       <span v-if="item.mu_dj_min||item.mu_dj_max">地径:<span v-show="item.mu_dj_min!=item.mu_dj_max">{{item.mu_dj_min}}-</span>{{item.mu_dj_max}}cm</span>
                    <span v-if="item.mu_zg_min||item.mu_zg_max">自然高:<span v-show="item.mu_zg_min!=item.mu_zg_max">{{item.mu_zg_min}}-</span>{{item.mu_zg_max}}cm</span>
                     <span v-if="item.mu_gf_min||item.mu_gf_max">冠幅:<span v-show="item.mu_gf_min!=item.mu_gf_max">{{item.mu_gf_min}}-</span>{{item.mu_gf_max}}cm</span>
                     <span v-if="item.mu_yqzj_min||item.mu_yqzj_max">容器直径:<span v-show="item.mu_yqzj_min!=item.mu_yqzj_max">{{item.mu_yqzj_min}}-</span>{{item.mu_yqzj_max}}cm</span>
                    )
                </p>
                <p class="ce00 f15 bold mT05">{{item.mu_price==-1?"￥面议":("￥"+item.mu_price)}}</p>
            </div>
            </router-link>
        </li>
    </ul>
        <div v-show="0">{{watch}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           objectId:this.$route.params.id,
           imageView130:"imageView2/1/w/130/h/130",
        }
    },
   computed: {
      watch(){
         // 检测地址栏路由变化
            this.objectId=this.$route.params.id
      }
    },
    props:['trees'],
    methods:{
reset(item){

}
    },
    mounted:function(){

    }
}
</script>

<style lang="less" scoped>

</style>
