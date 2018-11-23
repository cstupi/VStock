<template>
  <div class="center-content">
    <div>
      <span v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-if="isLoggedIn"> 
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'profile' }">Profile</router-link> |
        <a @click="logout">Logout</a>
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
      await this.$store.dispatch('Logout')
      this.$router.push('/login')
    }
  }
}
</script>