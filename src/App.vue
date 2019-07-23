<template>
  <div id="app">
    <el-container>
      <el-header style="background-color:#c0c0c0;">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/myrica">Myrica</router-link>
      </el-header>
      <el-container>
        <el-aside>
          <side-menu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import SideMenu from "./components/MenuAside.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    SideMenu
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
