
// 获取地址栏所有的参数
// alert(2)
var subs = () => {
  var str = location.search;
  if (str[0] == "?") {
    str = str.substring(1, str.length)
  }
  var data = {};
  var _strs = str.split("&");
  _strs.forEach(function (val, index, arr) {
    var _arr = val.split("=");
    if (_arr.length == 2) {
      data[_arr[0]] = _arr[1];
    }
  })
  return data;
}

var { Query, User } = AV;
AV.init({
  appId: 'z602nHLmfmjTAPs2hmYBWMl6-gzGzoHsz',
  appKey: 'BwEzvqDzVjJ0kHr0TFIfjhrc',
  masterKey: 'cJJRwpkRaTIkpPXeAfdrOlLS',
});
// 实时消息服务
var { Realtime, TextMessage } = AV;

var realtime = new Realtime({
  appId: 'z602nHLmfmjTAPs2hmYBWMl6-gzGzoHsz',
  appKey: 'BwEzvqDzVjJ0kHr0TFIfjhrc',
  masterKey: 'cJJRwpkRaTIkpPXeAfdrOlLS',
  plugins: [AV.TypedMessagesPlugin], // 注册富媒体消息插件
});

// 要在 Web 平台中打开调试日志，请打开浏览器的控制台（console），运行以下命令：localStorage.setItem('debug', 'leancloud*,LC*');
// "59ae2b04a0bb9f00644e8284"
// var order_id = "5a93ce909f54541fa98d6541";

var user = {};
var order_user = {};
var history = [];
var user_now_list = {};
// var token = "a01da80b0dda0d0b72113c13ef1c23dab4bd2ae5";
var el_init = () => {
  // alert(window.user.avatar.url)
  //   $("#chat_img").attr("src",window.user.avatar.url);//消息框的当前登录用户的头像
  //   $("#chat_p").text(window.user.nickname);//消息框的当前登录用户的名字

  // 用户登录进应用后，获取最近的 10 个对话（包含聊天室）：对话的查询默认返回 10 个结果，若要更改返回结果数量，请设置 limit 值。
  realtime.createIMClient(window.user.objectId).then(function (uu) {
    console.log("uu")
    console.log(uu)
    window.parent.uu = uu;
    window.uu = uu;
    window.list = uu.getQuery();
    list = list.limit(1000);
     console.log("list")
    console.log(list)

    // 1.接收新消息
    uu.on(AV.Event.MESSAGE, function (message, conversation) {
      console.log("触发监听事件", message);
      console.log('Message received: ' + message, conversation);
      // if(message.from==window.order_user.objectId){//新消息的对应objectId
      //   // 左边列表的头像和名称还有接收的消息未读数量小红点
      //     var jq = $(`<div class="room_left red"><div><img src="${order_user.avatar.url}"></div><span>${message._lctext}</span></div>`);
      //     $(".center").append(jq);
      //     $(".center").scrollTop(50000);
      // }else{

      // }
      // 设置左边的消息列表
      window.get_left_his();
    })

    //2.未读事件
    uu.on(AV.Event.UNREAD_MESSAGES_COUNT_UPDATE, function (_cc) {
      // 未读事件
      console.log("未读事件", _cc)
      window.parent.store.state.no_read = 1;
    })



    // 3.没有未读消息和新消息的时候重置一下左边的列表信息
    window.get_left_his();

    // return uu.createConversation({
    //     members:[order_id],
    //     name:window.user.objectId+"-room",
    //     unique: true,
    // });
  }).then(function (c) {
    // console.log("1",c);
    // c.queryMessage({type:TextMessage.TYPE}).then(messages=>{
    //     console.log(messages);
    // })
    window.cc = c;
  })
}
// 获取聊天列表 左边的列表，用户登录进应用后，获取最近的 1000 个对话（包含聊天室）：
var get_left_his = () => {
  // 如果要查询 lm 列不为空的对话，则替换为如下：client.getQuery().exists('lm')
  uu.getQuery().exists('lm').limit(1000).withLastMessagesRefreshed(true).containsMembers([window.user.objectId]).find().then(function (c) {
    console.log("所有的对话列表数组对象")
    console.log(c)
    // 默认按每个对话的最后更新日期（收到最后一条消息的时间）倒序排列
    c.map(function (_c) {
      console.log("其中一条对话列表对象")
      console.log(_c)

      if (1) {
        window.aj_count++;
        // 对话只能有两个人，判断第几个不是当前登录者，就传不是登陆者的id去查个人信息
        if (_c.members[0] != window.user.objectId) {
          window.get_user(_c, _c.members[0]);
        } else if (_c.members[1] != window.user.objectId) {
          window.get_user(_c, _c.members[1]);
        }
      }

    });
  }).catch(console.error.bind(console));
}






