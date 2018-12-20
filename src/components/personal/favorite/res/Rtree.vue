<template>
    <div class="tree">
        <div v-if="el_bool.all">
            <div>
                <img :src="tree.mu_photo[0].url">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            el_bool:{all:false},
        }
    },
    props:{
        tree:{
            type:Object,
            "default":function(){
                return {};
            }
        }
    },
    methods:{

    },
    mounted:function(){
        if(this.tree!=undefined){
            this.el_bool.all = true;
            console.log("Rtree--",this.tree)
        }
    }
}
</script>

<style lang="less" scoped>
    .tree{
        width:400px;
        background: black;
        &>div:nth-of-type(1){
            width:100%;
            &>div{
                overflow: hidden;
                &>img{
                    position: relative;
                    width:100%;
                }
            }
        }
    }
</style>
