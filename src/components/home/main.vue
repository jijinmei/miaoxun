<template>
  <div>
      <!-- <headers></headers> -->
      <headers1></headers1>
      <router-view></router-view>
      <!-- <bottoms></bottoms> -->
  </div>
</template>

<script>
import headers from '../common/header.vue';
import headers1 from '../common/headers.vue';
import bottoms from '../common/bottom.vue';
export default {
  data(){
    return{
      is_left:true,
      srcc:'',
    }
  },
  components:{
      'headers':headers,
      'headers1':headers1,
      'bottoms':bottoms,
  },
  methods:{
    change_left(bool){
        this.is_left = bool;
    }
  },
  mounted:function(){
    var that = this;
    this.srcc = this.$store.state.srcc;
  }
}
</script>

<style scoped lang="less">
    
</style>