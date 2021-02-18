import Vue from 'vue'
import Router from 'vue-router'


const Home=()=>import('../views/home/Home')
const Category=()=>import('../views/category/Category')
const Shopcart=()=>import('../views/cart/Shopcart')
const Profile=()=>import('../views/profile/Profile')
const Detail=()=>import('../views/detail/Detail')
//1.安装插件
Vue.use(Router)

//2.创建路由对象
const routes= [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopcart',
    component:Shopcart
  },
  {
    path:'/profile',
    component:Profile
    },
  {
    path:'/detail/:iid',
    component:Detail
    }
]


const router=new Router({
  routes,
  mode:'history'
})
//3.导出router
export default router
