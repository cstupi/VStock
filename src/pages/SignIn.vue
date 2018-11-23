<template>
  <div class="login">
    <h1>Login Or Sign up</h1>
    <Login />
    <Register />
  </div>
</template>
<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

export default {
  components: {
    Login,
    Register
  }
}
</script>

<style scoped>

</style>