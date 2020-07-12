<template>
  <!--父子组件通过插槽slot传递HTML元素-->
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
    }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    /*设置盒子阴影及阴影颜色*/
    box-shadow: 0px -1px 1px rgba(100,100,100,0.1);
    line-height: 44px;
    text-align: center;
  }

  .left, .right {
    width: 70px;
  }

  .center {
    /*flex去除已使用的主轴长度，剩余长度与剩余数的比值*/
       flex: 1;
   }

</style>
