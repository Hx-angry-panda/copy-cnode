<template>
  <div class="main">
    <!-- 作者信息 -->
    <div>
      <section>
        <div class="smallTopBar">作者</div>
        <div class="message">
          <div class="person">
            <img :src="posts.avatar_url">
            <span>{{posts.loginname}}</span>
          </div>
          <div>积分：{{posts.score}}</div>
        </div>
      </section>

      <!-- 作者的话题 -->
      <section>
        <div class="smallTopBar">作者最近话题</div>
        <div class="message">
          <ul>
            <li v-for="topic in posts.recent_topics">{{topic.title}}</li>
          </ul>
        </div>
      </section>

      <!-- 作者的回复 -->
      <section>
        <div class="smallTopBar">作者最近回复</div>
        <div class="message">
          <ul>
            <li v-for="reply in posts.recent_replies">{{reply.title}}</li>
          </ul>
        </div>
      </section>
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
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.posts = res.data.data;
          console.log(this.posts.recent_topics[0].title)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.getData();
  },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li{
  list-style: none;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0;
}
.main{
  position: absolute;
  top: 65px;
  right: 15px;
}
.smallTopBar{
  background: #f6f6f6;
  color: #444;
  font-size: 14px;
  width: 95%;
  padding: 10px 5px;
}
img{
  width: 48px;
  height: 48px;
  margin: 5px;
}
.message{
  background: #fff;
  width: 95%;
  margin-bottom: 15px;
  padding-left: 10px;
}
.person{
  display: flex;
  align-items: center;
}
</style>