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
                Familias por riesgo
              </v-tab>
              <v-tab href="#tab-2">
                Familias por nivel total de riesgo
              </v-tab>
              <v-tab href="#tab-3">
                Causas de mortalidad mas comun
              </v-tab>
              <v-tab href="#tab-4">
                Actividades programadas por cumplimiento de compromiso
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report-file-family-risk />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <statistical-report-file-family-level-risk />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <statistical-report-file-family-mortality />
        </v-tab-item>
        <v-tab-item value="tab-4">
          <statistical-report-file-family-evolution />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReportFileFamilyRisk: () => import('../../../report/statisticalReport/fileFamily/StatisticalReportFileFamilyRisk'),
      StatisticalReportFileFamilyLevelRisk: () => import('../../../report/statisticalReport/fileFamily/StatisticalReportFileFamilyLevelRisk'),
      StatisticalReportFileFamilyEvolution: () => import('../../../report/statisticalReport/fileFamily/StatisticalReportFileFamilyEvolution'),
      StatisticalReportFileFamilyMortality: () => import('../../../report/statisticalReport/fileFamily/StatisticalReportFileFamilyMortality'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
