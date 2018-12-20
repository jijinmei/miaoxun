<template>
  <div class="search_flower">
    <searchInput :Ttype="'fl'" class="mB20"></searchInput>
    <!--<list :search="flower" :Ttype="'fl'" v-if="flower.length>0"></list>-->
     <listFlower :flower="flower" style="width:1240px;" class="margin"></listFlower>
    <div style="width:1220px;" class="margin bai">
       <div id="pages" class="pT30 pB20 pL30 margin" ></div>
    </div>

    <div v-show="0">{{watch}}</div>
  </div>
</template>

<script>
  import searchInput from "./ym_type.vue";
  // import list from "./list.vue";
  import listFlower from "./listFlower.vue";
  export default {
    data() {
      return {
        searchKey: "",
        flower: []
      }
    },
    components: {
       "listFlower": listFlower,
      "searchInput": searchInput,
    },
    computed: {
      watch() {

      }
    },
    methods: {

      https(page){
        var that=this

var datasno = {
            'searchkey': this.$route.params.se || '',
            'ispublish': 1,
            'limit':limit36S,
            'page':page
          }
var datas=this.$route.params.queryData=='no'?datasno:JSON.parse(this.$route.params.queryData);
datas.page=page
        $.ajax({
          url: Boss + "flowers",
          type: "GET",
          data: datas,
          headers: {
            "role": "seller",
          },
          success:function(data){
                if(data.status){
                 that.flower=data.results.data;
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

var datasno = {
            'searchkey': this.$route.params.se || '',
            'ispublish': 1,
            'limit':limit36S,
            // 'sort':'createdAt',
            'page':page
          }

var datas=this.$route.params.queryData=='no'?datasno:JSON.parse(this.$route.params.queryData);

        $.ajax({
          url: Boss + "flowers",
          type: "GET",
          data: datas,
          headers: {
            "role": "seller",
          },
          success:function(data){
                if(data.status){
                 that.flower=data.results.data;
                 var count=data.results.count;
                 layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limit36S,
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


    }
  }

</script>
<style lang="less">


</style>
