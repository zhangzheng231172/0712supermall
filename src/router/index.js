// 1.import 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ('../views/home/Home')
const Cart = () => import ('../views/cart/Cart')
const Category = () => import ('../views/category/Category')
const Profile = () => import ('../views/profile/Profile')
const Detail = () => import ('../views/detail/Detail')

// 2.安装插件
Vue.use(VueRouter)

//3.创建路由对象
const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
      //网址路径
      path:'/cart',
      //该路径下的组件内容
        component: Cart
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/category',
        component: Category
    },
    {
        path:'/profile',
        component: Profile
    },
  {
    path:'/detail/:iid',
    component: Detail
  }
]

const router= new VueRouter({
    routes,
    mode: 'history'
})


// 4.导出路由
export default router
