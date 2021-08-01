<template>
  <v-card>
    <v-card-title class="text-h4">
      Medicamentos más demandados
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="medicineType"
        :items="['Barra', 'Torta']"
        label="Tipo de gráfica"
      />
    </v-card-text>
    <v-card-text class="justify-center">
      <apexchart
        v-if="medicineType === 'Barra'"
        width="100%"
        height="300"
        type="bar"
        :options="medicineBarra.options"
        :series="medicineBarra.series"
      />
      <apexchart
        v-else
        width="100%"
        height="300"
        type="pie"
        :options="medicinePie.options"
        :series="medicinePie.series"
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
        medicineType: 'Barra',
      }
    },
    computed: {
      medicineBarra () {
        return {
          options: {
            chart: {
              id: 'vuechart-example',
            },
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded',
              },
            },
            xaxis: {
              categories: this.label,
            },
            yaxis: {
              title: {
                text: 'Cantidad de pacientes',
              },
            },
          },
          series: [{
            name: 'Pacientes',
            data: this.data,
          }],
        }
      },
      medicinePie () {
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
