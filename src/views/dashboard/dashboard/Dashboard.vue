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
        md="6"
        lg="4"
        xl="4"
      >
        <div
          class="font-weight-bold text-h2"
          style="color: #37474F;"
        >
          {{ saludar }}, <span class="primary--text">{{ user.employee.name }}</span>
        </div>
        <div class="font-weight-medium grey--text mt-3">
          Bienvenido al panel de control del centro de salud {{ organization.name }}.
        </div>
      </v-col>
      <v-col
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <v-img
          width="250"
          src="@/assets/doctor.svg"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="permissions.includes('file_familiy_access')"
        md="6"
        lg="4"
        xl="4"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-account-group"
          title="Fichas familiares registradas"
          :value="data ? JSON.stringify(data.cantidadFichasFamiliares) : ''"
          sub-icon="mdi-arrow-right"
          sub-icon-color="info"
          sub-text="Ver todas las fichas familiares"
          to="/intranet/ficha-familiar"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('obstetrics_access')"
        md="6"
        lg="4"
        xl="4"
      >
        <base-material-stats-card
          color="pink"
          icon="mdi-human-pregnant"
          title="Embarazadas actuales"
          :value="data ? JSON.stringify(data.cantidadEmbarazadas) : ''"
          sub-icon="mdi-arrow-right"
          sub-icon-color="info"
          sub-text="Ver todas las embarazas actuales"
          to="/intranet/ficha-clinica-obstetricia/seguimiento"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('diabetes_control_access')"
        md="6"
        lg="4"
        xl="4"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-water"
          title="Diabéticos registrados"
          :value="data ? JSON.stringify(data.cantidadDiabeticos) : ''"
          sub-icon="mdi-arrow-right"
          sub-icon-color="info"
          sub-text="Ver todos los pacientes diabeticos"
          to="/intranet/control-diabetes"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('neonatology_access')"
        md="6"
        lg="4"
        xl="4"
      >
        <base-material-stats-card
          color="pink"
          icon="mdi-baby"
          title="Neonatos registrados"
          :value="data ? JSON.stringify(data.cantidadNeonatos) : ''"
          sub-icon="mdi-arrow-right"
          sub-icon-color="info"
          sub-text="Ver todas las fichas clinicas de neonatología"
          to="/intranet/ficha-clinica-neonatologia/seguimiento"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('evaluate_suggestion_access')"
        md="6"
        lg="4"
        xl="4"
      >
        <base-material-stats-card
          color="green"
          icon="mdi-comment"
          title="Comentarios pendientes"
          :value="data ? JSON.stringify(data.cantidadComentarios) : ''"
          sub-icon="mdi-arrow-right"
          sub-icon-color="info"
          sub-text="Ver comentarios pendientes"
          to="/intranet/evaluar-sugerencias"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('file_familiy_access')"
        md="6"
        lg="4"
      >
        <dashboard-chart-donus
          :label="data ? data.estadisticaMiembros.generos : []"
          :data="data ? data.estadisticaMiembros.cantidades : []"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        xl="4"
      >
        <dashboard-quick-access />
      </v-col>
      <v-col
        v-if="permissions.includes('diabetes_control_access')"
        cols="12"
        md="6"
        lg="4"
      >
        <dashboard-diabetic-patient />
      </v-col>
      <v-col
        v-if="permissions.includes('neonatology_access')"
        cols="12"
        md="6"
        lg="4"
      >
        <dashboard-pregnant-not-neonatology />
      </v-col>
      <v-col
        v-if="permissions.includes('file_familiy_access')"
        cols="12"
        md="8"
      >
        <dashboard-chart-pathology />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <dashboard-data-interes
          :diabeticos="data ? data.dataInterest.diabeticos : 0"
          :adultosMayores="data ? data.dataInterest.adultosMayores : 0"
          :embarazoPrecoz="data ? data.dataInterest.embarazoPrecoz : 0"
          :promedioEmbarazo="data ? data.dataInterest.promedioEmbarazo : 0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="permissions.includes('file_familiy_access')"
        cols="12"
        md="8"
      >
        <v-card>
          <v-card-title class="text-h4 mb-2">
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
      <v-col
        cols="12"
        md="4"
      >
        <dashboard-chart-zone
          :label="data ? data.estadisticasParroquias.parroquias : []"
          :data="data ? data.estadisticasParroquias.cantidades : []"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="permissions.includes('obstetrics_access')"
        cols="12"
        sm="6"
        lg="6"
      >
        <v-card>
          <v-card-title class="text-h4">
            Embarazadas por grupos de edades
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
              width="100%"
              type="bar"
              :options="embarazadasBarra.options"
              :series="embarazadasBarra.series"
            />
            <apexchart
              v-else
              width="100%"
              type="pie"
              :options="embarazadasPie.options"
              :series="embarazadasPie.series"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-if="permissions.includes('master_access')"
        cols="12"
        sm="6"
        lg="6"
      >
        <dashboard-treatment
          :label="data ? data.estadisticaMedinas.medicinas : []"
          :data="data ? data.estadisticaMedinas.cantidades : []"
        />
      </v-col>
      <v-col
        v-if="permissions.includes('evaluate_suggestion_access')"
        cols="12"
        sm="6"
        lg="6"
      >
        <dashboard-chart-comment
          :label="data ? data.estadisticaComentarios.tipoComentarios : []"
          :data="data ? data.estadisticaComentarios.cantidades : []"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapMutations,
  } from 'vuex'
  import {
    dashboardGetApi,
  } from '@/api/modules'
  export default {
    components: {
      DashboardChartDonus: () => import('../dashboard/DashboardChartDonus'),
      DashboardDataInteres: () => import('../dashboard/DashboardDataInteres'),
      DashboardQuickAccess: () => import('../dashboard/DashboardQuickAccess'),
      DashboardChartPathology: () => import('../dashboard/DashboardChartPathology'),
      DashboardDiabeticPatient: () => import('../dashboard/DashboardDiabeticPatient'),
      DashboardTreatment: () => import('../dashboard/DashboardTreatment'),
      DashboardChartComment: () => import('../dashboard/DashboardChartComment'),
      DashboardPregnantNotNeonatology: () => import('../dashboard/DashboardPregnantNotNeonatology'),
      DashboardChartZone: () => import('../dashboard/DashboardChartZone'),
    },
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
      ...mapState('auth', ['user', 'permissions']),
      ...mapState('configWeb', ['organization']),
      embarazadasBarra () {
        return {
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%',
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
              categories: this.data ? this.data.estadisticaEmbarazadas.grupoEdades : [],
            },
            yaxis: {
              title: {
                text: 'Cantidad de mujeres',
              },
            },
            fill: {
              opacity: 1,
            },
          },
          series: [{
            name: 'Mujeres',
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
                text: 'Niveles de riesgos',
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
      ...mapMutations('auth', ['can']),
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
