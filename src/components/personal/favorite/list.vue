<template>
    <div class="list">
        <div>
            <div class="left">
                <ul>
                    <li :class="{liSel:el_bool.li==1}" @click="change_bool('li',1)">苗木</li>
                    <li :class="{liSel:el_bool.li==2}" @click="change_bool('li',2)">花卉</li>
                    <li :class="{liSel:el_bool.li==3}" @click="change_bool('li',3)">园林建材</li>
                    <li :class="{liSel:el_bool.li==4}" @click="change_bool('li',4)">清场</li>
                </ul>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            srcc:"",
            token:'',
            el_bool:{li:1},
        }
    },
    components:{

    },
    methods:{
       change_bool(where,index){
           let that = this;
           that.el_bool[where] = index;
       }
    },
    mounted:function(){
        let that = this;
        that.srcc = this.$store.state.srcc;
        that.token = localStorage.getItem("token");
    }
}
</script>

<style lang="less" scoped>

    .liSel{
        background: #60B346 !important;
        color: white !important;
    }

    .list{
        margin-top:5px;
        &>div{
            &:nth-of-type(1){
                background:white;
                border-radius: 3px;
                width:1220px;
                margin:0 auto;
                height: 930px;
                &>.left{
                    display: inline-block;
                    width: 210px;
                    border-right: 2px solid #F2F2F2;
                    height: 100%;
                    border-radius: 3px;
                    overflow: hidden;
                    &>ul{
                        width: 100%;
                        &>li{
                            display: block;
                            line-height: 44px;
                            font-size: 14px;
                            padding: 0 45px;
                            text-align: left;
                            cursor: pointer;
                            &:hover{
                                background: #F4F5F7;
                                color: #60B346;
                            }
                        }
                    }
                }
                &>.right{
                    display: inline-block;
                    vertical-align: top;
                    width:1003px;
                    height: 930px;
                    overflow: hidden;
                    &:hover{
                        overflow-y: scroll !important;
                    }
                }
            }
        }
    }

</style>
