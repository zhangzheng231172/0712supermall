<template>
  <nav-bar class="detail-nav">
    <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg">
    <div class="title" slot="center">
      <span class="title-item"
            v-for="(item, index) in titleInfos" :key="index"
            :class="{'active': index===currentIndex}" @click="itemClick(index)">
        {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",

    components: {
      NavBar
    },

    data() {
      return {
        titleInfos: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },

    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },

      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    z-index: 100;
    background-color: #fff;
    font-weight: normal;
    /*这个属性只用于iOS (iPhone和iPad)。当你点击一个链接或者通过Javascript定义的可点击元素的时候，它就会出现一个半透明的灰色背景。*/
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .title {
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .title-item.active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 12px;
  }
</style>
