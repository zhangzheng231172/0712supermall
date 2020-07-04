import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

// 默认$bus没有值，new Vue()可以作为.$bus发送事件总线的载体
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')
