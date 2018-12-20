<template>
  <div class="margin relative f15 B00 search_clearX" style="width:1220px;" v-if="datas.length!=0">
    <chats style="display:none;" ref="c1"></chats>
    <div class="h500 overflow w100s">
      <div class="lf bai pL20 pR20 pB30 pT30 overflow h440" style="width:740px;">
        <p class="f20 mB40">
          <span class="bold f25">{{datas.options.mu_name||datas.options.fl_name}}</span>
          <span class="cea833d rf">{{datas.quotation_count}}人已报价</span>
        </p>


        <p class="mB20 c222222">
          <span class="inline w100 c777777" >求购数量</span>{{datas.amount}}株
        </p>
        <!--<p class="mB20 c222222">
                 <span class="inline w100 c777777">规格要求</span>
                 {{datas.options.mu_plant_type}}
                 米径：{{datas.options.mu_mj_min}}-{{datas.options.mu_mj_max}}
                 冠幅：{{datas.options.mu_gf_min}}-{{datas.options.mu_gf_max}}
                 枝下高：{{datas.options.mu_zxg_min}}-{{datas.options.mu_zxg_max}}
              </p>-->
        <p class="mB20 c222222">
          <span class="inline w100 c777777">报价要求</span> {{datas.offering_requirement}}
        </p>
        <p class="mB20 c222222">
          <span class="inline w100 c777777">用苗地</span>
          <span v-for="(item,key,index) in datas.area">
                    <span v-for="(item1,key1,index1) in item">
                      <span v-for="(item3,key3,index3) in item1"> {{key1}}/{{item3}}</span>
          </span>
          </span>
        </p>
        <p class="mB20 c222222">
          <span class="inline w100 c777777">求购描述</span> {{datas.desc}}
        </p>
        <p class="mB20 c222222">
          <span class="inline w100 c777777">发布时间</span> {{datas.createdAt}}
        </p>
        <p class="mB20 c222222">
          <span class="inline w100 c777777">截止日期</span> {{datas.end_at}}
        </p>
        <!--<div class="mB20 c222222">
                 <span class="inline w100 c777777">样板图</span>
                <ul>
                <li v-for="(item1,index1) in datas.pics" class="overflow w200">
                    <img :src="item1.url" alt="" >
                </li>
                </ul>
              </div>-->




      </div>

      <div class="w386 h440 rf bai pL20 pR20 pB30 pT30 overflow relative">
        <!--<div style="border-top-left-radius:10px;border-bottom-right-radius:10px;border:1px solid #222222;" class="cursor center w100 h30 lh30 absolute R20 T20">清场</div>-->
        <p class="f15 mT15 mB05">联系人</p>
        <p class="f20">{{datas.contact}}</p>
        <p class="f15 mT15 mB05">联系电话</p>
        <p class="f20">{{datas.contact_number}}</p>
        <hr class="mT35 mB35">
        <div class="w290">
          <!--在线咨询-->
          <div class="w50 h50 overflow relative">
            <img :src="datas.user.avatar" class="w100s jz">
          </div>
          <!--<img :src="datas.user.avatar" class="cursor w50" @click="chats">-->
          <p class="f15 mT15 mB05">发布者</p>
          <p class="f20">{{datas.user.nickname}}
            <img class="call w30 h30 cursor" src="/static/img/common/call.png" @click="call_sel(datas)">
          </p>
          <p class="f15 mT15 mB05">发布者电话</p>
          <p class="f20">{{datas.user.mobilePhoneNumber}}</p>
          <p class="f15 mT15 mB05">发布时间</p>
          <p class="f20">{{datas.createdAt}}</p>
        </div>
      </div>



    </div>

    <div class="mT10 bai pL20 pR20">
      <p class="border-b f20 pB10 pT10">样板图</p>
      <ul class="pT20 pB20 overflow" v-if="datas.pics.length>0">
        <li v-for="(item,index) in datas.pics" class="w287 h287 overflow mB10 tupian relative">
          <!--<img :src="item.url" class="cursor w100s jz preview-img" @click="$preview.open(index,list)" >-->
          <img :src="item.url" class="cursor jz" preview='caigouXs' style="min-width:100%;min-height:100%;width:100%;">
          <!--<img :src="item.url+imageView22"  v-preview="item.url" :key="index" preview-title-enable="false" preview-nav-enable="true" class="cursor w100s" preview='yuanlinX' >-->
        </li>
      </ul>
      <p v-if="datas.pics.length==0" class="h60 lh60">暂无图片</p>
    </div>


    <div class="mT10 bai pL20 pR20">
      <p class="border-b f20 pB10 pT10">报价</p>
      <div class="h60 lh60 border-b overflow">
        <p class="w300 lf">
          <span class="mR20">报价<span style="color:red;" class="mL05">*</span></span>
          <input type="text" placeholder="输入报价" v-model="price" class="border0 center">
          <span>元/株</span>
        </p>
        <p class="w300 lf mL100">
          <span class="mR20">数量<span style="color:red;" class="mL05">*</span></span>
          <input type="text" placeholder="输入数量" v-model="amount" class="border0">
          <span>株</span>
        </p>
      </div>

            <div class="h60 lh60 border-b overflow">
        <p class="w300 lf">
          <span class="mR20">联系人<span style="color:red;" class="mL05">*</span></span>
          <input type="text" placeholder="输入联系人的姓名" v-model="contact" class="border0 center">
          <!--<span>元/株</span>-->
        </p>
        <p class="w300 lf mL100">
          <span class="mR20">联系电话<span style="color:red;" class="mL05">*</span></span>
          <input type="text" placeholder="输入联系电话" v-model="contact_number" class="border0">
          <!--<span>株</span>-->
        </p>
      </div>

            <div class="h60 lh60 border-b overflow">
                <span class="mR20">苗源地<span style="color:red;" class="mL05">*</span></span>
                 <select v-model="areaName1" class="outline0 f15" @change="areas1" id="sel1">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area1" >{{item}}</option>
        </select>

    <select v-model="areaName2" class="outline0 f15" v-if="area2.length!=0" @change="areas2" id="sel2">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area2"  >{{item}}</option>
        </select>

    <!--<select v-model="areaName3" class="outline0 f15" v-if="area3.length!=0" @change="areas3" id="sel3">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area3"  >{{item}}</option>
        </select>

    <select v-model="areaName4" class="outline0 f15" v-if="area4.length!=0" id="sel4">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area4"  >{{item}}</option>
        </select>-->
          </div>




           <div class="h200 border-b pT10 pB10">
                     <span class="mR20 lf left h50 lh50">说明<span style="color:red;" class="mL05"></span></span>
                    <textArea placeholder="输入内容" v-model="intro" class="w200 h100 lf border0 pT15" style="resize:none;"></textArea>
          </div>


           <div class="h400 border-b pT10 pB10">
                     <span class="mR20 lf left h50 lh50">图片<span style="color:red;" class="mL05"></span></span>
                    <loadUp class="lf mL10 overflow" style="width:1080px;"></loadUp>

          </div>
          <div class="center">
  <button type="button" @click="fabu" class="mui-btn mT20 mB20 f19 border0 w100 h50 lh50 white cursor" :class="{bg36c748:price!=''&&amount!=''&&contact!=''&&contact_number!=''&&areaName1!='请选择'&&areaName1!=''&&areaName2!='请选择'&&areaName2!=''}" >{{miaoshu}}</button>
    </div>
