<template>
    <div class="tr">
        <ul v-if="trees!=''">
            <li v-for="(item,index) in trees">
                <tree :tree="item" style="margin-right:0;"></tree>
            </li>
        </ul>
    </div>
</template>

<script>
import tree from "../../query/res.vue";
export default {
    data(){
        return{
            srcc:"",
            trees:"",
        }
    },   
    components:{
        "tree":tree,
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
        getT(){
            String.prototype.myReplace=function(f,e){//吧f替换成e
                var reg=new RegExp(f,"g"); //创建正则RegExp对象   
                return this.replace(reg,e); 
            }
            let that = this;
            let pdata = {
                            "ispublish": 1,
                            // "where":JSON.stringify(ww).myReplace('"','\"'),
                        };
            $.ajax({
                url:that.$store.state.v1+"tree",
                type:"GET",
                data:pdata,
                headers: {
                    "role": "seller",
                },
                success:_d=>{
                    console.log("苗木信息",_d.results.data)
                    _d.results.data.forEach((val)=>{
                        window.makeshowstr(val);                              
                    })
                    that.trees = _d.results.data;
                },
                error:e=>{
                    console.log(e)
                }
            })
        }
    },
    mounted:function(){
        this.srcc = this.$store.state.srcc;
        this.getT();
    }
}
</script>

<style lang="less" scoped>

    .tr{
        &>ul{
            padding: 20px 0;
            &>li{
                margin-left:16px;
            }
        }
    }
</style>
