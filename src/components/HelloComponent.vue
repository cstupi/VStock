
<template>
  <div>
    <h1>Hello {{ name }}!</h1>
    <div>{{ message }} PERSON</div>
    <div>
      <input
        v-model="username" 
        placeholder="Username"
        type="text"
      >
      <input
        v-model="password" 
        placeholder="Password" 
        type="password"
      >
    </div>
    <button @click="Login()">Login</button>
    <ul>
      <li 
        v-for="game in games" 
        :key="game.Id">
        <div>{{ game.Name }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Login, Game } from '../api/auth'
import axios from 'axios'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: function(){
    return {
      message: "",
      games: [],
      username: "",
      password: ""
    }
  },
  mounted: function (){
    this.message = this.$store.User ? this.$store.User.Email :  ""
  },
  methods: {
    Login: async function() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
      console.log(this)
      let res = await Login(this.username, this.password)
      this.$store.commit('SET_USER',res);
      this.message = this.$store.state.User.Email
      console.log(this.$store.User)
    }
  }
}
</script>
<style scoped>

</style>