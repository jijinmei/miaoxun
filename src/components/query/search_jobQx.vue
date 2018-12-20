<template>
  <div class="margin relative f15 B00 search_jobZx" style="width:1220px;" v-if="datas.length!=0">
    <chats style="display:none;" ref="c1"></chats>
    <div class="h350">
      <div class="lf bai pL20 pR20 pB30 pT30 overflow h290" style="width:740px;">
        <div class="overflow">
          <div class="overflow w100 h100 lf">
            <img :src="datas.headimg+imageview2" alt="" class="w100s">
          </div>
          <div class="lf mL15">
            <p class="bold f20 mB20">{{datas.name}}</p>
            <p class="mB05"><span><span class="c777777">年龄 · </span>{{datas.age}}</span> <span><span class="c777777">学历 · </span>{{datas.education}}</span>
            </p>
            <p><span class="c777777">参加工作时间 · </span>{{datas.working_years}}</p>


          </div>

        </div>
        <p class="c4cafb6 bold mT30 mB20 f16">个人优势</p>
        <p>{{datas.intro}}</p>
      </div>
      <div class="rf bai pL20 pR20 pB30 pT30 overflow w386 h290">

         <p class="f15 mT15 mB05">联系人:<span class="f20">{{datas.name}}</span></p>

        <p class="f15 mT15 mB05">联系电话: <span class="f20">{{datas.contact_number}}</span></p>

        <hr class="mT45 mB45">
        <div class="w290">
          <div class="w50 h50 overflow relative">
            <img :src="datas.user.avatar+image50" class="w100s jz">
          </div>
          <p class="f15 mT15 mB05">发布者: <span class="f20">{{datas.user.nickname}}
             <img class="call w30 h30 cursor" src="/static/img/common/call.png"  @click="call_sel(datas)">
            </span></p>

          <p class="f15 mT15 mB05">发布者电话:<span class="f20">{{datas.user.mobilePhoneNumber}}</span></p>

        </div>




      </div>
    </div>
    <!--</div>-->



    <div class="bai pL20 pR20 pB30 pT30 mT10 ">
      <p class="f16 bold mB10 c4cafb6">求职状态</p>
      <p>{{datas.work_status}}</p>

      <p class="f16 bold mB10 mT25 c4cafb6">期望薪资 <span class="mL30">工作性质</span></p>
      <p class="f15 mB20 mT10">{{datas.job_pay}} <span class="mL60">{{datas.job_time}} </span></p>

      <p class="mT25 mB10 c4cafb6 bold f16">求职意向</p>
      <p class="mT15 mB20">
        <span v-for="(item1,key1,index1) in datas.intention">
          <span v-for="(item11,key11,index11) in item1">
            <span v-for="(item2,key2,index2) in item11" class="mR10 c4cafb6 radius10 f12 pT04 pB04 pL08 pR08" style="border:1px solid #4cafb6;">{{item2}}</span>
        </span>
        </span>
      </p>


      <p class="mT30 mB10 c4cafb6 bold f16">求职地区</p>
      <p class="mT15 mB20">
        <span v-for="(item2,key2,index2) in datas.location_at" class="mR10 c777777 radius10 f14 pT04 pB04 pL08 pR08 bgeeeeee">{{item2.replace(/\|/g,'')}}</span>
        </span>
      </p>



    </div>

    <div class="bai pL20 pR20 pT30 mT10 pB30">
      <p class="f16 bold mB20 c4cafb6">工作经历</p>
      <div v-for="(item,key,index) in datas.career" :class="{pB30:index<datas.career.length-1}">
        <p class="mB05"><span class="bold mR15">{{item.company}} </span><span class="c777777">{{item.work_at}}</span></p>
        <p>- {{item.title}}</p>
      </div>
    </div>


    <div class="bai pL20 pR20 pT30 mT10 pB30">
      <p class="f16 bold mB20 c4cafb6">教育经历</p>
      <div v-for="(item,key,index) in datas.edu_experience" :class="{pB30:index<datas.edu_experience.length-1}">
        <p class="mB05"><span class="bold mR15">{{item.school}} </span><span class="c777777">{{item.study_at}}</span></p>
        <p>- {{item.subject}}</p>
      </div>
    </div>


  </div>
</template>

<script>
   import chats from "./search_news.vue";
  export default {
    data() {
      return {
        // imageview1:"?imageView2/1/w/250/h/150",
        datas: [],
        imageview2: "?imageView2/1/w/100/h/100",
        image50: '?imageView2/1/w/50/h/50'
        // datas1: []
      }
    },
   components: {
      "chats": chats
    },

    methods: {
       //联系卖家
      call_sel(item) {
        console.log(item)
        // return
        let that = this;
        if (localStorage.getItem("user") == null) {
          this.$store.state.login_el_bool = true;
        } else {
          // 点击头像调用对话函数
          console.log(vm)
          this.$refs.c1.otherChats(item)

        }


      },
      xiangxi() {
        var that = this;
        $.get(Boss + 'job_wanted/' + this.$route.params.objectId, function (data) {
           if(data.status){
            console.log('详情')
            console.log(data)
             that.datas = data.results;
          }else{
            layuiError(data)
          }
        })
      }

    },
    mounted: function () {
      this.xiangxi()
    }
  }

</script>

<style lang="less" scoped>

</style>
