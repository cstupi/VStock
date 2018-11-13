import "@babel/polyfill";
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/app.css'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
store.commit('increment')

console.log(store.state.count) // -> 1

var app = new Vue({
    el: '#app',
    store,
    data: {
      message: 'TESTING'
    },
    render: h => h(App)
})