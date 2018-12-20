import Vue from 'vue'
import Vuex from 'vuex'

//登录人的个人资料
var user=''
// var sessiontoken
if(window.localStorage.getItem('user')){
  user=JSON.parse(window.localStorage.getItem('user'))
  // sessiontoken=user.sessiontoken
}
   //     // 点击头像调用对话函数
function  otherChats(item) {
  //  alert(333)
  //  return
   var that=this;
   var users=item.user;
  // alert(users.objectId)
  realtime.createIMClient(users.objectId).then(function (uu) {
    console.log("uu")
    console.log(uu)
    // 查看当前点击的头像是否和当前网页登录的人存在对话，不存在则创建一个对话，否则不创建
    // var own=JSON.parse(window.localStorage.getItem('user')).objectId
    uu.getQuery().limit(1000).addDescending('createdAt').withLastMessagesRefreshed(true).containsMembers([users.objectId,vm.$store.state.user.objectId]).find().then(function (c) {
      console.log("登录人和该联系人是否存在对话记录")
      console.log(c)
      if (c.length == 0) {
        console.log("不存在，创建")
        realtime.createIMClient(vm.$store.state.user.objectId).then(function (jerry) {
          return jerry.createConversation({
            members: [vm.$store.state.user.objectId, users.objectId],
          });
        }).then(function (conversation) {
          var CONVERSATION_ID = conversation.id;
           // 发送消息
          return conversation.send(new TextMessage('你好'));
          // now we have jerry, conversation and CONVERSATION_ID
        })
        // 对话窗口出现，并刷新左边的列表
        vm.$store.state.chat_bool = true;
        vm.$store.state.no_read = 0;
        that.el_init();
        // $('#openS').click()
        // $('.one_man[ids="' + users.objectId + '"]').click()
        var items=$('.zuobianlis[ids='+users.objectId+']').attr('items')
        that.gochat(items)

      } else {
        console.log("存在，不创建")
        // 对话窗口出现，并刷新左边的列表
        vm.$store.state.chat_bool = true;
        vm.$store.state.no_read = 0;

        that.el_init();
        // $('#openS').click()
        // $('.one_man[ids="' + users.objectId + '"]').click()
        var items=$('.zuobianlis[ids='+users.objectId+']').attr('items')
        that.gochat(items)
      }
    }).catch(console.error.bind(console));

  }).then(function (c) {

  })
}

