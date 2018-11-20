import "@babel/polyfill";
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

import './assets/app.css'

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if(token)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')