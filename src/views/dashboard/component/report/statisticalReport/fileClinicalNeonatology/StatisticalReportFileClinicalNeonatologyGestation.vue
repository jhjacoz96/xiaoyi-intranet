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
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.pathologyPregnants"
          label="Patologías prenatales"
          outlined
          dense
          multiple
          item-text="nombre"
          item-value="id"
          :items="pathologyPregnants"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.pathologys"
          label="Patologías de la madre"
          outlined
          dense
          multiple
          item-text="name"
          item-value="id"
          :items="pathologys"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.groupAge"
          label="Grupo de edad"
          outlined
          dense
          item-text="name"
          item-value="id"
          :items="groupAge"
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
    reportStadisticFileNeonatologyGestationApi,
    pathologyPregnantAllApi,
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
        groupAge: [],
        pathologyPregnants: [],
        pathologys: [],
        data: null,
        filter: {
          groupAge: [],
          pathologys: [],
          pathologyPregnants: [],
          showDate: null,
          endDate: null,
        },
        defaultFilter: {
          groupAge: [],
          pathologys: [],
          pathologyPregnants: [],
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
      this.listItemGroupAge()
      this.listItemPathologyPregnant()
      this.listItemPathology()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticFileNeonatologyGestationApi(this.filter)
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
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
      async listItemPathologyPregnant () {
        const serviceResponse = await pathologyPregnantAllApi()
        if (serviceResponse.ok) {
          this.pathologyPregnants = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathology () {
        const serviceResponse = await this.pathologyAllActions()
        if (serviceResponse.ok) {
          this.pathologys = serviceResponse.data
          this.pathologyFathers = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticFileNeonatologyGestationApi(this.filter)
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
