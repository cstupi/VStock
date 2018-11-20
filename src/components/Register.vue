<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>{{ message }}</div>
      <div>
        <input
          v-model="email"
          required
          type="email"
          placeholder="Email"
        >
      </div>
      <div>
        <input
          v-model="password"
          required
          type="password"
          placeholder="Password"
        >
      </div>
      <div>
        <input
          v-model="confirm"
          required
          type="password"
          placeholder="Confirm Password"
        >
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      email: "",
      password: "",
      confirm: "",
      message: ""
    }
  },
  methods: {
    register: async function(){
      let data = { Email: this.email, Password: this.password }
      this.message = ''
      if(this.password != this.confirm){
        this.message = 'Passwords do not match'
      } else {
        this.message = 'Loading'
        let res = await this.$store.dispatch('register', data)
        this.message = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
