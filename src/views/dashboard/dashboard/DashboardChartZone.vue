<template>
  <v-card>
    <v-card-title class="text-h4">
      Parroquias
    </v-card-title>
    <v-card-text class="justify-center">
      <apexchart
        width="100%"
        height="300"
        type="bar"
        :options="zoneBarra.options"
        :series="zoneBarra.series"
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
        zoneType: 'Barra',
      }
    },
    computed: {
      zoneBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '40%',
                endingShape: 'rounded',
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: this.label,
              title: {
                text: 'Cantidad de familias',
              },
            },
          },
          series: [{
            name: 'Familias',
            data: this.data,
          }],
        }
      },
      zonePie () {
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
