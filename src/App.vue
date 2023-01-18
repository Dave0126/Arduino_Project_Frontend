<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <Test v-for="test in Tests" :key="test.id" :name="test.name" :num="test.num"></Test>-->
<!--    <TableComponents></TableComponents>-->
    <Container></Container>
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
    HelloWorld,
    Test,
    TableComponents,
    Container
  },
  data: function (){
    return {
      Tests: [
        {id:1, name:"test1", num:111},
        {id:2, name:"test2", num:222},
        {id:3, name:"test3", num:333},
      ]
    }
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
</style>
