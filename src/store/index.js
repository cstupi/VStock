import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Auth from '../api/auth'
import Game from '../api/game'


/*
Todo: 
modularize the to different sections of site
*/
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('User') || null) || {},
    games: {},
    activeGame: ''
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user){
      state.status = 'succes',
      state.token = user.Token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = '',
      state.token = '',
      state.user = null
    },
    active_game_set(state, gameId){
      state.activeGame = gameId
    },
    games_set(state, games){
      if(typeof games !== 'object'){
        console.log('Game',':', ' games list must be an object')
        throw 'games must be an object'
      }
      state.games = games
    },
    games_add(state, game){
      if(typeof game !== 'object'){
        console.log('Game',':', ' game must be an object')
        throw 'game must be an object'
      }
      if(game.Id == null)
        throw `Game must have Id but recieved: ${game}`
      state.games[game.Id] = game
    },
    games_remove(state, gameId){
      delete state.games[games]
    }
  },
  actions: {
    async Login({commit}, user){
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
        axios.defaults.headers.common['Authorization'] = res.token
        commit('auth_success', res)
      }catch(err) {
        console.log(err)
        commit('auth_error')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },
    async Logout({commit}){
      commit('logout')
      localStorage.removeItem('token')
      commit('games_set', null)
      commit('active_game_set', '')
      delete axios.defaults.headers.common['Authorization']
    },
    async SetActiveGame({commit}, gameId){
      commit('active_game_set', gameId)
    },
    async GetGames({ commit, state }){
      try {
        console.log(state.user.Id)
        let games = await Game.ListGames(state.user.Id)
        commit('games_set', games)
      } catch(err) {
        console.log('Error retrieving games', err)
      }
    },
    async GetAllGames({ commit } ) {
      try {
        return await Game.ListGames()
      } catch(err) {
        throw err
      }
    },
    async JoinGame({ commit }, gameId){
      try {
        return await Game.JoinGame(gameId)
      } catch(err){
        console.log(err)
      }
    },
    async LeaveGame({ commit }, gameId){
      try {
        return await Game.LeaveGame(gameId)
      } catch(err){
        console.log(err)
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentGame: state => state.activeGame != '' ? 
      state.games[state.activeGame] : null,
    userGames: state => state.games
  }
})
