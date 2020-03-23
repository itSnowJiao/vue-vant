<template>
  <div class="ajax">
    <van-button type="primary" @click="getDatas">获取数据</van-button>
    <van-button type="danger" @click="clearDatas">清空数据</van-button>
    <ul>
        <li v-for="(item,index) in list" :key="index">
            {{item.username}}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    //ajax原理
    ajax() {
      // ajax原理
      let movieUrl = "http://jsonplaceholder.typicode.com/users";
      // 1、创建XMLHttpRequest对象
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      // 2、发送请求
      xmlhttp.open("GET", movieUrl, true);
      xmlhttp.send();

      // 3、服务器端响应
      xmlhttp.addEventListener("readystatechange", () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let obj = JSON.parse(xmlhttp.responseText);
          console.log(obj);
          this.list = obj.subjects;
        }
      });
    },
    getDatas() {
      this.ajax();
    },
    clearDatas() {
      this.list = [];
    }
  }
};
</script>

<style lang="scss">
</style>