<template>
  <div id="myrica" type="flex">
    <p>
      这里是
      <span>{{sysName}}</span>！欢迎！
    </p>
    <div id="vuex-demo">
      <el-card>
        <p>以下由Vuex实现</p>
        <el-divider content-position="center">注意这个数字</el-divider>
        <p>{{pressCount}}</p>
        <el-divider content-position="center">可以通过条条改</el-divider>
        <el-row>
          <el-slider v-model="pressCount" show-input :show-tooltip="false" input-size="medium"></el-slider>
        </el-row>
        <el-divider content-position="center">也可以用按钮</el-divider>
        <el-container>
          <el-main>
            <el-input v-model="mathStep" placeholder></el-input>
            <el-row>
              <el-button @click="decrement">同步-{{mathStep}}</el-button>
              <el-button @click="increment">同步+{{mathStep}}</el-button>
            </el-row>
            <el-row>
              <el-button @click="decrementAsync">异步-{{mathStep}}</el-button>
              <el-button @click="incrementAsync">异步+{{mathStep}}</el-button>
            </el-row>
          </el-main>
        </el-container>
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
    pressCount: {
      get() {
        return this.$store.state.myrica.count;
      },
      set(val) {
        this.$store.commit("myrica/count", { count: val });
      }
    },
    mathStep: {
      get() {
        return this.$store.state.myrica.mathStep;
      },
      set(val) {
        this.$store.commit("myrica/step", { step: val });
      }
    },
    //利用mapState暴露store下的状态
    ...mapState({
      //可以使用普通的箭头函数
      sysName: state => state.sysName
      //也可以使用别名+字符串
    })
  },
  methods: {
    increment() {
      this.$store.commit("myrica/increment", { step: this.mathStep });
    },
    decrement() {
      this.$store.commit("myrica/decrement", { step: this.mathStep });
    },
    decrementAsync() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //可以直接调用根组件注入的store来分发Action
      this.$store
        .dispatch("myrica/decrementAsync", { step: this.mathStep })
        .then(function() {
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
      this.incrementAction({ step: this.mathStep }).then(function() {
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
