<template>
  <div>
    <ul>
      <li
        v-for="game in games"
        :key="game.Id">
        {{ game.Name }}
      </li>
    </ul>
  </div>
</template>
<script>
import Game from '../api/game'
export default {

}
</script>
<style scoped>
  ul {
    list-style: none;
  }
</style>