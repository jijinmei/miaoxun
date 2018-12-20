<template>
  <ul class="overflow bai" id="clear" style="width:1208px;" v-if="datas.length>0">
    <li v-for="(item,index) in datas" class="w560 h100 pL20 pB20 pT20 pR20 border cursor mB06">
      <router-link :to="{name:'carX',params:{objectId:item.objectId}}" target="_blank">
        <div class="w200 h100 overflow lf">
          <img :src="item.pics!=undefined&&item.pics.length>0?(item.pics[0].url.indexOf('?')!=-1?item.pics[0].url+'|'+imageView2:item.pics[0].url+'?'+imageView2):''"
            alt="" class="w100s">

        </div>
        <div class="lf mL20">
          <p class="bold mB10 f20">{{item.classification.type}}</p>
          <span v-if="item.classification.width&&(item.classification.type=='运输车辆'||item.classification.type=='随车吊')">车厢长{{item.classification.width}}米</span>
          <span v-if="item.classification.width&&item.classification.weight" class="bold">·</span>
          <span  v-if="item.classification.weight&&item.classification.type!='挖机'">吊重{{item.classification.weight}}吨</span>
          <span  v-if="item.classification.weight&&item.classification.type=='挖机'">吨位{{item.classification.weight}}吨</span>
          <div class="h60 w330 mT15">
            <span v-if="indexs11==0||indexs11==1||indexs11==2||indexs11==3" v-for="(item11,indexs11) in item.areass" class="c4faa90 pL08 pR08 bold h25 lh25 mR10 mB10 lf"
              style="border:1px solid #4faa90;border-radius:10px;">{{item11}}</span>
            <span v-if="item.areass.length>4" class="c4a83c4 pL08 pR08 bold h25 lh25 mR10 mB10 lf" style="border:1px solid #4faa90;border-radius:10px;">+{{item.areass.length-4}}</span>

          </div>
        </div>


      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        imageView2: 'imageView2/1/w/200/h/100'
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
