<template>
  <div class="loading" v-if="isLoading"></div>
  <div class="main" v-else>
    <!-- 作者信息 -->
    <div>
      <section>
        <div class="smallTopBar">作者</div>
        <div class="message">
          <div class="person">
            <router-link
              :to="{
              name: 'user_info',
              params: {
                name: posts.loginname
              }
            }"
            >
              <img :src="posts.avatar_url" />
            </router-link>
            <span>
              <router-link
                :to="{
                name: 'user_info',
                params: {
                  name: posts.loginname
                }
              }"
              >{{posts.loginname}}</router-link>
            </span>
          </div>
          <div>积分：{{posts.score}}</div>
        </div>
      </section>

      <!-- 作者的话题 -->
      <section>
        <div class="smallTopBar">作者最近话题</div>
        <div class="message">
          <ul>
            <li v-for="topic in recentTopics">
              <!-- 此时路由没有发生变化，依旧是article，只是参数发生了变化，在vue中不会跳转 -->
              <router-link
                :to="{
                name: 'article',
                params: {
                  id: topic.id,
                }
              }"
              >{{topic.title}}</router-link>
            </li>
          </ul>
        </div>
      </section>

      <!-- 作者的回复 -->
      <section>
        <div class="smallTopBar">作者最近回复</div>
        <div class="message">
          <ul>
            <li v-for="reply in recentReplies">
              <router-link
                :to="{
                name: 'article',
                params: {
                  id: reply.id
                }
              }"
              >{{reply.title}}</router-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data: function() {
    return {
      isLoading: false,
      posts: [],
      topics: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
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
  computed: {
    recentTopics: function(){
      if (this.posts.recent_topics.length){
        return this.posts.recent_topics.slice(0,5)
      }
    },
    recentReplies: function(){
      if (this.posts.recent_replies.length){
        return this.posts.recent_replies.slice(0,5)
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
}
li {
  list-style: none;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0;
}
.loading {
  width: 100%;
  height: 100%;
  background: #e1e1e1;
}
.main {
  width: 25%;
  position: absolute;
  top: 65px;
  right: 2%;
}
.smallTopBar {
  background: #f6f6f6;
  color: #444;
  font-size: 14px;
  width: 95%;
  padding: 10px 5px;
}
img {
  width: 48px;
  height: 48px;
  margin: 5px;
}
.message {
  background: #fff;
  width: 95%;
  margin-bottom: 15px;
  padding-left: 10px;
}
.person {
  display: flex;
  align-items: center;
}
section a {
  color: grey;
}
</style>