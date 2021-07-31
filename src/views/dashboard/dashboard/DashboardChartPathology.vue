<template>
  <v-card>
    <v-card-title class="text-h4 mb-2">
      <div>Patologías más comunes por género</div>
      <v-spacer />
      <v-select
        v-model="editedItem.group_age_id"
        label="Grupo de edad"
        outlined
        dense
        item-value="id"
        item-text="name"
        :items="groupAge"
        @change="listItem"
      />
    </v-card-title>
    <v-card-text>
      <apexchart
        width="100%"
        type="bar"
        :options="chart.data.options"
        :series="chart.data.series"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    dashboardReportPathologyApi,
  } from '@/api/modules'
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        response: null,
        groupAge: [],
        editedItem: {
          group_age_id: null,
        },
      }
    },
    computed: {
      chart () {
        return {
          data: {
            options: {
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
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
              },
              xaxis: {
                categories: this.response ? this.response.label : [],
              },
              yaxis: {
                title: {
                  text: 'Cantidades de miembros',
                },
              },
              fill: {
                opacity: 1,
              },
            },
            series: this.response ? this.response.data : [],
          },
        }
      },
    },
    created () {
      this.listItem()
      this.listItemGroupAge()
    },
    methods: {
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapMutations(['alert']),
      async listItem (val) {
        const serviceResponse = await dashboardReportPathologyApi(this.editedItem.group_age_id)
        if (serviceResponse.ok) {
          this.response = serviceResponse.data
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
    },
  }
</script>
