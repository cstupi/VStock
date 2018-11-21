<template>
  <div>
    <ul class="games-list">
      <li 
        v-for="game in games" 
        :key="game.Id">
        <span>{{ game.Name }}</span><span>{{ game.StartingValue }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Game from '../../api/game'
export default {
  props: {

  },
  data: function() {
    return {
      games: []
    }
  },
  created (){
    this.GetGames()
  },
  methods: {
    async GetGames(){
      let games = await Game.ListGames()
      this.games = games
    }
  }
}
</script>
<style scoped>
  ul {
    list-style: none;
  }
</style>