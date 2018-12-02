<template>
  <div>
    Trade Page
    <div class="typeahead">
      <label>
        Search 
      </label>
      <input 
        placeholder="MSFT"
        type="text"
        @keyup="Search"
      >
      <ul class="t-options">
        <li 
          v-for="a in assetList"
          :key="a.symbol+a.region"
          class="t-option" 
          @click="selected = a.symbol"
        >
          {{ a.symbol }} - {{ a.name }}
        </li> 
      </ul>
    </div>
    <div>
      <asset-summary :symbol="selected" />
    </div>
  </div>
</template>
<script>
import Asset from '../api/asset'
import AssetSummary from '../components/Asset/AssetSummary.vue'
export default {
  components: {
    AssetSummary
  },
  data(){
    return {
      selected: '',
      loading: false,
      assetList: []
    }
  },
  computed: {
    game: function(){
      return this.$route.params.id || ''
    }
  },
  methods: {
    async Search(event){
      let term = event.target.value
      console.log(term)
      if(this.loading || term.length < 1)
        return
      this.loading = true
      let terms = await Asset.Search(term)
      this.assetList = terms
      this.loading = false
    }
  }
}
</script>
<style scoped>
</style>