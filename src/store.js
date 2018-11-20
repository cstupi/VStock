import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './api/auth'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'succes',
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = '',
      state.token = ''
    }
  },
  actions: {
    async login({commit}, user){
      try{
        commit('auth_request')
        let res = await Auth.Login(user.email, user.password)
        console.log(res)
        commit('auth_success', res)
        localStorage.setItem('token', res.Token)
        axios.defaults.headers.common['Authorization'] = res.Token
      } catch(err){
        commit('auth_error')
        console.log(err)
        localStorage.removeItem('token')
      }
    },
    async Register({commit}, user){
      commit('auth_request')
      try {
        let res = await Auth.Register(user.Email, user.Password);
        localStorage.setItem('token', res.token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success',res.token, res)
      }catch(err) {
        console.log(err)
        commit('auth_error')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },
    async logout({commit}){
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
