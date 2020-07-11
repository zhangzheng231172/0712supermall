<template>
  <div>
    <nav-bar class="home-nav" >
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-menu    :category="category" @itemClick="itemClick"></tab-menu>
<!--    <scroll>-->
    <div class="content">
      <tab-content-category :subcategory="showSubcategory"></tab-content-category>
      <tab-control class="tab-control"
                   :titles="['综合', '新品', '销量']"
                   @tabClick="tabClick"></tab-control>
      <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
    </div>
<!--    </scroll>-->
  </div>
</template>

<script>
  import TabContentDetail from "./childComps/TabContentDetail";
  import TabControl from "../../components/content/tabControl/TabControl";
  import TabContentCategory from "./childComps/TabContentCategory";
  import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category";
  // import Scroll from "components/common/scroll/Scroll";
  import {POP, SELL, NEW} from "@/common/const";
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";

  export default {
    name: "Category",
    components: {
      // Scroll,
      TabContentDetail,
      TabControl,
      NavBar,
      TabMenu,
      TabContentCategory
    },
    data() {
      return {
        scroll: null,
        category: [],
        categoryData:[],
        maitKey: 0,
        currentIndex: -1,
        miniWallkey: 0,
        currentType: 'pop'
      }
    },

    created(){
      this.getCategory()
    },

    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        // console.log(this.categoryData[this.currentIndex].subcategories)
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },


    methods: {
      // 1.请求该页面所需的整个数据对象
      getCategory() {
        // 1.获取分类数据
        getCategory().then(res => {
          // console.log(res)
          this.category = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.category.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
            this.currentIndex = i;
            this.maitKey = this.category[i].maitKey;
            this.miniWallkey = this.category[i].miniWallkey
          }
          // 3.请求第一个分类的数据
          this.getSubcategory(0)
        })
      },

      // 2.请求该页面所需的整个数据对象数组的每个元素对象Subcategory
      getSubcategory(index) {
        this.currentIndex = index
        const maitKey = this.category[index].maitKey
        getSubcategory(maitKey).then(res => {
          // console.log(res)
          this.categoryData[index].subcategories = res.data
          console.log(this.categoryData[index].subcategories)
          this.categoryData = {...this.categoryData}

          // console.log(this.categoryData[this.currentIndex].subcategories)
          this.getCategoryDetail('pop')
          this.getCategoryDetail('new')
          this.getCategoryDetail('sell')
        })
      },

      getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.miniWallkey
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res)
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },

      itemClick(index) {
        this.getSubcategory(index)
      },

      tabClick(index) {
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
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;

    background-color: rgb(255, 129, 152);
    color: white;
  }

  .content {
    /*1.定位*/
    position: absolute;
    left: 100px;
    top: 44px;
    bottom: 49px;
    width: calc(100vw - 100px);
    height: calc(100% - 93px);
    overflow: scroll;
  }

</style>
