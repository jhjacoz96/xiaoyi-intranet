<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          icons-and-text
          grow
        >
          <v-tabs-slider />

          <v-tab href="#tab-1">
            Maestros básicos y configuraciones
            <v-icon>mdi-information-variant</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Información general
            <v-icon>mdi-information-variant</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <config-info />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <config-content />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>
<script>
  export default {
    name: 'ConfigWeb',
    components: {
      ConfigInfo: () => import('../configWeb/configInfo/ConfigInfo'),
      ConfigContent: () => import('../configWeb/contentWeb/ConfigContent'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
