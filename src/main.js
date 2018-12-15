import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import store from './config/store'
import './config/bootstrap'
import './config/msgs'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')