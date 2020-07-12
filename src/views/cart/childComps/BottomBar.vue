<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{$store.getters.cartCount}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
        // reduce()方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
        // toFixed() 方法可把Number 四舍五入为指定小数位数的数字。
      },
      isSelectAll: function () {
        //找到一个未选中，返回false；全部选中，则返回true
        return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
    background-color: #eee;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);

    font-size: 14px;
    color: #888;
    line-height: 44px;
  }

  .bottom-menu .select-all {
    position: absolute;
    left: 12px;
    top: 13px;

    line-height: 0;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    width: 100px;
    height: 44px;
    float: right;
    background-color: orangered;
    color: #fff;
    text-align: center;
    line-height: 44px;
  }
</style>
