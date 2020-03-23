import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Category from '../views/Category.vue'
// import Cart from '../views/Cart.vue'
// import User from '../views/User.vue'
// 路由组件懒加载
let Home = () => import('../views/Home.vue')
let Category = () => import('../views/Category.vue')
let Cart = () => import('../views/Cart.vue')
let User = () => import('../views/User.vue')
let NotFound = () => import('../views/NotFound')
// ajax的例子
// import Ajax from '../views/Ajax.vue'
// 商品详情
import Detail from '../components/Detail'
// 引入footerBar组件
import FooterBar from '../components/FooterBar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    components: {
      default: Home,
      'footer-bar': FooterBar
    },
    // 按需缓存路由
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    // component: Category
    components: {
      default: Category,
      'footer-bar': FooterBar
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    // component: Cart
    components: {
      default: Cart,
      'footer-bar': FooterBar
    },
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/user',
    name: 'User',
    // component: User
    components: {
      default: User,
      'footer-bar': FooterBar
    },
    meta: {
      keepAlive: true
    }
  },
  {
    // path: '/detail',
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
  // {
  //   path: '/ajax',
  //   name: 'Ajax',
  //   component: Ajax
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
