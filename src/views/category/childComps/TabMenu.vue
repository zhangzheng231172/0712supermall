<template>
  <div id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in category"
           :key="index"
           @click="itemClick(index)"
           :class="{active: currentIndex===index}">{{item.title}}
      </div>
    </div>
  </div>

</template>

<script>
  // import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components:{
      // Scroll
    },

    data(){
      return {
        currentIndex: 0,
      }
    },
    props: {
      category: {
        type: Array,
        // default: null
      }
    },

    methods:{
      itemClick(index){
        this.currentIndex=index
        this.$emit('itemClick',this.currentIndex)
      }
    },

  }
</script>

<style scoped>
  #tab-menu {
    position: absolute;
    float: left;
    top: 44px;
    bottom: 49px;
    width: 100px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    /*height: 100%;*/
    overflow: scroll;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    border-left: 3px solid var(--color-high-text);
    background-color: #fff;
    font-weight: 700;
    color: var(--color-high-text);
  }
</style>
