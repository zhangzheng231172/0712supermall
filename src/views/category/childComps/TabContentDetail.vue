<template>
  <div class="tab-content-detail">
      <goods-list-item  v-for="item in categoryDetail" :key="item.link"
                                class="goods-item" :goodsItem="item">
      </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "components/content/goods/GoodsListItem";
  // import TabContentDetailItem from "./TabContentDetailItem";

  export default {
    name: "TabContentDetail",
    components: {
      GoodsListItem,
      // TabContentDetailItem
    },
    props: {
      categoryDetail: {
        type: Array,
      }
    }
  }
</script>

<style scoped>
   .tab-content-detail {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
   }
</style>
