<template>
  <v-container fluid>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Ficha familiar
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite administrar las fichas familiares
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-component
          heading="hola"
        />
        <v-row
          justify="center"
        >
          <v-col cols="3">
            <base-item-master
              title="Seguimiento"
              icon="mdi-36px mdi-36px mdi-bacteria"
              to="ficha-familiar/seguimiento"
            />
          </v-col>
          <v-col cols="3">
            <base-item-master
              title="Iniciar nueva encuesta"
              icon="mdi-36px mdi-36px mdi-bacteria"
              to="ficha-familiar/agregar"
            />
          </v-col>
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  }
</script>
