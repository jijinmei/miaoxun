<template>
    <div class="home_center">
        <div>
            <img :src="srcc+'/static/img/home/frist.png'">
        </div>
        <div class="nav">
            <div>
                <div>
                    <ul>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/tree.png'">
                            </div>
                            <span>苗木</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/floor.png'">
                            </div>
                            <span>花卉</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/jiancai.png'">
                            </div>
                            <span>建材</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/qingchang.png'">
                            </div>
                            <span>清场</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/buy.png'">
                            </div>
                            <span>采购</span>
                        </li>                        
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/let.png'">
                            </div>
                            <span>招租转让</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/recruit.png'">
                            </div>
                            <span>招聘</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/diaoyun.png'">
                            </div>
                            <span>吊运车辆</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/let.png'">
                            </div>
                            <span>求职</span>
                        </li>
                        <li>
                            <div>
                                <img :src="srcc+'/static/img/home/qiuzhi.png'">
                            </div>
                            <span>货运</span>
                        </li>
                    </ul>
                </div>
                <ul>
                    <li>首页</li>
                    <li>苗木</li>
                    <li>花卉</li>
                    <li>园林建材</li>
                    <li>清场</li>
                    <li>采购</li>
                    <li>招租转让</li>
                    <li>招聘</li>
                </ul>
            </div>
        </div>
        <div v-show="0">{{watch}}</div>
    </div>   
</template>

<script>

export default {
  data(){
    return{
      is_left:true,
      srcc:'',
      ih:0,      
    }
  },
  components:{
      
  },
  computed:{
    watch(){
        this.ih = innerWidth;
        if(innerWidth){
            console.log(innerWidth);
        }
    }
  },
  methods:{
    
  },
  mounted:function(){
    var that = this;
    that.srcc = this.$store.state.srcc;
  }
}
</script>


<style lang="less" scoped>
    .home_center{
        // background: #F4F4F4;
        position: relative;
        top: 1px;
        &>div{
            &:nth-of-type(1){
                background: white;
                // height: 90px;
                // line-height: 90px;
                // text-align: center;
                &>img{
                    width:100%;
                }
            }
        }
        &>.nav{
            background: white;
            border-bottom: 3px solid #60B346;
            &>div{                
                &:nth-of-type(1){
                    width: 1200px;
                    margin: 0 auto;
                    &>div{
                        margin-bottom:10px;
                        &>ul:nth-of-type(1){
                            display: block;
                            &>li{
                                width: 100px;
                                margin-right: 30px;
                                text-align: center;
                                &>div{
                                    &>img{
                                        width: 100%;
                                    }
                                }
                                &>span{
                                    font-size: 20px;
                                }
                                
                            }
                        }
                    }
                    
                    &>ul:nth-of-type(1){
                        background-color: #fff;
                        // width: 848px;
                        // padding: 5px;
                        &>li{
                            line-height: 40px;
                            cursor: pointer;
                            padding: 0 25px;
                            color: #777;
                            &:nth-of-type(1){
                                background:#60B346 !important;
                                color:white;
                            }
                            &:hover{
                                background:#60B346 !important;
                                color: white !important;
                            }
                            &>div{
                                text-align: center;
                                // width:80px;
                                &>img{
                                  width: 42px;
                                  text-align: center;
                                }
                            }
                            &>p{
                                font-size: 14px;
                                text-align: center;
                                font-weight: 500;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
