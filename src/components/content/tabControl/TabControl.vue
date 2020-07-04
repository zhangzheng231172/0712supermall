<template>
  <!--  没有必要用插槽-->
  <div class="tab-control">
    <!--         index为titles数组下标-->
    <div class="tab-control-item"
         v-for="(item,index) in titles"
         :key="item.message"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>

</template>
<!--父组件通过props传递titles数据子组件，-->
<!--子组件监听tab-control-item的click事件，触发父组件的tabClick函数方法，其参数为index-->
<script>
  export default {
    name: "TabControl",

    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },

    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control {
    position: sticky;
    top: 44px;

  }


  /*布局正确*/
  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  /*点击效果没做出来*/
  .active {
    color: red;
    /*color: var(--color-highlight-text);*/
  }

  .active span {
    border-bottom: 3px solid red;
    /*border-bottom: 3px solid var(--color-tint);*/
  }

</style>
