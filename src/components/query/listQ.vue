<template>
  <ul class="block mT100" v-if="datas.length!=0">

    <li v-for="(item,index) in datas" class="block pT25 pB25 border-b relative cursor">
      <router-link :to="{name:'query_search_jobQx',params:{objectId:item.objectId}}" target="_blank">
        <div class="overflow">
          <div class="overflow w70 h70 lf">
            <img :src="item.headimg+imageview2" alt="" class="w100s">
          </div>
          <div class="lf mL15">
            <p class="bold f18 mB10">{{item.name}}</p>
            <p>
              <span>
                 <span v-for="(item2,key2,index2) in item.location_at" class="mR10 c777777 f14 pL08 pR08">{{item2.replace(/\|/g,'')}}</span>
                 · {{item.work_start_at}} · {{item.education}}
                 </span>
            </p>
          </div>
        </div>

        <p class="mT20 mB20">
          <span v-for="(item1,key1,index1) in item.intention">
          <span v-for="(item11,key11,index11) in item1">
            <span v-for="(item2,key2,index2) in item11" class="mR10 c4cafb6 radius10 f12 pT04 pB04 pL08 pR08" style="border:1px solid #4cafb6;">{{item2}}</span>
          </span>
          </span>
        </p>
        <p class="f15">{{item.intro}}</p>
        <div class="absolute R00 T16">
          <p class="c4cafb6 mB05 right">{{item.job_pay}}</p>
          <p class="f12 c777777">{{item.createdAyict}}</p>
        </div>


      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        imageview2:"?imageView2/1/w/70/h/70"
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
