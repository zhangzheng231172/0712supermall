<template>
  <div id="home">

    <!-- 标题栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control ref="tabControl1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>

    <!-- BScroll滚动区域 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐分类 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- tabBarControl -->
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick">

      </tab-control>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 回到顶部,监听组件的原生事件必须要用native修饰符变成原生组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from 'network/home';
  import {debounce} from "../../common/utils";
  import {itemListennerMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },

    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },

    //computed 是计算属性，也可以理解为一个方法。其中计算的结果发生改变才会触发，且必须返回一个值并在DOM中绑定的才能取得值。他可以自动获取数据的改变。
    computed: {
      //showGoods函数返回goods对象当前类型的数据列表
      showGoods() {
        return this.goods[this.currentType].list
      },
    },

    // 一进入页面就触发该函数
    activated() {
      //调用scroll组件的scrollTo方法，回到离开页面时的saveY位置
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      //调用scroll组件的refresh方法,重新计算 better-scroll，即计算要滚动的组件内容和滚动范围
      this.$refs.scroll.refresh()
    },

    //退出页面就触发deactivated。
    deactivated(){
      //保存离开Home页面时的position.y位置
      this.saveY=this.$refs.scroll.getScrollY()
           console.log(this.saveY)
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },

    //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    //网络请求数据，并将请求的数据保存到result,什么时候发送网络请求?
    created() {
      //1.调用getHomeMultidata函数，
      this.getHomeMultidata()
      //2.分别传不同参数调用三次getHomeGoods函数
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mixins:[itemListennerMixin],

    //methods 是Vue实例对象上绑定的方法，供当前Vue组件作用域内使用，未调用不会执行
    methods: {
      //跳转tab-control
      // 刷新频繁的防抖函数处理
      //根据tabClick函数传入的参数进行判断，变更currentType的值，默认为pop
      tabClick(index) {
        console.log(132, index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //使refs=tabControl1和tabControl2的组件的当前下标为index
        console.log(145, this.$refs.tabControl1.currentIndex )
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      //调用scroll.scrollTo的函数，传入参数为0,0
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },

      //contentScroll函数传入滚轮位置参数position；
      contentScroll(position) {
        //isShowBackTop的真假值控制back-top组件显示与否
        this.isShowBackTop = (-position.y) > 1000
        //isTabFixed的真假值控制tabcontrol1组件显示与否
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // console.log(-position.y)
        // console.log(this.tabOffsetTop)
      },

      //调用该函数将触发getHomeGoods函数，对当前类型数据进行网络请求并加载
      loadMore() {
        console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
      },

      //2.获取tabControl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
      //图片未加载完，tabControl已经加载完，使offsetTop属性值失真
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl2)
        // console.log(this.$refs.tabControl2.$el)
      },

      //3.决定tabControl是否吸顶，position：fixed
      //网络请求相关方法
      getHomeMultidata() {
        //网络请求数据并保存部分数据
        getHomeMultidata().then(res => {
           // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        //每次网络请求，都使定义的page在原有goods.page的基础上加1,并传入以得到下一页的网络数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
           // console.log(res);
          //解析当前请求数据，并把每一项数据push到goods的type数组中
          this.goods[type].list.push(...res.data.list)
          //更新goods.page的值
          this.goods[type].page += 1
          //调用scroll.finishPullUp函数，当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }

</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*vh-viewpoint height，视口高度*/
    height: 100vh;
  }

  .home-nav {
    background-color: indianred;
    color: white;

    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
  }


  .content {
    /*height: calc(100%- 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
    top: 0;
  }


</style>
