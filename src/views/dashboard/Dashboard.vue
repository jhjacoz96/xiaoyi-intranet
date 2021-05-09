<template>
  <v-container
    id="dashboard"
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <v-card class="pa-5 rounded-xl">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <div
                  class="font-weight-bold text-h2"
                  style="color: #37474F;"
                >
                  {{ saludar }}, Doctor <span class="primary--text">{{ user.employee.name }}</span>
                </div>
                <div class="font-weight-medium grey--text mt-3">
                  Bienvenido al panel de control de Xiaoyi
                </div>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-img
                  width="300"
                  src="@/assets/doctor.svg"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        saludar: '',
        hours: undefined,
      }
    },
    computed: {
      ...mapState('auth', ['user']),
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
