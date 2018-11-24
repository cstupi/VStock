<template>
  <div>
    <div>My games</div>
    <ul class="games-list">
      <li 
        v-for="ugame in games"
        :key="ugame.Id">
        <span>{{ ugame.Name }}</span>
        <span>{{ ugame.StartingValue }}</span>
        <button
          :disabled="loading"
          @click="LeaveGame(ugame.Id)"
        >Leave</button>
      </li>
    </ul>
    <div>Available</div>
    <ul>
      <li
        v-for="agame in allGames"
        :key="agame.Id">
        <span>{{ agame.Name }}</span>
        <span>{{ agame.StartingValue }}</span>
        <button 
          :disabled="loading == true"
          @click="JoinGame(agame.Id)"
        >Join</button>
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
      gList: [],
      loading: false
    }
  },
  computed: {
    games: function (){
      return this.$store.getters.userGames || []
    },
    allGames: function (){
      if(Array.isArray(this.games) && this.gList)
        return this.gList.filter(g => !this.games.some(ug => ug.Id == g.Id))
      return this.gList
    }
  },
  async created (){
    this.GetAllGames()
    this.GetGames()
  },
  methods: {
    async GetGames(){
      await this.$store.dispatch('GetGames')
    },
    async GetAllGames(){
      this.gList = await this.$store.dispatch('GetAllGames')
    },
    async JoinGame(gameId){
      this.loading = true
      await this.$store.dispatch('JoinGame', gameId)
      await this.GetGames()
      this.loading = false
    },
    async LeaveGame(gameId){
      this.loading = true
      await this.$store.dispatch('LeaveGame', gameId)
      await this.GetGames()
      this.loading = false
    }
  }
}
</script>
<style scoped>
  ul {
    list-style: none;
  }
</style>