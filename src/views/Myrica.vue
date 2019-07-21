<template>
  <div id="myrica">
    <p>
      这里是
      <span>{{sysName}}</span>！欢迎！
    </p>
    <div>
      <p>以下由Vuex实现，可以改变下面这个数字</p>
      <p>{{pressCount}}</p>
      <div>
        <el-button @click="decrement">同步-1</el-button>
        <el-button @click="increment">同步+1</el-button>
      </div>
      <div style="margin-top:15px">
        <el-button @click="decrementAsync">异步-1</el-button>
        <el-button @click="incrementAsync">异步+1</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Loading } from "element-ui";

export default {
  computed: {
    ...mapState({
      sysName: state => state.myrica.sysName,
      pressCount: state => state.myrica.count
    })
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
      incrementAction: "myrica/incrementAsync"
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
