<template>
  <v-card>
    <v-card-title class="text-h4">
      Tipos de comentario más comúnes
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="commentType"
        :items="['Barra', 'Torta']"
        label="Tipo de gráfica"
      />
    </v-card-text>
    <v-card-text class="justify-center">
      <apexchart
        v-if="commentType === 'Barra'"
        width="100%"
        height="300"
        type="bar"
        :options="commentBarra.options"
        :series="commentBarra.series"
      />
      <apexchart
        v-else
        width="100%"
        height="300"
        type="pie"
        :options="commentPie.options"
        :series="commentPie.series"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      label: {
        type: Array,
        default: () => ([]),
      },
      data: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        commentType: 'Barra',
      }
    },
    computed: {
      commentBarra () {
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
              categories: this.label,
            },
            yaxis: {
              title: {
                text: 'Cantidad de Comentarios',
              },
            },
          },
          series: [{
            name: 'Comentarios',
            data: this.data,
          }],
        }
      },
      commentPie () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            labels: this.label,
          },
          series: this.data,
        }
      },
    },
  }
</script>
