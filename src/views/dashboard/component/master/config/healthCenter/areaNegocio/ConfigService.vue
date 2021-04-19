<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col
            md="2"
            cols="2"
          >
            <v-btn
              icon
              large
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Configuración de servicios
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite asignar actividades a cada servicio que presta el centro de salud
            </div>
          </v-col>
        </v-row>
      </template>
    </base-material-card>
  </v-container>
</template>
