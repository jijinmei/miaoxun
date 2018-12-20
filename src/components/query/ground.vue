<template>
    <div class="ground">
        <div>
            <div>
                <img :src="ground.gg_background" @load="img_load($event)">
            </div>
            <div>
                <div>
                    <img :src="ground.gg_ico">
                </div>
                <div>
                    <p>{{ground.gg_name}}</p>
                    <p>{{ground.gg_intro.length==0?"暂无简介":ground.gg_intro}}</p>
                </div>
                <div>
                    <ul>
                        <li>苗木</li>
                        <li>花卉</li>                        
                    </ul>
                </div>
            </div>
        </div>
        <list v-if="trees!=''" :search="trees"></list>
    </div>
</template>

<script>
import list from "./list.vue";
export default {
    data(){
        return{
            ground:{},
            srcc:"",
            trees:"",
        }
    },
    components:{
        "list":list
    },
    methods:{
        img_load(e){
            let ee = $(e.currentTarget);
            let ew = ee.width();
            let eh = ee.height();
            let pw = ee.parent().width();
            let ph = ee.parent().height();
            if(pw>ew&&ph==eh){
                ew = pw;
                ee.css({width: ew+"px",height:"auto"})
                eh = ee.height();
            }else if(ph>eh&&pw==ew){
                eh = ph;                 
                ee.css({height: eh+"px",width:"auto"})         
                ew = ee.width();
            }            
            ee.css({
                bottom: (eh-ph)/2+"px",
                right: (ew-pw)/2+"px"
            })
        },
        getG(){
            let that = this;
            let idd = this.$route.params.id;
            let ground = JSON.parse(localStorage.getItem(idd));                        
            if(ground){
                that.ground = ground;
                return;
            }            
            $.ajax({
                url:that.$store.state.v1+"ground/"+idd,                
                type:"GET",
                success:_d=>{
                    localStorage.setItem(idd,JSON.stringify(_d.results));
                    console.log(_d);
                    that.ground = _d.results;
                },
                error:err=>{
                    console.log(err)
                }
            })
        },
        getT(){
            let that = this;
            String.prototype.myReplace=function(f,e){//吧f替换成e
                var reg=new RegExp(f,"g"); //创建正则RegExp对象   
                return this.replace(reg,e); 
            }
            //    "where":"{\"groundId\":\""+gid+"\"}"
            let gid = this.$route.params.id;
            let ww = {"groundId":gid};
            let _pd = {
                        "ispublish": 1,
                        "where":JSON.stringify(ww).myReplace('"','\"'),
                    };
            $.ajax({
                url:that.$store.state.v1+"/tree",
                type:"GET",
                data:_pd,

                headers: {
                    "role": "seller",
                },
                success:_d=>{
                    console.log(_d)
                    _d.results.data.forEach((val)=>{
                        window.makeshowstr(val);                              
                    })
                    that.trees = _d.results.data;
                },
                error:err=>{
                    console.log(err)
                }
            })
        }
    },
    mounted:function(){
        this.getG();
        this.srcc = this.$store.state.srcc;
        this.getT();
    }
}
</script>

<style lang="less" scoped>

    .ground{
        &>div{
            &:nth-of-type(1){
                position: relative;
                width: 1220px;
                margin: 58px auto 0;
                // margin: 0 auto;
                // width: 1200px;
                &>div{
                    &:nth-of-type(1){
                        width: 100%;
                        height:170px;
                        overflow: hidden;
                        // height: 300px;
                        position: relative;
                        display:inline-block;
                        vertical-align: middle;
                        &>img{
                            &:nth-of-type(1){
                                width:100%;
                                position: relative; 
                            }                                                                               
                        }
                        &>div{
                            box-sizing:border-box;  
                            filter: blur(6px);
                            position: absolute;
                            top:0;
                            left:0;
                            z-index:1;
                            width: 100%;
                            height:100%;
                        }
                    }
                    
                    &:nth-of-type(2){
                        position: relative;
                        background: white;
                        &>div{
                            &:nth-of-type(1){

                                &:nth-of-type(1){
                                    width:130px;
                                    height:130px;
                                    overflow: hidden;
                                    border-radius: 130px;
                                    border: 4px solid #D1D2DE;
                                    position: absolute;
                                    top: -70px;
                                    left: 15px;
                                    &>img{
                                        height:100%;
                                    }
                                }
                                
                            }
                            &:nth-of-type(2){
                                margin-left: 175px;
                                margin-bottom: 13px;
                                &>p{
                                    
                                    &:nth-of-type(1){
                                        
                                        font-size:24px;
                                        padding-top: 10px;
                                    }
                                    &:nth-of-type(2){
                                        font-size: 15px;
                                        margin-top: 5px;
                                        color: #888;
                                    }
                                    
                                }
                            }   
                            &:nth-of-type(3){
                                border:1px solid #EDEDED;
                                &>ul{
                                    &>li{
                                        color: #333333;
                                        line-height:60px;
                                        font-size: 18px;
                                        font-weight: 400;
                                        cursor: pointer;
                                        margin: 0 15px;
                                        &:nth-of-type(1){
                                            color: #60B346;
                                            border-bottom: 3px solid #60B346;
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

</style>
