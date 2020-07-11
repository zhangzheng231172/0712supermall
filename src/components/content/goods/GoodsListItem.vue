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
        console.log(this.goodsItem)
        // let imgSrc;
        // if(this.goodsItem.image){
        //   imgSrc=this.goodsItem.image
        //   console.log(imgSrc)
        // }
        // else if(this.goodsItem.show.img){
        //   imgSrc=this.goodsItem.show.img
        //   console.log(imgSrc)
        // }
        // else{
        //   imgSrc=this.goodsItem.img
        //   console.log(imgSrc)
        // }
        // return imgSrc
         return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
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
    position: relative;
    width: 48%;
    padding-bottom: 40px;

  }

  .goods-item img {
    width: 100%;
    border: 3px solid var(--color-tint);
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    overflow: hidden;
    bottom: 5px;
    left: 0;
    right: 0;

    font-size: 12px;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    margin-bottom: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods-info .price {
    margin-right: 20px;
    color: var(--color-high-text);
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
