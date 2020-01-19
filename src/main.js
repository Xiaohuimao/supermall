import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false

// vue中原是没有事件总线$bus的，需要使用原型来设置一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
