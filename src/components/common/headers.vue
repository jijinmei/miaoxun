<template>
  <div class="header" :class="{poF:el_bool.hf}">
    <div>
      <!--v-show="!el_bool.hf"-->
      <div @click="route_go('home')" target="_blank">
        <div>
          <img draggable="false" :src="srcc+'static/img/common/logo.png'" alt="秒讯科技" class="w100">
        </div>
        <!--<span>园林宝</span>-->
        <!--<span>苗讯</span>-->
      </div>
      <p class="czjz h70 w400 mL200" v-show="this.$route.name=='mehome'">

        <span class="lh30 w80 f14  border-t border-b border-l czjz L30 center cursor" @click="isopen=!isopen">{{searchItem}}
                     <img src='/static/img/common/xiabiao.png' :class="{rotate180:isopen==true}"/>
        </span>
        <ul v-show="isopen==true" class="absolute T50 L30 border">
                <li v-for="(item,index) in search_list" @click="whos(item.name)"  class="f12 cursor block left pB05 c222222 bai w48 pL10 pR10">{{item.name}}</li>
        </ul>
        <input type="text" placeholder="请输入您要搜索的内容"  @keyup.enter="route_go('query_search_who')" v-model="Itext" style="outline:none;" class="lh30 w200 f16 pL20 pR20 border czjz L100">
        <span @click="route_go('query_search_who')" class="white bg60B346 lh32 inline w60 center  czjz L300 cursor R05 f15">搜索</span>
        <!--<router-link to="/query/search/:se">搜索</router-link>-->
      </p>

      <div>
        <div>
          <ul>
            <li @click="show_chat()" v-show="news_bool">
              消息
              <span v-show="no_read!=0" class="_news"></span>
            </li>
            <!--<li :class="{sel_li:el_bool.li_index==1}" @click="route_go('home')" @mouseenter="change_bool('li_index',1)" @mouseleave="change_bool('li_index',-1)">首页</li>-->
            <!--<li :class="{sel_li:el_bool.li_index==2}" @mouseenter="change_bool('li_index',2)" @mouseleave="change_bool('li_index',-1)">购物清单</li>-->
            <!--<li :class="{sel_li:el_bool.li_index==3}" @click="route_go('favList')" @mouseenter="change_bool('li_index',3)" @mouseleave="change_bool('li_index',-1)">收藏夹</li>-->
            <li v-show="user==''" @click="login()">登录/注册</li>
            <li v-if="user!=''">
              <div @mouseenter="change_bool('user',true)" @mouseleave="change_bool('user',false)">
                <span class="inline w50 h50 overflow radius50 relative T10">
                  <img :src="this.$store.state.user.avatar.url+imgview" alt="" class="jz">
                </span>
                <span>{{this.$store.state.user.nickname}}</span>
                <span @click="clearuser"> / 登出</span>
              </div>
              <div v-show="el_bool.user" v-if="false">
                <div>
                  <div>
                    <img :src="user.avatar.url">
                  </div>
                  <div>
                    <span>高级vip</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <login></login>
    </div>
    <!--<div v-if="el_bool.hf">
            <div>
                <img :src="`${srcc}static/img/common/bottom_logo.png`">
            </div>
            <div>
                <input type="text" placeholder="请输入您要搜索的苗木" @keyup="enterI($event)" v-model="Itext">
                <span @click="route_go('query_search')">搜索</span>
            </div>
        </div>-->
    <div v-show="0">{{watch}}</div>
  </div>
</template>

<script>
  import login from "./login.vue";
  export default {
    data() {
      return {
        imgview:'?imageView2/1/w/50/h/50',
        Itext: "",
        isopen: false,
        searchItem:'类型',
        search_list: [
          { name: "绿化苗木", ro: "trees" },
          { name: "花卉盆景", ro: "flower" },
          { name: "园林资材", ro: "flower" },
          { name: "花木清场", ro: "flower" },
          { name: "采购大厅", ro: "flower" },
          { name: "招租转让", ro: "flower" },
          { name: "招聘信息", ro: "flower" },
           { name: "求职简历", ro: "flower" },
          { name: "工程机械", ro: "flower" }
          //  ,{ name: "测试模块", ro: "flower" }
        ],
        li_list: [
          { name: "苗木", ro: "tree" }, { name: "花卉", ro: "flower" }, { name: "建材", ro: "building" },
          { name: "辅材", ro: "auxiliary" }, { name: "求购", ro: "buys" }, { name: "招租转让", ro: "" },
          { name: "招聘", ro: "" }, { name: "全部分类", ro: "" }
        ],
        srcc: "",
        el_bool: { li_index: -1, user: false, hf: false },
        news_bool: false,
        user: this.$store.state.user,
        no_read: 0,
      }
    },
    components: {
      "login": login,
    },
    computed: {
      watch() {
        this.news_bool = this.$store.state.news_bool;
        this.no_read = this.$store.state.no_read;
        this.user = this.$store.state.user;
      }
    },
    methods: {
      whos(name){
             this.searchItem=name;
             this.isopen=false;
      },

      show_chat() {
        this.$store.state.chat_bool = !this.$store.state.chat_bool;
        this.$store.state.upordown=!this.$store.state.upordown
        this.$store.state.chatkuang = !this.$store.state.chatkuang;//自己新起的工具
        this.$store.state.no_read = 0;
      },
      change_bool(who, item) {
        let that = this;
        that.el_bool[who] = item;
      },
      route_go(where) {
        // this.$router.push({ name: "pcLoad"})
        // return
        let that = this;
        if (where == 'favList') {
          if (this.user == "") {
            alert("请先登录~");
            return;
          }
          this.$router.push({ name: "fav_tree", params: { id: this.user.objectId } })
          return;
        }
        if (where == 'query_search_who') {
          window.localStorage.removeItem('searchQuery');
          var wheres=(
            this.searchItem=='绿化苗木'||this.searchItem=='类型'?'search_tree'
          :(this.searchItem=='花卉盆景'?'search_flower'
          :(this.searchItem=='园林资材'?'search_yuanlin'
          :(this.searchItem=='花木清场'?'search_clear'
          :(this.searchItem=='采购大厅'?'search_caigou'
          :(this.searchItem=='招租转让'?'search_rent'
          :(this.searchItem=='招聘信息'?'search_jobZ'
          :(this.searchItem=='求职简历'?'search_jobQ'
          :(this.searchItem=='工程机械'?'search_car'
          :(this.searchItem=='测试模块'?'search_caigous'
          :('')))))))))))



          if(that.Itext){
                             window.open(URLS+'query/'+wheres+'/'+that.Itext+'/no')



          }else{
                     window.open(URLS+'query/'+wheres+'/no')


          }

          return;
        }
        if (where == 'home') {
          that.$router.push({ name: 'mehome' })
          return;
        }
        that.$router.push({ name: where });
      },
      // 登出
      clearuser: function () {
        window.localStorage.clear()
        location.reload();
      },
      login() {
        this.$store.state.login_el_bool = true;
      }
    },
    mounted: function () {
      var that = this;
      that.srcc = this.$store.state.srcc;
      if (localStorage.getItem("user")) {
        this.user = JSON.parse(localStorage.getItem("user"))
      }
      let HHeight = 120;
      // $(window).scroll(function(){
      //     let sY = window.scrollY;
      //     if(sY>=HHeight){
      //         $("#app>div").css("margin-top","52px");
      //         that.el_bool.hf = true;
      //     }else{
      //         $("#app>div").css("margin-top","0px");
      //         that.el_bool.hf = false;
      //     }
      //     // console.log("滚动了"+sY);
      // })
    }
  }

