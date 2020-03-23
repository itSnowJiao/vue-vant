<template>
    <div class="notFound">
        <img src="../assets/img/404.jpg" alt="" />
        <van-button type="primary" @click="$router.push('/')">返回首页</van-button>
    </div>
</template>
<script>
export default {
    name: 'NotFound'
}
</script>
<style lang="scss">
.notFound {
    width: 100%;
    text-align: center;
    img {
        width: 80%;
        margin: 30px 0;
    }
}
</style>