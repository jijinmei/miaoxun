<template>

   <div >
<!--添加本地图片.uploads .up-img  -->
<div class="bai">
  <div class="w50 h30 relative">
     <button class="bgea833d border0 white cursor w50 h30 lh30 mT10">添加</button>
      <input  type="file" name="file" id="file" class="file addsfile w50 h30 jz opacity0 cursor" value=""
                       accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP" multiple />
  </div>
 <!--<ul class="uploads overflow bai mT30 mB10 w100s h210" >-->
  <ul class="uploads bai mT30 mB10 w100s" >
    <li class="first lf mB10" style="" >
      <div class="img-box full" style="width: 100%;margin-top: 0">
      <section class="img-section">
        <div class="z_photo upimg-div clear" >
         <!--2.当前点击上传的-->
                     <!--<section class="z_file fl w118 h210 mR10 relative lf" v-if="!(tdate.length==9)">
                      <img src="/static/img/common/add_img.png"  class="add cursor w100s padding0">
                      <input  type="file" name="file" id="file" class="file addsfile w118 h210 jz opacity0 cursor" value=""
                       accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP" multiple />
                     </section>-->
                     <section class="up-section fl w118 h210 cursor mR10 lf relative overflow" v-for="(items,indexs) in imgUrl">
                       <span class="up-span"></span>
                       <img @click="dels(indexs)" class="close-upimg w25 absolute R05 T05 z_10" src="/static/img/common/cha.png" :indexs="indexs">
                       <img  class="up-img jz" :src="items"  style="width: 100%;" preview='yuanlinXs' >
                     </section>
             </div>
       </section>
       </div>
    </li>
  </ul>
  <!--<p class="f22 c888888 bai pL20">最多可上傳9張圖片</p>-->
  <p class="center pB10">
    <span class="display:none;">{{watch}}</span>
</p>
</div>
<!--正在發佈-->
    <div class="wai_kuangs" v-if="isending==false">
      <div class="nei_kuang f32 bai w497 h200 lh200 center radius">正在發佈,請稍後...</div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/imgUp.js';
  export default {
    data() {
      return {
      isending:true,//是否结束了请求
        imgUrl: [],//存放图片路径的数组  imgUp.js/225行
        tdate:[]//存放图片文本对象的数组  imgUp.js/75行
      }
    },

    computed: {
      watch(){
        this.tdate=this.$store.state.tdate
        this.imgUrl=this.$store.state.imgUrl
      }
    },
    methods: {
      dels(index){
// 		// 执行删除对应数组位置
    this.$store.state.tdate.splice(index,1)
    this.$store.state.imgUrl.splice(index,1)
      },

          adjust(e) {
      //获取容器宽高
      var pwidth = $(e.currentTarget).parent().width()
      var pheight = $(e.currentTarget).parent().height()
      //获取图片实际宽高
      var width = $(e.currentTarget).width()
      var height = $(e.currentTarget).height()
      //获取实际宽高比例
      var kgb = width / height
      var gkb = height / width
      console.log(width, height, pwidth, pheight)
      //修正图片宽高 多加了==
      if(width < height || width == height) {
        $(e.currentTarget).css('width', pwidth + 'px')
        var xzg = pwidth / kgb
        $(e.currentTarget).css('height', xzg + 'px')
        console.log('取宽')
      } else {
        $(e.currentTarget).css('height', pheight + 'px')
        var xzk = pheight * kgb
        $(e.currentTarget).css('width', xzk + 'px')
        console.log('取高')
      }
    },
     // fabus(){
     //          console.log(this.title,this.content)
     //         }

    },
    mounted: function () {

    }
  }

</script>
<style lang="less">

</style>