// 获取当前账号的信息 并初始化
var get_user_data = () => {
  window.user = JSON.parse(localStorage.getItem("user"));
  if (window.user) {
    el_init();
    return;
  }
  // $.ajax({
  //     url:"http://stg-m1-ymboss.leanapp.cn/api/v1/user/info",
  //     type:"GET",
  //     data:{sessiontoken:window.parent.token},
  //     success:(data)=>{
  //         console.log(data);
  //         window.user = data.results;
  //         localStorage.setItem("user",JSON.stringify(window.user));
  //         el_init();
  //     },
  //     err:(err)=>{
  //         console.log(err);
  //     }
  // })
}

//把聊天记录放进dom
var init_chat_box = (_user) => {
  console.log("_user:点击的对应列表的对方的信息")
  console.log(_user)
  if (_user == "") {
    _user = order_user;
  } else {
    order_user = _user;
  }
  $("#chatS .center").html("");
 console.log("进房成功2")
        console.log(this.cc)
  this.cc.queryMessages().then(message => {
    var text = message;
    console.log("center message 对应列表的所有的聊天信息")
    console.log(message)
    for (var item in text) {
      var direction = "right";//默认为右浮动
      var _img = this.user.avatar.url;//默认为我方的头像
      console.log("this.user是我方的信息")
      console.log(this.user)

      // 通过循环获取回来的对话列表，取得里面的from以及对应列表的对方的objectId来判断，如果一样则代表当前的信息来自对方发的，所以要向左边浮动；反之，不相同，则代表信息是我方发来的，要向右边浮动
      if (text[item].from == _user.objectId) {//对方发来的
        direction = "left";//左浮动
        _img = _user.avatar.url;//查询的人的头像
      }

      var jq = "";
      // 是否为图片
      // var is_img = text[item].constructor == AV.ImageMessage;
       var is_img = text[item].content._lcfile;

      if (is_img) {
         console.log(is_img)
        jq = $(`<div class="room_${direction}"><div><img src="${_img}"></div><div><img class="cursor fangdaimg" src="${text[item].content._lcfile.url}"/></div></div>`);

        // jq.click(e => {
        //   console.log(text[item])
        //   // 切换展示图片
        //   $(".showimg").attr("src", text[item].content._lcfile.url);
        //   $(".show_img").show();
        // })
      } else {
         console.log(is_img)
        jq = $(`<div class="room_${direction}"><div><img src="${_img}"></div><span>${text[item]._lctext}</span></div>`);
      }

      $("#chatS .center").append(jq);
      $("#chatS .center").scrollTop(50000);
    }
  })


}

// 发送信息的事件
var send_msg = (send_text) => {
  if (send_text == "") {
    return;
  }

  // window.init_chat_box("");
  var jq = $(`<div class="room_right"><div><img src="${user.avatar.url}"></div><span>${send_text}</span></div>`);
  $("#chatS .center").append(jq);
  $("#chatS .center").scrollTop(50000);
  $("textarea").val("");

  cc.send(new TextMessage(send_text)).then(c => {
    console.log("发送成功~")
    window.get_left_his();
  }).catch(console.error.bind(console));
}
var aj_count = 0;//获取个人资料的请求是否已经请求完毕

// // 获取左边的列表
// var get_left_list = (c) => {
//   // console.log("压完数据后开始显示在页面上"+c.room._updatedAt)
//   // console.log(c)