</div>

  </div>







  </div>
</template>

<script>
  import chats from "./search_news.vue";
    import loadUp from "./loadUp.vue";
  export default {
    data() {
      return {
         miaoshu:'立即报价',
        // imageview1:"?imageView2/1/w/250/h/150",
        imageview1: "?imageView2/1/w/250/h/150",
        datas: [],
        image50: '?imageView2/1/w/50/h/50',
        price: '',
        amount: '',
        intro: '',
        contact: '',
        contact_number: '',

         area: [],
        area1: [],
        areaName1: '',
        area2: [],
        areaName2: '',
        area3: [],
        areaName3: '',
        area4: [],
        areaName4: ''


      }
    },
    components: {
      "chats": chats,
      'loadUp':loadUp
    },
    methods: {

           // 取出第一级的数组
      areas() {
        var that = this;
        // areas.json  cities.json
        $.get(Boss0 + '/cities.json', function (data) {
          that.area = data
           console.log('that.area')
          console.log(that.area)
          console.log('data.length')
          console.log(data.length)
          for (var items in data) {
              that.area1.push(items)
              console.log('that.area1')
          }
            console.log(that.area1)
        })
      },
      // 第一级单项被选择后取出第二级的数组
      areas1() {
        var that = this;
        var indexs = document.getElementById('sel1').selectedIndex;
        // alert(indexs)
        // var bb = that.area[indexs - 1][that.areaName1]
        that.area2 =that.area[that.areaName1];
        that.areaName2 = '';
      },
      // 第二级单项被选择后取出第三级的数组
      areas2() {
      },
       fabu(){
var that=this
if(this.price!=''&&this.amount!=''&&this.contact!=''&&this.contact_number!=''&&this.areaName1!=''&&this.areaName2!=''){
that.isending=false//正在发布，请稍后
var formData = new FormData();
// if(this.$store.state.tdate.length>0){
for (var i = 0; i <this.$store.state.tdate.length; i++) {
  formData.append("pics",this.$store.state.tdate[i]);
};
var areas=that.areaName1+'|'+that.areaName2
formData.append("sessiontoken",sessiontoken);
formData.append("intro",this.intro);
formData.append("contact",this.contact);
formData.append("contact_number",this.contact_number);
formData.append("area",areas);
formData.append("qty",this.amount);
formData.append("unit_price",this.price);
formData.append("purchase_orders_id",this.datas.objectId);
// 逻辑代码::::::::::
setTimeout(function(){
  jQuery.ajax({
    url: Boss+"purchase_orders_quotation",
    type: "POST",
    processData: false,
    contentType: false,
    data: formData,
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    if(data.status){

             layui.use('layer', function () {
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            layer.open({
              type: 1
              , title: false //不显示标题栏
              , closeBtn: false
              , area: '300px;'
              , shade: 0.4
              , id: 'LAY_cheng' //设定一个id，防止重复弹出
              , btn: ['确定']
              , btnAlign: 'c'
              , moveType: 1 //拖拽模式，0或者1
              , shadeClose: true
              , content: '<div class="center f20 pT25 pB15">发布成功</div>'
              , success: function (layero) {
                  //  location.reload()
              }
            });
          })
    }else{
      that.isending=true//正在发布，请稍后
      mui.toast(data.result.message)
    }

})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
    mui.toast('發佈失敗，請稍后再試')
})
.always(function() {

    /* ... */
});

},500)
// }
        }
      },
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
        $.get(Boss + 'purchase_orders/' + this.$route.params.objectId, function (data) {
          if (data.status) {
            console.log('详情')
            console.log(data)
            that.datas = data.results;
          } else {
            layuiError(data)
          }

        })
      }

    },
    mounted: function () {
      this.xiangxi()
        this.areas()
    }
  }

</script>

<style lang="less" scoped>
  .tupian {
    margin-right: 10px;
  }

  .tupian:nth-child(4n) {
    margin-right: 0px;
  }

</style>
<style>
.search_clearX .layui-layer-btn0{background:#ea833d !important;}
</style>
