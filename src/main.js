// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import './assets/js/jquery-1.11.3.js'
import './assets/js/swiper.jquery.js'


import router from './router'
import store from './store/store';

// 1.viewer
import Viewer from 'v-viewer'
// import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})
//Vue.use(Viewer) 默认配置写法



//2.vue-photo-preview
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview
// ,{
//    zoomEl: true//图片上的放大缩小放大镜
//   // mainClass: 'pswp--minimal--dark',
//   // barsSize: {top: 0, bottom: 0},
//   // captionEl: false,
//   // fullscreenEl: true,//全屏按钮
//   // tapToClose: false,
//   // // shareEl: true,//分享按钮
//   // zoomEl: true,//图片上的放大缩小放大镜
//   // bgOpacity: 0.85,//背景透明度
//   // clickToCloseNonZoomable: true,
//   // indexIndicatorSep: ' / ',
//   // tapToToggleControls: false
// }
// )


// import _ from 'lodash'//第三方库
Vue.config.productionTip = false

  router.beforeEach((to, from, next) => {
      next();
      $("body").removeAttr("style");
      // store.state.srcc=location.href.indexOf(":2300")!=-1?"":"../";
      //  store.state.srcc=location.href.indexOf(":2300")!=-1?"":"./new/";
  })

window.vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 给苗木信息添加上下两条展示详细信息字段
// window.makeshowstr =(tree)=>{
//       let jsondd= window.store.state.jsondata;
//       var that = this;
//       var str = [];
//       var ttype=tree.mu_type;
//       if(tree.mu_plant_type==undefined){
//         ttype = "other";
//       }
//       var data = jsondd.type[ttype];
//       // 计算够不够4条详细信息
//       var count = 0;
//       var data_Arr = ["required","optional"];
//       for(var i = 0 ;i < data_Arr.length;i++){
//         $.each(data[data_Arr[i]],function(indexx){
//           let len = str.length;
//           if(count==3){
//             tree["showstr"] = str;
//             return;
//           }
//           var zd = jsondd.company[this];
//           var xb = parseInt(count/2);
//           // 判断该字段是否为范围
//           if(parseInt(zd.status)!=1){
//             var tt = tree["mu_"+zd.name];
//             if(tt!=""&&tt!=undefined){
//               str[len] = this+":"+tt;
//               if( zd.status==0){
//                 str[len] =zd.unit;
//               }
//               count++;
//             }
//           }else
//           // 是范围
//           if(zd.status==1){
//             var min = tree["mu_"+zd.name+"_min"];
//             var max = tree["mu_"+zd.name+"_max"];
//             if(min!=""&&min!=undefined){
//               if(min!=max){
//                 str[len] = this+":"+min+"-"+max+zd.unit;
//               }else{
//                 str[len] = this+":"+min+zd.unit;
//               }
//               count++;
//             }
//           }
//         })
//       }
//     tree["showstr"] = str;

// }


// window.tree_prop = (trees)=>{
//   let that = this;
//   let _ = trees;
//   let _json = window.store.state.jsondata;
//   _.forEach(function(val){
//     let _type = _json.type[val.mu_type];
//     let _required = "必填项：";
//     let _optional = "选填项：";
//     let _arr_type = ["required","optional"];
//     for(let i = 0 ; i < _arr_type.length ; i++){
//       _type[_arr_type[i]].forEach(function(val1){
//         let _att = _json.company[val1];
//         let _str = "";
//         if(_att.status==1&&val["mu_"+_att.name+"_min"]){
//           let _min = val["mu_"+_att.name+"_min"];
//           let _max = val["mu_"+_att.name+"_max"];
//           if(_min!=_max){
//             _str = val1 + ":" + _min + "-" + _max + _att.unit + ",";
//           }else{
//             _str = val1 + ":" + _min + _att.unit + ",";
//           }
//         }else
//         if(_att.status==2&&val["mu_"+_att.name]){
//           _str = val1 + ":" + val["mu_"+att.name];
//         }
//         if(_att.status=="no"){
//           let _unit = "";
//           if(JSON.stringify(_att.exception.name).indexOf(val.mu_type)!=-1){
//             _unit = _att.exception.unit;
//           }else{
//             _unit = _att.unit;
//           }
//           let _min = val["mu_"+_att.name+"_min"];
//           let _max = val["mu_"+_att.name+"_max"];
//           if(_min){
//             if(_min!=_max){
//               _str = val1 + ":" + _min + "-" + _max + unit + ",";
//             }else{
//               _str = val1 + ":" + _min + unit + ",";
//             }
//           }
//         }
//         if(i == 0){
//           _required += _str;
//         }else{
//           _optional += _str;
//         }
//       })
//     }
//     val.required = _required;
//     val.optional = _optional;
//   })
// }




// 自定义全局方法：单位尺寸函数
Vue.prototype.funcSize = function (min,max){
  // console.log('执行成功'+min,max);
           if(min&&max){//A.只要2个都存在，则判断是否相同
           if(min==max){
            //  1.相同则取其中一个，没有连接线-
            return min+'cm'
           }else{
            //  2.不相同则2个都取，含有连接线-
             return min+'-'+max+'cm'
           }

         }else if(min){//B.只有一个存在取其中一个，没有连接线-
           return min+'cm'
         }else if(max){//B.只有一个存在取其中一个，没有连接线-
           return max+'cm'
         }

}
//  // 错误提示框
// Vue.prototype.layuiError=function(data){
//    layer.msg('data.err.message');
//    return
//                 // layui.use('layer', function () {
//                 //   var layer = layui.layer;
//                 //   layer.msg(data.err.message);
//                 // });
//     }



