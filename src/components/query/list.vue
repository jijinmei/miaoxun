<template>
    <div class="list">
        <div>
        </div>

        <div v-if="el_bool.list">
          <!--树木-->
            <div v-if="Ttype=='tree'||Ttype==''">
                <ress v-for="(item,key,index) in tarr" :isground="isG" :tree="item" :key="key"></ress>
            </div>

          <!--花卉-->
            <div v-if="Ttype=='fl'">
                <fl v-for="(item,key,index) in tarr" :tree="item" :key="key"></fl>
            </div>
        </div>
        <div v-show="0">{{watch}}</div>


    </div>
</template>

<script>
import fl from './fl.vue';
import ress from './res.vue';

    export default {
        data(){
            return{
                trees:[],
                ym_type:{"choice":"trees"},
                isG:false,
                el_bool:{list:false},
                tarr:[],
            }
        },
        components:{
            "ress":ress,
            "fl":fl,
        },
        computed:{
            watch(){
              this.trees=this.$parent.trees
                if(this.search.length>0&&this.tarr!=this.search){
                    console.log(123)
                    this.tarr = this.search;
                    this.el_bool.list = true;
                }
            }
        },
        props:{
            search:{
                type:Array,
                "default":function(){
                    return [];
                }
            },
            listBool:{
                type:String,
                "default":function(){
                    return "";
                }
            },
            Ttype:{
                type:String,
                "default":function(){
                    return "";
                }
            }
        },
        methods:{
            change_type(what,_bool){
                let that = this;
                this.ym_type[what] = _bool;

            },
            get_fl(){
                let that = this;
                $.ajax({
                    url:"http://stg-v2-ymboss.leanapp.cn/api/v1/flowers?page=1&sessiontoken=2126eba249887ce83fb527292c047732ff20b143&groupId=private:59e059cfa22b9d0061b2a287&flowerfield_id=5b585776128fe1002f782db1&limit=10&",
                    type:"GET",
                    data:{
                        // sessiontoken:JSON.parse(localStorage.getItem("user")).sessiontoken,
                        // page:2,
                        // flowerfield_id:"5b585776128fe1002f782db1"
                    },
                    success:function(_d){
                        console.log("__",_d)
                        that.tarr = _d.results.data;
                        that.el_bool.list = true;
                    }
                })
            },
            get_trees(){
                let that = this;
                that.trees = JSON.parse(localStorage.getItem('hometrees'));
                that.tarr = JSON.parse(localStorage.getItem('hometrees'));
                if(that.trees){
                    that.el_bool.list = true;
                    return;
                }
                $.ajax({
                    url: that.$store.state.v1+"tree",
                    type:"GET",
                    data:{limit:10,page:1},
                    success:(data)=>{
                        console.log(data)
                        that.el_bool.list = true;
                        that.trees = data.results.data;
                        that.trees.forEach((val)=>{
                          window.makeshowstr(val);
                        })
                        that.tarr = that.trees;
                        console.log(that.trees)
                        localStorage.setItem('hometrees',JSON.stringify(that.trees));
                    },
                    err:(err)=>{
                        console.log(err)
                    }
                })
            }
        },
        mounted:function(){
            // let that = this;
            // if(this.listBool=="home"){
            //     if(this.Ttype=='tree'){
            //         this.get_trees();
            //     }
            //     else if(this.Ttype=='fl'){
            //         this.get_fl();
            //     }
            // }else{
            //     console.log("search",this.search)
            //     if(this.search!=undefined&&this.search.length>0){
            //         console.log("23-23")
            //         this.tarr = this.search;
            //     }
            // }
            // if(location.href.match(/ground/)){
            //     this.isG=true;
            // }
        }
    }
</script>

<style lang="less" scoped>
    .sel_li{
        // border-bottom: 2px solid ;
        background: #60B346;
        color: white !important;
        &>::before{
            content: '123';
            position: absolute;
            top: 26px;
            left: 50%;
            margin-left: -4px;
            width: 0;
            height: 0;
            border: 6px solid #e94646;
            border-color: #e94646 transparent transparent;
            display: none;
        }
    }

    .list{
        padding-top: 20px;
        margin-top:20px;
        background: #F4F4F4;

        &>div:nth-of-type(1){
            // text-align: center;
            margin: 0 auto;
            background: white;

            &>div:nth-of-type(1){

                width:1370px;
                margin: 0 auto;
                border-bottom:1px solid #E3E3E3;
                padding: 0 5px 10px;
                margin-bottom: 20px;
                position: relative;
                &>h2:nth-of-type(1){
                    float: left;
                    margin: 0;
                    font-weight: 100;
                    line-height: 30px;
                }

                &>ul{

                    display: inline-block;
                    margin: 0;
                    padding: 0;
                    margin-left: 30px;
                    top: 4px;
                    &>li{
                        display: inline-block;
                        position: relative;
                        font-size:16px;
                        color: #282828;
                        line-height: 30px;
                        position: relative;

                        margin-right: 20px;
                        cursor: pointer;
                        padding: 2px 14px;
                    }

                }

                &>span:nth-of-type(1){
                    position: absolute;
                    cursor:pointer;
                    display: inline-block;
                    color: #839BB4;
                    font-weight: 400;
                    font-size: 13px;
                    bottom: 14px;
                    right: 8px;
                }
            }
        }

        &>div:nth-of-type(2){
            width: 1240px;
            margin: 0 auto;
            background: #F2F2F2;
            // height: 730px;
            padding-left: 22px;
        }
    }
</style>