Vue.use(Vuex)
     window.store = new Vuex.Store({
     state:{
      //  标准 快捷
      jsondata:{"company":{"主蔓长":{"name":"zmc","status":"1","unit":"cm"},"冠幅":{"name":"gf","status":"1","unit":"cm"},"几斤袋":{"name":"jgd","status":"2","unit":"斤"},"分枝数":{"name":"fzs","status":"1","unit":"枝"},"分枝级数":{"name":"fzjs","status":"2","unit":"级"},"叶片数":{"name":"yps","status":"1","unit":"片"},"土球直径":{"name":"tqzj","status":"1","unit":"cm"},"地径":{"name":"dj","status":"1","unit":"cm"},"容器直径":{"name":"yqzj","status":"1","unit":"cm"},"宽":{"name":"width","status":"1","unit":"cm"},"密度":{"name":"density","status":"2","unit":"%"},"层数":{"name":"cs","status":"1","unit":"层"},"杆数":{"name":"gs","status":"1","unit":"杆"},"枝下高":{"name":"zxg","status":"1","unit":"cm"},"每捆数量":{"name":"mksl","status":"0","unit":"捆"},"米径":{"name":"mj","status":"1","unit":"cm"},"自然高":{"name":"zg","status":"1","unit":"cm"},"苗龄":{"exception":{"name":["地被","草坪"],"unit":"月"},"name":"ml","status":"no","unit":"年"},"裸干高":{"name":"lgg","status":"1","unit":"cm"},"长":{"name":"length","status":"1","unit":"cm"}},"type":{"other":{"optional":[],"required":["冠幅","米径","地径","自然高","几斤袋"],"unit":""},"乔木":{"optional":["枝下高","土球直径","容器直径","分枝级数","层数","杆数","苗龄"],"required":["米径","地径","自然高","冠幅"],"type":["地苗","假植苗","容器苗"],"unit":"株"},"地被":{"optional":["容器直径","苗龄"],"required":["几斤袋","自然高","冠幅"],"type":["假植苗","容器苗"],"unit":"株"},"棕榈":{"optional":["裸干高","地径","分枝数","叶片数","土球直径","容器直径","苗龄"],"required":["自然高","冠幅"],"type":["地苗","假植苗","容器苗"],"unit":"株"},"灌木":{"optional":["地径","土球直径","容器直径","苗龄"],"required":["自然高","冠幅"],"type":["地苗","假植苗","容器苗"],"unit":"株"},"竹类":{"optional":["分枝数","土球直径","容器直径","苗龄"],"required":["米径","自然高"],"type":["地苗","假植苗","容器苗"],"unit":"株"},"草坪":{"optional":["长","宽","每捆数量","苗龄"],"required":["密度"],"type":["假植苗","容器苗"],"unit":"m²"},"草本植物":{"optional":["分枝数","容器直径","苗龄"],"required":["自然高","冠幅"],"type":["假植苗","容器苗"],"unit":"株"},"藤本植物":{"optional":["自然高","冠幅","容器直径","苗龄"],"required":["主蔓长"],"type":["假植苗","容器苗"],"unit":"株"}},quick:{"几斤袋":{"arr":["3斤袋","5斤袋","7斤袋","10斤袋"]},"分枝级数":{"arr":["1级","2级","3级","4级","5级"]},"密度":{"arr":["50%","55%","60%","65%","70%","75%","80%","85%","90%","95%","100%"]},"每捆数量":{"arr":["4片","5片","6片","7片","8片","9片","10片","11片","12片"]}}},
      srcc:"",
      boss:'',
      // v1:"http://stg-m1-ymboss.leanapp.cn/api/v1/",
      // v2:"http://stg-v2-ymboss.leanapp.cn",
      // v3:"http://stg-v2-ymboss.leanapp.cn/api/v1/",
       v1:"http://v2-ymboss.leanapp.cn/api/v1/",
      v2:"http://v2-ymboss.leanapp.cn",
      v3:"http://v2-ymboss.leanapp.cn/api/v1/",
      // trees:[],//搜索的树木
      show_tree:{},
      chat_bool:false,
      login_el_bool:false,//控制登录弹出框显示
      ifr:0,
      user:user,//登录人的个人资料

      chatkuang:false,//消息框的显示和隐藏
      upordown:false,//向上还是向下
      leftorright:false,//展开还是收回
      whotalking:[],//聊天记录
      peoplelist:[],//聊天记录
      whourl:'',//头像
      whoname:'',//昵称
      objectId:'',//右边对话框的当前聊天人的objectId
      keepshangpin:'no',//保存的当前需要咨询的商品信息
      nowconversation:'',//当前登录者和某个人的房间对话
      news_bool:false,//消息两个字的显示和隐藏
      isscroll:true,
      ispublish:1,//未发布，1是已发布

      searchKey:"",
      search_where:"",
      no_read:0,

      	imgUrl: [],//存放图片路径的数组  imgUp.js/225行
    tdate:[]//存放图片文本对象的数组  imgUp.js/75行

  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
     returnwhere(state,item){
      var min=item.min;
      var max=item.max;
      console.log(min,max,item)
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
  },
  mutations:{
    // returnwhere(state,item){
    //   var min=item.min;
    //   var max=item.max;
    //   console.log(min,max,item)
    //        if(min&&max){//A.只要2个都存在，则判断是否相同
    //        if(min==max){
    //         //  1.相同则取其中一个，没有连接线-
    //         return min+'cm'
    //        }else{
    //         //  2.不相同则2个都取，含有连接线-
    //          return min+'-'+max+'cm'
    //        }

    //      }else if(min){//B.只有一个存在取其中一个，没有连接线-
    //        return min+'cm'
    //      }else if(max){//B.只有一个存在取其中一个，没有连接线-
    //        return max+'cm'
    //      }
    // }

  }

})

export default window.store

