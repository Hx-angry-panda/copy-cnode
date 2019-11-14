<template>
  <div id="app">
    <Header></Header>
    <router-view name="main"></router-view>
  </div>
</template>

<script>

import Header from './components/Header'
import PostList from './components/PostList'
import Article from './components/Article'
export default {
  name: 'App',
  components: {
    Header,
    PostList,
    Article
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  body{
    margin: 0;
    padding: 0;
    background: #e1e1e1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important
  }
  a{
  text-decoration: none;
  color: black;
}
</style>