//   c.room.queryMessages({ limit: 1000 }).then(msg => {
//     // console.log("left..................")
//     // console.log(c)
//   alert(c.room._updatedAt)
//     var _msg = "";
//     if (msg.length != 0) {
//       _msg = msg[msg.length - 1]._lctext;
//       if (msg[msg.length - 1].constructor == AV.ImageMessage) {
//         _msg = "[图片]";
//       }

//     }

//     var last_el = ``;
//     if (c.room.unreadMessagesCount != 0) {
//       last_el = `<div><span>${c.room.unreadMessagesCount}</span></div>`
//     }
//     // console.log(c)
//     var aa = "";
//     aa = c.user.avatar != undefined ? c.user.avatar.url : '';
//     var d = new Date(c.room._updatedAt);
//     var day = d.getFullYear() + '-' + (d.getMonth() < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 9 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
//     var _img_path = `
//         <div class="one_man" ids="${c.user.objectId}">
//               <div>
//                     <img src="${aa}">
//               </div>
//               <div>
//                     <p>${c.room._updatedAt}${c.user.nickname}</p>
//                     <p>${_msg}</p>
//               </div>
//               <div>
//                     <span>删除</span>
//               </div>
//               ${last_el}
//               <h2 class="rf f12">${day}</h2>
//         </div>`;

//     var new_el = $(_img_path);

//        $("#chatS #chat_man").append(new_el);
//     //   切换聊天对象 .click
//     new_el.click(e => {

//       window.parent.store.state.ifr = 1;

//       if (order_user.objectId == c.user.objectId) {
//         return;
//       }
//       // $()
//       // console.log("重新获取记录");
//       // 进房 拿记录
//       return uu.createConversation({
//         members: [c.user.objectId],
//         name: window.user.objectId + "-" + c.user.objectId,
//         unique: true,
//       }).then(_cc => {
//         // console.log("进房成功")
//         // 标记已读
//         if (c.room.unreadMessagesCount != 0) {
//           _cc.read().then(function (_cc) {
//             $(e.currentTarget).children("div:nth-of-type(4)").remove();
//             // console.log('对话已标记为已读');
//           }).catch(console.error.bind(console));
//         }



//         $(".top").html(`<span>${c.user.nickname}</span>`);
//         window.cc = _cc;
//         window.init_chat_box(c.user);
//       })
//     })
//     // 删除按钮
//     new_el.children("div:nth-of-type(3)").click(e => {
//       // alert(333333333)
//       c.room.quit(user.objectId);
//       window.get_left_his();
//     })

//     $("#chatS .center").scrollTop(50000);
//   })


// }


