<template>
  <div class="game">
    <asset-list :game="game" />
  </div>
</template>
<script>
import AssetList from '../components/Asset/AssetList.vue'

export default {
  components: {
    AssetList
  },
  computed: {
    game: function(){
      return this.$route.params.id
    }
  }
}

</script>
<style scoped>

</style>
