<template>
  <div class="toast" v-show="Show">
    <span class="text">{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      Show: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

<style scoped>
  .toast {
    font-size: 16px;
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    margin: auto;
    padding: 8px 15px;
    transform: translate(-50%, -50%);
    color: black;
    background-color: #fff;
  }

</style>
