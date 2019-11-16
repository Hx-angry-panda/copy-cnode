<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading" />
    </div>
    <div v-else class="userInformation">
      <section>
        <img :src="users.avatar_url" alt />
        <span>{{users.loginname}}</span>
        <p>{{users.score}} 积分</p>
        <p>注册时间：{{users.create_at | filterDate}}</p>
      </section>
      <section>
        <div class="topBar">回复的主题</div>
        <ul>
          <!-- 把router-link 放在 li里 -->
          <li v-for="item in users.recent_replies" class="replies">
            <router-link
              :to="{
                    name: 'article',
                    params: {
                        id: item.id
                    }
                }"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </section>
      <section>
        <div class="topBar">创建的主题</div>
        <ul>
          <li v-for="item in users.recent_topics" class="topics">
            <router-link
              :to="{
                    name: 'article',
                    params: {
                        id: item.id
                    }
                }"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isLoading: false,
      users: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.users = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.isLoading = true;
    this.getData();
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
}
.loading {
  display: flex;
  justify-content: center;
  margin-top: 30vh;
}
.userInformation {
  width: 65%;
  max-width: 1400px;
  margin: 15px auto;
}
.userInformation img {
  width: 30px;
  height: 30px;
}
.userInformation p {
  padding-top: 10px;
}
.userInformation section:nth-child(1) {
  background: #fff;
  padding: 10px;
}
.topBar {
  background: #f6f6f6;
  color: #444;
  font-size: 12px;
  padding: 10px;
  margin-top: 20px;
  max-width: 1400px;
}
.userInformation ul {
  background: #fff;
  padding: 20px;
  padding-top: 5px;
}
.replies {
  font-size: 12px;
  margin-top: 15px;
  margin-left: 20px;
}
.topics {
  font-size: 12px;
  margin-top: 15px;
  margin-left: 20px;
}
a{
    color: #094e99;
}
</style>