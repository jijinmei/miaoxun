<template>
  <div class="bai">
  <div class="bai pL10 pR10 margin" style="width:1200px;" v-if="flower!='no'">
    <p class="f15 c666666 pB10 pT50 border-b pL10 pR10">
      <router-link :to="{name:'query_ground',params:{id:flower.fl_flowerfield.objectId}}"  target="_blank"><span class="cursor hover">{{flower.fl_flowerfield.gff_name}}苗圃场</span> </router-link>
       >
      <span class="c36c748">{{flower.fl_name}}</span></p>

    <div class=" mT30" style="height:520px;">
      <div class="w300  lf pT11 pB11 pL10 pR10 mR07" style="height:436px;">
        <div class="w298 h363 border overflow bgeeeeee relative">
          <!--<img :src="nowimg.indexOf('?')!=-1?nowimg+'|'+imageView22:nowimg+'?'+imageView22" class="jz cursor">-->
            <img :src="nowimg" class="jz cursor w100s" preview='bigflowerx'>
        </div>
        <!--轮播图-->
            <viewer >
        <div class="relative w300 mT05 h68">
          <div class="swiper-container swiper-containerf z_00">
            <div class="swiper-wrapper">
              <div class="swiper-slide overflow w62 h62"  v-for="(item,index) in flower.fl_photo" @mouseenter="enterurl(item)">
                <!--<img :src="item.url" class="jz cursor w100s" preview='flowerx'>-->
                    <img style="cursor: -webkit-zoom-in;cursor: zoom-in;" :data-original="item.url" :src="item.url" class="jz cursor w100s">
              </div>

            </div>
            <div class="swiper-button-prev swiper-button-prevf swiper-button-black" v-show="flower.fl_photo.length>0"></div>
            <div class="swiper-button-next swiper-button-nextf swiper-button-black" v-show="flower.fl_photo.length>0"></div>
          </div>
        </div>
           </viewer>




      </div>
      <div class=" lf mL10 border-t pT15 pB15 pL10 pR10" style="width:516px;height:431px;">
         <p class="f25 mB15 bold diandiandian1">{{flower.fl_name}}</p>
         <div class="h300 pT05 pB05 pL20 pR20 bgf5f5f5 c999999 f14">
             <p class="mT13 mB13">
                <span class="inline w60">商品描述</span>
                <span class="mL15 mR15">:</span>
                <span class="mL15">{{flower.fl_spec}}</span>
             </p>
              <p class="mB13">
                <span class="inline w60">地址</span>
                <span class="mL15 mR15">:</span>
                <span class="mL15">{{flower.fl_flowerfield.gff_address.province}}{{flower.fl_flowerfield.gff_address.city}}</span>
             </p>
              <p class="mB13">
                <span class="inline w60">创建时间</span>
                <span class="mL15 mR15">:</span>
                <span class="mL15">{{flower.createdAt}}</span>
             </p>


         </div>
           <p class="mT20">
                <span class="f20 c777777">价格：</span>
                <span class="f20 cff2b2b">{{flower.fl_price==-1?"面议":"￥"+flower.fl_price}}</span>
                <span class="f12 c999999">(库存{{flower.fl_stock}}株)</span>
              </p>
      </div>
      <div class="rf border w260 relative pL20 pR20 pT10 pB10" style="height:432px;">
         <div class="radius50 w70 h70 overflow margin">
                <img :src="flower.fl_flowerfield.gff_ico.indexOf('?')!=-1?flower.fl_flowerfield.gff_ico+'|'+imageView70:flower.fl_flowerfield.gff_ico+'?'+imageView70" class="w100s">

              </div>

              <div class="h400 w100s" style="border-radius:0 !important;">
                <p class="f15 mT15 mB05">花圃场：<span class="f20">{{flower.fl_flowerfield.gff_name}}</span></p>
                <p class="f15 mT15 mB05">联系人：<span class="f20">{{flower.fl_flowerfield.gff_contacts}}</span></p>
                <p class="f15 mT15 mB05">联系电话：<span class="f20">{{flower.fl_flowerfield.gff_contact_number}}</span></p>
                <!--<img :src="datas.user.avatar" class="cursor w100sstyle="border-bottom:3px dashed #cccccc;"">-->
                <hr class="mT25 mB25" >
                <div class="w250">
                  <div class="radius50 w70 h70 overflow margin">
                    <img :src="flower.user.avatar.indexOf('?')!=-1?flower.user.avatar+'|'+imageView2:flower.user.avatar+'?'+imageView2" class="cursor w100s">

                    </div>
                  <p class="f15 mT15 mB05">发布者：<span class="f20">{{flower.user.nickname}}
                              <!--<img class="call w30 h30 cursor" src="/static/img/common/call.png"  @click="call_sel(flower)">-->
                              </span></p>
                  <p class="f15 mT10">发布者电话： <span class="f20">{{flower.user.mobilePhoneNumber}}</span></p>
                </div>
              </div>
      </div>
    </div>


    <div class="mB45">
      <p class="f14 c000000 border-b pB12 mB20">同场花卉</p>
       <listFlower :flower="flowers" style="width:1240px;" class="margin" v-if="flowers!='no'"></listFlower>
    </div>

    <chats style="display:none;" ref="c1"></chats>
  </div>
   <div v-show="0">{{watch}}</div>
