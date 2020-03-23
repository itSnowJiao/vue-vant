<template>
  <div>
    <van-nav-bar title="商品类型"></van-nav-bar>
    <div class="category">
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li
              @click="selectCategory(item.typeId, index)"
              :class="{active:active==index}"
              v-for="(item, index) in types"
              :key="index"
            >{{item.typeName}}</li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list class="content" @load="onLoad" v-model="isLoading" :finished="finished">
              <div @click="goDetail(item._id)" class="content-item" v-for="(item, index) in productList" :key="index">
                <img :src="item.img" alt />
                <p class="content-item-name">{{item.name}}</p>
                <p class="content-item-price">￥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      types: [], // 类型信息
      active: 0,
      productList: [],
      typeId: 1, // 当前选中类型的id
      start: 0,
      limit: 10,
      finished: false, //是否数据取完
      isLoading: false // 上拉加载
    };
  },
  created() {
    axios({
      url: url.getTypes
    })
      .then(res => {
        // console.log(res);
        this.types = res.data;
        this.selectCategory(this.typeId, this.active);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 左侧导航
    selectCategory(typeId, index) {
      this.active = index;
      this.typeId = typeId;
      this.productList = [];
      this.finished = false;

      this.getProductList();
    },
    // 右侧内容
    getProductList() {
      this.isLoading = true;
      axios({
        url: url.getProductList,
        method: "get",
        params: {
          typeId: this.typeId,
          start: this.productList.length,
          limit: this.limit
        }
      })
        .then(res => {
          //   console.log(res);
          if (res.data.length != 0) {
            this.productList = this.productList.concat(res.data);
          } else {
            this.finished = true;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉刷新
    onLoad() {
      setTimeout(() => {
        this.getProductList();
      }, 2000);
    },
    // 下拉加载
    onRefresh() {
      setTimeout(() => {
        this.productList = [];
        this.getProductList();
      }, 2000);
    },
    // 跳转商品的详情页面
    goDetail(id) {
      // console.log(id);
      // 1、命名方式传参
      // this.$router.push({
      //   name: "Detail",
      //   params: {
      //     id: id
      //   }
      // })
      // 2、路由传参
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     id: id
      //   }
      // })
      // 3、参数传递
      this.$router.push(`/detail/${id}`)
    }
  }
};
</script>

<style lang="scss" scoped>
$colorPrice: red;
.nav {
  background-color: #eee;
  position: fixed;
  top: 1rem;
  bottom: 1rem;
  left: 0;
  font-size: 0.3rem;
  li {
    height: 0.6rem;
    line-height: 0.6rem;
    border-bottom: 1px solid #fff;
    padding: 3px;
    text-align: center;
  }
  .active {
    background: #ffffff;
  }
}
.container {
  position: fixed;
  top: 46px;
  bottom: 1rem;
  right: 0;
  overflow-y: scroll;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  &-item {
    font-size: 0.3rem;
    width: 40%;
    padding: 0 10px;
    text-align: center;
    margin-bottom: 10px;
    img {
      width: 2rem;
      height: 2rem;
    }
    &-name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 0.4rem;
    }
    &-price {
      color: $colorPrice;
      margin-top: 0.2rem;
    }
  }
}
</style>

