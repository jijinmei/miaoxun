<template>
  <div class="margin relative f15 pB30 pT30 B00  search_caigou" style="width:1220px;">
    <div class="relative mB10 pB30 pT30 bai pL20 pR20">
      <input type="text" v-model="searchKey" class="h50 border pL20 pR20 outline0 f15" @keyup.enter="sousuo" placeholder="查找关键字"
        style="width:1040px;">
      <button class="white bgea833d outline w100 h52 border0 center cursor f15 czjz R20" @click="sousuo">搜索</button>
    </div>


<!--采购列表-->
<listOrder :datas="datas"></listOrder>


  <div class="margin bai">
       <div id="pages" class="pT30 pB20 pL30 margin" ></div>
    </div>


  </div>
</template>

<script>
import listOrder from './listOrder.vue';
  export default {
    data() {
      return {
        searchKey: "",
        datas: [],

        // page:1
      }
    },
components:{'listOrder':listOrder},
    computed: {
      watch() {
        // this.trees=this.$store.state.trees;
        // let that = this;
        // if(this.searchkey != this.$route.params.se){
        //     this.searchKey = this.$route.params.se;
        //     this.getdata(this.searchKey);
        // }
      }
    },
    methods: {
     sousuo(){

     },
      https(page){
        var that=this
        // 获取搜索记录到localStorage
        // var datas
        // var searchQuery = window.localStorage.getItem('searchQuery');
        // if (searchQuery) {
        //   datas = {
        //     'searchkey': JSON.parse(searchQuery).searchkey,
        //     'ispublish': 1,
        //     'sort': JSON.parse(searchQuery).sort,
        //     'page': page,
        //     'limit':20,
        //     'where': JSON.parse(searchQuery).where
        //   }
        // } else {
        //   datas = {
        //     'searchkey': this.$route.params.se || '',
        //     'ispublish': 1,
        //     'limit':20,
        //     'page':page
        //   }
        // }


        $.ajax({
          url: Boss + "purchase_orders",
          type: "GET",
          data: {"page":page, 'limit':limitS,'sessiontoken':that.$store.state.user.sessiontoken},
          // headers: {
          //   "role": "seller",
          // },
          success:function(data){
                if(data.status){
                 that.trees=data.results.data;
                //  that.count=data.results.count
                }else{
                   layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                      });
                }
          }
        })

    },
       pages(page){
      //首次请求数据，并构建分页
      let that = this;
        // 获取搜索记录到localStorage
        // var datas
        // var searchQuery = window.localStorage.getItem('searchQuery');
        // if (searchQuery) {
        //   datas = {
        //     'searchkey': JSON.parse(searchQuery).searchkey,
        //     'ispublish': 1,
        //     'sort': JSON.parse(searchQuery).sort,
        //     'page': page,
        //     'limit':20,
        //     'where': JSON.parse(searchQuery).where
        //   }
        // } else {
        //   datas = {
        //     'searchkey': this.$route.params.se || '',
        //     'ispublish': 1,
        //     'limit':20,
        //     'page':page
        //   }
        // }


        $.ajax({
          url: Boss+ "purchase_orders",
          type: "GET",
           data: {"page":page, 'limit':limitS},
          // headers: {
          //   "role": "seller",
          // },
          success:function(data){
                if(data.status){
                 that.datas=data.results.data;
                 var count=data.results.count;
                 layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limitS,
                    // curr:location.hash.replace('?!fenye=', ''), //获取起始页,
                    // hash: 'fenye', //自定义hash值
                    layout:['prev', 'page', 'next','count', 'skip'],
                     prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                    next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                    // hash: 'page', //自定义hash值
                    count:count, //数据总数，从服务端得到
                    jump:function(obj,first){
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if(!first){
                       console.log('切换对应页数据')
                          that.page=obj.curr
                          that.https(obj.curr)
                    }else{
                      // 如果是首次
                       console.log('首次啥也不干')
                        //that.https(1)
                    }
                  }
                });
              });
                }
          },
          error:function(data){

          },
        })
    }
    },
    mounted: function () {
      this.pages(1)
      // if(this.$route.name != "no_query_search"){
      // this.getdata(this.$route.params.se || '')
      // }

    }
  }

</script>
<style lang="less">
.layui-laypage .layui-laypage-curr .layui-laypage-em{background-color:#36c748 !important;}
.layui-laypage a, .layui-laypage span{height: 39px !important;line-height: 39px !important;padding:0 18px !important;}
.layui-laypage a, .layui-laypage span{font-size:12px !important;}
</style>
