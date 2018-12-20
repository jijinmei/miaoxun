<template>
  <div class="margin relative f15 B00 search_jobZx" style="width:1220px;" v-if="datas.length!=0">
    <chats style="display:none;" ref="c1"></chats>
    <div class="h350">
      <div class="lf bai pL20 pR20 pB30 pT30 overflow h290" style="width:740px;">
        <p class="f20 bold">{{datas.job_title}}</p>
        <p class="f20 mT30 pB30 border-b">
          <span class="f20 c4cafb6">{{datas.job_pay}}</span>
          <span class="f12 c777777 rf">更新：{{datas.updatedAt}}</span>
        </p>
        <p class="mT30 mB30">
          <span class="mR15">职位：</span>
          <span v-for="(item,key,index) in datas.job_type">
                      <span v-for="(item1,key1,index1) in item" >
                          <span v-for="(item2,key2,index2) in item1" class="mR10 c4cafb6 radius10 f12 pT04 pB04 pL08 pR08" style="border:1px solid #4cafb6;">{{item2}}</span>
          </span>
          </span>
        </p>
        <p class="mB30">
          <span class="mR15">要求:</span> {{datas.job_requirement}}
        </p>
        <p>
          <span class="mR15">福利:</span>
          <span v-for="(item,index) in datas.job_treated.split(',')" class="bgeeeeee c777777 pT04 pB04 pL08 pR08 f14 mR10"> {{item}} </span>
        </p>
      </div>
      <div class="rf bai pL20 pR20 pB30 pT30 overflow w386 h290">

        <p class="f20 bold mB40">{{datas.company.company_name}}</p>
        <p class="f15 mT15 mB05">联系人:<span class="f20">{{datas.company.company_contact}}</span></p>

        <p class="f15 mT15 mB05">联系电话: <span class="f20">{{datas.company.company_contact_number}}</span></p>

        <hr class="mT25 mB25">
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




    <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f15 bold mB20">职业描述</p>
      <p class="c777777">{{datas.job_intro}}</p>
    </div>

    <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f15 bold mB20 pB20 border-b">工作地址</p>
      <p class="c777777 mB20">{{datas.work_at.work_at_area_string.replace(/\|/g,'')}}</p>
      <div class="h300 " id="allmap">
      </div>
    </div>


    <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f15 bold mB20 pB20 border-b">公司信息</p>
      <p class="c777777 mB20">{{datas.company.company_name}}</p>
      <p class="mB20">
        <span class="mR15">规模:</span> {{datas.company.company_province}}
      </p>
      <p class="mB20">
        <span class="mR15">地址:</span>{{datas.company.company_address}}
      </p>
      <p class="mB20">
        <span class="mR15">简介:</span>{{datas.company.company_intro}}
      </p>
    </div>

    <div class="bai pL20 pR20 pB30 pT30 mT10">
      <p class="f15 bold mB20 pB20 border-b">公司照片</p>
      <ul class="c777777 mB20">
        <li v-for="(item,index) in datas.company.company_pics" class="w250 h150 overflow">
          <img :src="item.url+imageview1" alt="" class="w250">
        </li>
      </ul>
    </div>

    <p class="f15 bold pT30 pB30 border-b pL20">推荐职位</p>
    <lists :datas="datas1"> </lists>

  </div>
</template>

<script>
  import chats from "./search_news.vue";
  import lists from './listZ.vue';
  export default {
    data() {
      return {
        imageview1: "?imageView2/1/w/250/h/150",
        datas: [],
        datas1: [],
        image50: '?imageView2/1/w/50/h/50'
      }
    },

    components: { 'lists': lists, "chats": chats },
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
        $.get(Boss + 'recruitment/' + this.$route.params.objectId, function (data) {
           if(data.status){
            console.log('详情')
            console.log(data)
             that.datas = data.results;
               setTimeout(function () {
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(that.datas.work_at.point.longitude, that.datas.work_at.point.latitude);
            map.centerAndZoom(point, 15);

            //创建小狐狸
            var pt = new BMap.Point(that.datas.work_at.point.longitude, that.datas.work_at.point.latitude);
            var myIcon = new BMap.Icon("../../static/img/common/ditu.png", new BMap.Size(300, 157));
            var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
            map.addOverlay(marker2);              // 将标注添加到地图中
          }, 500)
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
