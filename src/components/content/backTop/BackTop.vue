<template>
    <div class="back-top" @click="topClick">
      <img src="~assets/img/common/top.png" alt="">
    </div>
</template>
<!-- 父子组件简单的调用-->
<script>
  export default {
    name: "BackTop",
    methods: {
      topClick: function () {
        this.$emit('backTop');
      }
    }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
