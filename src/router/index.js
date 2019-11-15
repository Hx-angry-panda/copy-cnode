import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import SlideBar from '../components/SlideBar'
import UserInfo from '../components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'article',
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
        slide: SlideBar
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name',
      components: {
        main: UserInfo
      }
    }
  ]
})
