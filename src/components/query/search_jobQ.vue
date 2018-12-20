<template>
  <div class="margin relative f15 pB30 pT30 B00 bai pL20 pR20 search_jobZ" style="width:1180px;">
    <div class="relative mB30">
      <input type="text" v-model="searchKey" class="h50 border pL20 pR20 outline0 f15" @keyup.enter="sousuo" placeholder="搜索职位"
        style="width:1040px;">
      <button class="white bg4cafb6 outline w100 h52 border0 center cursor f15 czjz R00" @click="sousuo">搜索</button>
    </div>

     <div class="mB30">
      <span class="c999999 mR15">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</span>
      <span v-for="(item,index) in jobs">
        <span v-for="(item1,key1,index1) in item" class="mR15 mB10 f14 cursor" :class="{c4cafb6:jobwai==key1}" @click="tojob2(key1,index,index1)">{{key1}}</span>
      </span>
      <p class="pL82 mT20">
        <span v-for="(item2,key2,index2) in job2" :class="{c4cafb6:jobnei==key2}" @click="tojob3(item2,key2,index2)" class="mR15 mB10 f14 cursor">{{item2}}</span>
        </p>
    </div>




    <span class="c999999 mR15">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span>
    <select v-model="areaName1" class="outline0 f15" @change="areas1" id="sel1">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area1" >{{item}}</option>
        </select>

    <select v-model="areaName2" class="outline0 f15" v-if="area2.length!=0" @change="areas2" id="sel2">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area2"  >{{item}}</option>
        </select>

    <select v-model="areaName3" class="outline0 f15" v-if="area3.length!=0" @change="areas3" id="sel3">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area3"  >{{item}}</option>
        </select>

    <select v-model="areaName4" class="outline0 f15" v-if="area4.length!=0" id="sel4">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in area4"  >{{item}}</option>
        </select>
    <button class="white bg4cafb6 outline w45 h22 border0 center cursor f12 mL15" @click="sousuo" v-show="areaName1!=''&&areaName1!='请选择'">确定</button>


    <div class="mT30">
      <span class="c999999 mR15">薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资:</span>
      <button class=" outline w45 h25 border0 center cursor f12 mL15 radius05" @click="dayIdx=index" :class="{white:dayIdx==index,bg4cafb6:dayIdx==index,c777777:dayIdx!=index,bgeeeeee:dayIdx!=index}"
        v-for="(item,index) in day">{{item}}</button>
      <input type="tel" v-model="mins" placeholder="0" class="w50 center f15 mL20">
      <span>-</span>
      <input type="tel" v-model="maxs" placeholder="0" class="w50 center f15">
       <span>元</span>
      <input type="radio" class="mL20 cursor" :checked="checked" @click="ischecks()">面议</input>
       <button class="white bg4cafb6 outline w45 h22 border0 center cursor f12 mL15" @click="sousuo" >确定</button>
    </div>

<!--招聘列表-->
<lists :datas="datas"></lists>

  <div style="width:1180px;" class="margin bai">
       <div id="pages" class="pT30 pB20 margin" ></div>
    </div>
     <div style="display:none;">{{watch}}</div>
  </div>
</template>

