<template>
    <div>
        <headers></headers>        
        <router-view></router-view>        
    </div>
</template>


<script>
import headers from "../common/headers.vue";
export default {
    data(){
        return{
        
        }
    },
    components:{
        "headers":headers,
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
        
    }
}
</script>
