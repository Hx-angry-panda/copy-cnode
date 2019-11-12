<template>
  <div id="app">
    <Header></Header>
    <PostList></PostList> 
  </div>
</template>

<script>
import axios from 'axios'

import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components: {
    Header,
    PostList
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background: #e1e1e1;
  }
</style>
