<template>
    <router-link  :to="{name:'query_flower',params:{id:tree.objectId}}"   target="_blank">
    <div    class="tree" :class="{h403:isground,showbr:el_bool.all_br}" @mouseenter="change_bool('all_br',true)" @mouseleave="change_bool('all_br',false)">
        <div v-if="tree">
            <div>
                <!--<img :src="tree.fl_photo.length>0?tree.fl_photo[0].url+imageView2:''" >-->
                 <img :src="tree.fl_photo.length>0?(tree.fl_photo[0].url.indexOf('?')!=-1?tree.fl_photo[0].url+'|'+imageView2:tree.fl_photo[0].url+'?'+imageView2):''"  draggable="false">
            </div>
            <div>
                <span>{{tree.fl_name}}</span>
                <span v-show="0"></span>
                <span>{{tree.fl_city}}</span>
                <p>{{tree.fl_spec}}</p>
                <div>
                    <span>{{tree.fl_price==-1?"面议":tree.fl_price+"元"}}</span>
                    <span>{{"库存："+tree.fl_stock}}</span>
                </div>
            </div>
            <div>
                <div class="w24 h24 overflow">
                    <!--<img :src="tree.fl_flowerfield.gff_ico[0]+imageView3"  class="w100s">-->
                      <img :src="tree.fl_flowerfield.gff_ico.indexOf('?')!=-1?tree.fl_flowerfield.gff_ico+'|'+imageView3:tree.fl_flowerfield.gff_ico+'?'+imageView3"  draggable="false">
                </div>
                <span>{{tree.fl_flowerfield.gff_name}}</span>
            </div>
        </div>
    </div>
    </router-link>
</template>

<script>
    export default {
        data(){
            return{
               imageView2:'imageView2/1/w/207/h/276',
                imageView3:'imageView2/1/w/24/h/24',
                el_bool:{all_br:false}
            }
        },
        props:{
            tree:{
                type:Object,
                "default":function(){
                    return {};
                }
            },
            isground:{
                type:Boolean,
                "default":function(){
                    return false;
                }
            },
        },
        methods:{
            // img_load(e){
            //     let ee = $(e.currentTarget);
            //     let ew = ee.width();
            //     let eh = ee.height();
            //     let pw = ee.parent().width();
            //     let ph = ee.parent().height();
            //     if(pw>ew&&ph==eh){
            //         ew = pw;
            //         ee.css({width: ew+"px",height:"auto"})
            //         eh = ee.height();
            //     }else if(ph>eh&&pw==ew){
            //         eh = ph;
            //         ee.css({height: eh+"px",width:"auto"})
            //         ew = ee.width();
            //     }
            //     ee.css({
            //         bottom: (eh-ph)/2+"px",
            //         right: (ew-pw)/2+"px"
            //     })
            // },
            // show_tree(){
            //     let that = this;
            //     this.$router.push({name:"query_tree",params:{id:that.tree.objectId}});
            //     localStorage.setItem("show_tree",JSON.stringify(that.tree));
            // },
            // show_tree(){
            //     let that = this;
            //     window.open(URL+'query/flower/'+that.tree.objectId)
            //     localStorage.setItem("show_tree",JSON.stringify(that.tree));
            // },
            change_bool(what,_bool){
                let that = this;
                this.el_bool[what] = _bool;

            },
        },
        mounted:function(){
        }
    }
</script>

<style lang="less" scoped>
    .h403{
        height:403px !important;
    }
    .showbr{
        // border:1px solid #B2421B !important;
    }
    .tree{
        cursor: pointer;
        background: white;
        width: 224px;
        display: inline-block;
        border-radius: 6px;
        margin: 0 20px 20px 0;
        height: 447px;
        border: 2px solid #F4F5F7;
        overflow: hidden;
        &>div:nth-of-type(1){

            &>div:nth-of-type(1){
                width: 203px;
                margin: 10px auto;
                height: 276px;
                overflow: hidden;
                // border-radius: 6px;
                &>img:nth-of-type(1){
                    height:100%;
                    position: relative;
                }
            }

            &>div:nth-of-type(2){

                position: relative;
                padding: 0px 16px 7px;
                height: 100px;
                &>span:nth-of-type(1){
                    display: inline-block;
                    font-size: 20px;
                    vertical-align: middle;
                    color:#333;
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                &>span:nth-of-type(2){
                    display: inline-block;
                    font-size:14px;
                    color:#60B346;
                    vertical-align: middle;
                    position: relative;
                    right: 4px;
                }
                &>span:nth-of-type(3){
                    display: inline-block;
                    font-size:14px;
                    color:#BBBBBB;
                    float:right;

                }
                &>p{
                    font-size:12px;
                    color: #999899;
                    margin: 0;
                }
                &>p:nth-of-type(1){
                    margin-top: 2px !important;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                &>p:nth-of-type(2){
                    // margin-top: 3px !important;
                }
                &>div:nth-of-type(1){

                    position: absolute;
                    bottom: 6px;

                    &>span:nth-of-type(1){
                        color: #74B22B;
                        font-size:17px;
                    }
                    &>span:nth-of-type(2){
                        color: #999899;
                        font-size:13px;
                        display: inline-block;
                        margin-left: 13px;
                    }
                }
            }

            &>div:nth-of-type(3){
                border-top: 1px solid #EEEEEE;
                width: 200px;
                padding: 9px 13px;
                &>div:nth-of-type(1){
                    width:24px;
                    height:24px;
                    overflow: hidden;
                    border-radius: 25px;
                    display:inline-block;
                    vertical-align: middle;
                    &>img:nth-of-type(1){
                        width:24px;
                    }
                }
                &>span:nth-of-type(1){
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 15px;
                    color: #4A494B;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 170px;
                }
            }

        }
        &:hover{
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
    }
</style>
