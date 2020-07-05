<template>
  <div class="toast" v-show="Show">
    <span>{{ message }}</span>
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
    },

    // methods: {
    //   toastShow(message, duration = 3000) {
    //     this.isShow = true;
    //     this.message = message;
    //     setTimeout(() => {
    //       this.isShow = false;
    //       this.message = "";
    //     }, duration);
    //   }
    // }
  }
</script>

<style scoped>
  .toast {
    font-size: 16px;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin: auto;
    padding: 8px 15px;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
  }
</style>
