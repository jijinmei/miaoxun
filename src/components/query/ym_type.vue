<template>
  <div class="ym_left_type  bai h280 pT40">
    <div style="width:1220px;" class="margin">
      <div class="margin relative f20 mB30" style="width:900px;">
        <input type="text" v-model="searchkey" class="h50 border pL10 pR10 outline0 f15" @keyup.enter="sousuo('yes')" placeholder="请输入您要搜索的内容"
          style="width:800px;">
        <button class="white outline w78 h52 border0 center czjz R00 cursor f15" :class="{bgda4a5d:this.$route.name=='no_query_search_flower'||this.$route.name=='query_search_flower',bg36c748:this.$route.name=='no_query_search_tree'||this.$route.name=='query_search_tree'}" @click="sousuo('yes')">搜索</button>
      </div>




      <!--苗木-->
      <div style="width:1220px;height:280px;" class="margin" v-if="this.$route.name=='no_query_search_tree'||this.$route.name=='query_search_tree'">
        <!--11111111111111111111 470-->
        <div class="w380 lf pL20">
          <div class="search_list">
            <span class="c999999">种植情况:</span>
            <span v-for="(item,index) in mu_type_list" isclick="-1" :class="{c36c748:where.mu_plant_type==item,borderlv:where.mu_plant_type==item}"
              @click="mu_change('mu_plant_type',item,$event,'.istypes')" class="istypes f12 cursor radius05 inline mR10 border w50 h25 lh25 center">{{item}}</span>
          </div>

          <div class="mT20 search_list">
            <span class="c999999">米&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径:</span>
            <input type="number" v-model="where['mu_mj_min']" placeholder="最小值" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_mj_max']" placeholder="最大值" class="w60 center f12">
            <span>cm</span>
          </div>


          <div class="mT20 search_list">
            <span class="c999999">冠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;幅:</span>
            <input type="number" v-model="where['mu_gf_min']" placeholder="最小值" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_gf_max']" placeholder="最大值" class="w60 center f12">
            <span>cm</span>
          </div>

          <div class="mT20 search_list">
            <span class="c999999">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span>

            <select v-model="where['mu_province']" class="outline0">
              <option value="">请选择省</option>
              <option :value="item" v-for="(item,index) in mu_quyu_province"  >{{item}}</option>
        </select>
            <select v-model="where['mu_city']" class="outline0">
              <option value="">请选择市</option>
              <option :value="item" v-for="(item,index) in mu_quyu_list[where.mu_province]"  >{{item}}</option>
        </select>

          </div>

        </div>

        <!--2222222222222222222222-->
        <div class="w380 lf pL20">

          <div class="search_list">
            <span class="c999999">几&nbsp;&nbsp;斤&nbsp;&nbsp;袋:</span>
            <span v-for="(item,index) in mu_weight_list" :isclick="-1" :class="{c36c748:where.mu_package_weight==item,borderlv:where.mu_package_weight==item}"
              @click="mu_change('mu_package_weight',item,$event,'.isweights')" class="isweights f12 cursor radius05 inline mR10 border w50 h25 lh25 center">{{item}}</span>
          </div>

          <div class="mT20 search_list">
            <span class="c999999">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径:</span>
            <input type="number" v-model="where['mu_dj_min']" placeholder="最小值" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_dj_max']" placeholder="最大值" class="w60 center f12">
            <span>cm</span>
          </div>

          <div class="mT20 search_list">
            <span class="c999999">主&nbsp;&nbsp;蔓&nbsp;&nbsp;长:</span>
            <input type="number" v-model="where['mu_mc_min']" placeholder="最小值" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_mc_max']" placeholder="最大值" class="w60 center f12">
            <span>cm</span>
          </div>


          <div class="mT20 search_list">
            <span class="c999999" style="letter-spacing:2px;">价格区间:</span>
            <input type="number" v-model="where['mu_price_min']" placeholder="最低价" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_price_max']" placeholder="最高价" class="w60 center f12">
            <input type="radio" :checked="where['mu_price_min']!=''||where['mu_price_max']!=''?false:true" @click="radios">面议</input>
          </div>


        </div>


        <!--333333333333333333333333 260-->
        <div class="w380 rf pL20">

          <div class="search_list">
            <span class="c999999">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:</span>
            <select v-model="where['mu_density']" class="outline0">
                       <option value="">请选择</option>
                      <option :value="item" v-for="(item,index) in mu_density_list" >{{item}}</option>
            </select>
          </div>


          <div class="mT20 search_list">
            <span class="c999999">自&nbsp;&nbsp;然&nbsp;&nbsp;高:</span>
            <input type="number" v-model="where['mu_zg_min']" placeholder="最小值" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_zg_max']" placeholder="最大值" class="w60 center f12">
            <span>cm</span>
          </div>






          <div class="mT20 search_list">
            <span class="c999999">排序方式:</span>

            <select v-model="sort" class="outline0" @change="changesort()" id="sort">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in mu_sort_list"  >{{item}}</option>
            </select>
          </div>


          <div class="mT20 search_list">
            <button class="white w50 h30 lh30 radius05 cursor bg36c748 center outline0 border0 mR20" @click="sousuo('no')">确定</button>
            <button class="white w50 h30 lh30 radius05 cursor bg36c748 center outline0 border0" @click="reloads">重置</button>
          </div>

        </div>
      </div>






      <!--花卉-->
      <div style="width:1220px;height:250px;" class="margin pT30" v-if="this.$route.name=='no_query_search_flower'||this.$route.name=='query_search_flower'">

        <div class="w380 lf pL20">
          <div class="search_list">
            <span class="c999999">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span>

            <select v-model="where['mu_province']" class="outline0">
              <option value="">请选择省</option>
              <option :value="item" v-for="(item,index) in mu_quyu_province"  >{{item}}</option>
        </select>
            <select v-model="where['mu_city']" class="outline0">
              <option value="">请选择市</option>
              <option :value="item" v-for="(item,index) in mu_quyu_list[where.mu_province]"  >{{item}}</option>
        </select>
          </div>
        </div>



        <div class="w380 lf pL20">
          <div class="search_list">
            <span class="c999999" style="letter-spacing:2px;">价格区间:</span>
            <input type="number" v-model="where['mu_price_min']" placeholder="最低价" class="w60 center f12">
            <span>{{"-"}}</span>
            <input type="number" v-model="where['mu_price_max']" placeholder="最高价" class="w60 center f12">
            <input type="radio" :checked="where['mu_price_min']!=''||where['mu_price_max']!=''?false:true" @click="radios">面议</input>
          </div>
          <div class="mT40 search_list pL50">
            <button class="white w50 h30 lh30 radius05 cursor bgda4a5d center outline0 border0 mR20" @click="sousuo('no')">确定</button>
            <button class="white w50 h30 lh30 radius05 cursor bgda4a5d center outline0 border0" @click="reloads">重置</button>
          </div>
        </div>

        <div class="w380 lf pL20">
          <div class="search_list">
            <span class="c999999">排序方式:</span>

            <select v-model="sort" class="outline0" @change="changesort()" id="sort">
              <option value="">请选择</option>
              <option :value="item" v-for="(item,index) in mu_sort_list"  >{{item}}</option>
            </select>
          </div>


        </div>


      </div>




    </div>
     <div class="h300 lf" id="allmap" style="width:0px;">
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        kongge: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        mu_type_list: ["地苗", "假植苗", "容器苗"],
        mu_weight_list: ["3", "5", "7", '10'],
        mu_density_list: ["50%", "55%", "60%", '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'],
        mu_sort_list: ["默认排序", "价格升序", "最近发布", '最近距离'],
        mu_quyu_province: [],
        mu_quyu_list: [],
        searchkey: "",//搜索关键字
        where:
        {
          'mu_name': '', 'mu_plant_type': '',
          'mu_mj_min': '', 'mu_mj_max': '',
          'mu_zg_min': '', 'mu_zg_max': '',
          'mu_gf_min': '', 'mu_gf_max': '',
          'mu_dj_min': '', 'mu_dj_max': '',
          'mu_package_weight': '',
          'mu_province': '', 'mu_city': '',
          'mu_price_min': '', 'mu_price_max': '',
          'mu_mc_min': '', 'mu_mc_max': '', 'mu_density': ''
        }//密度，主蔓长
        ,//查找条件
        ispublish: 1,// 在Header中，指定 role= seller 时才生效，是否仅显示已发布 1：已发布，0：未发布, 当 role 不为 buyer 时，仅显示已发布的苗木数据
        page: 1,
        limit: 40,
        near:{'latitude':'','longitude':''},
        sort: '默认排序'// createdAt(创建时间),mu_price(价格),mu_stock(库存) createdAt
      }
    },
    computed: {

    },
    methods: {

      // 重置
      reloads() {
        for (var item in this.where) {
          this.where[item] = '';
        }
        this.sort = 'createdAt';
        $("#sort").val('');
      location.href=URLS+'query/search_tree/no'
        this.$parent.pages(1);
        // 保存搜索记录到localStorage
        // window.localStorage.removeItem('searchQuery');
      },

      radios() {
        this.where['mu_price_min'] = '';
        this.where['mu_price_max'] = '';
      },
      changesort() {
        // var val = $("#sort").val();
        // this.sort = (val == "默认排序" ? 'createdAt' : (val == "价格升序" ? 'mu_price' : (val == "最近发布" ? 'createdAt' : '')))
        //  this.sort=
      },
      // 筛选总控制变量赋值
      mu_change(wheres, item, e, who) {
        let that = this;
        console.log(123)
        if ($(e.currentTarget).attr('isclick') == '-1') {
          $(who).attr('isclick', '-1');
          that.where[wheres] = item;
          $(e.currentTarget).attr('isclick', '1')
        } else {
          $(who).attr('isclick', '-1');
          that.where[wheres] = '';
          $(e.currentTarget).attr('isclick', '-1')
        }

      },
      mu_same() {
        // 范围的如果只填写了一个最大或者最小值，则另外一个也默认填写一样的值
        if (this.where['mu_mj_min'] != '' && this.where['mu_mj_max'] == '') {
          this.where['mu_mj_max'] = this.where['mu_mj_min']
        }
        if (this.where['mu_mj_max'] != '' && this.where['mu_mj_min'] == '') {
          this.where['mu_mj_min'] = this.where['mu_mj_max']
        }
        if (this.where['mu_dj_min'] != '' && this.where['mu_dj_max'] == '') {
          this.where['mu_dj_max'] = this.where['mu_dj_min']
        }
        if (this.where['mu_dj_max'] != '' && this.where['mu_dj_min'] == '') {
          this.where['mu_dj_min'] = this.where['mu_dj_max']
        }
        if (this.where['mu_zg_min'] != '' && this.where['mu_zg_max'] == '') {
          this.where['mu_zg_max'] = this.where['mu_zg_min']
        }
        if (this.where['mu_zg_max'] != '' && this.where['mu_zg_min'] == '') {
          this.where['mu_zg_min'] = this.where['mu_zg_max']
        }
        if (this.where['mu_gf_min'] != '' && this.where['mu_gf_max'] == '') {
          this.where['mu_gf_max'] = this.where['mu_gf_min']
        }
        if (this.where['mu_gf_max'] != '' && this.where['mu_gf_min'] == '') {
          this.where['mu_gf_min'] = this.where['mu_gf_max']
        }
        if (this.where['mu_mc_min'] != '' && this.where['mu_mc_max'] == '') {
          this.where['mu_mc_max'] = this.where['mu_mc_min']
        }
        if (this.where['mu_mc_max'] != '' && this.where['mu_mc_min'] == '') {
          this.where['mu_mc_min'] = this.where['mu_mc_max']
        }
        if (this.where['mu_price_min'] != '' && this.where['mu_price_max'] == '') {
          this.where['mu_price_max'] = this.where['mu_price_min']
        }
        if (this.where['mu_price_max'] != '' && this.where['mu_price_min'] == '') {
          this.where['mu_price_min'] = this.where['mu_price_max']
        }
      },
      // 跳转 外带判断
      // router_go(where, other) {
      //   let that = this;
      //   if (other == null) {
      //     let _v = $(".searchI").val();
      //     other = _v;
      //   }
      //   if (other != "") {
      //     console.log(that.search_data)
      //     that.$store.state.search_where = that.search_data;
      //     this.$router.push({ name: where, params: { se: other } });
      //   }
      // },
      sousuo(isopen) {
        var that = this;
        this.mu_same();
        var datas
        // alert(this.sort)createdAt
if(this.$route.name=='no_query_search_flower'||this.$route.name=='query_search_flower'){
 datas= {
          'searchkey': this.searchkey,
          'ispublish': this.ispublish,
          'sort': this.sort== "默认排序" ? '' : (this.sort == "价格升序" ? 'mu_price' : (this.sort == "最近发布" ? '-createdAt' : 'near')),
          'page': this.page,
          'limit':limit36S,
          'city': this.where.mu_city||this.where.mu_province||'',
          'province':this.where.mu_province||'',
          'price_min':this.where.mu_price_min,
          'price_max':this.where.mu_price_max,

        }
if(this.sort=='最近距离'){
  datas['near']=JSON.stringify(that.near)
}
 if(isopen=='no'){
              location.href=URLS+'query/search_flower/'+JSON.stringify(datas)
               setTimeout(function(){
              that.$parent.pages(1);
               },1000)
        }else{
          window.open(URLS+'query/search_flower/'+JSON.stringify(datas))
        }
}else if(this.$route.name=='no_query_search_tree'||this.$route.name=='query_search_tree'){
  // alert(this.where.mu_density)
  //  alert(this.where.mu_density)
  // return
           this.where.mu_density=encodeURI(this.where.mu_density)
            datas= {
          'searchkey': this.searchkey,
          'ispublish': this.ispublish,
           'sort': this.sort== "默认排序" ? '' : (this.sort == "价格升序" ? 'mu_price' : (this.sort == "最近发布" ? '-createdAt' : 'near')),
          'page':this.page,
           'limit':limit36S,
          'where': JSON.stringify(this.where)

        }
if(this.sort=='最近距离'){
  datas['near']=JSON.stringify(that.near)
}
         if(isopen=='no'){
              location.href=URLS+'query/search_tree/'+JSON.stringify(datas)

              setTimeout(function(){
                 that.$parent.pages(1);
                //  that.where.mu_density =JSON.parse(JSON.parse(that.$route.params.queryData).where)['mu_density'].replace('%25','%');
                that.where.mu_density =JSON.parse(JSON.parse(that.$route.params.queryData).where)['mu_density'];
                // alert(that.where.mu_density)
              },1000)
        }else{
          window.open(URLS+'query/search_tree/'+JSON.stringify(datas))
        }
}






      }
    },
    mounted: function () {

      var that = this;
      // 获取经纬度
    var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
        that.near={'latitude':+r.point.lat,'longitude':r.point.lng}
        console.log('::::::'+that.near)
          console.log(that.near)
         console.log('::::::'+r.point)
           console.log(r.point)
			// alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			// alert('failed'+this.getStatus());
		}
	},{enableHighAccuracy: true})




      //  全国城市级联列表 省市
      $.get(this.$store.state.v2 + "/cities.json", function (data) {
        console.log(data)
        that.mu_quyu_list = data;
        for (var item in data) {
          //  console.log(item + ':' + data[item]);
          that.mu_quyu_province.push(item)
        }
        //  = data
      })




      // 获取搜索记录到localStorage
      // this.searchkey = this.$route.params.se;
      // var searchQuery =this.$route.params.queryData
      // var search =this.$route.params.se
      // 说明首页不带关键字过来的
      // if (this.$route.name=='no_query_search_tree'&&searchQuery!='no') {console.log(1)
      //   this.where = JSON.parse(JSON.parse(this.$route.params.queryData).where);
      //   this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
      //   var bb=JSON.parse(this.$route.params.queryData).sort
      //   this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));

      //   // this.where.mu_density =JSON.parse(JSON.parse(this.$route.params.queryData).where)['mu_density'].replace('%25','%');
      //   // this.where.mu_density =JSON.parse(JSON.parse(this.$route.params.queryData).where)['mu_density'];
      // }else if(this.$route.name=='no_query_search_tree'&&searchQuery=='no'){console.log(2)

      // }else if(this.$route.name=='query_search_tree'&&searchQuery!='no'){console.log(3)
      //   // 说明首页传了关键字过来
      //   this.where = JSON.parse(JSON.parse(this.$route.params.queryData).where);
      //   this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
      //   var bb=JSON.parse(this.$route.params.queryData).sort
      //   // this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb==''?'默认排序':'最近距离')));
      //    this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));
      //   // this.where.mu_density =JSON.parse(JSON.parse(this.$route.params.queryData).where)['mu_density'].replace('%25','%');
      //   //  this.where.mu_density =JSON.parse(JSON.parse(this.$route.params.queryData).where)['mu_density'];
      // }else if(this.$route.name=='query_search_tree'&&searchQuery=='no'){console.log(4)
      //   // this.searchkey =this.$route.params.se;
      // }


 this.searchkey = this.$route.params.se;
