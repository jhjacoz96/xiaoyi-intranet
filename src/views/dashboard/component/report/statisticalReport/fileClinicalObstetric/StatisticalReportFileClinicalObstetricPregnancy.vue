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
          v-model="filter.zona"
          label="Parroquias"
          outlined
          dense
          item-text="name"
          item-value="id"
          :items="zona"
          multiple
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.discapacidad"
          label="Discapaciades"
          outlined
          dense
          multiple
          item-text="name"
          item-value="id"
          :items="discapacidad"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.embarazo"
          label="Estado ficha obstetrica"
          outlined
          dense
          item-text="name"
          item-value="value"
          :items="embarazo"
        />
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-select
          v-model="filter.psicotropica"
          label="Sustancias psicotropicas"
          outlined
          dense
          multiple
          item-text="name"
          item-value="id"
          :items="psicotropica"
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
    <v-card-text class="text-center text-h5 font-weight-medium">
      fichas obstetricas incluidadas en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
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
    reportStadisticMemberPregnantApi,
    psyshotrophicAllApi,
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
        zona: [],
        discapacidad: [],
        psicotropica: [],
        embarazo: [
          {
            name: 'Control activo',
            value: true,
          },
          {
            name: 'En historial',
            value: false,
          },
        ],
        data: null,
        filter: {
          zona: [],
          discapacidad: [],
          psicotropica: [],
          embarazo: null,
        },
        defaultFilter: {
          zona: [],
          discapacidad: [],
          psicotropica: [],
          embarazo: null,
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
            name: 'fichas',
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
      this.listItemDisability()
      this.listItemZone()
      this.listItemPsicotropic()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('disability', ['disabilityAllActions']),
      ...mapActions('zone', ['zoneAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticMemberPregnantApi(this.filter)
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
          this.zona = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPsicotropic () {
        const serviceResponse = await psyshotrophicAllApi()
        if (serviceResponse.ok) {
          this.psicotropica = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemDisability () {
        const serviceResponse = await this.disabilityAllActions()
        if (serviceResponse.ok) {
          this.discapacidad = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticMemberPregnantApi(this.filter)
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
