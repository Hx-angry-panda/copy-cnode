// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//时间过滤器
Vue.filter('filterDate', function(value){
  var time = new Date(value).getTime() //最后回复时间距离1970年1月1日00:00:00的毫秒数
  var date = new Date().getTime() //现在时间距离1970年1月1日00:00:00的毫秒数
  var lastReply = date - time //最后回复时间距离现在多少ms
  if (lastReply < 0){
    return ''
  }else if(lastReply/1000 < 30){
    return '刚刚'
  }else if(lastReply/1000 < 60){
    return parseInt(lastReply/1000) + ' ' + '秒前'
  }else if(lastReply/1000/60 < 60){
    return parseInt(lastReply/1000/60) + ' ' + '分钟前'
  }else if(lastReply/1000/60/60 < 24){
    return parseInt(lastReply/1000/60/60) + ' ' + '小时前'
  }else if(lastReply/1000/60/60/24 < 24){
    return parseInt(lastReply/1000/60/60/24) + ' ' + '天前'
  }else if(lastReply/1000/60/60/24/31 < 12){
    return parseInt(lastReply/1000/60/60/24/31) + ' ' + '个月前'
  }else{
    return parseInt(lastReply/1000/60/60/24/31/12) + ' ' + '年前'
  } 
})