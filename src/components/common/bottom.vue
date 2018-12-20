<template>
  <div class="bottom">
          <div style="width:1220px;">
                <div>
                    <img :src="srcc+'static/img/common/bottom_logo.png'" alt="深圳园宝科技有限公司" draggable="false">
                    <p>客服电话 400-666-6418</p>
                    <p>深圳园宝科技有限公司</p>
                </div>
                <div>
                    <div>
                        <!--<img :src="srcc+'static/img/common/android.png'" alt="安卓下载" @click="down('android')" draggable="false">
                        <img :src="srcc+'static/img/common/ios.png'" alt="ios下载" @click="down('ios')" draggable="false">-->
                         <img :src="srcc+'static/img/common/android.png'" alt="安卓下载"  draggable="false">
                        <img :src="srcc+'static/img/common/ios.png'" alt="ios下载"  draggable="false">
                    </div>
                    <div>
                        <div>
                            <p>扫描二维码下载</p>
                            <img :src="srcc+'static/img/common/down.png'" alt="二维码下载" draggable="false">
                        </div>
                        <!--<div>
                            <p>扫码关注公众号</p>
                            <img :src="srcc+'static/img/common/gongzonghao.png'" alt="关注公众号" draggable="false">
                        </div>-->
                    </div>
                </div>
          </div>
      </div>
</template>

<script>
import headers from '../common/header.vue';
export default {
  data(){
    return{
      is_left:true,
      srcc:'',
    }
  },
  components:{
      'headers':headers,
  },
  methods:{
      //切换轮播图片
    change_left(bool){
        this.is_left = bool;
    },
    //下载
    down(type){
        $.get("http://m1-ymboss.leanapp.cn/addon/"+type+"/version?from=client",function(data){
            if(type=="android"){
                window.open(data.results.url);
            }else{
                window.open(data.results[0].trackViewUrl);
            }
        })
    }
  },
  mounted:function(){
    var that = this;
    this.srcc = this.$store.state.srcc;
  }
}
</script>

<style scoped lang="less">
    .bottom {
        height: 310px;
        width: 100%;
        /*overflow: hidden;*/
        background: white;
        &>div{
            padding-top: 70px;
            width: 80%;
            margin: 0 auto;

            &>div:nth-of-type(1){
                display:inline-block;
                &>img:nth-of-type(1){
                    width: 224px;
                }
                &>p{
                    margin:17px 0 0;
                    color: #49494B;
                    font-size: 23px;
                }
            }

            &>div:nth-of-type(2){
                float:right;
                &>div:nth-of-type(1){
                    width: 172px;
                    cursor:pointer;
                    float:left;
                    margin-top: 22px;
                    &>img{
                        width: 172px;
                    }
                    &>img:nth-of-type(1){
                        margin-bottom: 14px;
                    }
                }
                &>div:nth-of-type(2){
                    float:left;
                    &>div{
                        float:left;
                        text-align: center;
                        margin-left:12px;
                        &>p{
                            margin:0;
                            color: #676868;
                            font-size: 15px;
                        }
                        &>img{
                            width: 128px;
                        }
                    }
                    &>div:nth-of-type(2){
                        margin-left: 33px;;
                        padding-left: 33px;
                        border-left:1px solid #E6E6E6;
                    }
                }
            }
        }
    }
</style>
