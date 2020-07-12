<template>
  <div>
    <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        checked: this.value
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
      value: function (newValue) {
        this.checked = newValue;
      }
    }
  }
</script>

<style scoped>
  .icon-selector {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    margin: 0;
    /*cursor CSS 属性设置光标的类型（如果有），在鼠标指针悬停在元素上时显示相应样式。*/
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
