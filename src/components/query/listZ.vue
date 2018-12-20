<template>
   <ul class="block mT100" v-if="datas.length!=0">

  <li v-for="(item,index) in datas" class="block pT25 pB25 border-b relative cursor" >
     <router-link :to="{name:'query_search_jobZx',params:{objectId:item.objectId}}" target="_blank">
    <p class="bold f18 mB10">{{item.job_title}}</p>
    <p class="mB10" style="min-height:20px;">{{item.company.company_name}}</p>
    <p class="mT10 mB10">
      <span v-for="(item1,key1,index1) in item.job_type">
          <span v-for="(item11,key11,index11) in item1">
            <span v-for="(item2,key2,index2) in item11" class="mR10 c4cafb6 radius10 f12 pT04 pB04 pL08 pR08" style="border:1px solid #4cafb6;">{{key11}}/{{item2}}</span>
          </span>
      </span>
    </p>
     <p class="mT20 mB10">
      <span v-for="(item3,key3,index3) in item.job_treated.split(',')" class="bgeeeeee c777777 pT04 pB04 pL08 pR08 f12 mR10">
                     {{item3}}
      </span>
    </p>
    <div class="absolute R00 T16">
      <p class="c4cafb6 mB05" >{{item.job_pay}}</p>
      <p class="f12 c777777">{{item.createdAt}}</p>
    </div>

     <p class="absolute R00 B20 f12" >{{item.work_at.province}}{{item.work_at.city}}</p>
     </router-link>
  </li>
</ul>
</template>
<script>

    export default {
        data(){
            return{
            }
        },
        props:['datas'],
        methods:{

        },
        mounted:function(){

        }
    }
</script>

<style lang="less" scoped>
</style>
