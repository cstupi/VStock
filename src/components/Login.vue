<template>
  <div class="login">
    <form @submit.prevent="login">
      <h2>Sign In</h2>
      <div>
        <input 
          v-model="email" 
          required
          type="text" 
          placeholder="Email" 
        >
        <input 
          v-model="password"
          required
          type="password" 
          placeholder="Password" 
        >
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login: async function(){
      console.log('Logging in')
      let email = this.email
      let password = this.password
      try {
        console.log(email)
        await this.$store.dispatch('login', { email, password })
        this.$router.push('/')
      } catch(err){
        console.log(err)
      }
    }
  }
}
</script>
