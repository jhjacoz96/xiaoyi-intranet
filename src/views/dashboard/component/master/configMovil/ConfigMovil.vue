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
            Configuración de aplicación móvil
            <v-icon>mdi-information-variant</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-card flat>
            <v-container fluid>
              <v-subheader>
                Calificación de la aplicación
              </v-subheader>
              <v-row>
                <v-col cols="3">
                  <base-item-master
                    title="Preguntas de calificación"
                    icon="mdi-36px mdi-comment-question"
                    to="configuracion-movil/preguntas-calificacion"
                  />
                </v-col>
                <v-col cols="3">
                  <base-item-master
                    title="Niveles de calificación"
                    icon="mdi-36px mdi-comment-question"
                    to="configuracion-movil/niveles-calificacion"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'ConfigMovil',
    data () {
      return {
        tab: null,
      }
    },
  }
</script>
