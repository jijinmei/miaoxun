<template>
  <!--:style="{height:upordown==true?'665px':'0px'}" -->
  <div @mouseenter="enterss()" @mouseleave="leavess()" >
    <div style="display:none;">{{watch}}</div>
    <div style="width: 1090px;" class="fixed B00 z_1000 fixeds" v-show="chatkuang==true" :class="{zhankai:leftorright==false,shouhui:leftorright==true}">

      <!--A左边列表-->
      <div class="w290 lf bg2E3238 white">
        <!--1.当前登录人的头像和昵称-->
        <div class="h110">
          <div class="h65 relative">
            <div   class="w40 h40 overflow czjz L10">
              <img :src="user.avatar.url+image40||''" alt="" class="w100s" v-if="user.avatar!=undefined">
            </div>
            <span class="czjz L60">{{user.nickname}}</span>
          </div>
          <div class="pL10 f16 cursor w100 inline" id="leftorright" @click="leftorrights">{{leftorright?'展开':'收回'}}</div>
          <div class="f16 cursor inline rf w50" @click="closes">关闭</div>
        </div>
        <!--2.具体的聊天联系人-->
        <ul class="h556 block ull" style="border-top:1px solid black;overflow-y:scroll;">
          <!--<li v-for="(item,index) in peoplelist" >{{item.user}}</li>-->
            <li :class="{bg36c748:item.user.objectId==objectId}" @click="gochat(item,'kong')" v-if="peoplelist.length>0" v-for="(item,index) in peoplelist" :ids="item.user.objectId"
            :items="item" class="zuobianlis pL18 pR18 pT12 pB12 h45 block relative cursor" style="border-bottom:1px solid #292C33;">
          <!--<li :class="{bg36c748:item.user.nickname==whoname&&item.user.nickname!=''&&item.user.nickname!=undefined}" @click="gochat(item,'kong')" v-if="peoplelist.length>0" v-for="(item,index) in peoplelist" :ids="item.user.objectId"
            :items="item" class="zuobianlis pL18 pR18 pT12 pB12 h45 block relative cursor" style="border-bottom:1px solid #292C33;">-->
            <div class="w40 h40 overflow radius05 bai">
              <img onerror="onerror=null;src='/static/img/common/heads.png'" :src="item.user.avatar!=undefined?item.user.avatar.url:''"
                alt="" class="w100s">
            </div>
            <!--<div><span>${c.room.unreadMessagesCount}</span></div>-->
            <span class="absolute L49 T05 f12 pT01 pB01 pL04 pR04 radius05" style="background:red;" v-show="item.room.unreadMessagesCount>0">{{item.room.unreadMessagesCount}}</span>
            <span class="absolute L70 T14">{{item.user.nickname}}</span>
            <span class="absolute L70 T33 f13 c6F7173 w210 overflow h20">{{item.room.lastMessage==undefined?'':(item.room.lastMessage.content._lctype=='-2'?"[图片]":item.room.lastMessage.content._lctext)}}</span>
            <span class="absolute R18 B03 f12">{{returns(item.room._updatedAt)}}</span>
          </li>
        </ul>
      </div>




      <!--B右边内容-->
      <div class="rf bgeeeeee relative" style="width:800px;">
        <!--1.苗木咨询的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.mu_name!=undefined">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.mu_photo[0].url+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.mu_name}}</p>
              <p class="f15">{{keepshangpin.mu_plant_type||keepshangpin.mu_type}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.mu_name,keepshangpin.mu_type)">发送链接</button>
          </div>
        </div>

         <!--2.花卉咨询的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.fl_name!=undefined">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.fl_photo[0].url+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.fl_name}}</p>
              <p class="f15">{{keepshangpin.fl_spec}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.fl_name,keepshangpin.fl_spec)">发送链接</button>
          </div>
        </div>


 <!--3.园林建材的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.__tbn!=undefined&&keepshangpin.__tbn=='Assets'">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.cover+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.name}}</p>
               <p class="f15">{{keepshangpin.intro}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.name,keepshangpin.intro)">发送链接</button>
          </div>
        </div>



  <!--4.清场的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.category!=undefined&&keepshangpin.category=='清场'">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.pics[0].url+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.title}}</p>
              <!--<p class="f15">{{keepshangpin.content}}</p>-->
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.title,keepshangpin.content)">发送链接</button>
          </div>
        </div>
  <!--5.采购的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.offering_type!=undefined">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.pics.length>0?keepshangpin.pics[0].url+imageview100:''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.options.fl_name||keepshangpin.options.mu_name}}</p>
              <p class="f15">{{keepshangpin.desc}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.options.fl_name||keepshangpin.options.mu_name,keepshangpin.desc)">发送链接</button>
          </div>
        </div>
  <!--6.招租转让的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.category!=undefined&&(keepshangpin.category=='招租'||keepshangpin.category=='转让')">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.pics[0].url+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.title}}</p>
              <p class="f15">{{keepshangpin.content}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.title,keepshangpin.content)">发送链接</button>
          </div>
        </div>


  <!--71.我要求职的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.__tbn!=undefined&&keepshangpin.__tbn=='JobWanted'">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.headimg||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.name}}</p>
              <p class="f15">
               期望薪资：{{keepshangpin.job_pay}}/月  学历：{{keepshangpin.education}}</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.name,'期望薪资：'+keepshangpin.job_pay+'/月  学历：'+keepshangpin.education)">发送链接</button>
          </div>
        </div>

  <!--72.我要招聘的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.__tbn!=undefined&&keepshangpin.__tbn=='Recruitment'">
          <div class="h100 relative w100s bai">
            <!--<div class="w100 h100 overflow lf relative"><img :src="keepshangpin.headimg||''" alt="" class="w100s jz"></div>-->
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.job_title}}</p>
              <p class="f15">
              <span v-for="(item,key,index) in keepshangpin.job_type">
                      <span v-for="(item1,key1,index1) in item" >
                          <span v-for="(item2,key2,index2) in item1" class="f12 pT04 pB04 pL08 pR08" >{{item2}}</span>
                          </span>
             </span>
              </p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.job_title,keepshangpin.job_intro)">发送链接</button>
          </div>
        </div>
  <!--8.工程机械的内容-->
        <div class="spjz T31 z_10" style="width:750px;" v-if="keepshangpin!='no'&&keepshangpin.classification!=undefined&&keepshangpin.classification.type!=undefined">
          <div class="h100 relative w100s bai">
            <div class="w100 h100 overflow lf relative"><img :src="keepshangpin.pics[0].url+imageview100||''" alt="" class="w100s jz"></div>
            <div class="lf w300 mL20">
              <p class="f20 bold mT15 mB05">{{keepshangpin.classification.type}}</p>
              <p class="f15">
                {{keepshangpin.classification.type=="挖机"?'吨位':(keepshangpin.classification.type=="叉车"||keepshangpin.classification.type=="汽车吊"||keepshangpin.classification.type=="随车吊"?'吊重':'')}}
                {{keepshangpin.classification.weight}}吨</p>
            </div>
            <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink(keepshangpin.classification.type,'吊重'+keepshangpin.classification.weight+'吨')">发送链接</button>
          </div>
        </div>



        <!--1.顶部标题-->
        <div class="mL25 mR25 h30 lh30 center f15 bold" style="border-bottom: 1px solid #6F7173;">{{whoname}}</div>

        <!--2.中间聊天内容-->

        <ul  @scroll="scrolls($event)" class="pL50 pR50 pB20 pT20 f15 h435 block mB30 block" style="overflow-y:scroll;" id="chatcenter">


          <li :class="{mT100:keepshangpin!='no'&&index==0}" v-for="(item,index) in whotalking" class="relative pT10 pB10 block" v-if="whotalking.length>0" style="overflow:auto;">
            <input type="text" style="width:1px;height:1px;opacity:0;" class="huoqujiaodian" v-if="index==whotalking.length-1">
            <div class="overflow w40 h40" :class="{rf:item.from==user.objectId,lf:item.from!=user.objectId}">
              <img :src="item.from==user.objectId?user.avatar.url:whourl" class="w100s">
            </div>
            <!--文字-->
            <div v-if="item.content._lctype==-1" class="pL15 pB15 pT15 pR15  mL15 mR15" style="max-width:500px;" :class="{before:item.from!=user.objectId,after:item.from==user.objectId,rf:item.from==user.objectId,lf:item.from!=user.objectId,bgB2E281:item.from==user.objectId,bai:item.from!=user.objectId}"
              v-html>
              <div v-html="return2(item.content._lctext)">

              </div>
            </div>
            <!--图片-->
            <div v-if="item.content._lctype==-2" class="h110  mL15 mR15" :class="{rf:item.from==user.objectId,lf:item.from!=user.objectId}">
              <img :src="item.content._lcfile.url" alt="" class="h100s cursor" @click="showimg(item.content._lcfile.url)">
            </div>


          </li>
          <!--<li class="w100s">
          <div class="h100 relative w100s bai">
               <div class="w100 h100 overflow lf"><img src="http://lc-z602nHLm.cn-n1.lcfile.com/380fd8c975361dc76486.jpg" alt="" class="w100s"></div>
               <div class="lf w300 mL20">
                 <p class="f20 bold mT15 mB05">国愧</p>
                 <p class="f15">地被</p>
               </div>
              <button class="layui-btn absolute B10 R10 layui-btn-radius cursor" @click="golink()">发送链接</button>
          </div>
        </li>-->
 <!--<li id="chatbottom">2222222222222</li>-->
        </ul>

        <!--底部发送消息-->
        <div class="h130 bai pL25 pR25 relative" style="border-top: 1px solid #6F7173;">
          <!--左边的上传图片小图标-->
          <div id="tuclick" @click="sendtu"><img src="/static/img/common/Img.png" class="w30 h30 cursor"></div>
          <!--输入文字框-->
          <textarea v-model="contents" name="" cols="30" rows="4" class="w100s f15 border0 h50 mB30" style="resize: none;"></textarea>
          <!--发送按钮-->
            <span id="sendbutton" @click="sendbtn" class="absolute B12 R10 f15 w60 h30 lh30 center cursor" :class="{'c777777':contents.length==0,'white':contents.length!=0,'bgeeeeee':contents.length==0,'bg36c748':contents.length!=0}">发送</span>
          <input type="file" id="sendinput" class="w00 h00" @change="changes($event)">

        </div>


      </div>
      <div class="wai_kuang" v-if="isshow==true" @click.stop="isshow=false">
        <div class="nei_kuang">
          <img :src="showimgs" alt="" class="w600">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        image40:"?imageView2/1/w/40/h/40",
        imageview100:"?imageView2/1/w/100/h/100",
        upordown: false,//上还是下
        leftorright: true,//左还是右
        isshow: false,//控制右边聊天记录里面的图片点击是否显示大图
        showimgs: '',//放大图的图片路径
        user: this.$store.state.user,
        peoplelist: this.$store.state.peoplelist,//当前左边的人员列表
        contents: '',//当前发送的消息内容
        keepshangpin: [],//当前要咨询的商品信息
        chatkuang: false,//消息框显示还是隐藏
        loadCount: 0,//判断是否循环请求完左边的联系人信息
        whoname: '',//右边对话框顶部的当前聊天人名称
        whourl: '',//右边对话框顶部的当前聊天人头像
        objectId:'',//右边对话框的当前聊天人的objectId
        nowconversation: '',//当前登录者和某个人的房间对话
        whotalking: this.$store.state.whotalking//右边对话框中部的当前聊天记录

      }
    },

    computed: {
      watch() {
        this.user= this.$store.state.user
        this.chatkuang = this.$store.state.chatkuang//消息框显示还是隐藏
        this.leftorright = this.$store.state.leftorright//左还是右
        this.whotalking = this.$store.state.whotalking//右边对话框中部的当前聊天记录
        this.peoplelist = this.$store.state.peoplelist//当前左边的人员列表
        this.upordown = this.$store.state.upordown//上还是下
        this.whoname = this.$store.state.whoname//右边对话框顶部的当前聊天人名称
         this.objectId = this.$store.state.objectId//右边对话框的当前聊天人的objectId
        this.whourl = this.$store.state.whourl//右边对话框顶部的当前聊天人头像
        this.keepshangpin = this.$store.state.keepshangpin//当前要咨询的商品信息
        this.nowconversation = this.$store.state.nowconversation//当前登录者和某个人的房间对话
      }
    },

    methods: {
       closes(){
          this.$store.state.chat_bool=false;
          this.$store.state.chatkuang=false;
       },
       enterss(){
        $('body').removeClass('scrollY').addClass('fixedY')
    },
     leavess(){
         $('body').removeClass('fixedY').addClass('scrollY')
    },

      return2(bbb) {
        var reg = /(http:\/\/|https:\/\/|www)(([\u0000-\u0019]|[\u0021-\u00FF])+)/g;
        return bbb.replace(reg, '<a  target=_blank  style="word-wrap:break-word;text-decoration:underline;color:blue;" href="$1$2">$1$2</a>');
      },
scrolls(e){
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
},
      // 登录人发送链接到lc
      golink(name,type) {
        // var html = this.keepshangpin.mu_name + '  ' + this.keepshangpin.mu_type + '  ' + encodeURI(location.href)
        var html =name + '  ' + type + '  ' + encodeURI(location.href)
        console.log(html)
        // return
        var that = this;
        //  that.contents=URL
        // if (this.contents) {
        this.nowconversation.send(new TextMessage(html)).then(c => {
          console.log("发送成功~")
          console.log(c)
          // that.contents='';
          c.content = { _lctext: c._lctext, _lctype: c.type }
          // that.whotalking.push(c)
          that.$store.state.whotalking.push(c)
          console.log(that.whotalking)
          that.gobottom()
          // window.get_left_his();
          // 从新请求左边列表更新信息
          that.get_left_peoplelist()
        }).catch(console.error.bind(console));
        // }
      },
      leftorrights() {
        this.$store.state.leftorright = (!this.$store.state.leftorright)
        //  this.leftorright=!this.leftorright
      },
      // 回到底部
      gobottom() {
        // alert(1)
        setTimeout(function(){
            //  $('#chatcenter').scrollTop($('#chatcenter')[0].scrollHeight + 500)
            $('.huoqujiaodian').focus()
        },100)
      },
      // 点击发送按钮,单独发送文字的
      sendbtn() {
        var that = this;
        if (this.contents) {
          this.nowconversation.send(new TextMessage(this.contents)).then(c => {
            console.log("发送成功~")
            console.log(c)
            that.contents = '';
            c.content = { _lctext: c._lctext, _lctype: c.type }
            // that.whotalking.push(c)
            that.$store.state.whotalking.push(c)
            console.log(that.whotalking)
            that.gobottom()
            // window.get_left_his();
            // 从新请求左边列表更新信息
            that.get_left_peoplelist()
          }).catch(console.error.bind(console));
        }
      },
      // 点击图片上传相当于点击input
      sendtu() {
        $('#sendinput').click()
      },
      // 发送图片
      changes(e) {
        var that = this;
        if (e.target.files.length != 0) {
          console.log('选择了图片')
          //  alert(20)
          var file = new AV.File('avatar.jpg', e.target.files[0]);
          file.save().then(() => {
            var pic = new AV.ImageMessage(file);
            that.nowconversation.send(pic).then(c => {
              console.log("发送成功~")
              console.log(c)
              c.content = { _lcfile: c._lcfile, _lctype: c.type }
              // that.whotalking.push(c)
              that.$store.state.whotalking.push(c)
              that.gobottom()
              // $("#chatS .center").append(jq);
              // $("#chatS .center").scrollTop(50000);
              // window.get_left_his();
              // 从新请求左边列表更新信息
              that.get_left_peoplelist()

            }).catch(console.error.bind(console));
          }).catch(console.error.bind(console))

        } else {
          console.log('没有选择图片')
        }
      },
      showimg(src) {
        this.showimgs = src;
        this.isshow = true;
      },
      gochat(item, iskong) {
         var that = this;
        console.log("item:::::;")
        console.log(item)
        that.$store.state.whotalking=[]
        that.$store.state.whoname=''//昵称
        // 切换的时候让商品咨询消失
        if (iskong) {
          this.$store.state.keepshangpin = 'no'
        }
        this.$store.state.leftorright = false;//右边对话框顶部的当前聊天人名称
        this.$store.state.whoname = item.user.nickname;
         this.$store.state.objectId = item.user.objectId;
        this.$store.state.whourl = item.user != undefined ? (item.user.avatar != undefined ? item.user.avatar.url : '') : '';

        //获取当前点击左边列表联系人的时候获取他和当前登录人的聊天内容记录
        window.dengluzhe.getConversation(item.room.id).then(conversation => {
          that.$store.state.nowconversation = conversation;
          console.log("getConversation进房成功")
          console.log("当前登陆者和想要查询的人")
          console.log(conversation)
          // 根据对话信息去查找对话记录
          conversation.queryMessages({
            limit: 1000, // limit 取值范围 1~1000，默认 20
          }).then(function (messages) {
            // 最新的十条消息，按时间增序排列
            console.log("whotalkingNow")
            console.log(messages)
            // that.whotalking = messages
            that.$store.state.whotalking = messages
            that.gobottom()
          }).catch(console.error.bind(console));

          // 标记已读
          if (item.room.unreadMessagesCount != 0) {
            conversation.read().then(function (_cc) {
              console.log('对话已标记为已读');
            }).catch(console.error.bind(console));
          }
        })

      },
      returns(updatedAt) {
        var d = new Date(updatedAt);
        var day = d.getFullYear() + '-' + (d.getMonth() < 9? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 9 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
        return day;
      },
      el_init(haha,item) {
        // alert('::::'+that.loadCount)
        var that = this;
        // 1.登录者用自己的objectId作为 clientId，获取 IMClient 对象实例
        // 用户登录进应用后，获取最近的 10 个对话（包含聊天室）：对话的查询默认返回 10 个结果，若要更改返回结果数量，请设置 limit 值。
        realtime.createIMClient(that.$store.state.user.objectId).then(function (dengluzhe) {
          console.log("dengluzhe")
          console.log(dengluzhe)
          window.dengluzhe = dengluzhe;
          // 2.左边联系人列表数据：用户登录进应用后，获取最近的 1000 个对话（包含聊天室）：
          // dengluzhe.getQuery().limit(1000);
          dengluzhe.getQuery().exists('lm').limit(1000).withLastMessagesRefreshed(true).containsMembers([that.$store.state.user.objectId]).find().then(function (conversations) {
            // 默认按每个对话的最后更新日期（收到最后一条消息的时间）倒序排列
            console.log("自己封装的vue聊天：当前登录者获取和自己对过话的全部对话")
            // 如果首次注册，没有聊天记录，则也是需要让消息两个字出现的
            if(conversations.length==0){
               // 让消息出现
              setTimeout(() => {
                vm.$store.state.news_bool = true;
              }, 500)
            }
            console.log(conversations)
            conversations.map(function (conversation1) {
              // console.log("自己封装的vue聊天：获取其中一条和自己对过话的对话")
              // console.log(conversation1)
              //  服务器回来的对话信息并没有包含用户的姓名，头像等等信息，所以要发请求根据对话id去后台查找对应的个人详细信息，找到信息后循环挂载到左边的列表联系人
              // console.log(conversation.lastMessageAt.toString(), conversation.members);
              // 返回的对话中members含有两个，其中一个是当前登陆者的id，我们要用另外一个id去后台请求个人信息
              if (1) {

                that.loadCount++;//记录请求个人信息的进度
                //  alert(that.loadCount)
                // 3.对话只能有两个人，判断第几个不是当前登录者，就传不是登陆者的id去查个人信息
                if (conversation1.members[0] != that.$store.state.user.objectId) {
                  that.get_user(conversation1, conversation1.members[0],item,haha);
                } else if (conversation1.members[1] != that.$store.state.user.objectId) {
                  that.get_user(conversation1, conversation1.members[1],item,haha);
                }
              }
            });
          }).catch(console.error.bind(console));

          // 1.接收新消息
          dengluzhe.on(AV.Event.MESSAGE, function (message, conversation) {
            console.log("接收新消息", message);
            // 设置左边的消息列表(新消息和未读消息是同时进行的，所以设置一个重置列表就行了)
            that.get_left_peoplelist(1);
          })

          //2.未读事件
          dengluzhe.on(AV.Event.UNREAD_MESSAGES_COUNT_UPDATE, function (message) {
            // 未读事件
            console.log("未读事件", message)
            vm.$store.state.no_read = 1;//出现红点未读
          })
          // 3.没有未读消息和新消息的时候重置一下左边的列表信息
          // that.get_left_peoplelist();
        }).then(function (c) {
          console.log(c)
          // window.cc = c;
        })

      },
      // 更新昨天列表联系人的信息
      get_left_peoplelist(ishas) {
        var that = this;
        window.dengluzhe.getQuery().exists('lm').limit(1000).containsMembers([that.$store.state.user.objectId]).find().then(function (conversations) {
          // 默认按每个对话的最后更新日期（收到最后一条消息的时间）倒序排列
          console.log("自己封装的vue聊天：当前登录者获取和自己对过话的全部对话")
          console.log(conversations)
          // // 接收新消息肯定会置顶，只需要把第一个默认模拟点击就行了，出现第一个的聊天记录
          // if (ishas==11) {
          //   that.gochat(that.peoplelist[0])
          // }
          conversations.map(function (conversation) {
            // console.log("自己封装的vue聊天：获取其中一条和自己对过话的对话")
            //  服务器回来的对话信息并没有包含用户的姓名，头像等等信息，所以要发请求根据对话id去后台查找对应的个人详细信息，找到信息后循环挂载到左边的列表联系人
            // console.log(conversation.lastMessageAt.toString(), conversation.members);
            // 返回的对话中members含有两个，其中一个是当前登陆者的id，我们要用另外一个id去后台请求个人信息
            if (1) {

              that.loadCount++;//记录请求个人信息的进度
              //  alert(that.loadCount)
              // 3.对话只能有两个人，判断第几个不是当前登录者，就传不是登陆者的id去查个人信息
              if (conversation.members[0] != that.$store.state.user.objectId) {
                that.get_user(conversation, conversation.members[0]);
              } else if (conversation.members[1] != that.$store.state.user.objectId) {
                that.get_user(conversation, conversation.members[1]);
              }
            }
          });
        }).catch(console.error.bind(console));


      },
      get_user(conversation, id,items,yesorno) {
        // alert(33)
        // console.log('请求后台个人资料的conversation：：：：：：：：：：')
        // console.log(conversation.lastMessage)
        // 通过id获取信息并插入到数组里 用于获取最近聊天的列表
        var that = this;
        // console.log("通过id去请求后台获取左边每个联系人的具体信息" + id)
        $.ajax({
          url: Boss4 + "boss/user/" + id,
          data: { sessiontoken: token },
          type: "GET",
          success: (data) => {
            // alert(9)
            --that.loadCount;
            var _data = { room: conversation, history: [], user: data.results };//自己构造这个形式方便查数据
            var ishas = true;
            // console.log('左边列表信息user_now_list')
            // console.log(window.user_now_list)
            // 循环当前的列表数据：window.user_now_list，如果找到和当前返回数据一样的数组就返回，不需要压入数据
            for (var key in window.user_now_list) {
              if (window.user_now_list[key].user.objectId == data.results.objectId) {
                ishas = false;
              }
            }
            // 如果不存在，则将当前的这条回话记录压入数组
            if (ishas == true) {
              window.user_now_list[conversation.id] = _data;
            }
            // alert(that.loadCount)
            //  当全部请求完毕，则开始赋值到左边的回话列表
            if (that.loadCount == 0) {
              console.log('促发了查个人嘻嘻')
                console.log(yesorno)
              var list = []
              console.log(window.user_now_list)
              for (var item in window.user_now_list) {
                var element = window.user_now_list[item];
                window.user_now_list[item].room._updatedAt = new Date(new Date(window.user_now_list[item].room._updatedAt)).getTime();
                list.push(element)
              }
              //定义一个函数
              function compare(pro) {
                return function (obj1, obj2) {
                  var val1 = obj1[pro]._updatedAt
                  var val2 = obj2[pro]._updatedAt
                  // console.log(val1, val2)
                  return val2 - val1;     // 升序
                }
              }
              //使用方法
              list.sort(compare("room"));

              console.log("自己封装的聊天左边list::::::::::::::::::::::::")
              that.peoplelist = list
              that.$store.state.peoplelist= list
              // console.log(list.length)//[{},{},{}]
              console.log(that.peoplelist)
              // console.log(that.peoplelist.length)
              var hh = {}
              for (var ss = 0; ss < list.length; ss++) {
                hh[ss] = list[ss];
                // console.log("更新时间" + hh[ss].room._updatedAt)

              }
              window.user_now_list = hh;
              if(yesorno=='yes'){
                // console.log('jingru ==yes')
                // 当前点击的是其他的组件的触发聊天框的让当前右边的记录框出现聊天记录
                for (var s = 0; s < that.$store.state.peoplelist.length; s++) {
                  //  console.log('jingru ==yes1')
                  //   console.log(that.$store.state.peoplelist[s].user.objectId,items.user.objectId)
                  if(that.$store.state.peoplelist[s].user.objectId==items.user.objectId){
                    // console.log('jingru ==yes2')
                       that.gochat(that.$store.state.peoplelist[s])
                        // 对话窗口出现，并刷新左边的列表
                        //  console.log('jingru ==yes3')
                        setTimeout(function(){
                            vm.$store.state.chatkuang = true;//出现消息框
                      vm.$store.state.chat_bool = true;//出现消息框
                      that.leftorright = false//展开还是收回
                      vm.$store.state.no_read = 0;//未读消息数量
                        },1000)
                      //  vm.$store.state.chatkuang = true;//出现消息框
                      // vm.$store.state.chat_bool = true;//出现消息框
                      // that.leftorright = false//展开还是收回
                      // vm.$store.state.no_read = 0;//未读消息数量
                  }else{
                      // vm.$store.state.chatkuang = true;//出现消息框
                      // vm.$store.state.chat_bool = true;//出现消息框
                      // that.leftorright = false//展开还是收回
                      // vm.$store.state.no_read = 0;//未读消息数量
                  }

                }

              }
              // 让消息出现
              setTimeout(() => {
                vm.$store.state.news_bool = true;
              }, 500)
            }
          },
          error: (err) => {
            console.log(err);
          }
        })

      },
      //     // 点击头像调用对话函数
      otherChats(item) {
        var that = this;
        //  把要咨询的商品保存在本地
        console.log('把要咨询的商品保存在本地')
        console.log(item)
        that.$store.state.keepshangpin = item;
        //  alert(333)
        //  return

        var users = item.user;
        // alert(users.objectId)
        realtime.createIMClient(users.objectId).then(function (uu) {
          console.log("uu")
          console.log(uu)
          // 查看当前点击的头像是否和当前网页登录的人存在对话，不存在则创建一个对话，否则不创建
          // var own=JSON.parse(window.localStorage.getItem('user')).objectId
          uu.getQuery().exists('lm').limit(1000).addDescending('createdAt').withLastMessagesRefreshed(true).containsMembers([users.objectId, vm.$store.state.user.objectId]).find().then(function (c) {
            console.log("登录人和该联系人是否存在对话记录")
            console.log(c)
            if (c.length == 0) {
              console.log("不存在，创建")

              realtime.createIMClient(vm.$store.state.user.objectId).then(function (jerry) {
                return jerry.createConversation({
                  members: [vm.$store.state.user.objectId, users.objectId],
                });
              }).then(function (conversation) {
                setTimeout(function () {
                    that.el_init('yes',item)
                     that.chatkuang =true
                  }, 1000)
                var CONVERSATION_ID = conversation.id;
                // 发送消息
                return conversation.send(new TextMessage('系统消息：聊天室已经创建，可以开始聊天啦！'));


                // now we have jerry, conversation and CONVERSATION_ID
              })




            } else {
              console.log("存在，不创建")
               that.el_init('yes',item)
            }
          }).catch(console.error.bind(console));

        }).then(function (c) {

        })
      }


    },
    mounted: function () {
      //  alert(11111)
      //  获取左边列表联系人信息0
      this.el_init('no','no')

    }
  }

</script>
<style lang="less">
  .before:before {
    content: '';
    position: absolute;
    top: 21px;
    left: 39px;
    width: 0px;
    height: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }

  .after:before {
    content: '';
    position: absolute;
    top: 21px;
    right: 39px;
    width: 0px;
    height: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent #B2E281;
  }

  @keyframes mymove1 {
    0% {
      height: 0
    }
    100% {
      height: 665px
    }
  }

  @keyframes mymove2 {
    0% {
      height: 665px
    }
    100% {
      height: 0
    }
  }

  .ups {
    animation: mymove1 1s;
    -webkit-animation: mymove1 1s;
    /* Safari 和 Chrome */
  }

  .downs {
    animation: mymove2 1s;
    -webkit-animation: mymove2 1s;
    /* Safari 和 Chrome */
  }

  .zhankai {
    right: 0px;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
  }

  .shouhui {
    right: -800px;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
  }
  .ull::-webkit-scrollbar{width:1px !important;}
</style>
