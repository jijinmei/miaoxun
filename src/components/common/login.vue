<template>
  <div class="wai_kuang" v-show="this.$store.state.login_el_bool">

    <div class="login bai w400 spjz T100 z_10000 pT50 pB30 pL30 pR30 h500">
      <div>
        <div @click="close_login()" class="absolute R20 T20 cursor">关闭</div>


        <p class="center w130 h130 margin radius50 bgeeeeee mB75 relative">
          <img src="../../../static/img/common/bottom_logo.png" alt="" class="w100 jz">
          </p>
        <!--1111111111111111111登录板块-->
        <div v-show="where=='login'">
          <p class="mB25 border-b f17 relative pB05">
            <img src="../../../static/img/phone/3.png" alt="" class="czjz L00 w20">
            <img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">
            <input @keyup.enter="login" class="block h30 w100s border0 pL30" type="text" v-model="mobile" placeholder="请输入手机号码">
          </p>


          <!--1.密码登录-->
          <p class="border-b f17 relative pB05" v-show="loginwho==1">
            <img @click="eyes=(!eyes)" :src="eyes==0?'../../../static/img/phone/01.png':'../../../static/img/phone/02.png'" alt="" class="cursor czjz L00 w20">

            <img src="../../../static/img/phone/cha.png" alt="" class="czjz R100 w20 cursor" @click="password=''" v-show="password!=''">
            <input @keyup.enter="login" class="block h30 w100s border0 pL30" :type="eyes==0?'password':'text'" v-model="password" placeholder="请输入密码">
            <span @click="where='forget'" class="czjz R00 f15 cursor">忘记密码</span>
          </p>


          <!--2.验证码登录-->
          <p class="border-b f17 relative pB05" v-show="loginwho==2">
            <img src="../../../static/img/phone/4.png" alt="" class="czjz L00 w20">
            <img src="../../../static/img/phone/cha.png" alt="" class="czjz R100 w20 cursor" @click="yzm=''" v-show="yzm!=''">
            <input @keyup.enter="login" class="block h30 w100s border0 pL30" type="text" v-model="yzm" placeholder="请输入验证码">
            <span v-show="istime==60" @click="sendyzm" class="czjz R00 f15 cursor c60b346 bgeeeeee pL10 pR10 pB03 pT03 radius10">获取验证码</span>
            <span v-show="istime!=60" class="czjz R00 f15 cursor c60b346 pL10 pR10 pB03 pT03" style="opacity:0.5;">{{istime}}s后重新获取</span>

          </p>







          <!---->
          <div class="relative">
            <p class="absolute pL30 F13 T10" v-show="loginwho==2&&istime!=60">
              <img src="../../../static/img/phone/yes.png" alt="" class="absolute B00 L00 w20"> 验证码已发送,可能会有延后，请耐心等待

            </p>
            <button @click="login" class="white bg60b346 radius10 w100s outline0 border0 h50 mT50 mB40 f20 cursor" :style="{opacity:(mobile!=''&&password!=''&&loginwho==1)||(mobile!=''&&yzm!=''&&loginwho==2)?'1':'0.5'}">登录</button>

          </div>


          <p class="">
            <span class="lf cursor" v-show="loginwho==2" @click="loginwho=1">账号密码登录</span>
            <span class="lf cursor" v-show="loginwho==1" @click="loginwho=2">短信验证码登录</span>
            <span class="rf cursor" @click="where='regist'">快速注册</span>
          </p>
        </div>


        <!--222222222222222222222注册板块-->
        <div v-show="where=='regist'">
          <div v-show="registpart=='one'">
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/1.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input class="block h30 w100s border0 pL30" type="text" v-model="default_group_name" placeholder="请输入企业名称（没有可不填）">
            </p>
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/2.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input class="block h30 w100s border0 pL30" type="text" v-model="nickname" placeholder="请输入你的姓名">
            </p>
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/3.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input class="block h30 w100s border0 pL30" type="text" v-model="mobiles" placeholder="请输入手机号码">
            </p>
            <p class="border-b f17 relative pB05">
              <img src="../../../static/img/phone/4.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R120 w20 cursor" @click="yzm=''" v-show="yzm!=''">-->
              <input class="block h30 w100s border0 pL30" type="text" v-model="verify" placeholder="请输入验证码">
              <span v-show="istimes==60" @click="sendyzms" class="czjz R00 f15 cursor c60b346 bgeeeeee pL10 pR10 pB03 pT03 radius10">获取验证码</span>
              <span v-show="istimes!=60" class="czjz R00 f15 cursor c60b346 pL10 pR10 pB03 pT03" style="opacity:0.5;">{{istimes}}s后重新获取</span>
            </p>

            <div class="relative">
              <p class="absolute pL30 F13 T10" v-show="istimes!=60">
                <img src="../../../static/img/phone/yes.png" alt="" class="absolute B00 L00 w20"> 验证码已发送,可能会有延后，请耐心等待
              </p>
              <button @click="nexts" class="white bg60b346 radius10 w100s outline0 border0 h50 mT50 mB40 f20 cursor" :style="{opacity:mobiles!=''&&nickname!=''&&verify!=''?'1':'0.5'}">下一步</button>

            </div>
          </div>


          <div v-show="registpart=='two'">
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/5.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input @keyup.enter="regist" class="block h30 w100s border0 pL30" type="password" v-model="newpassword1" placeholder="输入新密码">
            </p>
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/5.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input @keyup.enter="regist" class="block h30 w100s border0 pL30" type="password" v-model="newpassword2" placeholder="确认新密码">

            </p>
            <button @click="regist" class="white bg60b346 radius10 w100s outline0 border0 h50 mT50 mB40 f20 cursor" :style="{opacity:newpassword1!=''&&newpassword2!=''&&newpassword1==newpassword2?'1':'0.5'}">完成注册</button>
          </div>
        </div>






        <!--333333333333333忘记密码-->
        <div v-show="where=='forget'">
          <div v-show="forgetpart=='one'">
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/1.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input @click="nexts3" class="block h30 w100s border0 pL30" type="text" v-model="mobiles3" placeholder="请输入手机号码">
            </p>

            <p class="border-b f17 relative pB05">
              <img src="../../../static/img/phone/4.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R120 w20 cursor" @click="yzm=''" v-show="yzm!=''">-->
              <input @click="nexts3" class="block h30 w100s border0 pL30" type="text" v-model="verify3" placeholder="请输入验证码">
              <span v-show="istimes3==60" @click="sendyzms3" class="czjz R00 f15 cursor c60b346 bgeeeeee pL10 pR10 pB03 pT03 radius10">获取验证码</span>
              <span v-show="istimes3!=60" class="czjz R00 f15 cursor c60b346 pL10 pR10 pB03 pT03" style="opacity:0.5;">{{istimes3}}s后重新获取</span>
            </p>

            <div class="relative">
              <p class="absolute pL30 F13 T10" v-show="istimes3!=60">
                <img src="../../../static/img/phone/yes.png" alt="" class="absolute B00 L00 w20"> 验证码已发送,可能会有延后，请耐心等待
              </p>
              <button @click="nexts3" class="white bg60b346 radius10 w100s outline0 border0 h50 mT50 mB40 f20 cursor" :style="{opacity:mobiles3!=''&&verify3!=''?'1':'0.5'}">下一步</button>

            </div>
          </div>


          <div v-show="forgetpart=='two'">
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/5.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input @keyup.enter="forget" class="block h30 w100s border0 pL30" type="password" v-model="newpassword3" placeholder="输入新密码">
            </p>
            <p class="mB25 border-b f17 relative pB05">
              <img src="../../../static/img/phone/5.png" alt="" class="czjz L00 w20">
              <!--<img src="../../../static/img/phone/cha.png" alt="" class="czjz R00 w20 cursor" @click="mobile=''" v-show="mobile!=''">-->
              <input @keyup.enter="forget" class="block h30 w100s border0 pL30" type="password" v-model="newpassword4" placeholder="确认新密码">

            </p>
            <button @click="forget" class="white bg60b346 radius10 w100s outline0 border0 h50 mT50 mB40 f20 cursor" :style="{opacity:newpassword3!=''&&newpassword4!=''&&newpassword3==newpassword4?'1':'0.5'}">下一步</button>
          </div>
        </div>


        <div v-show="forgetpart=='three'">
          <p class="center mB30"> <img src="../../../static/img/phone/bigyes.png" alt="" class="w120"></p>
          <p class="c60b346 f25 center mB20"> 改密成功</p>
          <p class="center f18"> 请使用新密码登录</p>
          <button @click="resets()" class="c60b346 radius10 w100s outline0  h50 mT20 mB40 f20 cursor bai" style="border:1px solid #60b346;">登录</button>
        </div>
      </div>






    </div>

  </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        where: 'login',//login是登录，regist是注册，forget是忘记密码

        // 1.登录
        mobile: '',
        password: '',
        eyes: 0,
        loginwho: 1,
        yzm: '',
        istime: 60,

        // 2.注册
        registpart: 'one',//one是下一步的页面，two是完成注册的页面
        default_group_name: '',
        mobiles: '',
        nickname: '',
        passwords: '',
        istimes: 60,
        verify: '',
        newpassword1: '',
        newpassword2: '',

        // 3.忘记密码
        forgetpart: 'one',//one是下一步的页面，two是重置密码的页面
        mobiles3: '',
        istimes3: 60,
        verify3: '',
        newpassword3: '',
        newpassword4: ''
      }
    },
    computed: {
      watch() {
        // this.resets();
      }
    },
    methods: {
      // 1.登录
      sendyzm() {
        let that = this;

        // return;
        if (this.mobile) {
          var times = setInterval(function () {
            that.istime--
            if (that.istime == 0) {
              that.istime = 60
              clearInterval(times)
            }
          }, 1000);


          $.ajax({
            url: Boss + "login/verify",
            type: "POST",
            data: {
              'mobile': that.mobile
              // 'isDebug': 1,
            },
            success: data => {
              console.log(data);
              if (data.status) {

              } else {
                  layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg(data.err.message);
                });

              }

            },
            error: err => {
              layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg(err);
                });
            }
          })
        } else {
          layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg('请输入手机号码');
          });
        }
      },
      login() {
        let that = this;
        if ((this.mobile && this.password) || (this.mobile && this.yzm)) {
          $.ajax({
            url: Boss + "login",
            type: "POST",
            data: {
              'mobile': that.mobile,
              'password': that.password,
              'verifycode': that.yzm,
              'loginType': that.loginwho,//登陆方式，1=手机和密码登陆，2=手机和验证码登陆
            },
            success: data => {
              console.log(data);
              if (data.status) {
                window.localStorage.setItem("user", JSON.stringify(data.results));
                // that.el_bool.login = false;
                // that.$store.state.user = data.results;
                location.reload();
              } else {
                // alert(data.err.message);


                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg(data.err.message);
                });
              }

            },
            error: err => {
              alert(err);
              console.log(err);
            }
          })
        } else {
          // layui.use('layer', function () {
          //   var layer = layui.layer;
          //   if (that.mobile == '') {
          //     layer.msg('请输入手机号码');
          //   } else if (that.password == '' && that.loginwho == 1) {
          //     layer.msg('请输入密码');
          //   } else if (that.yzm == '' && that.loginwho == 2) {
          //     layer.msg('请输入验证码');
          //   }
          // });


        }

      },

      close_login() {
        this.$store.state.login_el_bool = false;
        this.resets()
      },

      // 2.注册
      regist() {
        var that = this;
        if (this.newpassword1 && this.newpassword2 && this.newpassword2 == this.newpassword1) {
          $.post(Boss + 'sign', {
            'mobile': this.mobiles,
            'verify': this.verify,
            'nickname': this.nickname,
            'default_group_name': this.default_group_name,
            'password': this.newpassword1
          }, function (data) {
            if (data.status) {
              location.reload();
              that.$store.state.login_el_bool = true
            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.err.message);
              });

            }

          })

        }
      },
      // 验证码校验
      nexts() {
        var that = this;
        if (this.mobiles != '' && this.nickname != '' && this.verify != '') {
          $.get(Boss + 'verify/checker', { 'mobile': this.mobiles, 'verify': this.verify }, function (data) {
            if (data.status) {
              if (data.results.success == 1) {
                that.registpart = 'two'
              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg('验证码不正确');
                });
              }


            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.results.message);
              });
            }
          })
        }
      },
      sendyzms() {
        let that = this;


        if (this.mobiles) {
          var timess = setInterval(function () {
            that.istimes--
            if (that.istimes == 0) {
              that.istimes = 60
              clearInterval(timess)
            }
          }, 1000);


          $.ajax({
            url: Boss + "login/verify",
            type: "POST",
            data: {
              'mobile': that.mobiles
              // 'isDebug': 1,
            },
            success: data => {
              console.log(data);
              if (data.status) {

              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg(data.err.message);
                });

              }

            },
            error: err => {
              alert(err);
              console.log(err);
            }
          })
        } else {
          layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg('请输入手机号码');
          });
        }
      },


      // 3.忘记密码
      resets() {
        this.where = "login";
        this.mobile = "";
        this.password = "";
        this.eyes = 0;
        this.loginwho = 1;
        this.yzm = "";
        this.istime = 60;
        // 2.注册
        this.registpart = "one";
        this.default_group_name = "";
        this.mobiles = "";
        this.nickname = "";
        this.passwords = "";
        this.istimes = 60;
        this.verify = "";
        this.newpassword1 = "";
        this.newpassword2 = "";


        // 3.忘记密码
        this.forgetpart = "one";
        this.mobiles3 = "";
        this.istimes3 = 60;
        this.verify3 = "";
        this.newpassword3 = "";
        this.newpassword4 = "";

      },
      forget() {
        var that = this;
        if (this.newpassword3 && this.newpassword4 && this.newpassword3 == this.newpassword4) {
          $.post(Boss + 'forget', {
            'mobile': this.mobiles3,
            'verify': this.verify3,
            'password': this.newpassword3
          }, function (data) {
            if (data.status) {
              // location.reload();
              // that.$store.state.login_el_bool=true
              that.forgetpart = 'three'
            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.err.message);
              });

            }

          })

        }
      },
      // 验证码校验
      nexts3() {
        var that = this;
        if (this.mobiles3 != '' && this.verify3 != '') {
          $.get(Boss + 'verify/checker', { 'mobile': this.mobiles3, 'verify': this.verify3 }, function (data) {
            if (data.status) {
              if (data.results.success == 1) {
                that.forgetpart = 'two'
              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg('验证码不正确');
                });
              }


            } else {
              layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(data.results.message);
              });
            }
          })
        }
      },
      sendyzms3() {
        let that = this;


        if (this.mobiles3) {
          var timess3 = setInterval(function () {
            that.istimes3--
            if (that.istimes3 == 0) {
              that.istimes3 = 60
              clearInterval(timess3)
            }
          }, 1000);


          $.ajax({
            url: Boss + "forget/verify",
            type: "POST",

            data: {
              'mobile': that.mobiles3
              // 'isDebug': 1,
            },
            // contentType:"application/x-www-form-urlencoded",
            success: data => {
              console.log(data);
              if (data.status) {

              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg(data.err.message);
                });

              }

            },
            error: err => {
              alert(err);
              console.log(err);
            }
          })
        } else {
          layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg('请输入手机号码');
          });
        }
      }

    },
    mounted: function () {
        // alert(1)
    }
  }

</script>

<style lang="less">

</style>
