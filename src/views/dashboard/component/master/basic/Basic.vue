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
            Organización
            <v-icon>mdi-hospital-building</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Seguridad
            <v-icon>mdi-key</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Usuarios
            <v-icon>mdi-account-key</v-icon>
          </v-tab>
          <v-tab href="#tab-4">
            Parametros de fichas
            <v-icon>mdi-clipboard-text</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <health-center />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <segurity />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <users />
        </v-tab-item>
        <v-tab-item value="tab-4">
          <file-parameter />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      HealthCenter: () => import('../basic/healthCenter/HealthCenter'),
      Segurity: () => import('../basic/security/Security'),
      Users: () => import('../basic/users/Users'),
      FileParameter: () => import('../basic/fileParameter/FileParameter'),
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
