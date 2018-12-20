<template>
    <div class="chat">
        <div :class="{owidth:el_bool.oifr,cheight:!el_bool.chat}">
            <!--<iframe v-if="el_bool.ifr" :src="srcc+'static/h5/chat/miao_chat.html'" frameborder="0"></iframe>-->
             <!--<miaoChat v-if="el_bool.ifr"></miaoChat>-->
        </div>
        <div v-show="0">{{watch}}</div>
    </div>
</template>

<script>
  import miaoChat from './miaoChat.vue';
export default {
    data(){
        return{
            el_bool:{oifr:false,chat:false,ifr:false},
            srcc:"",

        }
    },
    computed:{
        watch(){
            this.el_bool.chat = this.$store.state.chat_bool;
            let that = this;
            if(this.$store.state.ifr == 1){
                that.el_bool.oifr = true;
            }else if(this.$store.state.ifr == 0){
                that.el_bool.oifr = false;
            }
        }
    },
    components:{
  "miaoChat":miaoChat
    },
    methods:{

    },
    mounted:function(){
        let that = this;
        this.srcc = this.$store.state.srcc;
        this.el_bool.chat = this.$store.state.chat_bool;
        if(localStorage.getItem("user")){
             that.el_bool.ifr = true;
        }

        // aaa()
    }
}
</script>

<style lang="less" scoped>
    .cheight{
        height:0px !important;
    }
    .owidth{
        width:1090px !important;
    }
    .chat{
        position: fixed;
        &>div{
            &:nth-of-type(1){
                position: fixed;
                right: 0;
                bottom: 0;
                height: 665px;
                width: 290px;
                overflow: hidden;
                transition: 0.5s all;
                &>iframe{
                    height: 665px;
                    overflow: hidden;
                    width: 1090px;
                }

            }
        }
    }
</style>
