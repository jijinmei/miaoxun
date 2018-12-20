<template>
  <div class="margin relative f15 pB30 pT30 B00 bai pL06 pR06 search_car" style="width:1208px;">
    <div>
      <div class="relative mB30 mL54" style="width:1100px;">
      <input type="text" v-model="where.searchKey" class="h50 border pL20 pR20 outline0 f15" @keyup.enter="sousuo" placeholder="搜索职位"
        style="width:970px;">
      <button class="white bg4faa90 outline w100 h52 border0 center cursor f15 czjz R00" @click="sousuo">搜索</button>
    </div>
      <div class="layui-tab layui-tab-brief" lay-filter="test1">
        <ul class="layui-tab-title">
          <li :class="{'layui-this':index==0}" v-for="(item,index) in types">{{item}}</li>
          <!--<li>汽车吊</li>
          <li>随车吊</li>
          <li>运输车辆</li>
          <li>叉车</li>
          <li>挖机</li>-->
        </ul>
        <div class="layui-tab-content overflow mT50" style="">
              <p class="lf mB30 w250"  v-show="iDX==0||iDX==1||iDX==4">用车地区：
                      <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.area">
              </p>
            <p class="lf mB30 w250"  v-show="iDX!=1&&iDX!=5&&iDX!=4">出&nbsp;&nbsp;发&nbsp;&nbsp;地：
  <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.from">
            </p>
            <p  class="lf mB30 w250" v-show="iDX!=1&&iDX!=5&&iDX!=4">目&nbsp;&nbsp;的&nbsp;&nbsp;地：
                 <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.to">
            </p>
            <p  class="lf mB30 w250" v-show="iDX!=1&&iDX!=5&&iDX!=4">车&nbsp;&nbsp;厢&nbsp;&nbsp;长：
                 <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.width">
            </p>
             <p  class="lf mB30 w250" v-show="iDX!=3&&iDX!=5">吊<span class="opacity0">透明</span>重：
                 <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.weight">
             </p>
              <p  class="lf mB30 w250" v-show="iDX==5">吨<span class="opacity0">透明</span>位：
                  <input type="text" class="w100 pL10 pR10 pT05 pB05 border" v-model="where.weight">
              </p>
              <button class="layui-btn layui-btn-primary lf layui-btn-sm mR15" @click="kong()">清空搜索</button>
              <button class="layui-btn lf layui-btn-sm" @click="sousuo">搜索</button>
        </div>
        <!--<div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <p>用车地区：</p>
            <p>出发地：</p>
            <p>目的地：</p>
            <p>车厢长：</p>
             <p>吊重：</p>
          </div>
          <div class="layui-tab-item">内容2</div>
          <div class="layui-tab-item">内容3</div>
          <div class="layui-tab-item">内容4</div>
          <div class="layui-tab-item">内容5</div>
        </div>-->
      </div>
    </div>

      <!--吊车列表-->
<listcar :datas="datas" v-if="datas"></listcar>


    <div style="width:1208px;" class="margin bai">
      <div id="pages" class="pT30 pB20 pL30 margin">

      </div>
    </div>

  </div>
</template>

<script>
  import listcar from './listcar.vue';
  export default {
    data() {
      return {


        datas: [],//吊车列表
        iDX:0,
        types:['全部','汽车吊','随车吊','运输车辆','叉车','挖机'],
        where:{
            'area':'',
            'searchKey': "",
            'type': "",
            'width': "",
            'weight': "",
            'to': "",
            'from': ""
      }

      }
    },

    computed: {
      watch() {

      }
    },
    components:{'listcar':listcar},
    methods: {
      sousuo(){
              this.pages(1)
      },
      kong(){
            this.where={
            'area':'',
            'searchKey': "",
            'type': "",
            'width': "",
            'weight': "",
            'to': "",
            'from': ""
      }
      },
      // 查看吊车的服务范围
      area() {
        $.get(Boss + 'carriage/services_area', function (data) {

        })
      },
      https(page) {
        var that = this
        var data={}
        for(var key in that.where){
            if(that.where[key]){
               data[key]=that.where[key]
            }
        }
        data['limit']=limitS;
        data['page']=page;
        $.ajax({
         url: Boss + "carriage",
          type: "GET",
          data:data,
          // data: {
          //   'searchKey':that.searchKey,
          //   'type':that.type,
          //   'width':that.width,
          //   'weight':that.weight,
          //   'to':that.to,
          //   'from': that.from},
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.datas = data.results.data;

            for (var ii = 0; ii < that.datas.length; ii++) {
              that.datas[ii].areass = []

              for (var index = 0; index < that.datas[ii].area.length; index++) {

                var obj = that.datas[ii].area[index]
                var totalkey = Object.keys(obj).length
                Object.keys(obj).forEach((item, indexs) => {
                  for (var jj = 0; jj < obj[item].length; jj++) {
                    that.datas[ii].areass.push(obj[item][jj])
                  }


                })

              }

            }
              //  that.count=data.results.count
            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.message);
              });
            }
          }
        })

      },
      pages(page) {
        //首次请求数据，并构建分页
        let that = this;
        var data={}
        for(var key in that.where){
            if(that.where[key]){
               data[key]=that.where[key]
            }
        }
        data['limit']=limitS;
        data['page']=page;
        $.ajax({
         url: Boss + "carriage",
          type: "GET",
          data:data,
          // data: {
          //   'searchKey':that.searchKey,
          //   'type':that.type,
          //   'width':that.width,
          //   'weight':that.weight,
          //   'to':that.to,
          //   'from': that.from},
          headers: {
            "role": "seller",
          },
          success: function (data) {
            if (data.status) {
              that.datas = data.results.data;


            for (var ii = 0; ii < that.datas.length; ii++) {
              that.datas[ii].areass = []

              for (var index = 0; index < that.datas[ii].area.length; index++) {

                var obj = that.datas[ii].area[index]
                var totalkey = Object.keys(obj).length
                Object.keys(obj).forEach((item, indexs) => {
                  for (var jj = 0; jj < obj[item].length; jj++) {
                    that.datas[ii].areass.push(obj[item][jj])
                  }


                })

              }

            }

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
                      // that.page = obj.curr
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
      var that=this;
      this.pages(1)
      layui.use('element', function () {
        var element = layui.element;

        //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
        var layid = location.hash.replace(/^#test1=/, '');
        element.tabChange('test1', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项

        //监听Tab切换，以改变地址hash值
        element.on('tab(test1)', function (e) {
             that.where.type=(that.types[e.index]=='全部'?'':that.types[e.index]);
             that.iDX=e.index
          that.pages(1)
        });
      });


    }
  }

</script>
<style lang="less">
  #clear>li:nth-child(n) {
    float: left;
  }

  #clear>li:nth-child(2n) {
    float: right;
  }
</style>
