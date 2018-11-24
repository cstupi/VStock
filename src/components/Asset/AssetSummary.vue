<template>
  <div class="game">
    <div>
      {{ symbol }}
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
import { setInterval, clearTimeout } from 'timers';

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
  created(){
    this.UpdateTicker();
    this.timer = setInterval(function (){
      this.UpdateTicker()
    }.bind(this), 60000)
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  },
  methods: {
    async UpdateTicker() {
      this.current = await AssetAPI.Quote(this.symbol)
    }
  } 
}

</script>
<style scoped>

</style>
