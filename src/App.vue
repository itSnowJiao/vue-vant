<template>
  <div id="app">
    <!-- 缓存路由组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的路由 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 底部tabbar按需加载 -->
    <router-view name="footer-bar"></router-view>
    <!-- 底部tabbar -->
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">用户</van-tabbar-item>
    </van-tabbar>-->
    <!-- <ul class="footer-bar">
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <router-link to="/category">分类</router-link>
      </li>
      <li>
        <router-link to="/cart">购物车</router-link>
      </li>
      <li>
        <router-link to="/user">我的</router-link>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss">
#app {
  font-size: 0.3rem;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #fff;
    }
  }
  .footer-bar {
    display: flex;
    background: #42b983;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 1rem;
    line-height: 1rem;
    li {
      flex-grow: 1;
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
</style>
