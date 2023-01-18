<template>
  <div id="app">
    <img alt="n7 logo" src="./assets/logon7.png" height="60px">
    <el-header style="text-align: right; font-size: 18px">
      <span>Arduino Project: Smart Fridge</span>
    </el-header>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <Test v-for="test in Tests" :key="test.id" :name="test.name" :num="test.num"></Test>-->
<!--    <TableComponents></TableComponents>-->
    <Container></Container>
    <el-footer style="text-align: center">
      This is a simple course project demo, powered by <a href="https://vuejs.org/">Vue.js</a> and <a href="https://element.eleme.io/#/en-US">Element UI</a>. Adopting <a href="https://github.com/Dave0126/Arduino_Project_Frontend">front-end</a> and <a href="https://github.com/Dave0126/Project_Arduino_Backend">back-end</a> separate development.
      <br/>
      Create by <a href="https://github.com/Dave0126/">Guohao</a>, 2023
    </el-footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Test from './components/SearchProduct.vue';
import TableComponents from "./components/TableComponents.vue";
import Container from './components/Container.vue'

export default {
  name: 'App',
  components: {
    Container
  },
  data: function (){
    return {}
  },
  created:function(){
    console.log("App组件创建")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-header, .el-footer {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 30px;
}
</style>
