<template>
  <v-container>
    <v-card-text>
      <v-card-text class="font-weight-medium text-center">
        Criterios busqueda
      </v-card-text>
      <v-row
        class="justify-center mx-auto"
        style="max-width: 500px;"
      >
        <v-col
          sm="4"
          cols="12"
        >
          <v-select
            v-model="filter.level"
            label="Nivel de riesgo"
            outlined
            dense
            item-text="name"
            item-value="id"
            :items="level"
            multiple
          />
        </v-col>
        <v-col
          sm="4"
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
          sm="4"
          cols="12"
        >
          <v-select
            v-model="filter.contamination"
            label="Contaminación"
            outlined
            dense
            item-text="nombre"
            item-value="id"
            :items="contamination"
            multiple
          />
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
    </v-card-text>
    <v-card-text class="text-center text-h5 font-weight-medium">
      Cantidad de familias incluidas en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
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
            :options="riskPie.options"
            :series="riskPie.series"
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
            :options="riskBarra.options"
            :series="riskBarra.series"
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
    reportStadisticFilefamilyRiskApi,
  } from '@/api/modules'
  export default {
    data () {
      return {
        loadingSearch: false,
        loadingFilter: false,
        showDate: false,
        show1Date: false,
        show2Date: false,
        graphicType: 'Torta',
        show3Date: false,
        dialog: false,
        zone: [],
        data: null,
        contamination: [],
        level: [],
        filter: {
          zone: [],
          level: [],
          contamination: [],
        },
        defaultFilter: {
          zone: [],
          level: [],
          contamination: [],
        },
      }
    },
    computed: {
      riskBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            xaxis: {
              categories: this.data ? this.data.label : [],
            },
            yaxis: {
              title: {
                text: 'Cantidad de familias',
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded',
              },
            },
          },
          series: [{
            name: 'Familias',
            data: this.data ? this.data.data : [],
          }],
        }
      },
      riskPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.data ? this.data.label : [],
            colors: this.data ? this.data.color : [],
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
      this.listItemLevelRisk()
      this.listItemContamination()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('levelRisk', ['levelRiskAllActions']),
      ...mapActions('contamination', ['contaminationAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticFilefamilyRiskApi(this.filter)
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
      async listItemContamination () {
        const serviceResponse = await this.contaminationAllActions()
        if (serviceResponse.ok) {
          this.contaminacion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemLevelRisk () {
        const serviceResponse = await this.levelRiskAllActions()
        if (serviceResponse.ok) {
          this.level = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticFilefamilyRiskApi(this.filter)
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingFilter = false
      },
    },
  }
</script>
