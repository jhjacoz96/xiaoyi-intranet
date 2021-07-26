<template>
  <v-container>
    <v-card-text class="font-weight-medium text-center">
      Criterios busqueda
    </v-card-text>
    <v-row
      class="justify-center mx-auto"
      style="max-width: 500px;"
    >
      <v-col
        sm="6"
        cols="12"
      >
        <v-select
          v-model="filter.risk"
          label="Riesgos"
          outlined
          dense
          item-text="name"
          item-value="id"
          :items="risk"
          @change="changeActivity"
        />
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-select
          v-model="filter.activity"
          :disabled="!filter.risk"
          label="Actividades de evaluación"
          outlined
          dense
          item-text="compromiso_familiar"
          item-value="id"
          :items="activity"
        />
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-select
          v-model="filter.zone"
          label="Parroquias"
          outlined
          dense
          item-text="name"
          item-value="id"
          :items="zone"
          multiple
        />
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-menu
          v-model="showDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.startDateActivity"
              label="Rango de fecha inicial de actividad"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.startDateActivity"
            @input="showDate = false"
          />
        </v-menu>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-menu
          v-model="show2Date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.endDateActivity"
              label="Rango de fecha final de actividad"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.endDateActivity"
            @input="show2Date = false"
          />
        </v-menu>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-menu
          v-model="show3Date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.startDateEvaluation"
              label="Fecha de fecha inicial de evalución"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.startDateEvaluation"
            @input="show3Date = false"
          />
        </v-menu>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-menu
          v-model="show4Date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.endDateEvaluation"
              label="Fecha de fecha final de evalución"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.endDateEvaluation"
            @input="show4Date = false"
          />
        </v-menu>
      </v-col>
    </v-row>
    <v-row
      class="justify-center mx-auto"
      style="max-width: 500px;"
    >
      <v-col
        sm="6"
        cols="12"
        md="5"
      >
        <v-btn
          color="primary"
          :disabled="loadingFilter"
          :loading="loadingFilter"
          @click="addItemFilter()"
        >
          <v-icon>mdi-filter</v-icon>
          Filtrar reporte
        </v-btn>
      </v-col>
      <v-col
        sm="6"
        cols="12"
        md="5"
      >
        <v-select
          v-model="graphicType"
          outlined
          dense
          :items="['Barra', 'Torta']"
          label="Tipo de gráfica"
        />
      </v-col>
    </v-row>
    <v-card-text class="text-center text-h5 font-weight-medium">
      Cantidad de actividades programadas  incluidad en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
    </v-card-text>
    <v-card-text>
      <v-row class="justify-center">
        <v-col
          v-if="graphicType === 'Torta'"
          cols="12"
          md="10"
        >
          <apexchart
            width="100%"
            type="pie"
            :options="evolutionPie.options"
            :series="evolutionPie.series"
          />
        </v-col>
        <v-col
          v-else
          cols="12"
          md="10"
        >
          <apexchart
            width="100%"
            type="bar"
            :options="evolutionBarra.options"
            :series="evolutionBarra.series"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  import {
    reportStadisticFilefamilyEvolutionApi,
  } from '@/api/modules'
  export default {
    data () {
      return {
        loadingSearch: false,
        loadingFilter: false,
        showDate: false,
        show1Date: false,
        show2Date: false,
        show4Date: false,
        graphicType: 'Torta',
        show3Date: false,
        dialog: false,
        zone: [],
        data: null,
        activity: [],
        risk: [],
        filter: {
          zone: [],
          risk: null,
          activity: null,
          startDateActivity: null,
          endDateActivity: null,
          startDateEvaluation: null,
          endDateEvaluation: null,
        },
        defaultFilter: {
          zone: [],
          risk: null,
          activity: null,
          startDateActivity: null,
          endDateActivity: null,
          startDateEvaluation: null,
          endDateEvaluation: null,
        },
      }
    },
    computed: {
      evolutionBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded',
              },
            },
            xaxis: {
              categories: this.data ? this.data.label : [],
            },
            yaxis: {
              title: {
                text: 'Cantidad de actividades programadas',
              },
            },
          },
          series: [{
            name: 'Actividades programadas',
            data: this.data ? this.data.data : [],
          }],
        }
      },
      evolutionPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.data ? this.data.label : [],
          },
          series: this.data ? this.data.data : [],
        }
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemZone()
      this.listItemRisk()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('risk', ['riskAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticFilefamilyEvolutionApi(this.filter)
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemZone () {
        const serviceResponse = await this.zoneAllActions()
        if (serviceResponse.ok) {
          this.zone = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemRisk () {
        const serviceResponse = await this.riskAllActions()
        if (serviceResponse.ok) {
          this.risk = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async changeActivity (val) {
        const v = this.risk.find(item => item.id === val)
        this.activity = v.activity_evolutions
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticFilefamilyEvolutionApi(this.filter)
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
          this.close()
        } else {
          this.close()
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.loadingFilter = false
          this.filter = Object.assign({}, this.defaultFilter)
        })
      },
    },
  }
</script>
