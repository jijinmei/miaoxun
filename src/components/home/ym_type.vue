<template>
    <div class="ym_left_type">

        <div>
            <span @click="change_bool('search_type',!el_bool.search_type,$event)">
                {{search_type}}
                <img :src='srcc+"static/img/common/xiabiao.png"' :class="{rotate180:el_bool.search_type}"/>
            </span>
            <ul v-show="el_bool.search_type">
                <li v-for="(item,index) in search_list" @click="change_bool('search_type',false,$event)" @mouseenter="change_bool('sel_li',index,$event)" @mouseleave="change_bool('sel_li',-1,$event)" :class="{sel_type:index==el_bool.sel_li}">{{item.name}}</li>
            </ul>
            <input type="text" @keyup="enter($event)" placeholder="请输入您要搜索的内容">
            <span @click="router_go('ym_search')">搜索</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            el_bool:{search_type:false,sel_li:-1},//el的显示 和一些效果控制
            search_type:"类型",
            srcc:"",
            search_list:[{name:"苗木",ro:"trees"},{name:"花卉",ro:"flower"}],
            li_list:[
                {name:"苗木",ro:"trees"},{name:"花卉",ro:"flower"},{name:"建材",ro:"building"},
                {name:"辅材",ro:"auxiliary"},{name:"求购",ro:"buys"},{name:"招租转让",ro:""},
                {name:"招聘",ro:""},{name:"更多分类",ro:""}
            ],
        }
    },
    computed:{
        
    },
    methods:{
        router_go(where){
            this.$router.push({name:where});
        },
        change_bool(what,_bool,e){
            let that = this;
            this.el_bool[what] = _bool;
            if(what == 'search_type'&&!_bool){
                that.search_type = $(e.currentTarget).text();
            }
        },
        enter(e){
            let that = this;
            if(e.keyCode==13){
                that.router_go("ym_search");
            }
        },
        go(where){
            if(where==""){
                return;
            }
            this.$router.push({name:where});
        }
    },
    mounted:function(){
        var that = this;        
        this.srcc = this.$store.state.srcc;
    }
} 
</script>

<style lang="less" scoped>

    .rotate180{
        transform: rotate(-180deg);
    }

    .sel_type{
        background: #A6C7FF !important;
        color:white;
    }

    .ym_left_type{
        background: white;
        width: 500px;
        margin: 0 auto;
        &>div:nth-of-type(1){
            border: 1px solid #e3e4e5;
            line-height: 40px;
            margin-top: 5px;
            width: 500px;
            margin-right: 15px;   
            position: relative;    
            &>span:nth-of-type(1){
                line-height: 40px;
                display: inline-block;
                vertical-align: middle;
                width: 80px;
                text-align: center;
                cursor: pointer;
                position: relative;
                &>img:nth-of-type(1){
                    position: absolute;
                    bottom: 16px;
                    right: 7px;
                }
            }  
            &>span:nth-of-type(2){
                line-height: 49px;
                display: inline-block;
                vertical-align: middle;
                width: 105px;
                text-align: center;
                cursor: pointer;
                background: #82ECAA;
                color: white;
                float: right;
            }
            &>ul{
                position: absolute;
                margin: 0;
                padding: 0;
                z-index: 5;
                left: 0;
                top: 48px;      
                &>li{
                    background: white;
                    border: 1px solid #e3e4e5;
                    border-top: none;
                    display: block;
                    width: 84px;
                    text-align: center;
                    cursor: pointer;
                }
                &>li:nth-of-type(1){
                    border-top: 1px solid #e3e4e5 !important;
                }
            }
            &>input{
                border: none;
                line-height: 36px;
                font-size: 15px;
                padding: 6px;
                width: 297px;
                border-left:1px solid #e3e4e5;
            }
            
        }
    }
</style>
