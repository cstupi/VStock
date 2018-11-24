import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// Import login and register components
import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'


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
      path: 'register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false
      }
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
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