import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/"
})

//全局过滤器
Vue.filter('lenOver', function (dataStr: string) {
  return "123123";
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
