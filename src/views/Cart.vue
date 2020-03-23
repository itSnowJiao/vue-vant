<template>
  <div class="cart">
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="cart-item">
      <van-card
        v-for="(item,index) in cartDatas"
        :key="index"
        :num="count"
        :price="item.price"
        :desc="item.company"
        :title="item.name"
        :thumb="item.img"
      >
        <div class="btn" slot="footer">
          <van-button size="mini" @click="delCart(item._id,index)" type="danger">删除</van-button>
        </div>
      </van-card>
    </div>
    <!-- <div class="noCart" v-else>
      <p>购物车空空如也，去看看吧</p>
      <van-button @click="$router.push('/category')" type="info">去购物</van-button>
    </div> -->
    <!-- 提交订单 -->
    <van-submit-bar @submit="goPay" class="submit-bar" :price="totalPrice" button-text="提交订单" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  data() {
    return {
      cartDatas: [],
      count: ""
    };
  },
  name: "Cart",
  computed: {
    ...mapState(["userInfo"]),
    totalPrice() {
      return (
        this.cartDatas.reduce((sum, elem) => {
          sum += elem.price * this.count;
          return sum;
        }, 0) *
        10 *
        10
      );
    }
  },
  created() {
    // 判断是否登录
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.fail("请先登录");
      setTimeout(() => {
        this.$router.push("/user");
      }, 1000);
    } else {
      this.$axios({
        url: this.$URL.getCartDatas,
        method: "get",
        params: {
          userId: this.userInfo._id
        }
      })
        .then(res => {
          for (let item of res.data) {
            this.count = item.count;
            this.cartDatas.push(item.productId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    delCart(id, index) {
      // 先删除数据库中的数据，如果删除成功，进入回调函数，在回调函数中删除前端界面。
      this.$axios({
        url: this.$URL.delCartDatas,
        method: "delete",
        params: {
          productId: id
        }
      })
        .then(res => {
          // console.log(res);
          // 前端页面中删除的方法
          this.cartDatas.splice(index, 1);
          this.$toast.success(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goPay() {
      // 进入支付页面
      this.$toast.success("进入支付页面");
    }
  }
};
</script>
<style lang="scss">
.cart {
  margin-bottom: 2.4rem;
}
.submit-bar {
  margin-bottom: 1rem;
}
.noCart {
  text-align: center;
  p {
    margin: 10px;
    color: #999;
  }
}
</style>