// 获取左边的列表
var get_left_list = (c) => {
  // console.log("压完数据后开始显示在页面上"+c.room._updatedAt)
  // console.log(c)
  // alert(c.room._updatedAt)
// setTimeout(function(){
  // c.room.queryMessages({ limit: 1000 }).then(msg => {
    console.log("left..................")
    console.log(c)
    var msg=c.room.lastMessage!=undefined?c.room.lastMessage.content._lctext:'';
    var types=c.room.lastMessage!=undefined?c.room.lastMessage.content._lctype:'-1'
  console.log(c.room._updatedAt)
    var _msg = "";
    if(types=='-2'){
      _msg ="[图片]";
      // alert('tu')
    }
    if(types=='-1'){
      _msg =msg;
      //  alert('wenz')
    }

    // if (msg.length != 0) {
      // _msg = msg._lctext;
    // }

    var last_el = ``;
    if (c.room.unreadMessagesCount != 0) {
      last_el = `<div><span>${c.room.unreadMessagesCount}</span></div>`
    }
    // console.log(c)
    var aa = "";
    aa = c.user.avatar != undefined ? c.user.avatar.url : '';
    var d = new Date(c.room._updatedAt);
    var day = d.getFullYear() + '-' + (d.getMonth() < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 9 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    var _img_path = `
        <div class="one_man" ids="${c.user.objectId}">
              <div>
                    <img src="${aa}">
              </div>
              <div>
                    <p><span class="none">${c.room._updatedAt}</span>${c.user.nickname}</p>
                    <p>${_msg}</p>
              </div>
              <div>
                    <span>删除</span>
              </div>
              ${last_el}
              <h2 class="rf f12">${day}</h2>
        </div>`;

    var new_el = $(_img_path);

       $("#chatS #chat_man").append(new_el);
    //   切换聊天对象 .click
    new_el.click(e => {

      window.parent.store.state.ifr = 1;

      if (order_user.objectId == c.user.objectId) {
        return;
      }
      // $()
      // console.log("重新获取记录");
      // 进房 拿记录
      // return uu.getConversation({
      //   members: [c.user.objectId],
      //   name: window.user.objectId + "-" + c.user.objectId,
      //   unique: true,
      // }).then(_cc => {
      //   console.log("进房成功")
      //   console.log(uu)
      //   // 标记已读
      //   if (c.room.unreadMessagesCount != 0) {
      //     _cc.read().then(function (_cc) {
      //       $(e.currentTarget).children("div:nth-of-type(4)").remove();
      //       // console.log('对话已标记为已读');
      //     }).catch(console.error.bind(console));
      //   }



      //   $(".top").html(`<span>${c.user.nickname}</span>`);
      //   window.cc = _cc;
      //   window.init_chat_box(c.user);
      // })
// 根据登录者信息和想要查询的人对应房间id的信息去获取对话，然后根据返回的对话信息去查找两个人之前的所有聊天内容
      return uu.getConversation(c.room.id).then(_cc => {
        console.log("进房成功")
         console.log("当前登陆者的信息")
        console.log(uu)
         console.log("当前登陆者和想要查询的人")
         console.log(_cc)
        // 标记已读
        if (c.room.unreadMessagesCount != 0) {
          _cc.read().then(function (_cc) {
            $(e.currentTarget).children("div:nth-of-type(4)").remove();
            // console.log('对话已标记为已读');
          }).catch(console.error.bind(console));
        }



        $(".top").html(`<span>${c.user.nickname}</span>`);
        window.cc = _cc;
        window.init_chat_box(c.user);
      })




    })
    // 删除按钮
    new_el.children("div:nth-of-type(3)").click(e => {
      c.room.quit(user.objectId);
      window.get_left_his();
    })

    $("#chatS .center").scrollTop(50000);
  // })
// },100)

}



// 通过id获取信息并插入到数组里 用于获取最近聊天的列表
var get_user = (c, oid) => {
  let that = this;
  console.log("通过id获取信息:::" + oid)
  $.ajax({
    url: Boss4 + "boss/user/" + oid,
    data: { sessiontoken: token },
    type: "GET",
    success: (data) => {
      --window.aj_count;
      var _data = { room: c, history: [], user: data.results };
      var tt = true;
      console.log('左边列表信息user_now_list')
      console.log(window.user_now_list)
      // 循环当前的列表数据：window.user_now_list，如果找到和当前返回数据一样的数组就返回，不需要压入数据
      for (var key in window.user_now_list) {
        if (window.user_now_list[key].user.objectId == data.results.objectId) {
          tt = false;
        }
      }
      // 如果不存在，则将当前的这条回话记录压入数组
      if (tt) {
        window.user_now_list[c.id] = _data;
      }

      //  当全部请求完毕，则开始赋值到左边的回话列表
      if (window.aj_count == 0) {
        // console.log("名字识别完毕")

        var els = "";
        $("#chat_man").html("");
        //假设有一个数组对象，根据id从小到大排序
        var lii = user_now_list
        var list = []
        console.log(lii)
        for (var item in lii) {
          var element = lii[item];
          lii[item].room._updatedAt=new Date(new Date(lii[item].room._updatedAt)).getTime();
          list.push(element)

        }
        // var list = user_now_list
        //定义一个函数
        function compare(pro) {
          return function (obj1, obj2) {
            // var val1 = new Date(new Date(obj1[pro]._updatedAt)).getTime();
            // var val2 = new Date(new Date(obj2[pro]._updatedAt)).getTime();
            var val1 = obj1[pro]._updatedAt
            var val2 = obj2[pro]._updatedAt
            console.log(val1, val2)
            return val2 - val1;     // 升序
          }
        }
        //使用方法
        list.sort(compare("room"));
        console.log("list")
        console.log(list)//[{},{},{}]
        var hh={}
        for (var ss = 0; ss < list.length; ss++) {
          hh[ss]=list[ss];
           console.log("更新时间"+hh[ss].room._updatedAt)

        }
        user_now_list=hh;
        // window.user_now_list是当前的列表数据
        for (var key in user_now_list) {
          var _user = user_now_list[key];
          var _msg = "";
          // try {
            window.get_left_list(user_now_list[key]);
          // } catch (error) {
          //   console.log(error)
          // }
        }
        setTimeout(() => {
          window.parent.store.state.news_bool = true;
        }, 1000)
      }
    },
    error: (err) => {
      console.log(err);
    }
  })
}

$(function () {
  {
    // 给收回按钮添加事件
    $(document).on('click', '#openS', function (e) {
      if (vm.$store.state.ifr == 1) {
        $("#chatS #openS").text("展开");
        vm.$store.state.ifr = 0;
      } else {
        $("#chatS #openS").text("收回");
        vm.$store.state.ifr = 1;
      }
    })

    $(document).on('click', '#show_img2', function (e) {
      $("#chatS .show_img").hide();
    })

    // 发送消息的input按钮
    $(document).on('change', '.fls', function (e) {
      //  alert(3333333)
      // alert(e.target.files.length)
      if (e.target.files.length != 0) {
        //  alert(20)
        var file = new AV.File('avatar.jpg', e.target.files[0]);
        file.save().then(() => {
          var _msg = new AV.ImageMessage(file);

          cc.send(_msg).then(c => {
            var jq = $(`<div class="room_right"><div><img src="${user.avatar.url}"></div><div><img src="${_msg._file.attributes.url}"/></div></div>`);
            jq.click(e => {
              // 切换展示图片
              $(".show_img>div:nth-of-type(1)>img").attr("src", _msg._file.attributes.url);
              $(".show_img").show();
            })
            $("#chatS .center").append(jq);
            $("#chatS .center").scrollTop(50000);//列表内容回到顶部
            window.get_left_his();
          }).catch(console.error.bind(console));
        }).catch(console.error.bind(console))

      }
    })
    // 点击图片的，不需要点击发送按钮，直接发送
    $(document).on('click', '#sendTu', function (e) {
      $("#sendNew").click();
      // $(".fls").click();
      // alert(10)
    })

    $(document).on('mouseenter', '.chat_btn+div+div', function (e) {
      // $(e.currentTarget).addClass("over_y");
    })

    $(document).on('mouseleave', '.chat_btn+div+div', function (e) {
      // $(e.currentTarget).removeClass("over_y");
    })
    window.get_user_data();
    $(".chat_btn").hide();

    $(document).on('click', '.chat_btn', function (e) {
      $(e.currentTarget).hide();
      $(".chat_btn+div").show();
    })

    $(document).on('keyup', '.bottom>textarea', function (e) {
      var ee = $(e.currentTarget);
      if (e.keyCode == 13) {

      }
    })

    // 发送按钮，针对直接发送文字
    $(document).on('click', '#sendNew1', function (e) {
      window.send_msg($(".bottom>textarea").val());
    })



    // 点击聊天内容的图片放大预览
       $(document).on('click', '.fangdaimg', function (e) {
            $(".showimg").attr("src", $(e.currentTarget).attr('src'));
            $(".show_img").show();
    })
           // jq.click(e => {
        //   console.log(text[item])
        //   // 切换展示图片
        //   $(".showimg").attr("src", text[item].content._lcfile.url);
        //   $(".show_img").show();
        // })

  }

})



//     // 点击头像调用对话函数
function otherChats(users) {
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
          // now we have jerry, conversation and CONVERSATION_ID
        })
        // 对话窗口出现，并刷新左边的列表
        vm.$store.state.chat_bool = true;
        vm.$store.state.no_read = 0;
        el_init();
        $('#openS').click()
        $('.one_man[ids="' + users.objectId + '"]').click()

      } else {
        console.log("存在，不创建")
        // 对话窗口出现，并刷新左边的列表
        vm.$store.state.chat_bool = true;
        vm.$store.state.no_read = 0;
        el_init();
        $('#openS').click()
        $('.one_man[ids="' + users.objectId + '"]').click()
      }
    }).catch(console.error.bind(console));

  }).then(function (c) {

  })
}
