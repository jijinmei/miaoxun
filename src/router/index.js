import Vue from 'vue'
import Router from 'vue-router'
// 首页和聊天框
const mehome = resolve => require(['@/components/home/mehome'], resolve);
const no_query_search_news = resolve => require(['@/components/query/search_news'], resolve);
// 苗木
const query_search_tree = resolve => require(['@/components/query/search_tree'], resolve);
const no_query_search_tree = resolve => require(['@/components/query/search_tree'], resolve);
const query_tree = resolve => require(['@/components/query/trees'], resolve);
// 花卉
const query_search_flower = resolve => require(['@/components/query/search_flower'], resolve);
const no_query_search_flower = resolve => require(['@/components/query/search_flower'], resolve);
const query_flower = resolve => require(['@/components/query/flowers'], resolve);
// 园林
const query_search_yuanlin = resolve => require(['@/components/query/search_yuanlin'], resolve);
const no_query_search_yuanlin = resolve => require(['@/components/query/search_yuanlin'], resolve);
const yuanlinX = resolve => require(['@/components/query/yuanlinX'], resolve);
// 采购
const no_query_search_caigou = resolve => require(['@/components/query/search_caigou'], resolve);
const query_search_caigou = resolve => require(['@/components/query/search_caigou'], resolve);
const caigouX = resolve => require(['@/components/query/search_caigouX'], resolve);
// 清场
const query_search_clear = resolve => require(['@/components/query/search_clear'], resolve);
const no_query_search_clear = resolve => require(['@/components/query/search_clear'], resolve);
const clearX = resolve => require(['@/components/query/search_clearX'], resolve);
// 招租转让
const query_search_rent = resolve => require(['@/components/query/search_rent'], resolve);
const no_query_search_rent = resolve => require(['@/components/query/search_rent'], resolve);
const rentX = resolve => require(['@/components/query/search_rentX'], resolve);
// 招聘
const query_search_jobZ = resolve => require(['@/components/query/search_jobZ'], resolve);
const no_query_search_jobZ = resolve => require(['@/components/query/search_jobZ'], resolve);
const query_search_jobZx = resolve => require(['@/components/query/search_jobZx'], resolve);
// 求职
const query_search_jobQ = resolve => require(['@/components/query/search_jobQ'], resolve);
const no_query_search_jobQ = resolve => require(['@/components/query/search_jobQ'], resolve);
const query_search_jobQx = resolve => require(['@/components/query/search_jobQx'], resolve);
// 吊运车辆
const query_search_car = resolve => require(['@/components/query/search_car'], resolve);
const no_query_search_car = resolve => require(['@/components/query/search_car'], resolve);
const carX = resolve => require(['@/components/query/search_carX'], resolve);
// 苗圃场
const query_ground = resolve => require(['@/components/query/ground'], resolve);

Vue.use(Router)


