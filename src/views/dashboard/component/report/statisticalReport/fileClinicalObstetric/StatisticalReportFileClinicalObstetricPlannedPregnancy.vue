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
          v-model="filter.zone"
          label="Parroquia"
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
        <v-select
          v-model="filter.groupAge"
          label="Grupo de edad"
          outlined
          dense
          multiple
          item-text="name"
          item-value="id"
          :items="groupAge"
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
              v-model="filter.startDate"
              label="Fecha de apertura inicial"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.startDate"
            @input="showDate = false"
          />
        </v-menu>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-menu
          v-model="show1Date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.endDate"
              label="Fecha de apertura final"
              prepend-icon="mdi-calendar"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.endDate"
            @input="show1Date = false"
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
      Fichas obstetricas incluidadas en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
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
    mapMutations,
    mapActions,
  } from 'vuex'
  import {
    reportStadisticFileObstatricPlannedPregnancyApi,
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
        groupAge: [],
        data: null,
        filter: {
          zone: [],
          groupAge: [],
          showDate: null,
          endDate: null,
        },
        defaultFilter: {
          zone: [],
          groupAge: [],
          showDate: null,
          endDate: null,
        },
      }
    },
    computed: {
      evolutionBarra () {
        return {
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded',
              },
            },
            chart: {
              id: 'vuechart-example',
            },
            xaxis: {
              categories: this.data ? this.data.label : [],
            },
            yaxis: {
              title: {
                text: 'Cantidad de fichas',
              },
            },
          },
          series: [{
            name: 'Fichas',
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
      this.listItemGroupAge()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapActions('zone', ['zoneAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticFileObstatricPlannedPregnancyApi(this.filter)
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
      async listItemGroupAge () {
        const serviceResponse = await this.groupAgeAllActions()
        if (serviceResponse.ok) {
          this.groupAge = serviceResponse.data.filter(item => item.id >= 4)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticFileObstatricPlannedPregnancyApi(this.filter)
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
