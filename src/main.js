import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入reset.css
import '@/assets/css/reset.css'
// 引入rem.js
import '@/assets/js/rem.js'
// 按需引入vant中的组件
import {SubmitBar,Card,GoodsAction, GoodsActionIcon, GoodsActionButton,PullRefresh,List,Col,Row,Dialog,Toast,Button,Icon,NavBar,TabbarItem,Tabbar,Swipe,SwipeItem,Tab, Tabs,CellGroup,Field, Cell} from 'vant'
Vue.use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(PullRefresh).use(List).use(Col).use(Row).use(Dialog).use(Toast).use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(CellGroup).use(Field).use(Cell)

// 引入axios
import axios from 'axios'
// 注册，以供全局使用
Vue.prototype.$axios = axios

// 引入mockjs
import '@/mock/mock.js';
// 引入接口js
import URL from './service.config';
// 注册，以供全局使用
Vue.prototype.$URL = URL;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
