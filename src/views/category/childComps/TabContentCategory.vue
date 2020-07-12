<template>
  <!--  <div id="tab-content-category">-->
  <!--    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategory.list">-->
  <!--      <div class="item"-->
  <!--           v-for="(item,index) in subcategory.list"-->
  <!--           :key="index">-->
  <!--        <a :href="item.link">-->
  <!--          <img class="item-img" :src="item.image" alt="">-->
  <!--          <div class="item-text">{{item.title}}</div>-->
  <!--        </a>-->
  <!--      </div>-->
  <!--    </grid-view>-->
  <!--  </div>-->

  <div id="tab-content-category">
    <div class="item"
         v-for="(item,index) in subcategory.list"
         :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>


</template>

<script>
  // import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      // GridView
    },
    props: {
      subcategory: {
        type: Object,
      }
    }
  }
</script>

<style scoped>
  #tab-content-category {
    /*1.定位*/
    position: relative;
    width: 100%;
    overflow: scroll;

    /*2.布局*/
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
  }

  /*.panel img {*/
  /*  width: 100%;*/
  /*}*/

  .item {
    flex-grow: 1;
    width: calc(100%/3);
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }

  /*设置最后一行的元素左对齐*/
  /* 如果最后一行是2个元素 */
  .item:last-child:nth-child(3n - 1) {
    margin-right: calc(33% + 1% / 3);
  }
  /* 如果最后一行是1个元素 */
  .item:last-child:nth-child(3n - 2) {
    margin-right: calc(66% + 2% / 3);
  }

  /*.item:not(:nth-child(3n)) {*/
  /*  margin-right: calc(1% / 3);*/
  /*}*/
</style>

