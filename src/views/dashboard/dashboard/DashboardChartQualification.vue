<template>
  <v-card>
    <v-card-title class="text-h4 mb-2">
      <div>Calificación de la aplicacion movil</div>
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="qualificationType"
        :items="['Barra', 'Torta']"
        label="Tipo de gráfica"
      />
      <v-spacer />
      <v-select
        v-model="editedItem.question"
        label="Preguntas"
        dense
        item-value="id"
        item-text="nombre"
        :items="question"
        @change="listItem"
      />
    </v-card-text>
    <v-card-text class="justify-center">
      <apexchart
        v-if="commentType === 'Barra'"
        width="100%"
        height="300"
        type="bar"
        :options="qualificationBarra.options"
        :series="qualificationBarra.series"
      />
      <apexchart
        v-else
        width="100%"
        height="300"
        type="pie"
        :options="qualificationPie.options"
        :series="qualificationPie.series"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    dashboardReportQualificationApi,
  } from '@/api/modules'
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        response: null,
        qualificationType: 'Barra',
        question: [],
        editedItem: {
          question: 2,
        },
      }
    },
    computed: {
      qualificationBarra () {
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
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: this.response ? this.response.label : [],
            },
            yaxis: {
              title: {
                text: 'Cantidad de Comentarios',
              },
            },
          },
          series: [{
            name: 'Comentarios',
            data: this.response ? this.response.data : [],
          }],
        }
      },
      qualificationPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.response ? this.response.label : [],
          },
          series: this.response ? this.response.data : [],
        }
      },
    },
    created () {
      this.listItem()
      this.listItemQualificationLevel()
    },
    methods: {
      ...mapActions('qualification', ['qualificationAllActions']),
      ...mapMutations(['alert']),
      async listItem (val) {
        const serviceResponse = await dashboardReportQualificationApi(this.editedItem.question)
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.response = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemQualificationLevel () {
        const serviceResponse = await this.qualificationAllActions()
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.question = serviceResponse.data
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
