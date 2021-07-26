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
            v-model="filter.culturalGroup"
            label="Grupos culturales"
            outlined
            dense
            item-text="name"
            item-value="id"
            :items="culturalGroup"
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
            label="Tipos de contaminantes"
            outlined
            dense
            item-text="nombre"
            item-value="id"
            :items="contaminantion"
            multiple
          />
        </v-col>
        <v-col
          sm="8"
          cols="12"
        >
          <v-range-slider
            v-model="filter.member"
            :max="30"
            :min="1"
            hide-details
            class="align-center mb-3"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="filter.member[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(filter.member, 0, $event)"
              />
            </template>
            <template v-slot:append>
              <v-text-field
                :value="filter.member[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(filter.member, 1, $event)"
              />
            </template>
          </v-range-slider>
          <div class="text-subtitle-1 font-weight-light">
            Rango de cantidad de mimbros
          </div>
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
      Cantidad de familias incluidad en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
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
    reportStadisticFilefamilyLevelTotalRiskApi,
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
        contaminantion: [],
        culturalGroup: [],
        filter: {
          zone: [],
          culturalGroup: [],
          member: [1, 30],
          contamination: [],
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          zone: [],
          culturalGroup: [],
          contamination: [],
          member: [1, 30],
          startDate: null,
          endDate: null,
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
                text: 'Cantidad de familias',
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
            legend: {
              customLegendItems: this.data ? this.data.legend : [],
            },
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
      this.listItemCulturalGroup()
      this.listItemContamination()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('culturalGroup', ['culturalGroupAllActions']),
      ...mapActions('contamination', ['contaminationAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticFilefamilyLevelTotalRiskApi(this.filter)
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
          this.contaminantion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemCulturalGroup () {
        const serviceResponse = await this.culturalGroupAllActions()
        if (serviceResponse.ok) {
          this.culturalGroup = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticFilefamilyLevelTotalRiskApi(this.filter)
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
