<template>
  <div>
    <div>My games</div>
    <ul class="games-list">
      <li 
        v-for="ugame in games"
        :key="ugame.Id">
        <span>{{ ugame.Name }}</span>
        <span>{{ ugame.StartingValue }}</span>
      </li>
    </ul>
    <div>Available</div>
    <ul>
      <li
        v-for="agame in allGames"
        :key="agame.Id">
        <span>{{ agame.Name }}</span>
        <span>{{ agame.StartingValue }}</span>
        <button>Join</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {

  },
  data: function() {
    return {
      gList: []
    }
  },
  computed: {
    games: function (){
      return this.$store.getters.userGames || []
    },
    allGames: function (){
      return this.gList
    }
  },
  async created (){
    this.GetAllGames()
    this.GetGames()
  },
  methods: {
    async GetGames(){
      this.$store.dispatch('GetGames')
    },
    async GetAllGames(){
      this.gList = await this.$store.dispatch('GetAllGames')
    }
  }
}
</script>
<style scoped>
  ul {
    list-style: none;
  }
</style>