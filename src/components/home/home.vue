<template>
    <div class="home_center">
       <bottom></bottom>
        <div @click="changeU()">
            <img :src="srcc+'/static/img/home/frist.png'" draggable="false">
        </div>
        <div class="nav">
            <div>
                <ul>
                    <li>苗木</li>
                    <!-- <li>花卉</li>
                    <li>园林建材</li>
                    <li>清场</li>
                    <li>采购</li>
                    <li>招租转让</li>
                    <li>招聘</li> -->
                </ul>
            </div>
        </div>
        <list :listBool="'home'" :Ttype="'tree'"></list>
        <div class="nav">
            <div>
                <ul>
                    <li>花卉</li>
                </ul>
            </div>
        </div>
        <list :listBool="'home'" :Ttype="'fl'"></list>
        <bottom></bottom>
        <div v-show="0">{{watch}}</div>
    </div>
</template>

<script>
import list from "../query/list.vue";
import bottom from "../common/bottom.vue";
export default {
  data(){
    return{
      is_left:true,
      srcc:'',
      ih:0,
    }
  },
  components:{
      "list":list,
      "bottom":bottom,
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
    changeU(){
        window.open("http://www.gdmiaoxun.cn/?page_id=15036&qfy_preview=1");
    }
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
                cursor: pointer;
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
