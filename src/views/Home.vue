<template>
  <div class="home">
    <!-- 首页 -->
    <van-nav-bar title="首页" class="nav-bar">
      <van-icon name="search" slot="left"></van-icon>
      <!-- <van-icon name="cart" slot="right"></van-icon> -->
      <van-icon slot="right" @click="$router.push('/user')">{{ JSON.stringify(userInfo) === '{}' ? '未登录' : userInfo.userName }}</van-icon>
      <van-icon slot="right" v-if="JSON.stringify(userInfo) !== '{}'" @click="exit">|退出</van-icon>
    </van-nav-bar>

    <!-- 轮播图 -->
    <div class="carousel">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>

    <!-- 热门商品 -->
    <div class="hot">
      <p class="hot-title">热门商品</p>
      <swiper class="hot-swiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) in hotDatas" :key="index">
          <div class="hot-swiper-content">
            <img class="content-img" :src="item.img" alt />
            <p class="content-name">{{item.name}}</p>
            <p class="content-price">￥{{item.price}}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 推荐商品 -->
    <div class="tj">
      <p class="tj-title">推荐商品</p>
      <ul class="tj-content">
        <li class="tj-content-list" v-for="(item,index) in tjDatas" :key="index">
          <img class="list-img" :src="item.img" alt />
          <p class="list-name">{{item.owner}}</p>
          <p class="list-price">￥{{item.price}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// 引入vue-awesome-swiper，不是全局的，将其作为组件使用
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      hotDatas: [
        {
          name: "名字1",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字2",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字3",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字4",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字5",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字6",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        },
        {
          name: "名字7",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
          price: 13441323124,
          company: "ldsaka",
          city: "askaf"
        }
      ],
      tjDatas: [],
      swiperOption: {
        slidesPerView: 3
      },
      testDatas: []
    };
  },
  created() {
    // let url1 = "/api/data";
    // let url2 = "/api/data/random";
    // let url3 = "/api/data/regexp";
    let url4 = this.$URL.getTJData;
    // this.$axios.get(url1).then(res => {
    //   console.log(res);
    // });
    // this.$axios.get(url2).then(res => {
    //   console.log(res);
    // });
    // this.$axios.get(url3).then(res => {
    //   console.log(res);
    // });
    this.$axios.get(url4).then(res => {
      // console.log(res);
      this.tjDatas = res.data;
    });
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // 退出功能
    exit() {
      this.$dialog.confirm({
        title: "退出登录",
        message: "是否退出登录"
      })
        .then(() => {
          this.userInfo = '{}'
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss">
.home {
  background-color: #efefef;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.carousel {
  margin-top: 1rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 3rem;
  text-align: center;
  background-color: #39a9ed;
}
.hot {
  margin-top: 0.2rem;
  background-color: #fff;
  font-size: 0.3rem;
  &-title {
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    box-sizing: border-box;
  }
  &-swiper {
    padding-bottom: 0.2rem;
    &-content {
      width: 2rem;
      text-align: center;
      .content-img {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.2rem;
      }
      .content-price {
        font-size: 0.25rem;
        color: #ff0000;
        margin-top: 0.2rem;
      }
    }
  }
}
.tj {
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
  background-color: #fff;
  font-size: 0.3rem;
  &-title {
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    box-sizing: border-box;
    text-align: center;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    display: -webkit-flex;
    width: 100%;
    &-list {
      margin: 0.2rem;
      padding: 0.2rem 0.4rem;
      width: 2rem;
      .list-img {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.2rem;
      }
      .list-price {
        font-size: 0.25rem;
        color: #ff0000;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
