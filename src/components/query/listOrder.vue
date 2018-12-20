<template>
  <ul class="block" v-if="datas.length!=0">

    <li v-for="(item,index) in datas" class="block pT25 pB25 border-b relative cursor bai mB10 pL20 pR20 radius10">
      <router-link :to="{name:'caigouX',params:{objectId:item.objectId}}" target="_blank">
        <p class="right mB30 c222222">
            发布时间 · <span class="c777777">{{item.createdAt}}</span>
            截止日期 · <span class="c777777">{{item.end_at}}</span>
        </p>
        <p class="mB05">
            <span class="bold f20 mR10">{{item.options.mu_name||item.options.fl_name}}</span>
            <span v-show="item.options.mu_plant_type!=undefined" class="borderlv c36c748 f12 pB04 pL08 pR08 pT04 radius05 mR05" >{{item.options.mu_plant_type}}</span>
            <span class="bgeeeeee c777777 pB04 pL08 pR08 pT04 f12 mR10">{{item.offering_requirement}}</span>
        </p>
        <p class="mB05">{{item.desc}}</p>
        <p class="mB05" >
            <span v-if="item.options.mu_mj_min||item.options.mu_mj_max">米径：<span v-if="item.options.mu_mj_min!=item.options.mu_mj_max">{{item.options.mu_mj_min}}-</span>{{item.options.mu_mj_max}}cm </span>
              <span v-if="item.options.mu_dj_min||item.options.mu_dj_max">地径：<span v-if="item.options.mu_dj_min!=item.options.mu_dj_max">{{item.options.mu_dj_min}}-</span>{{item.options.mu_dj_max}}cm </span>
             <span v-if="(item.options.mu_mj_min||item.options.mu_mj_max)&&(item.options.mu_gf_min||item.options.mu_gf_max)">·</span>
             <span v-if="item.options.mu_gf_min||item.options.mu_gf_max">冠幅：<span v-if="item.options.mu_gf_min!=item.options.mu_gf_max">{{item.options.mu_gf_min}}-</span>{{item.options.mu_gf_max}}cm</span>
        </p>
         <p class="mB05" >
            <span v-if="item.options.mu_zmc_min||item.options.mu_zmc_max">主蔓长：<span v-if="item.options.mu_zmc_min!=item.options.mu_zmc_max">{{item.options.mu_zmc_min}}-</span>{{item.options.mu_zmc_max}}cm </span>
             <span v-if="(item.options.mu_zmc_min||item.options.mu_zmc_max)&&(item.options.mu_zg_min||item.options.mu_zg_max)">·</span>
             <span v-if="item.options.mu_zg_min||item.options.mu_zg_max">自然高：<span v-if="item.options.mu_zg_min!=item.options.mu_zg_max">{{item.options.mu_zg_min}}-</span>{{item.options.mu_zg_max}}cm</span>
        </p>
         <p v-if="item.options.mu_zxg_min||item.options.mu_zxg_max">
            枝下高：<span v-if="item.options.mu_zxg_min!=item.options.mu_zxg_max">{{item.options.mu_zxg_min}}-</span>{{item.options.mu_zxg_max}}cm
        </p>
         <p class="mB05" >
            <span v-if="item.options.mu_density">密度：{{item.options.mu_density}} </span>
             <span v-if="(item.options.mu_density)&&(item.options.mu_length_min||item.options.mu_length_max)">·</span>
             <span v-if="item.options.mu_length_min||item.options.mu_length_max">长：<span v-if="item.options.mu_length_min!=item.options.mu_length_max">{{item.options.mu_length_min}}-</span>{{item.options.mu_length_max}}cm</span>
        </p>
         <p class="mB20 mT20">
            <span class="c777777">采购量 · </span>{{item.amount}}<span class="c777777">株</span>

        </p>
        <p>
           用苗地：
            <span v-for="(item1,index1) in item.area_flag" class="cea833d f12 radius10  pT04 pB04 pL08 pR08 f12 mR10" style="border:1px solid #ea833d;">{{item1}}</span>
        </p>
        <span class="absolute R20 T60 f12">
           <span class="cea833d">{{item.quotation_count}}</span>人已报价
        </span>

        <p class="absolute T00 L00 w100 h40 white center f16 lh40" style="border-bottom-right-radius:35px;" :class="{bgea833d:item.offering_type=='tree',bgda4a5d:item.offering_type=='flowers'}">{{item.offering_type=='flowers'?'花卉':(item.offering_type=='tree'?'苗木':'')}}</p>

      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        // imageview2:"?imageView2/1/w/70/h/70"
      }
    },
    props: ['datas'],
    methods: {

    },
    mounted: function () {

    }
  }

</script>

<style lang="less" scoped>

</style>