</script>

<style lang="less" scoped>
  .poF {
    position: fixed !important;
  }

  @keyframes myfirst {
    from {
      background: red;
    }
    to {
      background: white;
    }
  }

  ._news {
    animation: myfirst 1s infinite linear;
  }

  .sel_li {
    color: #FF4400 !important;
  }

  .header {
    z-index: 555;
    background: white;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
    /*box-shadow: 0 0 10px rgba(102,243,72,0.8);*/
    &>div:nth-of-type(1) {
      width: 1220px;
      height: 70px;
      margin: 0 auto;
      &>div:nth-of-type(1) {
        float: left;
        line-height: 70px;
        vertical-align: middle;
        /*padding: 0 35px;*/
        cursor: pointer;
        &>div:nth-of-type(1) {
          width: 30px;
          vertical-align: middle;
          display: inline-block;
          &>img:nth-of-type(1) {
            width: 100%;
            vertical-align: middle;
          }
        }
        &>span:nth-of-type(1) {
          font-size: 22px;
          vertical-align: middle;
          font-weight: 300;
        }
      }

      &>div:nth-of-type(2) {
        float: right;
        line-height: 70px;
        &>div:nth-of-type(1) {
          &>ul:nth-of-type(1) {
            margin: 0;
            padding: 0;
            &>li {
              // padding: 10px 15px;
              padding: 0px 15px;
              cursor: pointer;
              display: inline-block;
              color: #777;
              font-size: 16px;
              font-weight: 100;
              position: relative;
              &>span {
                height: 10px;
                width: 10px;
                display: inline-block;
                background: red;
                border-radius: 30px;
                position: absolute;
                top: 10px;
                right: 10px;
              }
              &:nth-of-type(4) {
                /*color: #FF9900 !important;*/
              }
              &:nth-of-type(6) {
                position: relative;
                /*margin-right: 25px;*/
                &>div {
                  &:nth-of-type(2) {
                    position: absolute;
                    top: 52px;
                    right: 0;
                    background: white;
                    border: 1px solid #777;
                    border-top-color: white;
                    &>div {
                      &:nth-of-type(1) {
                        width: 200px;
                        padding: 5px 10px;
                        height: 90px;
                        &>div {
                          &:nth-of-type(1) {
                            width: 70px;
                            border-radius: 40px;
                            overflow: hidden;
                            height: 70px;
                            float: left;
                            &>img {
                              width: 140px;
                              position: relative;
                            }
                          }
                          &:nth-of-type(2) {
                            float: left;
                            margin-left: 15px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    &>div:nth-of-type(2) {
      width: 1220px;
      margin: 0 auto;
      height: 70px;
      /*border:1px solid red;*/
      line-height: 66px;
      &>div {
        &:nth-of-type(1) {
          height: 36px;
          overflow: hidden;
          vertical-align: middle;
          display: inline-block;

          &>img {
            position: relative;
            height: 100%;
          }
        }
        &:nth-of-type(2) {
          display: inline-block;
          float: right;
          line-height: 70px;
          /*&>input{
                        line-height: 30px;
                        border: 1px solid #999;
                        width: 200px;
                        font-size: 12px;
                        padding: 0 20px;
                    }
                    &>span:nth-of-type(1){
                        color: white;
                        background: #60B346;
                        line-height: 32px;
                        display: inline-block;
                        vertical-align: middle;
                        width: 60px;
                        text-align: center;
                        position: relative;
                        right: 5px;
                        cursor: pointer;
                    }*/
        }
      }
    }
  }
</style>
