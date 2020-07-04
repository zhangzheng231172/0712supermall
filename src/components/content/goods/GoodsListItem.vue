<template>
  <div class="goods-item" @click="itemClick">
    <!--    vue中@load监听图片加载完成-->
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span claa="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<!--父组件GoodsList通过props属性将绑定的goodsItem变量传递给子组件GoodsListItem-->
<!--子组件加载完图片通过事件总线发送事件itemImageLoad给父父组件Home-->
<!--子组件点击事件触发当前路由路径的跳转改变-->
<script>
  export default {
    name: "GoodsListItem",

    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    computed:{
      // 根据图片数据不同的来源和索引动态显示图片
      showImage() {
        // console.log(this.goodsItem)
         return this.goodsItem.image || this.goodsItem.show.img
      }
    },

    methods: {
      imageLoad() {
        // console.log('imageLoad')
        //通过事件总线发送事件
        this.$bus.$emit('itemImageLoad')
        // console.log(this.$bus)
      },
      itemClick() {
        console.log('跳转到详情页')
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border: 3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
