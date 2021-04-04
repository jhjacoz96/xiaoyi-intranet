<template>
  <v-snackbar
    v-model="snackbar.visible"
    top
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
    <v-btn
      text=""
      dark=""
      @click="closeAlert"
    >
      Cerrar
    </v-btn>
  </v-snackbar>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    computed: {
      snackbar () {
        return this.$store.state.snackbar
      },
    },
    methods: {
      ...mapMutations(['closeAlert']),
    },
  }
</script>
