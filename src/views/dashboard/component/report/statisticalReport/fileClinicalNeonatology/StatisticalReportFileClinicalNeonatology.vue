<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col
            cols="1"
          >
            <v-btn
              icon
              large
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col md="11">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              icons-and-text
              show-arrows
            >
              <v-tabs-slider />

              <v-tab href="#tab-1">
                Ficha de neontalogia por edad gestacional
              </v-tab>
              <!-- <v-tab href="#tab-2">
                Ficha de neontalogia por vacuna
              </v-tab> -->
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report-file-clinical-neonatology-gestation />
        </v-tab-item>
        <!-- <v-tab-item value="tab-2">
          <statistical-report-file-clinical-neonatology-vaccine />
        </v-tab-item> -->
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReportFileClinicalNeonatologyGestation: () => import('../../../report/statisticalReport/fileClinicalNeonatology/StatisticalReportFileClinicalNeonatologyGestation'),
      /* StatisticalReportFileClinicalNeonatologyVaccine: () => import('../../../report/statisticalReport/fileClinicalNeonatology/StatisticalReportFileClinicalNeonatologyVaccine'), */
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
