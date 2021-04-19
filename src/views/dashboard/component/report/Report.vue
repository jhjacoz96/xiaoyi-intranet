<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          icons-and-text
        >
          <v-tabs-slider />

          <v-tab href="#tab-1">
            Estructurados
            <v-icon>mdi-file</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Estadisticos
            <v-icon>mdi-file</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <statistical-report />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <structured-report />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      StatisticalReport: () => import('../report/statisticalReport/StatisticalReport'),
      StructuredReport: () => import('../report/structuredReport/StructuredReport'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