</div>
</template>

<script>
  import listFlower from "./listFlower.vue";
  import chats from "./search_news.vue";
  export default {
    data() {
      return {
         page:1,
        limit:7,
        imageView2: "imageView2/1/w/62/h/62",
         nowimg:'',
         imageView22: "imageView2/1/w/298/h/363",
        flower: 'no',
         flowers: 'no',
         imageView70: 'imageView2/1/w/70/h/70'
      }
    },
    components: {
      "listFlower": listFlower,
      "chats":chats
    },
    computed: {
      watch(){
          if(this.$route.params.id!=this.flower.objectId){
              this.getflower();
          }
      }
    },
    methods: {
            //联系卖家
      call_sel(item) {
        console.log(item)
        // return
        let that = this;
        if (localStorage.getItem("user") == null) {
          this.$store.state.login_el_bool = true;
        } else {
          // 点击头像调用对话函数
           console.log(vm)
            this.$refs.c1.otherChats(item)


        }


      },
      getground(){

          // var aa=this.flower.fl_flowerfield.groupId;
          // $.ajax({
          //     url:Boss+"group/"+aa+"/flowerfield",
          //     data:{limit:that.limit,page:that.page,sessiontoken:that.$store.state.user.sessiontoken},
          //     timeout: 15000,
          //     type:"GET",
          //     success:function(data){
          //         console.log("更多花卉获取：成功");
          //         console.log(data)
          //         that.flowers =data.results.data;
          //     }
          // })
      },
      toswiper(){
        setTimeout(function(){
          var swiper = new Swiper('.swiper-containerf', {
              pagination: '.swiper-pagination',
              slidesPerView: 4,
              centeSlides: false,
              slidesPerColumn: 1,
              paginationClickable: true,
              prevButton: '.swiper-button-prevf',
              nextButton: '.swiper-button-nextf',
              spaceBetween: 13
            });
        },500)
      },
      enterurl(item){
        // alert(item.url)
        this.nowimg=item.url
      },
      getflower() {
        var that = this;
        $.ajax({
          url: Boss + "flowers/" + that.$route.params.id,
          data: { 'sessiontoken': that.$store.state.user.sessiontoken,'include':'other' },//附加参数 include=other时，返回同花场的花卉
          type: "GET",
          success: (data) => {
            console.log(data)
            if(data.status){
                   that.flower = data.results;
                   that.flowers=data.results.other
                     console.log('that.flowers')
                   console.log(that.flowers)
            that.nowimg=(data.results.fl_photo.length!=0?data.results.fl_photo[0].url:'')
            that.toswiper()
            //  that.getground()
            }else{
              layuiError(data)
            }
          },
           error: function (data) {
            layuiError(data)
          }
        })
      }

    },
    mounted: function () {
      this.getflower();
      //  this.getTs();
    }
  }

</script>

<style lang="less" scoped>
    /*swiper*/
  .swiper-containerf {
    width: 300px;
    height: 68px;
  }
.swiper-button-nextf, .swiper-button-prevf{height: 20px;}


  .swiper-containerf .swiper-slide {
    height:68px;
  }
  .swiper-containerf .swiper-slide:hover {
                  box-shadow: 0 0 10px rgba(0, 0, 1, 0.5);
                }
  .hover:hover{color:red;}
</style>
