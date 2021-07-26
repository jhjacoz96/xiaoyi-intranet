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
                Pacientes dibéticos por nivel de glucosa
              </v-tab>
              <v-tab href="#tab-2">
                Pacientes dibéticos por clasificación de imc
              </v-tab>
              <v-tab href="#tab-3">
                Pacientes dibéticos por comorbidades
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report-diabetic-patient-glucose />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <statistical-report-diabetic-patient-imc />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <statistical-report-diabetic-patient-comorbid />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReportDiabeticPatientGlucose: () => import('../../../report/statisticalReport/diabeticPatient/StatisticalReportDiabeticPatientGlucose'),
      StatisticalReportDiabeticPatientImc: () => import('../../../report/statisticalReport/diabeticPatient/StatisticalReportDiabeticPatientImc'),
      StatisticalReportDiabeticPatientComorbid: () => import('../../../report/statisticalReport/diabeticPatient/StatisticalReportDiabeticPatientComorbid'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
