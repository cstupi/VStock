import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// Import login and register components
import Home from './pages/Home.vue'
import Game from './pages/Game.vue'
import SignIn from './pages/SignIn.vue'
import Trade from './pages/Trade.vue'


Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: 'login',
      name: 'login',
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game,
      props: {
        id: false 
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
      props: {
        id: false
      }
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresAuth === false)) {
    next() 
    return
  } else {
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next({ name: 'login'})
  }
})
export default router