<template>
  <div class="main">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading" />
    </div>
    <div class="postList" v-else>
      <ul>
        <!-- 帖子分类 -->
        <li>
          <div class="topNav">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
            <span>客户端测试</span>
          </div>
        </li>

        <!-- 帖子 -->
        <li v-for="post in posts">
          <!-- 头像 -->
          <!-- 动态绑定 -->
          <img :src="post.author.avatar_url" alt="avatar" class="avatar" />
 
          <!-- 回复数&点击数 -->
          <span class="replyAndVisit">
            <span class="replyCount">{{post.reply_count}}</span>
            <span class="slash">/</span>
            <span class="visitCount">{{post.visit_count}}</span>
          </span>

          <!-- 帖子类型 -->
          <span
            :class="{put_top:(post.top === true),topiclist_tab:(post.top != true && post.good != true)}"
          >
            <span>{{post | filterListType}}</span>
          </span>

          <!-- 帖子标题 -->
          <router-link :to="{
            name: 'article',
            params: {
              id: post.id,
              name: post.author.loginname
            }
          }">
            <span class="title">{{post.title}}</span>
          </router-link>

          <!-- 帖子最后回复时间 -->
          <span class="lastReply">{{post.last_reply_at | filterDate}}</span>
        </li>
        <li>
          <Pagination></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  name: 'PostList',
  data: function() {
    return {
      isLoading: false,
      posts: [] //页面帖子列表
    };
  },
  components: {
    Pagination
  },
  beforeMount: function() {
    this.isLoading = true;
    this.getData();
  },
  methods: {
    getData: function() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          page: 1,
          limit: 20
        })
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
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
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
}
a{
  color: black;
}
a:hover {
  text-decoration: underline;
}
.main {
  width: 90%;
  max-width: 1400px;
  margin: 15px auto;
}
.loading {
  display: flex;
  justify-content: center;
  margin-top: 30vh;
}
.topNav {
  background: #f6f6f6;
  padding: 10px;
}
.topNav > span {
  margin: 0 10px;
  color: #80bd01;
  font-size: 14px;
}
.topNav > span:hover {
  background: #80bd01;
  color: #fff;
  margin: 0 10px;
  border-radius: 3px;
  cursor: pointer;
}
.avatar {
  width: 30px;
  height: 30px;
}
.replyAndVisit {
  width: 70px;
  text-align: center;
}
.replyCount {
  font-size: 14px;
  color: #9e78c0;
}
.slash {
  font-size: 10px;
  margin: 0 -3px;
}
.visitCount {
  font-size: 10px;
  color: #b4b4b4;
}
.put_top {
  background: #80bd01;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
}
.topiclist_tab {
  background: #e5e5e5;
  color: #999;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
}
.title {
  font-size: 16px;
  color: #333;
  margin-left: 5px;
}
ul > li:not(:nth-child(1)) {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
}
ul > li:not(:nth-child(1)) {
  border-top: 1px solid #f0f0f0;
}
ul > li:nth-child(1) {
  border-top: none;
}
ul > li:nth-child(2) {
  border-top: none;
}
.lastReply {
  position: absolute;
  right: 0;
  font-size: 11px;
  color: #778087;
  margin-right: 10px;
}
</style>
