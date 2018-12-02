<template>
  <component 
    :is="type" 
    :to="to"
  >
    {{ value }}
  </component>
</template>
<script>
export default {
  props: {
    to: {
      required: false,
      type: String,
      default: null
    },
    value: {
      type: String,
      required: true,
      default: null
    }
  },
  computed: {
    type(){
      if(this.to){
        return 'router-link'
      }
      return 'div'
    }
  }
}
</script>