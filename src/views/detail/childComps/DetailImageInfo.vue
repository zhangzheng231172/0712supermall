<template>
  <div class="image-info" v-if="Object.keys(imagesInfo).length !== 0">

    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ imagesInfo.desc }}</div>
      <div class="end"></div>
    </div>

    <div :key="index" v-for="(item, index) in imagesInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          :key="imageIndex"
          :src="image"
          @load="imgLoad"
          alt=""
          v-for="(image, imageIndex) in item.list"
        />
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailImageInfo",
    props: {
      imagesInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    methods:{
      imgLoad() {
        // console.log('imgLoad')
        this.$emit('detailImgLoad')
        // this.$bus('detailImgLoad')
      }
    }
  }
</script>

<style scoped>
  .image-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  /*直线看做是有宽度的矩形盒子，设置盒子背景颜色和宽度即可绘制直线*/
  .info-desc .start,
  .info-desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }

  /*.info-desc .start {*/
  /*  float: left;*/
  /*}*/

  /*浮动到盒子右侧*/
  .info-desc .end {
    float: right;
  }

  /*绘制黑色小矩形*/
  .info-desc .start::before,
  .info-desc .end::after {
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    content: "";
    background-color: #333333;
  }

  .info-desc .end::after {
       right: 0;
     }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    font-size: 15px;
    color: #333333;
  }

  .info-list img {
    width: 100%;
  }
</style>
