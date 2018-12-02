<template>
  <div class="game">
    <div>
      {{ currentSymbol }}
    </div>
    <div>
      Price: {{ current.price }}
    </div>
    <div>
      Percent Change: {{ current.change_percent }}
    </div>
  </div>
</template>
<script>
import AssetAPI from '../../api/asset'

export default {
  props: {
    symbol: {
      type: String,
      default: 'MSFT'
    }
  },
  data() {
    return {
      current: {
        open: 0,
        high: 0,
        low: 0,
        price: 0,
        volume: 0,
        previous_close: 0,
        change: 0,
        change_percent: 0
      },
      timer: {}
    }
  },
  computed: {
    currentSymbol: function() { this.UpdateTicker(this.symbol); return this.symbol }
  },
  created(){
    this.UpdateTicker()
    // this.timer = setInterval(function (){
    //   this.UpdateTicker()
    // }.bind(this), 60000)
  },
  updated(){
  },
  beforeDestroy(){
    if(this.timer)
      clearTimeout(this.timer)
  },
  methods: {
    async UpdateTicker(symbol) {
      if(symbol && symbol.length > 1)
        this.current = await AssetAPI.Quote(symbol)
    }
  } 
}

</script>
<style scoped>

</style>
