<template>
  <van-tabbar 
    v-model="active"  
    active-color="#07c160"
    inactive-color="#000"
    @change="onChange"
  >
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/user">用户</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.active = parseInt(localStorage.getItem('active'));
  },
  methods: {
    onChange(active) {
      localStorage.setItem('active',active)
    }
  }
};
</script>
<style lang="scss">
</style>