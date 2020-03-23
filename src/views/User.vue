<template>
  <div class="user">
    <van-tabs v-model="activeName">
      <!-- 登录 -->
      <van-tab title="登录" name="login">
        <van-cell-group>
          <van-field label="用户名" required clearable :placeholder="userInfo.userName" v-model="loginUsername"></van-field>
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="loginPassword"
          ></van-field>
        </van-cell-group>
        <div>
          <van-button @click="loginDatas" type="primary" size="large">登录</van-button>
        </div>
      </van-tab>
      <!-- 注册 -->
      <van-tab title="注册" name="register">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="registerUsername"></van-field>
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="registerPassword"
          ></van-field>
        </van-cell-group>
        <div>
          <van-button @click="registerDatas" type="danger" size="large">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
export default {
  name: "User",
  data() {
    return {
      activeName: "login",
      loginUsername: "",
      loginPassword: "",
      registerUsername: "",
      registerPassword: ""
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["loginAction"]),
    // 注册
    registerDatas() {
      this.$axios({
        url: this.$URL.registerDatas,
        method: "post",
        data: {
          userName: this.registerUsername,
          password: this.registerPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success(res.data.message);
            this.registerUsername = this.registerPassword = "";
          } else {
            this.$toast.danger("注册失败");
          }
        })
        .catch(err => {
          this.$toast.fail(err);
        });
    },
    // 登录
    loginDatas() {
      this.$axios({
        url: this.$URL.loginDatas,
        method: "post",
        data: {
          userName: this.loginUsername,
          password: this.loginPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            // 模拟慢一点儿的网络请求
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 2000);
            })
              .then(() => {
                this.$toast.success(res.data.message);
                // 保存登录成功的状态，调用vuex中的方法
                this.loginAction(res.data.userInfo);
                // 登录后让其跳到上一页
                this.$router.go(-1);
              })
              .catch(err => {
                console.log(err);
                this.$toast.fail("保存登录失败状态");
              });
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("登录失败");
        });
    }
  }
};
</script>
