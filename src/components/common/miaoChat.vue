<template>
    <div class="chatS" id="chatS">
    <div class="chat">
      <div>
        <div class="chat_btn">
          <!-- <span>聊天</span> -->
        </div>
        <div>
          <div>
            <div>
              <img src="" alt="" id="chat_img">
            </div>
            <p id="chat_p"></p>
          </div>
          <div><span id="openS">展开</span></div>
        </div>
        <div>
          <!--左边聊天列表容器-->
          <div id="chat_man">

          </div>
        </div>
        <!-- <div class="chat_bottom">
                    <span>聊天</span>
                    <span>消息</span>
                    <span class="back">返回</span>
                </div> -->
      </div>
      <div class="room">
        <div class="top">

        </div>
        <div class="center">
        </div>
        <div class="bottom">
          <div id="sendTu">
            <img src="/static/img/common/Img.png">
          </div>
          <textarea name="" cols="30" rows="4"></textarea>
          <span id="sendNew1">发送</span>
          <input type="file" class="fls" id="sendNew">
        </div>
        <div class="show_img">
          <div>
            <img src="" class="showimg w600">
          </div>
          <div id="show_img2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{


        }
    },
    methods:{

    },
    mounted:function(){

    $("#chat_img").attr("src",window.user.avatar.url);//消息框的当前登录用户的头像
    $("#chat_p").text(window.user.nickname);//消息框的当前登录用户的名字

    }
}
</script>

<style>
#chatS{
    margin:0;
    width: 1090px;
    height: 665px;
    overflow: hidden;
}

#chatS > div:nth-of-type(1){
    width: 1090px;
    height: 665px;
}

.over_y{
    overflow-y: scroll;
}

.room_left,.room_right{
    padding:10px 50px;
}

.room_left>span:nth-of-type(1){
    margin-left: 7px;
}

.room_right>span:nth-of-type(1){
    margin-right: 7px;
}


.room_left>span:nth-of-type(1),.room_right>span:nth-of-type(1){
    position: relative;
    color: black;
    display: inline-block;
    line-height: 40px;
    font-size: 15px;
    padding: 0 14px;
    max-width: 300px;
    word-break: normal;
    white-space: pre-wrap;
    border-radius: 5px;
    word-wrap: break-word;
}
.room_left{
    text-align:left;
}

#chatS .center{
    padding: 20px 0;
    height: 435px;
    overflow-y: scroll;
}

.room_left>div:nth-of-type(1)>img:nth-of-type(1),.room_right>div:nth-of-type(1)>img:nth-of-type(1){
    width:100px;
    position: relative;
}

.room_left>div:nth-of-type(1){
    float:left;
}

.room_right>div:nth-of-type(1){
    float:right;
}

.room_left>div:nth-of-type(1),.room_right>div:nth-of-type(1){
    overflow: hidden;
    width: 40px;
    height:40px;
}

.room_left>span{
    background: white;
}

.room_left>span:before{
    content: '';
    position: absolute;
    top: 11px;
    left: -14px;
    width: 0px;
    height: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent white transparent transparent;
}

.room_right>span:before{
    content: '';
    position: absolute;
    top: 11px;
    right: -14px;
    width: 0px;
    height: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent #B2E281;
}



.room_right>span{
    background: #B2E281;
}

.room_right{
    text-align:right;

}


::-webkit-scrollbar
{
	width: 0px;
	height: 16px;
	/* background-color: #F5F5F5; */
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px transparent;
	border-radius: 10px;
	/* background-color: #F5F5F5; */
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px transparent;
	/* background-color: #555; */


}



.chat{
    height: 665px;
    width: 1090px;
    /* margin: 0 auto; */
}

#chatS p{
    margin:0 auto;
}

#chat_man{
    /* padding: 70px 0; */
    background: #2E3238;
    overflow-y: scroll;
    /* margin-top: 90px; */
}

.chat>div:nth-of-type(1){
    float: left;
    width: 290px;
    height: 685px;
}

.chat_btn>span:nth-of-type(1){
    display: inline-block;
    cursor: pointer;
}

.chat_btn+div{
    width: 290px;
    border-bottom: 1px solid;
    background: #2E3238;
    padding: 5px 0 40px;
    position: relative;
}

