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
                Ficha obstetrica por grupo de edad
              </v-tab>
              <v-tab href="#tab-2">
                Ficha obstetrica por tipo de parto
              </v-tab>
              <v-tab href="#tab-3">
                Ficha obstetrica por planificación de embarazo
              </v-tab>
              <v-tab href="#tab-4">
                Ficha obstetrica por caracteristicas de parto
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report-file-clinical-obstetric-pregnancy />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <statistical-report-file-clinical-obstetric-type-birth />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <statistical-report-file-clinical-obstetric-planned-pregnancy />
        </v-tab-item>
        <v-tab-item value="tab-4">
          <statistical-report-file-clinical-obstetric-characteristic />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReportFileClinicalObstetricPregnancy: () => import('../../../report/statisticalReport/fileClinicalObstetric/StatisticalReportFileClinicalObstetricPregnancy'),
      StatisticalReportFileClinicalObstetricTypeBirth: () => import('../../../report/statisticalReport/fileClinicalObstetric/StatisticalReportFileClinicalObstetricTypeBirth'),
      StatisticalReportFileClinicalObstetricPlannedPregnancy: () => import('../../../report/statisticalReport/fileClinicalObstetric/StatisticalReportFileClinicalObstetricPlannedPregnancy'),
      StatisticalReportFileClinicalObstetricCharacteristic: () => import('../../../report/statisticalReport/fileClinicalObstetric/StatisticalReportFileClinicalObstetricCharacteristic'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
