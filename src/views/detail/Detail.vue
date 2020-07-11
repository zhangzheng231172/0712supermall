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

    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>

    <detaild-bottom-bar  @addToCart="addToCart"></detaild-bottom-bar>
    <Toast :message="message" :Show="Show"></Toast>
  </div>
</template>

<script>
  import Toast from "../../components/common/toast/Toast";
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
      Toast,
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
        showBackTop: false,
        message: '',
        Show: false
      }
    },

    mixins: [itemListennerMixin],

    created() {
      // 获取页面传过来的id
      // this.detailId = this.$route.params.iid;
      this.iid = this.$route.params.iid;
      // 发送网络请求
      this.getDetail();
      this.getRecommend();

      //给初始值，避免多次赋值,offSetTop为正值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        console.log(this.$refs.params.$el.offsetTop)
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


    destroyed() {
      // console.log('destroyed')
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {
      // 请求详情数据
      getDetail() {
        getDetail(this.iid).then(res => {
          const data = res.result;
          // console.log(data)

          // 获取轮播图数据
          this.topImages = data.itemInfo.topImages;

          // 获取商品数据,调用封装的ES6的class
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 获取店铺数据
          this.shop = new Shop(data.shopInfo);

          // 获取下面的图片展示数据
          this.imagesInfo = data.detailInfo;

          // 获取尺寸数据
          this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

          // 获取评论数据
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0] || {};
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

      //5.点击标题滚轮滚到index对应下的-this.themeTopYs[index]位置处
      titleClick(index) {
        // console.log(this.themeTopYs[index])
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300);
      },

      contentScroll(position) {
        this.showBackTop = (-position.y) > 1000
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTopYs[i];
           // *  方案二:
           // *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           // *    优点: 简洁明了, 便于理解
           // *    缺点: 需要引入一个较大的int数字
           // * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           // * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了
          if ((-position.y) >= iPos && (-position.y) < this.themeTopYs[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
            }
            break;
          }
        }
      },

      //点击加入到购物车将商品加入到购物车
      addToCart(){
         // console.log('-----')
        // 1.获取购物车需要的信息
        const product = {}
        // 2.对象信息
        product.iid = this.iid;
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.newPrice = this.goods.realPrice;
        // 3.添加到Store中
        //this.$store.commit()触发--->mutations
        //this.$store.dispatch()触发--->actions
        // this.$store.dispatch('addCart', product)
        this.$store.commit('addCart', product)
        // console.log(product)


        // console.log(this.$store)
        // this.$store.mutations.addCart(product).then(res => {
          this.message='添加到购物车中'
          this.Show=true
          setTimeout(()=>{
            this.Show=false
          },1500)
        // })

      }
    }
  }

</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: white;
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
