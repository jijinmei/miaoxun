<template>
  <div>
    <div style="display:none;">{{watch}}</div>
  <ul class="">
 <li v-for="(item,index) in flower" v-cloak class="lf w195 h335 bai c777777 cursor sixs">
            <router-link :to="{name:'query_flower',params:{id:item.objectId}}" :target="names!='query_flower'?'_blank':''">
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
                  <!--{{item.fl_flowerfield.gff_name}}-->
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
    props:['flower'],
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
