import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// Import login and register components
import Home from './pages/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'


Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '*', component: Login },
    {
      path: 'login',
      name: 'login',
      compontent: Login
    },
    {
      path: 'register',
      name: 'register',
      component: Register
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
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn){
      console.log('This required auth')
      next()
      return
    }
    console.log('auth failure')
    next('login')
  } else {
    console.log('no auth needed')
    console.log(to.matched)
    next() 
  }
})
export default router