<script>
   import lists from './listQ.vue';
  export default {
    data() {
      return {
         checked:false,
        searchKey: "",
        datas: [],//招聘列表
        area: [],
        area1: [],
        areaName1: '',
        area2: [],
        areaName2: '',
        area3: [],
        areaName3: '',
        area4: [],
        areaName4: '',
        day: ['日', '周', '月', '年'],
        dayIdx: 2,
        mins:'',
        maxs:'',
        jobs:[],
        job2:[],
        jobname1:'',
        jobname2:'',
        jobwai:-1,
        jobnei:-1//
      }
    },
        computed:{
         watch(){
           if(this.mins!=''||this.maxs!=''){
                this.checked=false
           }

         }
    },
    components:{'lists':lists},
    methods: {
       ischecks(){
         this.checked=!(this.checked)
         if(this.checked==true){
                   this.mins=''
                   this.maxs=''
         }
      },
        radios() {
        this.mins= '';
        this.maxs = '';
      },
      tojob2(item,index,index1){
         this.jobwai=item
          this.jobname1=index1
         console.log(index,index1,this.jobwai)
            this.job2=this.jobs[index][item]
            console.log(this.job2,item)
      },
      tojob3(item,key,index){
            this.jobnei=key;
             this.jobname2=item;
             console.log(item,key,index)
      },
      //职位架构
      jobsData(){
                var that = this;
        $.get(Boss + '/jobs', function (data) {
          that.jobs = data.results;
        })
      },
      // 取出第一级的数组
      areas() {
        var that = this;
        $.get(Boss0 + '/areas.json', function (data) {
          that.area = data
          for (var index = 0; index < data.length; index++) {
            for (var item in data[index]) {
              that.area1.push(item)
              console.log(item)
            }

          }

        })
      },
      // 第一级单项被选择后取出第二级的数组
      areas1() {
        var that = this;
        var indexs = document.getElementById('sel1').selectedIndex;
        var bb = that.area[indexs - 1][that.areaName1]
        that.area2 = [];
        that.areaName2 = '';
        that.area3 = [];
        that.areaName3 = '';
        that.area4 = [];
        that.areaName4 = '';
        console.log(indexs - 1, that.areaName1)
        for (var index = 0; index < bb.length; index++) {
          for (var item in bb[index]) {
            that.area2.push(item)
          }
        }
      },
      // 第二级单项被选择后取出第三级的数组
      areas2() {
        var that = this;
        var indexs1 = document.getElementById('sel1').selectedIndex;
        var indexs2 = document.getElementById('sel2').selectedIndex;
        var bb = that.area[indexs1 - 1][that.areaName1][indexs2 - 1][that.areaName2]
        that.area3 = [];
        that.areaName3 = '';
        that.area4 = [];
        that.areaName4 = '';
        console.log(indexs1 - 1, that.areaName1, indexs2 - 1, that.areaName2)
        for (var index = 0; index < bb.length; index++) {
          console.log(typeof (bb[index]))
          if (typeof (bb[index]) != "string") {
            //  true为数组
            console.log("!string")
            for (var item in bb[index]) {
              console.log(item)
              that.area3.push(item)
            }
          } else {
            //  false不为数组
            console.log("string")
            that.area3.push(bb[index])
          }

        }
      },
      // 第三级单项被选择后取出第四级的数组
      areas3() {
        var that = this;
        var indexs1 = document.getElementById('sel1').selectedIndex;
        var indexs2 = document.getElementById('sel2').selectedIndex;
        var indexs3 = document.getElementById('sel3').selectedIndex;
        var bb = that.area[indexs1 - 1][that.areaName1][indexs2 - 1][that.areaName2]
        that.area4 = [];
        that.areaName4 = '';
        // 不存在下一级，返回
        if (typeof (bb[0]) == "string") {
          return
        } else {
          // 存在下一级
          var bbs = that.area[indexs1 - 1][that.areaName1][indexs2 - 1][that.areaName2][indexs3 - 1][that.areaName3]
          console.log('bbs')
          console.log(indexs1 - 1, that.areaName1, indexs2 - 1, that.areaName2, indexs3 - 1, that.areaName3)
          for (var index = 0; index < bbs.length; index++) {
            console.log(typeof (bbs[index]))
            if (typeof (bbs[index]) != "string") {
              //  true为数组
              console.log("!string")
              for (var item in bbs[index]) {
                console.log(item)
                that.area4.push(item)
              }
            } else {
              //  false不为数组
              console.log("string")
              that.area4.push(bbs[index])
            }

          }
        }


      },
      sousuo() {
         this.https(1)
      },

      https(page) {
         var input1 =$('#sel1').val()||'0'
        var input2 =$('#sel2').val()||'0'
        var input3 =$('#sel3').val()||'0'
        var input4 =$('#sel4').val()||'0'

        var area=[]
        if(input1!='0'){
          area.push(input1)
        }
        if(input2!='0'){
          area.push(input2)
        }
        if(input3!='0'){
          area.push(input3)
        }
        if(input4!='0'){
          area.push(input4)
        }
         var areas=area.join('|')


        var that = this
          var pays=(that.dayIdx==0?'日':(that.dayIdx==1?'周':(that.dayIdx==2?'月':(that.dayIdx==3?'年':('')))))
         var vv=(that.mins!=''&&that.maxs!=''?that.mins+'-'+that.maxs+'/'+pays:(that.mins!=''?that.mins+'/'+pays:(that.maxs!=''?that.maxs+'/'+pays:'')))
         var payss
           if(that.checked==true){
          payss='面议'
         }else{
          payss=vv
         }
// var areas=
//             (that.areaName1!=''&&that.areaName1!='请选择'?that.areaName1:
//             (that.areaName2!=''&&that.areaName2!='请选择'?'|'+that.areaName2:
//             (that.areaName3!=''&&that.areaName3!='请选择'?'|'+that.areaName3:
//             (that.areaName4!=''&&that.areaName4!='请选择'?'|'+that.areaName4:
//             ''))))
// Jobs - 查看招聘列表
        $.ajax({
          url:Boss + "job_wanted",
          type: "GET",
          data: {
            'searchkey':that.searchKey,//
            'area':areas,//广东|江门|新会区|崖门镇
            'pay':payss,//示例：3000-3500/月，或 面议
            'page':page,
            'limit':limitS
          },
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.datas = data.results.data;
              //  for (var index = 0; index < that.datas.length; index++) {
              //   that.datas[index].job_treated= that.datas[index].job_treated.split(',');

              // }
            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.results.message);
              });
            }
          }
        })

      },
      pages(page) {
         var input1 =$('#sel1').val()||'0'
        var input2 =$('#sel2').val()||'0'
        var input3 =$('#sel3').val()||'0'
        var input4 =$('#sel4').val()||'0'

        var area=[]
        if(input1!='0'){
          area.push(input1)
        }
        if(input2!='0'){
          area.push(input2)
        }
        if(input3!='0'){
          area.push(input3)
        }
        if(input4!='0'){
          area.push(input4)
        }
         var areas=area.join('|')
        //首次请求数据，并构建分页
        var that = this;
         var pays=(that.dayIdx==0?'日':(that.dayIdx==1?'周':(that.dayIdx==2?'月':(that.dayIdx==3?'年':('')))))
         var vv=(that.mins!=''&&that.maxs!=''?that.mins+'-'+that.maxs+'/'+pays:(that.mins!=''?that.mins+'/'+pays:(that.maxs!=''?that.maxs+'/'+pays:'')))
         var payss
          if(that.checked==true){
          payss='面议'
         }else{
          payss=vv
         }
// var areas=
//             (that.areaName1!=''&&that.areaName1!='请选择'?that.areaName1:
//             (that.areaName2!=''&&that.areaName2!='请选择'?'|'+that.areaName2:
//             (that.areaName3!=''&&that.areaName3!='请选择'?'|'+that.areaName3:
//             (that.areaName4!=''&&that.areaName4!='请选择'?'|'+that.areaName4:
//             ''))))
// Jobs - 查看招聘列表
        $.ajax({
          url:Boss + "job_wanted",
          type: "GET",
          data: {
            'searchkey':that.searchKey,
            'area':areas,//广东|江门|新会区|崖门镇
            'pay':payss,//示例：3000-3500/月，或 面议
            'page':page,
            'limit':limitS
          },
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {

              that.datas = data.results.data;
              // for (var index = 0; index < that.datas.length; index++) {
              //   that.datas[index].job_treated= that.datas[index].job_treated.split(',');

              // }
              var count = data.results.count;
              layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                  elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
                  limit: 20,
                  // curr:location.hash.replace('?!fenye=', ''), //获取起始页,
                  // hash: 'fenye', //自定义hash值
                  layout: ['prev', 'page', 'next', 'count', 'skip'],
                  prev: '<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                  next: '下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                  // hash: 'page', //自定义hash值
                  count: count, //数据总数，从服务端得到
                  jump: function (obj, first) {
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if (!first) {
                      console.log('切换对应页数据')
                      that.page = obj.curr
                      that.https(obj.curr)
                    } else {
                      // 如果是首次
                      console.log('首次啥也不干')
                      //that.https(1)
                    }
                  }
                });
              });
            }
          },
          error: function (data) {

          },
        })
      }
    },
    mounted: function () {
      this.pages(1)
      this.areas()
      this.jobsData()

    }
  }

</script>

<style lang="less" scoped>


</style>
