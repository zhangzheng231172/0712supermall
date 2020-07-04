<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList" :key="item.index">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :images-info="imagesInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <details-params-info ref="params"  :params-info="paramsInfo"  ></details-params-info>
      <detail-comment-info ref="comment"    :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend"  :goods="recommends"></goods-list>
    </scroll>

    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>

    <detaild-bottom-bar  @addToCart="addToCart"></detaild-bottom-bar>
  </div>
</template>

<script>
  import BackTop from "../../components/content/backTop/BackTop";
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
      BackTop,
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
        currentIndex: 0,
        showBackTop: false
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
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      })
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },

    mounted() {

    },

    destroyed() {
      // console.log('destroyed')
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {
      // 请求详情数据
      getDetail() {
        getDetail(this.detailId).then(res => {
          const data = res.result;
          // console.log(data)

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
        this.getThemeTopY()
      },

      titleClick(index) {
        // console.log(this.themeTopYs[index])
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300);
      },

      contentScroll(position) {
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTopYs[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (position >= iPos && position < this.themeTopYs[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
        this.showBackTop = (-position.y) > 1000
      },

      addToCart(){
         // console.log('-----')
        // 1.获取购物车需要的信息
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        this.$store.commit('addCart', obj)
        // this.$store.dispatch('addCart', obj)
        console.log(obj)
      }
    }
  }

</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
