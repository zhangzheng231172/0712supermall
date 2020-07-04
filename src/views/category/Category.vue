<template>
  <div class="wrapper">
    <div class="content">
      <button @click="btnClick">按钮</button>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
      <h2>购物车</h2>
    </div>
  </div>


</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },

    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
          prototype: 2,
          click: true,
          pullUpLoad: true
        }
      )
      this.bscroll.on('scroll', (position) => {
        console.log(position)
      })

      this.bscroll.on('pullingUp', () => {
        console.log('上拉加载更多');

        //控制多次响应
        setTimeout(() => {
          this.bscroll.finishPullUp()
        })
      }, 2000)
    },

    methods: {
      btnClick() {
        console.log('btnClick')
      }
    }


  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    /*overflow: scroll;*/
  }
</style>