export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/', redirect: '/mehome', name: "mehomes", components: mehome,
      meta: {
        isUseCache: false,  // 这个字段的意思稍后再说
        keepAlive: false  // 通过此字段判断是否需要缓存当前组件
      }
    },

    {
      path: '/mehome', name: 'mehome', component: mehome,
      meta: {
        isUseCache: false,  // 这个字段的意思稍后再说
        keepAlive: false  // 通过此字段判断是否需要缓存当前组件
      }
    },


    {
      path: '/', name: 'main', component: require('../components/home/main'), children: [
        {
          path: '/home', name: 'home', component: require('../components/home/home'),
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        {
          path: '/phone', name: 'phone', component: require('../components/home/phone'),
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        }
      ]
    },
    {
      path: '/query', name: 'query', component: require('../components/query/query'), children: [


        // 聊天框
        {
          path: '/query/search_news/:queryData', name: 'no_query_search_news', component: no_query_search_news,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看苗木不含关键字
        {
          path: '/query/search_tree/:queryData', name: 'no_query_search_tree', component: no_query_search_tree,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: true // 通过此字段判断是否需要缓存当前组件

          }

        },
        // 查看苗木含关键字
        {
          path: '/query/search_tree/:se/:queryData', name: 'query_search_tree', component: query_search_tree,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: true  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看苗木详细
        {
          path: '/query/tree/:id', name: 'query_tree', component:query_tree,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },

        // 查看花卉不含关键字
        {
          path: '/query/search_flower/:queryData', name: 'no_query_search_flower', component: no_query_search_flower,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看花卉含关键字
        {
          path: '/query/search_flower/:se/:queryData', name: 'query_search_flower', component: query_search_flower,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看花卉详细
        {
          path: '/query/flower/:id', name: 'query_flower', component:query_flower,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看园林不含关键字
        {
          path: '/query/search_yuanlin/:queryData', name: 'no_query_search_yuanlin', component: no_query_search_yuanlin,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看园林含关键字
        {
          path: '/query/search_yuanlin/:se/:queryData', name: 'query_search_yuanlin', component: query_search_yuanlin,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看园林详细
        {
          path: '/query/yuanlinX/:objectId', name: 'yuanlinX', component: yuanlinX,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },

        // 查看采购不含关键字
        {
          path: '/query/search_caigou/:queryData', name: 'no_query_search_caigou', component: no_query_search_caigou,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看采购含关键字
        {
          path: '/query/search_caigou/:se/:queryData', name: 'query_search_caigou', component: query_search_caigou,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看采购详细
        {
          path: '/query/caigouX/:objectId', name: 'caigouX', component: caigouX,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看清场不含关键字
        {
          path: '/query/search_clear/:queryData', name: 'no_query_search_clear', component: no_query_search_clear,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看清场含关键字
        {
          path: '/query/search_clear/:se/:queryData', name: 'query_search_clear', component: require('../components/query/search_clear'),
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看清场详细
        {
          path: '/query/clearX/:objectId', name: 'clearX', component: clearX,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        //查看招租转让不含关键字
        {
          path: '/query/search_rent/:queryData', name: 'no_query_search_rent', component: no_query_search_rent,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        //查看招租转让含关键字
        {
          path: '/query/search_rent/:se/:queryData', name: 'query_search_rent', component: query_search_rent,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看招租转让详细
        {
          path: '/query/rentX/:objectId', name: 'rentX', component: rentX,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看招聘不含关键字
        {
          path: '/query/search_jobZ/:queryData', name: 'no_query_search_jobZ', component: no_query_search_jobZ,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看招聘含关键字
        {
          path: '/query/search_jobZ/:se/:queryData', name: 'query_search_jobZ', component: query_search_jobZ,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看招聘详细
        {
          path: '/query/search_jobZx/:objectId', name: 'query_search_jobZx', component: query_search_jobZx,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看求职不含关键字
        {
          path: '/query/search_jobQ/:queryData', name: 'no_query_search_jobQ', component: no_query_search_jobQ,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看求职含关键字
        {
          path: '/query/search_jobQ/:se/:queryData', name: 'query_search_jobQ', component: query_search_jobQ,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看求职详情
        {
          path: '/query/search_jobQx/:objectId', name: 'query_search_jobQx', component: query_search_jobQx,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },

        // 查看吊运车辆不含关键字
        {
          path: '/query/search_car/:queryData', name: 'no_query_search_car', component: no_query_search_car
        },
        // 查看吊运车辆含关键字
        {
          path: '/query/search_car/:se/:queryData', name: 'query_search_car', component: query_search_car,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },
        // 查看吊运车辆详情
        {
          path: '/query/carX/:objectId', name: 'carX', component: carX,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        },


        // {
        //   path: '/query/flower/:id', name: 'query_flower', component: require('../components/query/flowers'),
        //   meta: {
        //     isUseCache: false,  // 这个字段的意思稍后再说
        //     keepAlive: false  // 通过此字段判断是否需要缓存当前组件
        //   }
        // },
        // {path:'/query/ground1/:id',name:'query_ground1',component:require('../components/query/ground1')}


// 查看苗圃场
        {
          path: '/query/ground/:id', name: 'query_ground', component:query_ground,
          meta: {
            isUseCache: false,  // 这个字段的意思稍后再说
            keepAlive: false  // 通过此字段判断是否需要缓存当前组件
          }
        }

      ]
    },
// 还没重做
    // {
    //   path: '/:id', name: 'personal', component: require("../components/personal/index"), children: [
    //     {
    //       path: '/:id/favList', name: 'favList', component: require('../components/personal/favorite/list')
    //       , children: [
    //         {
    //           path: '/:id/favList/tree', name: 'fav_tree', component: require('../components/personal/favorite/tree'),
    //           meta: {
    //             isUseCache: false,  // 这个字段的意思稍后再说
    //             keepAlive: false  // 通过此字段判断是否需要缓存当前组件
    //           }
    //         },
    //       ]
    //     },
    //     {
    //       path: '/:id/home', name: 'p_home', component: require('../components/personal/home'),
    //       meta: {
    //         isUseCache: false,  // 这个字段的意思稍后再说
    //         keepAlive: false  // 通过此字段判断是否需要缓存当前组件
    //       }
    //     }

    //   ]
    // },

  ],
});
