import {debounce} from "./utils";

export const itemListennerMixin={
  components: {

  },

  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },


  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener=()=>{
      this.newRefresh()
    }

    //3.监听item中图片加载完成,在mounted里做，不要在创建里做
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('混入内');
  }
}
