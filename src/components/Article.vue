<template>
  <div>
    <Header></Header>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading" />
    </div>
    <div class="content" v-else>
      <div class="topic_header">
        <span class="listType">{{posts | filterListType}}</span>
        <span class="title">{{posts.title}}</span>
      </div>
      <div class="topic_message">
        <span>• 发布于 {{posts.create_at | filterDate}}</span>
        <span>• 作者 {{posts.author.loginname}}</span>
        <span>• {{posts.visit_count}}次 浏览</span>
        <span>• 来自 {{posts | listType}}</span>
      </div>

      <div class="topic_main" v-html="posts.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  data: function() {
    return {
      isLoading: false,
      posts: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.isLoading = true;
    this.getData();
  },
  filters: {
    filterListType: value => {
      if (value.top === true) {
        return "置顶";
      } else if (value.good === true) {
        return "精华";
      } else if (value.tab === "ask") {
        return "问答";
      } else if (value.tab === "share") {
        return "分享";
      } else {
        return "招聘";
      }
    },
    listType: value => {
      if (value.tab === "ask") {
        return "问答";
      } else if (value.tab === "share") {
        return "分享";
      } else {
        return "招聘";
      }
    }
  }
};
</script>

<style>
@import url('../assets/markdown-github.css');
.loading {
  display: flex;
  justify-content: center;
  margin-top: 30vh;
}
.content {
  max-width: 1062px;
  margin: 15px 305px 15px 76px;
  background: #fff;
}
.topic_main {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.markdown-text img {
  width: 92% !important;
}
.topic_header {
  max-width: 1042px;
  padding: 10px;
  margin: 8px 0;
  display: flex;
  align-items: center;
}
.listType {
  font-size: 12px;
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
  background: #80bd01;
  align-self:initial;
  margin-top: 8px;
  font-weight: bold;
}
.title {
  font-size: 22px;
  color: #333;
  font-weight: 700;
  margin: 8px 0px 8px 6px;
}
.topic_message{
    font-size: 12px;
    color: #838383;
    height: 20px;
    margin: -12px 0 8px 10px;
}
</style>