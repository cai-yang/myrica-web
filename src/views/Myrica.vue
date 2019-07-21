<template>
  <div id="myrica" type="flex">
    <p>
      这里是
      <span>{{sysName}}</span>！欢迎！
    </p>
    <div id="vuex-demo">
      <p>以下由Vuex实现，可以改变下面这个数字</p>
      <p>{{pressCount}}</p>
      <p>也可以联动下面这个框 反正用的都是一个数</p>
      <el-card>
        <el-row>
          <el-slider v-model="barCount" show-input input-size="medium"></el-slider>
        </el-row>
        <el-row>下面几个按钮也是通过操作状态来改变组件的</el-row>
        <el-row>
          <el-button @click="decrement">同步-1</el-button>
          <el-button @click="increment">同步+1</el-button>
        </el-row>
        <el-row>
          <el-button @click="decrementAsync">异步-1</el-button>
          <el-button @click="incrementAsync">异步+1</el-button>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
//不使用全局辅助函数
//import { mapState, mapActions } from "vuex";
//使用createNamespacedHelper可以创建基于单独命名空间的辅助函数
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("myrica");

import { Loading } from "element-ui";

export default {
  computed: {
    //利用mapState暴露store下的状态
    ...mapState({
      //可以使用普通的箭头函数
      sysName: state => state.sysName,
      pressCount: "count"
    }),
    barCount: {
      get() {
        return this.pressCount;
      },
      set(val) {
        this.$store.commit("myrica/count", { count: val });
      }
    }
  },
  methods: {
    increment() {
      this.$store.commit("myrica/increment");
    },
    decrement() {
      this.$store.commit("myrica/decrement");
    },
    decrementAsync() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //可以直接调用根组件注入的store来分发Action
      this.$store.dispatch("myrica/decrementAsync").then(function() {
        loadingInstance.close();
      });
    },
    //也可以通过mapActions来映射Action
    ...mapActions({
      //可以使用别名映射
      incrementAction: "incrementAsync"
    }),
    incrementAsync() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //使用映射的method来分发action，注意作用域
      this.incrementAction().then(function() {
        loadingInstance.close();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vuex-demo {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-row {
  margin-top: 15px;
}
</style>
