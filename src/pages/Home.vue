<template>
  <div class="home">
    <game-list />
  </div>
</template>

<script>
import GameList from '../components/GameListComponent.vue'

export default {
  name:'Home',
  components: {
    GameList
  }
}
</script>

<style scoped>

</style>