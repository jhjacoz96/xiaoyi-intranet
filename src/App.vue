<template>
  <router-view />
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    created () {
      this.checkToken()
    },
    methods: {
      ...mapActions('auth', ['checkToken']),
    },
  }
</script>
