<template>
    <div class="home">
        <headers></headers>
        <div class="center">
            <div v-if="user!=''">
                <div>
                    <img :src="srcc+'/static/img/common/ground_bg.jpg'" @load="img_load($event)">
                </div>
                <div>
                    <div>
                        <img :src="user.avatar.url">
                    </div>
                    <div>
                        <p>{{user.nickname}}</p>
                        <p>{{""}}</p>
                    </div>
                    <div>
                        <ul>      
                            <li :class="{Tli:el_bool.Tli==1}" @click="router_go('p_home',1)">首页</li>                      
                            <li :class="{Tli:el_bool.Tli==2}" @click="router_go('fav_tree',2)">收藏夹</li>                                          
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
        <router-view></router-view> 
    </div>
</template>

<script>
import headers from "../common/headers.vue";
export default {
    data(){
        return{
            srcc:"",
            user:"",
            el_bool:{Tli:1}
        }
    },
    components:{
        "headers":headers,
    },
    methods:{
        router_go(where,index){
            let that = this;
            this.el_bool.Tli = index;
            this.$router.push({name:where})
        },
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
        login(){
            let that = this;
            $.ajax({
                url:that.$store.state.v1+"login",
                type:"POST",
                data:{mobile:"15019796460",password:"HUI123456"},
                success:data=>{
                    console.log(data);
                    if(data.status==1){
                        localStorage.setItem("user",JSON.stringify(data.results));
                        that.token = data.results.sessiontoken;
                        localStorage.setItem("token",that.token);
                        console.log(that.token)
                    }else{
                        alert(data.err.message);
                    }
                    
                },
                error:err=>{
                    alert(err);
                    console.log(err);
                }
            })
        }
    },
    mounted:function(){
        let that = this;        
        that.srcc = this.$store.state.srcc;
        that.token = localStorage.getItem("token");
        that.user = JSON.parse(localStorage.getItem("user"));
        if(that.token==null){
            this.login();            
        }else{
            that.user = JSON.parse(localStorage.getItem("user"));
        }
    }
}
</script>

<style lang="less" scoped>
    .Tli{
        color: #60B346 !important;
        border-bottom: 3px solid #60B346 !important;
    }
    .home{
        &>.center{
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
                                            min-height:20px;
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
    }
</style>
