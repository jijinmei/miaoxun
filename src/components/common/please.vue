<template>
  <div class="pls">
      <div class="bg" @click="close()"></div>
      <div>
          <p>电脑端该功能已打烊，请下载苗讯APP进行操作<img :src="srcc+'static/img/common/hui_close.png'" @click="close()" draggable="false"/></p>
          <img :src="srcc+'static/img/phone/phone.png'" alt="立即开启您的财富之路">
          <div>
              <p>苗讯客户端曝光量更大，成交更快</p>
              <p><span>·</span>&nbsp;2017年苗讯线上交易额达到300余万元</p>
              <p><span>·</span>&nbsp;2018年线上交易额预计可达3亿元</p>
              <div>
                  <div>
                      <img :src="srcc+'static/img/common/android.png'" alt="安卓下载" @click="down('android')" draggable="false"/>
                      <img :src="srcc+'static/img/common/ios.png'" alt="ios下载" @click="down('ios')" draggable="false"/>
                  </div>                  
                  <div>
                      <p>扫描二维码下载</p>
                      <img :src="srcc+'static/img/common/down.png'" alt="二维码下载" draggable="false"/>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      srcc:'',
    }
  },
  methods:{
      //下载
    down(type){
        $.get("http://m1-ymboss.leanapp.cn/addon/"+type+"/version?from=client",function(data){
            if(type=="android"){
                window.open(data.results.url);
            }else{
                window.open(data.results[0].trackViewUrl);
            }
        })
    },
    close(){
        this.$emit('childMsg');
    }
  },
  mounted:function(){
      this.srcc = this.$store.state.srcc;
  }
}

</script>

<style scoped lang="less">
    .pls{
        position:fixed;
        top:0;
        left:0;
        z-index:55555;
        width:100%;
        height:100%;

        &>.bg{
            background: black;
            opacity: 0.8;
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            z-index:-1;
        }
        &>div:nth-of-type(2){
            background:#F2F2F2;
            height: 672px;
            width:810px;
            margin: 90px auto 0;

            &>p{
                background: white;
                font-size: 30px;
                color: #4A494B;
                padding-left: 41.3px;
                margin: 0;
                line-height: 130px;
                position:relative;

                &>img{
                    position: absolute;
                    top:20px;
                    right:20px;
                    cursor: pointer;
                }
            }
            &>img:nth-of-type(1){
                margin-top: 80px;
                float:left;
            }
            &>div{
                float: left;
                margin-top: 80px;
                &>p>span{
                    font-size: 28px;
                    vertical-align: bottom;
                }
                &>p:nth-of-type(1){
                    font-size: 32px;
                    color:#4A494B;
                    margin: 10px 0 0;                    
                }
                &>p:nth-of-type(2),&>p:nth-of-type(3){
                    font-size: 20px;
                    color:#676868;
                    line-height: 26px;
                    margin: 13.5px 0 0;
                }
                &>div{
                    &>div:nth-of-type(1){
                        width: 230px;
                        float: left;
                        margin-top:65px;
                        &>img{
                            cursor:pointer;
                            width:100%;
                        }

                        &>img:nth-of-type(1){
                            margin-bottom:25px;
                        }
                    }
                    &>div:nth-of-type(2){
                        margin-top:25px;
                        float:left;
                        margin-left: 44px;
                        &>p{
                            color:#676868;
                            font-size: 20px;
                            text-align: center;
                            margin:0 0 10px;
                            padding-left:44px;
                        }
                        &>img{
                            width: 170px;
                            border-left:1px solid #E6E6E6;
                            padding-left:44px;
                        }
                    }
                }
                
            }
        }
    }
</style>
