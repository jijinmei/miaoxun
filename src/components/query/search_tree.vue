<template>
  <div class="search_tree">
    <div class="f26 c36c748 bold">
      </div>
    <searchInput class="mB20"></searchInput>
    <listTree :tree="trees" style="width:1240px;" class="margin"></listTree>
     <!--<listFlower :tree="trees" v-if="trees.length>0"></listFlower>-->
    <!--暂无数据-->
    <div class="f25 center mT100 mB100 c999999" v-if="loading==0">加载中，请稍后片刻...</div>
    <div class="f25 center mT100 mB100 c999999" v-if="loading==1">暂无数据，可尝试其它的筛选条件</div>

    <div style="width:1220px;" class="margin bai">
       <div id="pages" class="pT30 pB20 pL30 margin" ></div>
    </div>

    <div v-show="0">{{watch}}</div>

  </div>
</template>

<script>
  import searchInput from "./ym_type.vue";
  import listTree from "./listTree.vue";
  // import listFlower from "./listFlower.vue";
  export default {
    data() {
      return {
        near:{},
        searchKey: "",
        trees: [],
        loading:0//0是加载中，1是暂无数据，2是有数据
        // page:1
      }
    },
    components: {
      "listTree": listTree,
      // "listFlower": listFlower,
      "searchInput": searchInput,
    },
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
// list组价的activated钩子
 activated() {
 	console.log('B页面的activated')
    // isUseCache为false时才重新刷新获取数据
    // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
    if(this.$route.meta.isUseCache==false){
      console.log('重新请求')
    // alert('B页面的activated重新请求数据')
         this.trees = []; // 清空原有数据
        this.pages(1); // 这是我们获取数据的函数
        this.$route.meta.isUseCache = false;
    }
},
 deactivated() {

},
		// B页面离开的时候B的路由属性
beforeRouteLeave (to, from, next) {
      from.meta.isUseCache=true
        console.log('beforeRouteLeave')
    // if (to.name == 'mehome') {
    //     from.meta.isUseCache = false;
    //     // alert('B页面离开的时候设置A页面的使用缓存为true')
    // }
    next();
},
		// 进入B页面的时候设置本页面是否需要缓存
beforeRouteEnter (to, from, next) {
    // console.log(from.name)
    console.log('beforeRouteEnter')
    if(from.name=='mehome'){
      to.meta.isUseCache=false
    }
    next();
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
          url: Boss + "tree",
          type: "GET",
          data: datas,
          headers: {
            "role": "seller",
          },
          success:function(data){
                if(data.status){
                 that.trees=data.results.data;
                 if(that.trees.length>0){
                 that.loading=2
                 }else{
                   that.loading=1
                 }

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
// 判断排序方式是否为最近距离，如果是则传入near的参数，当前的经纬度坐标
// if()
var datas=this.$route.params.queryData=='no'?datasno:JSON.parse(this.$route.params.queryData);



        $.ajax({
          url: Boss + "tree",
          type: "GET",
          data: datas,
          headers: {
            "role": "seller",
          },
          success:function(data){
                if(data.status){
                 that.trees=data.results.data;
                   if(that.trees.length>0){
                 that.loading=2
                 }else{
                   that.loading=1
                 }
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
                }else{
                  layuiError(data)
                }
          },
          error:function(data){

          },
        })
    }
    },
    mounted: function () {

      console.log('mounted')
      this.pages(1)


    }
  }

</script>
<style lang="less">
/*地址栏的参数只有点击筛选的确定和重置才能改变整个dataquery，
而不管是第一次初始化的请求还是说点击页数的请求，都是判断是否有参数然后直接取地址栏的整个dataquery传到后台的，
然后页面的筛选条件页数根据地址栏的参数然后读取重新渲染筛选的条件
*/
</style>
