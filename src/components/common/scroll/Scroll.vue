<template>
  <!--  滚动只有一个包含多个标签的元素-->
  <!--    ref如果绑定子组件和div-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<!--父组件通过props属性传递probeType和pullUpLoad给子组件-->
<!--子组件每次滚动事件都会触发父组件的scroll事件函数，其参数为position-->
<!--子组件每次上拉事件都会触发父组件的pullingUp事件-->
<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",

    props: {
      probeType: {
        type: Number,
        default: 0
      },

      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },

    // mounted：处于发起后端请求，获取数据
    mounted() {
      //querySeltor碰到多个class为wrapper怎么处理:this.$refs.wrapper
      //1.创建一个scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        }
      ),

        //2.每次滚动都会触发scroll事件，并执行相关事件
        this.scroll.on('scroll', (position) => {
          // console.log(position)
          this.$emit('scroll', position)
        })
      this.scroll.refresh()

      //3.pullingUp触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。
      //监听上拉加载更多事件：当触发pullingUp事件，怎么触发pullingUp事件？执行相关事件
      if (this.pullUpLoad)
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp')

          //控制多次响应
          //   setTimeout(() => {
          //     this.scroll.finishPullUp()
          //   }, 2000)
        })
    },

    methods: {
      scrollTo(x, y, time = 300) {
        //加载先后导致scroll还未加载就已经调用
        // this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x, y, time)
        this.scroll.scrollTo(x, y, time)
      },

      finishPullUp() {
        this.scroll.finishPullUp()
      },

      refresh() {
        // console.log('-----')
        this.scroll.refresh()
      },

      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }

  }

</script>

<style scoped>

</style>
