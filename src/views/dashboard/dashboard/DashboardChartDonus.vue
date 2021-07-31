<template>
  <v-card
    max-width="300"
  >
    <v-card-title class="text-h4">
      Miembros
    </v-card-title>
    <v-card-text>
      <apexchart
        width="250"
        type="donut"
        :options="chart.data.options"
        :series="chart.data.series"
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
    computed: {
      chart () {
        return {
          data: {
            options: {
              plotOptions: {
                customScale: 0.8,
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        show: true,
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: undefined,
                        offsetY: -10,
                        formatter: function (val) {
                          return val
                        },
                      },
                      value: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: undefined,
                        offsetY: 16,
                        formatter: function (val) {
                          return val
                        },
                      },
                      total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {
                          return w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0)
                        },
                      },
                    },
                  },
                },
              },
              legend: {
                show: true,
                position: 'bottom',
              },
              labels: this.label,
            },
            series: this.data,
          },
        }
      },
    },
  }
</script>
