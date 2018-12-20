<template>
  <div class="header">
      <div>
        <div>
            <img :src="srcc+'/static/img/common/logo.png'">
        </div>
        <div>
            <search></search>
        </div>
      </div>
  </div>
</template>

<script>
import search from "../home/ym_type.vue";
export default {
  data(){
    return{
      srcc:'',
      Rname:'',
      tree_bool:false,
    }
  },
  computed:{
      watch(){
        this.Rname = this.$route.name;
      }
  },
  components:{
      "search":search,
  },
  methods:{
    
  },
  mounted:function(){
    var that = this;
    this.srcc = this.$store.state.srcc;
  }
}
</script>

<style scoped lang="less">
    .header{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        z-index: 555;
        background: white;
        &>div{
            &:nth-of-type(1){
                padding: 10px 30px;
                height: 40px;
                &>div{
                    &:nth-of-type(1){
                        width:40px;
                        height:40px;
                        overflow: hidden;
                        float: left;
                        &>img{
                            position: relative;
                            width: 100%;
                        }
                    }
                    &:nth-of-type(2){
                        float:right;
                    }  
                }
            }
            
        }
    }

</style>