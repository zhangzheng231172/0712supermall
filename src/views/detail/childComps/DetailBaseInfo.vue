<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span  :style="{ backgroundColor: goods.discountBgColor }"
             class="discount"
             v-if="goods.discount">
             {{ goods.discount }}
      </span>
    </div>

    <div class="info-other" >
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>

    <div class="info-service" >
    <span
      :key="index"
      class="info-service-item"
      v-for="index in goods.services.length-1">
        <img :src="goods.services[index-1].icon" alt="" />
        <span>{{ goods.services[index-1].name }}</span>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
    }
  }
</script>

<style scoped>
  .base-info {
    width: 100%;
    padding: 0 10px;
    border-bottom: 5px solid #f2f5f8;
    margin-top: 15px;

    color: #999999;
  }

  .info-title {
    text-align: justify;
    color: #222222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: #ff5777;
  }

  .info-price .o-price {
    margin-left: 5px;

    text-decoration: line-through;
    font-size: 13px;
  }

  .info-price .discount {
    position: relative;
    top: -4px;
    padding: 3px 6px;
    margin-left: 5px;
    background-color: #ff5777;

    font-size: 12px;
    color: #ffffff;
    border-radius: 8px;
  }

  .info-other {
    display: flex;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    margin-top: 15px;

    font-size: 13px;
    line-height: 30px;
    justify-content: space-between;
  }

  .info-service {
    display: flex;

    line-height: 60px;
    justify-content: space-between;
  }

  .info-service-item img {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }

  .info-service-item span {
    margin-left: 5px;

    font-size: 13px;
    color: #333333;
  }
</style>
