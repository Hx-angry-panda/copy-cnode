<template>
  <div>
    
    <div class="content">
      <!-- 帖子内部标题 -->
      <div class="topic_header">
        <span class="listType">{{posts | filterListType}}</span>
        <span class="title">{{posts.title}}</span>
      </div>

      <!-- 帖子详情 -->
      <div class="topic_message">
        <span>• 发布于 {{posts.create_at | filterDate}}</span>
        <span>• 作者 {{posts.author.loginname}}</span>
        <span>• {{posts.visit_count}}次 浏览</span>
        <span>• 来自 {{posts | listType}}</span>
      </div>

      <!-- 帖子正文 -->
      <div class="topic_main" v-html="posts.content"></div>
    </div>

    <!-- 帖子回复 -->
      <div class="topBar">{{posts.reply_count}} 回复</div>
      <div v-for="(reply,index) in posts.replies" class="reply">
        <section>
          <router-link
            :to="{
              name: 'user_info',
              params: {
                name: reply.author.loginname
              }
            }"
          >
            <img :src="reply.author.avatar_url" alt />
          </router-link>
          <span class="loginName">{{reply.author.loginname}}</span>
          <span class="floor">{{index+1}}楼</span>
          <span class="createTime">{{reply.create_at | filterDate}}</span>
          <span v-if="reply.ups.length >=1" class="agree">{{reply.ups.length}} ☝</span>
        </section>
        <p v-html="reply.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      posts: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
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
/* 引入外部的css不能在 style scoped 中 */
@import url("../assets/markdown-github.css");

.content {
  max-width: 65%;
  margin: 15px 305px 15px 76px;
  background: #fff;
}
.topic_main {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
  margin-bottom: 13px;
}
.topic_main a {
  text-decoration: underline;
}
.markdown-text img {
  width: 92% !important;
}
.topic_header {
  max-width: 65%;
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
  align-self: initial;
  margin-top: 8px;
  font-weight: bold;
}
.title {
  font-size: 22px;
  color: #333;
  font-weight: 700;
  margin: 8px 0px 8px 6px;
}
.topic_message {
  font-size: 12px;
  color: #838383;
  height: 20px;
  margin: -12px 0 8px 10px;
}
.topBar {
  background: #f6f6f6;
  color: #444;
  font-size: 14px;
  max-width: 65%;
  margin: 15px 0 0 76px;
  padding: 10px;
}
.reply {
  max-width: 65%;
  margin-left: 76px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
}
.reply section {
  display: flex;
  align-items: center;
  position: relative;
}
.reply img {
  width: 30px;
  height: 30px;
}
.reply p {
  margin: 0 0 0 10px;
  padding-bottom: 10px;
}
.reply p a{
  color: #666;
  font-size: 13px;
}
.reply .loginName {
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}
.reply .floor {
  font-size: 11px;
  color: #0088cc;
  margin-left: 10px;
}
.reply .createTime {
  font-size: 11px;
  color: #0088cc;
  margin-left: 10px;
}
.reply .agree {
  position: absolute;
  right: 20px;
}
</style>