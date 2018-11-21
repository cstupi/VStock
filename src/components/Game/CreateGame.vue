<template>
  <div class="create-game">
    <form @submit.prevent="create">
      <div>
        <input
          v-model="name"
          required
          type="text"
          placeholder="Game Name"
        >
      </div>
      <div>
        <input
          v-model="startValue"
          required
          placeholder="Starting Value"
          type="number"
        >
      </div>
      <!--
        Password not yet supported
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </div> -->
      <div>
        <button 
          :disabled="loading" 
          type="submit">
          Create
        </button>
      </div>
    </form>
  </div>  
</template>
<script>
import Game from '../../api/game'
export default {
  data(){
    return {
      name: "",
      startValue: 0,
      loading: false
    }
  },
  methods: {
    create: async function() {
      if(this.loading)
        return
      this.loading = true
      if(this.name.length > 0 && this.startValue > 0)
        console.log(await Game.CreateGame(this.name,this.startValue))
      this.loading = false
    }
  }
}
</script>
<style scoped>
</style>