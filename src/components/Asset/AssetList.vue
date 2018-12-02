<template>
  <div class="asset-list">
    <h2>Assets</h2>
    <div 
      v-for="a in assets"
      :key="a.Identifier"
    >
      {{ a }} 
    </div>
  </div>
</template>
<script>
import Game from '../../api/game'

export default {
  props:{
    game: {
      type: String,
      default: '',
      required: true
    }
  },
  data(){
    return {
      assets: [],
    }
  },
  created(){
    this.ListAssets()
  },
  methods: {
    async ListAssets(userId = null){
      if(this.game)
        this.assets = await Game.ListAssets(this.game, userId)
      
    }
  }
}
</script>
<style scoped>
</style>