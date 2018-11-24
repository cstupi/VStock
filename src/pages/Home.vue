<template>
  <div class="home">
    <game-list />
    <create-game />
    <asset-summary symbol="MSFT" />
  </div>
</template>

<script>
import GameList from '../components/Game/GameListComponent.vue'
import CreateGame from '../components/Game/CreateGame.vue'
import AssetSummary from '../components/Asset/AssetSummary.vue'

export default {
  name:'Home',
  components: {
    GameList,
    CreateGame,
    AssetSummary
  }
}
</script>

<style scoped>

</style>