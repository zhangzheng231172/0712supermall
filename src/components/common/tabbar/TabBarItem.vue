<template>
  <div class="tab-bar-item" @click="itemClick">

    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",

    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },

    data() {
      return {
        // isActive: false
      }
    },

    computed: {
      isActive() {
        //获取当前路由地址是否包含/home或/profile，以确定是否替换图片
        //this指向TabBarItem组件
        return this.$route.path.indexOf(this.path) !== -1
      },

      activeStyle() {
        //确定当前路由地址是否选中，选中的情况下启用{color: this.activeColor}样式
        return this.isActive ? {color: this.activeColor} : {}
      }
    },

    methods: {
      itemClick() {
        //点击插槽时，将路由替换成当前path，仅改变网站部分内容
        this.$router.replace(this.path)
      }
    }
  }
</script>

<!--flex 规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间-->
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    /*font-size: 14px;*/
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active {
    color: red;
  }
</style>
