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
          <v-col sm="11">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              icons-and-text
              show-arrows
            >
              <v-tabs-slider />

              <v-tab href="#tab-1">
                Miembros por patologías
              </v-tab>
              <v-tab href="#tab-2">
                Miembros por discapacidades
              </v-tab>
              <v-tab href="#tab-3">
                Miembros por esqueda de vacunación
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report-member-pathology />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <statistical-report-member-disability />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <statistical-report-member-vaccine />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReportMemberPathology: () => import('../../../report/statisticalReport/member/StatisticalReportMemberPathology'),
      StatisticalReportMemberDisability: () => import('../../../report/statisticalReport/member/StatisticalReportMemberDisability'),
      StatisticalReportMemberVaccine: () => import('../../../report/statisticalReport/member/StatisticalReportMemberVaccine'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
