
<template>
  <div>
    <h1>Hello {{ name }}!</h1>
    <div>{{ message }} PERSON</div>
    <button @click="message++">Click Me</button>
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
    <button @click="test('whoa')">{{ this.$store.state.count }}</button>
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
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: function(){
    return {
      message: this.$store.state.count,
      games: [],
      username: "",
      password: ""
    }
  },
  methods: {
    test: async function(test) {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
      console.log(this)
      let res = await Login(this.username, this.password)
      console.log(res)
      let game = await Game()
      console.log(game)
      this.games = game
    }
  }
}
</script>
<style scoped>

</style>