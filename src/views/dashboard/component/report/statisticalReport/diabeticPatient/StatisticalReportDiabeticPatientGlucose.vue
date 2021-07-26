<template>
  <v-container>
    <v-card-text class="font-weight-medium text-center">
      Criterios busqueda
    </v-card-text>
    <v-row
      class="justify-center mx-auto"
      style="max-width: 600px;"
    >
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.imc"
          label="Clasificación de imc"
          outlined
          dense
          multiple
          :items="imc"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.pathology"
          label="Comorbidades"
          outlined
          dense
          multiple
          :items="pathology"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.groupAge"
          label="Grupos de edad"
          outlined
          dense
          item-text="name"
          item-value="id"
          :items="groupAge"
          multiple
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-select
          v-model="filter.gender"
          label="Grupos de edad"
          outlined
          dense
          item-text="nombre"
          item-value="id"
          :items="gender"
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
    <v-card-text class="text-center text-h5 font-weight-medium">
      Pacientes diabéticos incluidados en el reporte: <span v-if="data">{{ data.total }}</span><span v-else>0</span>
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
    reportStadisticDiabeticPatientGlucoseApi,
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
        imc: [
          'Desnutrición',
          'Peso normal',
          'Sobrepeso',
          'Obesidad',
        ],
        gender: [],
        groupAge: [],
        pathology: [],
        data: null,
        filter: {
          imc: [],
          groupAge: [],
          gender: [],
          pathology: [],
        },
        defaultFilter: {
          imc: [],
          groupAge: [],
          gender: [],
          pathology: [],
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
                text: 'Cantidad de pacientes diabéticos',
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
      this.listItemGender()
      this.listItemPathology()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapActions('gender', ['genderAllActions']),
      async listItem () {
        const serviceResponse = await reportStadisticDiabeticPatientGlucoseApi(this.filter)
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
          this.groupAge = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGender () {
        const serviceResponse = await this.genderAllActions()
        if (serviceResponse.ok) {
          this.gender = serviceResponse.data
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
          this.pathology = serviceResponse.data.filter(item => item.id !== 1)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportStadisticDiabeticPatientGlucoseApi(this.filter)
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
