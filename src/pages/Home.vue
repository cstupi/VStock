<template>
  <div class="home">
    <game-list />
    <create-game />
  </div>
</template>

<script>
import GameList from '../components/Game/GameListComponent.vue'
import CreateGame from '../components/Game/CreateGame.vue'
export default {
  name:'Home',
  components: {
    GameList,
    CreateGame
  }
}
</script>

<style scoped>

</style>