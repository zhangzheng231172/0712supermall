<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :images-info="imagesInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <details-params-info ref="params"  :params-info="paramsInfo"  ></details-params-info>
      <detail-comment-info ref="comment"    :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend"  :goods="recommends"></goods-list>
    </scroll>
    <detaild-bottom-bar></detaild-bottom-bar>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  import DetaildBottomBar from "./childComps/DetaildBottomBar";
  import DetailNavBar from "./childComps/DetailNavBar";

  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailImageInfo from "./childComps/DetailImageInfo";
  import DetailsParamsInfo from "./childComps/DetailsParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import {getDetail, Goods, Shop, GoodsParams,getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemListennerMixin} from "../../common/mixin";


  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetaildBottomBar,
      DetailCommentInfo,
      DetailsParamsInfo,
      DetailImageInfo,
      Scroll,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar
    },

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        imagesInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },

    mixins: [itemListennerMixin],

    created() {
      // 获取页面传过来的id
      this.detailId = this.$route.params.iid;

      // 发送网络请求
      this.getDetail();
      this.getRecommend();

      //给初始值，避免多次赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs)
      })
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },

    },

    mounted() {
      //
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      console.log(this.themeTopYs)
    },

    // mounted() {
    //   let newRefresh=debounce(this.$refs.scroll.refresh, 50)
    //
    //   this.itemImgListener=()=>{
    //     newRefresh()
    //   }
    //   this.$bus.$on('itemImageLoad', this.itemImgListener)
    // },

    //什么时候给数组themeTopYs的元素赋值？渲染
    // updated(){
    //   this.themeTopYs=[]
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //
    //   console.log(this.themeTopYs)
    // },

    destroyed() {
      // console.log('destroyed')
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {
      // 请求详情数据
      getDetail() {
        getDetail(this.detailId).then(res => {
          const data = res.result;
          // console.log(data);
          // console.log(res)

          // 获取轮播图数据
          this.topImages = data.itemInfo.topImages;
          // console.log( this.topImages)

          // 获取商品数据,调用封装的ES6的class
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          // console.log( this.goods)

          // 获取店铺数据
          this.shop = new Shop(data.shopInfo);
          // console.log( this.shop)

          // 获取下面的图片展示数据
          this.imagesInfo = data.detailInfo;
          console.log(this.imagesInfo)

          // 获取尺寸数据
          this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
          console.log(this.paramsInfo)

          // 获取评论数据
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0] || {};
            // console.log(this.commentInfo)
          }

          //该函数保证渲染完毕再回调，虽然DOM已经渲染出来，但是图片等网络数据还未加载完
          this.$nextTick(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

            console.log(this.themeTopYs)
          })
        })
      },

      // 请求推荐数据
      getRecommend() {
        getRecommend().then(res => {
          // console.log(res);
          this.recommends = res.data.list;
        });
      },

      //4.监听详情页图片加载完
      detailImageLoad() {
        this.newRefresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs)
      },

      titleClick(index) {
        console.log(this.themeTopYs[index])
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中值进行对比
        //let i in this.themeTopYs为字符
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if ((i < length - 1 && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) ||
            (i === length - 1 && positionY > this.themeTopYs[i])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    }
  }

</script>

<style scoped>
</style>
