<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <div class="detail-img">
      <img :src="detailDatas.img" alt />
    </div>
    <div class="detail-content">
      <h5 class="detail-content_name">{{detailDatas.name}}</h5>
      <p class="detail-content_price">￥{{detailDatas.price}}</p>
      <p class="detail-content_company">公司：{{detailDatas.company}}</p>
      <p class="detail-content_city">生产地：{{detailDatas.city}}</p>
    </div>
    <!-- 加入购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="goCart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      detailDatas: {},
      count: 0
    };
  },
  created() {
    // 1、接收命名传参的参数（参数不会出现在路径中，类似于Post）
    // console.log(this.$route.params.id);
    // 2、接收路由传参的参数（参数会出现在路径中，类似于get）
    // console.log(this.$route.query.id)
    // 3、用es6方法
    // console.log(this.$route.params.id);
    // 获取详情数据
    this.$axios({
      url: this.$URL.getProductDetail,
      method: "get",
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        this.detailDatas = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //   加入购物车
    goCart() {
      // 判断用户是否登录  前端用vuex
      // 后端判断用户是否登录  用koa-session / redis
      if (JSON.stringify(this.userInfo) === "{}") {
        this.$toast.fail("请先登录");
        setTimeout(() => {
          this.$router.push("/user");
        }, 1000);
      } else {
        // 每点击一次，数量加1
        this.count++;
        // 插入购物车
        this.$axios({
          url: this.$URL.addCart,
          method: "post",
          data: {
            productId: this.detailDatas._id,
            userId: this.userInfo._id,
            count: this.count
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast.success(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="scss">
.detail {
  margin-bottom: 1.3rem;
  &-img {
    //   设置一个正方形
    position: relative;
    padding-bottom: 100%;
    width: 100%;
    height: 0;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &-content {
    padding: 10px;
    line-height: 0.5rem;
    &_name {
      font-size: 0.3rem;
      font-weight: bold;
    }
    &_price {
      color: red;
    }
  }
}
</style>