var searchQuery =this.$route.params.queryData
// 苗木
if ((this.$route.name=='no_query_search_tree'&&searchQuery!='no')||(this.$route.name=='query_search_tree'&&searchQuery!='no')) {console.log(1)
        this.where = JSON.parse(JSON.parse(this.$route.params.queryData).where);
        this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
        var bb=JSON.parse(this.$route.params.queryData).sort
        this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));
      }
// 花卉
if ((this.$route.name=='no_query_search_flower'&&searchQuery!='no')||(this.$route.name=='query_search_flower'&&searchQuery!='no')) {
        this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
        this.where['mu_price_min']=JSON.parse(this.$route.params.queryData).price_min
        this.where['mu_price_max']=JSON.parse(this.$route.params.queryData).price_max
         this.where['mu_province']=JSON.parse(this.$route.params.queryData).province
         this.where['mu_city']=JSON.parse(this.$route.params.queryData).city
         var bb=JSON.parse(this.$route.params.queryData).sort
         this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));
      }





//  if (this.$route.name=='no_query_search_flower'&&searchQuery!='no') {
//         this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
//         this.where['mu_price_min']=JSON.parse(this.$route.params.queryData).price_min
//         this.where['mu_price_max']=JSON.parse(this.$route.params.queryData).price_max
//          this.where['mu_province']=JSON.parse(this.$route.params.queryData).province
//          this.where['mu_city']=JSON.parse(this.$route.params.queryData).city
//          var bb=JSON.parse(this.$route.params.queryData).sort
//         //  this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb==''?'默认排序':'最近距离')));
//          this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));
//         console.log(1)
//       }else if (this.$route.name=='no_query_search_flower'&&searchQuery=='no') {
//         console.log(2)
//       }else if(this.$route.name=='query_search_flower'&&searchQuery!='no'){
//         // 说明首页传了关键字过来
//          this.searchkey =JSON.parse(this.$route.params.queryData).searchkey;
//         this.where['mu_price_min']=JSON.parse(this.$route.params.queryData).price_min
//         this.where['mu_price_max']=JSON.parse(this.$route.params.queryData).price_max
//          this.where['mu_province']=JSON.parse(this.$route.params.queryData).province
//          this.where['mu_city']=JSON.parse(this.$route.params.queryData).city
//          var bb=JSON.parse(this.$route.params.queryData).sort
//         // this.sort = (bb=='mu_price'?'价格升序':(bb=='createdAt'?'最近发布':'最近距离'));
//          this.sort = (bb=='mu_price'?'价格升序':(bb=='-createdAt'?'最近发布':(bb=='near'?'最近距离':'默认排序')));
//         console.log(3)
//       }else if(this.$route.name=='query_search_flower'&&searchQuery=='no'){console.log(4)
//         this.searchkey =this.$route.params.se;

//       }







    }



  }

</script>

<style lang="less" scoped>
  .search_list {

    /*border:1px solid red;*/
    width: 400px;
  }

  .search_list {
    &>span:nth-of-type(1) {
      /*border:1px solid red;*/
      display: inline-block;
      width: 80px;
    }
  }
</style>