.chat_btn+div>div:nth-of-type(2){
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    font-size: 16px;
    font-weight: initial;
    cursor: pointer;
}





.chat_btn+div>div:nth-of-type(1){
    padding: 12px 18px 11px 11px;
    height: 40px;
}

.chat_btn+div+div{
    background: #2E3238;
    color:white;
    width: 290px;
    height: 556px;
    overflow-y: scroll;
    position: relative;
}

.chat_btn + div >div:nth-of-type(1)>div:nth-of-type(1){
    width:40px;
    position: relative;
    overflow: hidden;
    height: 40px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    float:left;
}

.chat_btn + div >div:nth-of-type(1)>p:nth-of-type(1){
    color:white;
    float:left;
    margin-left: 10px;
}



.chat_btn + div >div:nth-of-type(1)>div:nth-of-type(1) >img{
    height: 100%;
}


.fls{
    width: 0;
    overflow: hidden;
    height: 0;
}

.room{
    float: left;
    background: #EEEEEE;
    width: 800px;
    height: 665px;
    position: relative;
}

.room > .top{
    text-align: center;
    border-bottom: 1px solid #6F7173;
    margin: 0 25px;
    padding: 15px 0;
}

.room > .top > span{
    font-size:15px;
    font-weight: 500;
}

.room > .bottom{
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 803px;
    border-top: 1px solid rgb(169, 169, 169);
    background: white;
}

.room_left>div:nth-of-type(2),.room_right>div:nth-of-type(2){
    height: 110px;
    display: inline-block;
    margin-right: 8px;
    border-radius: 5px;
    overflow: hidden;
}

.room_left>div:nth-of-type(2)>img,.room_right>div:nth-of-type(2)>img{
    height:100%;
    position: relative;
}

.bottom > textarea{
    width: 761px;
    font-size: 15px;
    resize: none;
    overflow: auto;
    border: none;
    outline: none;
    height: 50px;
    margin-bottom: 30px;
    padding: 0 20px;
}

.bottom > span:nth-of-type(1){
    position: absolute;
    bottom: 12px;
    right: 10px;
    background: #EEEEEE;
    padding: 5px 16px;
    border-radius: 2px;
    font-size: 13px;
    cursor: pointer;
    color:#777;
}

.bottom > span:nth-of-type(1):hover{
    background: #129611 !important;
    color: white !important;
}


.bottom > div {
    width: 30px;
    overflow: hidden;
    margin-left: 6px;
}

.bottom > div > img{
    width: 100%;
}





.one_man{
    height:41px;
    padding: 12px 18px 11px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    position: relative;
}

.one_man>div:nth-of-type(1){
    position: relative;
    width:40px;
    height:40px;
    overflow: hidden;
    border-radius: 5px;
    float:left;
}

.one_man>div:nth-of-type(1)>img{
    position: relative;
    height:40px;
    min-width: 40px;
    width: 100%;
}

.one_man>div:nth-of-type(2){
    float: left;
    margin-left: 10px;
    vertical-align: middle;
}

.one_man>div:nth-of-type(2)>p:nth-of-type(1){
    color:white;
}

.one_man>div:nth-of-type(2)>p:nth-of-type(2){
    color: #6F7173;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
}

/*删除按钮隐藏*/
.one_man>div:nth-of-type(3){
    position: absolute;
    right: 17px;
    top: 17px;
    display: none;
}

.one_man>div:nth-of-type(3)>span{
    color:#C80000;
    font-size:15px;
}

.one_man>div:nth-of-type(4){
    position: absolute;
    top: 3px;
    left: 47px;
    background: #E62E2E;
    border-radius: 5px;
    font-size: 12px;
    padding: 1px 4px;
}

.one_man>div:nth-of-type(4)>span:nth-of-type(1){
    color:white;
}

.chat_bottom{
    position: relative;
    width: 290px;
}

.chat_bottom>span{
    cursor: pointer;
}

.show_img{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
}

.show_img > div:nth-of-type(2){
    background: rgba(0, 0, 0,0.5);
    position: absolute;
    z-index: -1;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
}

.show_img > div:nth-of-type(1){
    width: 50%;
    height: 100%;
    margin: auto;
    margin-top: 150px;
}

.show_img > div:nth-of-type(1) > img{
    width: 100%;
}
</style>
