<template>
  <div id="app">
    <Header></Header>
    <router-view name="main"></router-view>
    <router-view name="slide"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";
export default {
  name: "App",
  components: {
    Header,
    PostList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background: #e1e1e1;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
}
a {
  text-decoration: none;
}
#app{
  position: relative;
}
</style>
