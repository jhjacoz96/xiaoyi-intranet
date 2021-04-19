<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Administración del sistema
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite realizar tareas que permiten administrar la información guardada en el sistema.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="3">
              <base-item-master
                title="Recupercion de la DB"
                icon="mdi-36px mdi-database"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>
