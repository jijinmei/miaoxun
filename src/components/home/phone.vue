<template>
  <div class="phone">
    <div>
      <img :src="srcc+'static/img/phone/haibao.png'" alt="苗讯科技" draggable="false">
      <div>
        <img :src="srcc+'static/img/common/down.png'" alt="二维码下载" draggable="false">
        <div>
          <img :src="srcc+'static/img/common/fangand.png'" alt="安卓下载" @click="down('android')" draggable="false">
          <img :src="srcc+'static/img/common/fangios.png'" alt="ios下载" @click="down('ios')" draggable="false">
        </div>
      </div>
    </div>
    <img :src="srcc+'static/img/phone/detail.png'" alt="苗讯科技" draggable="false" v-show="0" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        srcc: '',

      }
    },
    methods: {
      //下载
      down(type) {
        $.get("http://m1-ymboss.leanapp.cn/addon/" + type + "/version?from=client", function (data) {
          if (type == "android") {
            window.open(data.results.url);
          } else {
            window.open(data.results[0].trackViewUrl);
          }
        })
      }
    },
    mounted: function () {
      var that = this;
      this.srcc = this.$store.state.srcc;
    }
  }

</script>

<style lang="less" scoped>
  .phone {
    background: #C0F0B2;
    &>div {
      background: #9CD762;
      position: relative;
      margin: 0 auto;
      width: 1920px;
      &>img {
        // width:100%;
      }

      &>div {
        position: absolute;
        bottom: 83px;
        left: 342px;

        &>img {
          width: 219.833px;
        }

        &>div {
          float: right;
          width: 219px;
          margin-top: 20px;
          margin-left: 43px;
          &>img:nth-of-type(1) {
            margin-bottom: 20px;
          }
          &>img {
            // width:100%;
            cursor: pointer;
          }
        }
      }
    }
    &>img {
      width: 100%;
    }
  }
</style>
