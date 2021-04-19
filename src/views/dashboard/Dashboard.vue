<template>
  <v-container
    id="dashboard"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        dashboard
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        saludar: '',
        hours: undefined,
      }
    },
    mounted () {
      var myDate = new Date()
      this.hours = myDate.getHours()
      if (this.hours < 12) this.saludar = 'Buenos días'
      else if (this.hours >= 12 && this.hours <= 18) this.saludar = 'Buenas tardes'
      else if (this.hours >= 18 && this.hours <= 24) this.saludar = 'Buenas noches'
    },
  }
</script>
