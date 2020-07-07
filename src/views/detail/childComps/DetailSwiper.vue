<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item class="item"  v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
        name: "DetailSwiper",
      components: {Swiper, SwiperItem},
      props:{
          topImages:{
            type: Array,
            default(){

            }
          }
      }
    }
</script>

<style scoped>
  .detail-swiper {
    text-align: center;
    height:300px;
     width: 320px;
    /*overflow: hidden;*/
    /*z-index: -1;*/
   }
</style>
