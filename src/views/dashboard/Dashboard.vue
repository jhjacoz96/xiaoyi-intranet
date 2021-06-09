<template>
  <v-container
    id="dashboard"
    tag="section"
    fluid
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <div
          class="font-weight-bold text-h2"
          style="color: #37474F;"
        >
          {{ saludar }}, <span class="primary--text">{{ user.employee.name }}</span>
        </div>
        <div class="font-weight-medium grey--text mt-3">
          Bienvenido al panel de control de Xiaoyi
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          width="250"
          src="@/assets/doctor.svg"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-account-group"
          title="Fichas familiares"
          :value="data ? JSON.stringify(data.cantidadFichasFamiliares) : ''"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="pink"
          icon="mdi-human-pregnant"
          title="Embarazadas actuales"
          :value="data ? JSON.stringify(data.cantidadEmbarazadas) : ''"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-water"
          title="Diabeticos"
          :value="data ? JSON.stringify(data.cantidadDiabeticos) : ''"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card>
            <v-card-title>
              Parroquias vulnerables
            </v-card-title>
            <v-card-text>
              <apexchart
                width="100%"
                type="bar"
                :options="riesgosBarra.options"
                :series="riesgosBarra.series"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-card>
            <v-card-title>
              Patologías mas comúnes
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="patologiaType"
                :items="['Barra', 'Torta']"
                label="Tipo de gráfica"
              />
            </v-card-text>
            <v-card-text class="justify-center">
              <apexchart
                v-if="patologiaType === 'Barra'"
                width="300"
                height="300"
                type="bar"
                :options="patologiasBarra.options"
                :series="patologiasBarra.series"
              />
              <apexchart
                v-else
                width="300"
                height="400"
                type="pie"
                :options="patologiasPie.options"
                :series="patologiasPie.series"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-card>
            <v-card-title>
              Embarazos por grupos de edades
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="embarazadaType"
                :items="['Barra', 'Torta']"
                label="Tipo de gráfica"
              />
            </v-card-text>
            <v-card-text class="justify-center">
              <apexchart
                v-if="embarazadaType === 'Barra'"
                width="300"
                height="300"
                type="bar"
                :options="embarazadasBarra.options"
                :series="embarazadasBarra.series"
              />
              <apexchart
                v-else
                width="300"
                height="400"
                type="pie"
                :options="embarazadasPie.options"
                :series="embarazadasPie.series"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>

  import { mapState } from 'vuex'
  import {
    dashboardGetApi,
  } from '@/api/modules'
  export default {
    data () {
      return {
        saludar: '',
        hours: undefined,
        patologiaType: 'Barra',
        embarazadaType: 'Barra',
        data: null,
      }
    },
    computed: {
      ...mapState('auth', ['user']),
      patologiasBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            xaxis: {
              categories: this.data ? this.data.estadisticaPatologias.patologias : [],
            },
          },
          series: [{
            name: 'Pacientes',
            data: this.data ? this.data.estadisticaPatologias.cantidades : [],
          }],
        }
      },
      patologiasPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.data ? this.data.estadisticaPatologias.patologias : [],
          },
          series: this.data ? this.data.estadisticaPatologias.cantidades : [],
        }
      },
      embarazadasBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            xaxis: {
              categories: this.data ? this.data.estadisticaEmbarazadas.grupoEdades : [],
            },
          },
          series: [{
            name: 'Pacientes',
            data: this.data ? this.data.estadisticaEmbarazadas.cantidades : [],
          }],
        }
      },
      embarazadasPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.data ? this.data.estadisticaEmbarazadas.grupoEdades : [],
          },
          series: this.data ? this.data.estadisticaEmbarazadas.cantidades : [],
        }
      },
      riesgosBarra () {
        return {
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '20%',
                endingShape: 'rounded',
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent'],
            },
            xaxis: {
              categories: this.data ? this.data.estadisticasRiesgos.parroquias : [],
              title: {
                text: 'Historia de niveles de riesgos',
              },
            },
            yaxis: {
              title: {
                text: 'Cantidades de familias por parroquias',
              },
            },
            fill: {
              opacity: 1,
            },
          },
          series: this.data ? this.data.estadisticasRiesgos.nivelRiesgo : [],
        }
      },
    },
    created () {
      this.listItem()
    },
    mounted () {
      var myDate = new Date()
      this.hours = myDate.getHours()
      if (this.hours < 12) this.saludar = 'Buenos días'
      else if (this.hours >= 12 && this.hours <= 18) this.saludar = 'Buenas tardes'
      else if (this.hours >= 18 && this.hours <= 24) this.saludar = 'Buenas noches'
    },
    methods: {
      async listItem () {
        const serviceResponse = await dashboardGetApi()
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
