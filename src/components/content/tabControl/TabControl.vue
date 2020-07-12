<template>
  <!--  没有必要用插槽-->
  <div class="tab-control">
    <!-- index为titles数组下标-->
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
    height: 40px;
    background-color: #fff;

    line-height: 40px;
    text-align: center;
    font-size: 15px;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  /*激活某个选型才启用的样式*/
  /*var(--color-high-text)读取变量--color-high-text*/
  .active {
    color: red;
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid red;
    border-bottom: 3px solid var(--color-tint);
  }

</style>
