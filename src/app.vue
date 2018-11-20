<template>
  <div class="center-content">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="login">Login</router-link>
      <span v-if="isLoggedIn"> | 
        <a @click="logout">Logout</a> |
        <router-link to="/profile">Profile</router-link>
      </span>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() { return this.$store.getters.isLoggedIn }
  },
  created: function(){
    this.$http.interceptors.response.use(undefined, function(err){
      return new Promise(function(res,rej) {
        if(err.status === 401 && err.config && !err.config.__isRetryRequeset){
          console.log('logging out')
          this.$store.dispatch(logout)
        }
        throw err
      });
    })
  },
  methods: {
    logout: async function() {
      console.log('Logging out')
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>