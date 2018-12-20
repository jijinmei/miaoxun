
// 获取地址栏所有的参数

var subs = ()=>{
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
var token = "a01da80b0dda0d0b72113c13ef1c23dab4bd2ae5";
var el_init = ()=>{
    // $(".chat_btn+div>div:nth-of-type(1)>div:nth-of-type(1)>img").attr("src",window.user.avatar.url);//消息框的当前登录用户的头像
    // $(".chat_btn+div>div:nth-of-type(1)>p:nth-of-type(1)").text(window.user.nickname);//消息框的当前登录用户的名字
    $("#chat_img").attr("src",window.user.avatar.url);//消息框的当前登录用户的头像
    $("#chat_p").text(window.user.nickname);//消息框的当前登录用户的名字
    // window.user.objectId
    realtime.createIMClient(window.user.objectId).then(function(uu){
        window.parent.uu = uu;
        window.uu = uu;
        window.list = uu.getQuery();
        list = list.limit(1000);
        // console.log(list)

        // 接受事件
        uu.on(AV.Event.MESSAGE,function(message,conversation){


            console.log("触发监听事件",message);
            if(message.from==window.order_user.objectId){
                var jq = $(`<div class="room_left"><div><img src="${order_user.avatar.url}"></div><span>${message._lctext}</span></div>`);
                $(".center").append(jq);
                $(".center").scrollTop(50000);
            }else{

            }
            window.get_left_his();
        })

        //未读事件
        uu.on(AV.Event.UNREAD_MESSAGES_COUNT_UPDATE,function(_cc){
            // 未读事件
            console.log("未读事件",_cc)
            // for(let conv of _cc) {
            //     console.log(conv)
            //     console.log(conv.id, conv.name, conv.unreadMessagesCount);
            //   }
              window.parent.store.state.no_read = 1;
        })




        window.get_left_his();

        // return uu.createConversation({
        //     members:[order_id],
        //     name:window.user.objectId+"-room",
        //     unique: true,
        // });
    }).then(function(c){
        // console.log("1",c);
        // c.queryMessage({type:TextMessage.TYPE}).then(messages=>{
        //     console.log(messages);
        // })
        window.cc = c;
    })
}
// 获取聊天列表 左边的列表
var get_left_his = ()=>{

     uu.getQuery().limit(1000).containsMembers([window.user.objectId]).find().then(function(c) {
        // console.log(c)
        // 默认按每个对话的最后更新日期（收到最后一条消息的时间）倒序排列
        c.map(function(_c) {
            // console.log(cc)
            // console.log(cc.lastMessageAt.toString(), cc.members);
            if(1){
            //cc.members[0]!="system"&&cc.members[1]!="system"&&cc.members.length==2
                window.aj_count++;
                if(_c.members[0]!=window.user.objectId){
                    window.get_user(_c,_c.members[0]);
                }else if(_c.members[1]!=window.user.objectId){
                    window.get_user(_c,_c.members[1]);
                }
            }

        });
    }).catch(console.error.bind(console));
}
// 获取当前账号的信息 并初始化
var get_user_data = ()=>{
    window.user = JSON.parse(localStorage.getItem("user"));
    if(window.user){
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

var init_chat_box = (_user)=>{
    if(_user==""){
        _user = order_user;
    }else{
        order_user = _user;
    }
    $(".center").html("");
    this.cc.queryMessages().then(message=>{
        var text = message;
        for(var item in text){
            var direction = "right";
            var _img = this.user.avatar.url;

            if(text[item].from==_user.objectId){
                direction = "left";
                _img = _user.avatar.url;
            }
            var jq = "";
            // 是否为图片
            var is_img = text[item].constructor == AV.ImageMessage;
            if(is_img){
                jq = $(`<div class="room_${direction}"><div><img src="${_img}"></div><div><img src="${text[item].content._lcfile.url}"/></div></div>`);
                jq.click(e=>{
                    // 切换展示图片
                    $(".show_img>div:nth-of-type(1)>img").attr("src",text[item].content._lcfile.url);
                    $(".show_img").show();
                })
            }else{
                jq = $(`<div class="room_${direction}"><div><img src="${_img}"></div><span>${text[item]._lctext}</span></div>`);
            }

            $(".center").append(jq);
            $(".center").scrollTop(50000);
        }
    })


}

// 发送信息的事件
var send_msg = (send_text)=>{
    if(send_text==""){
        return;
    }

    // window.init_chat_box("");
    var jq = $(`<div class="room_right"><div><img src="${user.avatar.url}"></div><span>${send_text}</span></div>`);
    $(".center").append(jq);
    $(".center").scrollTop(50000);
    $("textarea").val("");

    cc.send(new TextMessage(send_text)).then(c=>{
        console.log("发送成功~")
        window.get_left_his();
    }).catch(console.error.bind(console));
}
var aj_count = 0;

// 获取左边的列表
var get_left_list = (c)=>{
    // c.room.quit().then(c=>{
    //     console.log(c)
    // })
    // console.log(c.room.remove("59b5f239ee920a006b008521"))
    // console.log(c.room)
    c.room.queryMessages({limit:1000}).then(msg=>{


        // console.log("左边列表信息显示")
        // console.log(msg)
        // console.log(c.user)
        // console.log(msg)
        var _msg = "";
        if(msg.length!=0){
            _msg = msg[msg.length-1]._lctext;
            if(msg[msg.length-1].constructor == AV.ImageMessage){
                _msg = "[图片]";
            }

        }
        // console.log(_msg.unreadMessagesCount)

        var last_el = ``;
        if(c.room.unreadMessagesCount!=0){
            last_el = `<div><span>${c.room.unreadMessagesCount}</span></div>`
        }
        // console.log(c.user)
        var aa = "";
        aa = c.user.avatar.url;
        var _img_path =`<div class="one_man"><div><img src="${aa}"></div><div><p>${c.user.nickname}</p><p>${_msg}</p></div><div><span>删除</span></div>${last_el}</div>`;

        var new_el = $(_img_path);
        //   切换聊天对象 .click
        new_el.click(e=>{

            window.parent.store.state.ifr = 1;

            if(order_user.objectId==c.user.objectId){
                return;
            }
            // $()
            // console.log("重新获取记录");
            // 进房 拿记录
            return uu.createConversation({
                members:[c.user.objectId],
                name:window.user.objectId+"-"+c.user.objectId,
                unique:true,
            }).then(_cc=>{
                // console.log("进房成功")
                // 标记已读
                if(c.room.unreadMessagesCount!=0){
                    _cc.read().then(function(_cc) {
                        $(e.currentTarget).children("div:nth-of-type(4)").remove();
                        // console.log('对话已标记为已读');
                    }).catch(console.error.bind(console));
                }



                $(".top").html(`<span>${c.user.nickname}</span>`);
                window.cc = _cc;
                window.init_chat_box(c.user);
            })
        })
        new_el.children("div:nth-of-type(3)").click(e=>{
            c.room.quit(user.objectId);
            window.get_left_his();
        })

        // new_el.mouseenter(e=>{
        //     $(e.currentTarget).children("div:nth-of-type(3)").show();
        // })

        // new_el.mouseleave(e=>{
        //     $(e.currentTarget).children("div:nth-of-type(3)").hide();
        // })

        $("#chat_man").append(new_el);

        $(".center").scrollTop(50000);
    })


}



// 通过id获取信息并插入到数组里 用于获取最近聊天的列表
var get_user = (c,oid)=>{
    let that = this;
    $.ajax({
        url:"http://stg-m1-ymboss.leanapp.cn/boss/user/"+oid,
        data:{sessiontoken:window.token},
        type:"GET",
        success:(data)=>{
            --window.aj_count;

            var _data = {room:c,history:[],user:data.results};
            var tt = true;
            for(var key in window.user_now_list){
                if(window.user_now_list[key].user.objectId == data.results.objectId){
                    tt = false;
                }
            }
            if(tt){
                window.user_now_list[c.id] = _data;
            }

            if(window.aj_count == 0){
                // console.log("名字识别完毕")

                var els = "";
                $("#chat_man").html("");

                for(var key in window.user_now_list){
                    var _user = user_now_list[key];

                    var _msg = "";
                    try {
                        window.get_left_list(user_now_list[key]);
                    } catch (error) {
                        console.log(error)
                    }
                }
                setTimeout(()=>{
                    window.parent.store.state.news_bool = true;
                },1000)
            }
        },
        error:(err)=>{
            console.log(err);
        }
    })
}

$(function(){
    {

        // 给收回按钮添加事件
        $(".chat_btn+div>div:nth-of-type(2)").click(e=>{
            var ee = $(e.currentTarget);
            var _span = ee.children("span");
            if(window.parent.store.state.ifr == 1){
                _span.text("展开");
                window.parent.store.state.ifr = 0;
            }else{
                _span.text("收回");
                window.parent.store.state.ifr = 1;
            }
        })

        $(".show_img > div:nth-of-type(2)").click(e=>{
            $(".show_img").hide();
        })

        $(".fls").change(e=>{
            if(e.target.files.length!=0){
                var file = new AV.File('avatar.jpg',e.target.files[0]);
                // console.log(file)

                // send_msg(new ImageMessage(file));
                file.save().then(()=>{
                    var _msg = new AV.ImageMessage(file);

                    cc.send(_msg).then(c=>{
                        var jq = $(`<div class="room_right"><div><img src="${user.avatar.url}"></div><div><img src="${_msg._file.attributes.url}"/></div></div>`);
                        jq.click(e=>{
                            // 切换展示图片
                            $(".show_img>div:nth-of-type(1)>img").attr("src",_msg._file.attributes.url);
                            $(".show_img").show();
                        })
                        $(".center").append(jq);
                        $(".center").scrollTop(50000);
                        window.get_left_his();
                    }).catch(console.error.bind(console));
                }).catch(console.error.bind(console))

            }
        })

        $(".bottom>div:nth-of-type(1)").click(e=>{
            $(".fls").click();
        })

        // 列表添加事件
        $(".chat_btn+div+div").mouseenter((e)=>{
            // $(e.currentTarget).addClass("over_y");
        })
        $(".chat_btn+div+div").mouseleave((e)=>{
            // $(e.currentTarget).removeClass("over_y");
        })


        window.get_user_data();
        $(".chat_btn").hide();
        $(".chat_btn").click((e)=>{
            $(e.currentTarget).hide();
            $(".chat_btn+div").show();
        });
        $(".bottom>textarea").keyup((e)=>{
            var ee = $(e.currentTarget);
            if(e.keyCode==13){

            }
        })
        $(".bottom>span").click(()=>{
            // console.log($(".bottom>textarea").val());
            window.send_msg($(".bottom>textarea").val());
        })

    }

})

