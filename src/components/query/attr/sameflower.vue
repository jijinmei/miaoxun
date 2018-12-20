<template>
  <div>
    <ul class="same w100s" v-if="flowers!='no'" >
        <li  v-for="(item,index) in flowers" class="cursor pL07 pR07 pT07 pB07 lf mR10 border h212 w146" v-if="item.objectId!=objectId">
            <router-link :to="{name:'query_flower',params:{id:item.objectId}}">
            <div class="h130 w130 overflow relative bgeeeeee margin mT10">
                <!--<img :src="item.fl_photo.length!=0?item.fl_photo[0].url+imageview130:''" draggable="false" class="jz">-->
                 <img :src="item.fl_photo.length!=0?(item.fl_photo[0].url.indexOf('?')!=-1?item.fl_photo[0].url+'|'+imageView130:item.fl_photo[0].url+'?'+imageView130):''" draggable="false" class="jz">
            </div>
            <div>
                <p class="f12 c666666 mT05">{{item.fl_name}}</p>
                  <p v-if="item.fl_spec" class="diandiandian1 f12">{{item.fl_spec}}</p>
                <p class="ce00 f15 bold mT05">{{item.fl_price==-1?"￥面议":("￥"+item.fl_price)}}</p>
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
    props:['flowers'],
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
