<template>
  <v-container fluid>
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
              Control y seguimiento de ficha clínica de neonatología
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite hacer busquedas y filtrados de las fichas clínicas de neonatologia, así como actualizar y eliminar los registros.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-card-title class="justify-center">
          <v-sheet
            width="600"
            class="text-center"
          >
            <v-card-title class="justify-center">
              <span class="text-h5">Seguimeinto</span>
            </v-card-title>
            <v-container>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Provincia"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Ciudad"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Cantón"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Parroquia"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Entidad"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      dense
                      outlined
                      label="fecha inicial"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-text-field
                      dense
                      outlined
                      label="fecha final"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  outlined
                >
                  Limpiar
                </v-btn>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      outlined
                      v-bind="attrs"
                      class="mx-2"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-filter
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Filtar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Buscar</span>
                </v-tooltip>
              </v-card-actions>
            </v-container>
          </V-sheet>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.accion="{ item }">
            <input
              type="text"
              :value="item"
              class="d-none"
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="info"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-file/</v-icon>
                </v-btn>
              </template>
              <span>Ver ficha de obstetricia</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="info"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Ver de detalles</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="pink"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <!-- <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        </v-dialog> -->
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          { text: 'Nombre', sortable: false, value: 'jefe' },
          { text: 'Fecha de nacimiento', sortable: false, value: 'fecha' },
          { text: 'Provincia', sortable: false, value: 'provincia' },
          { text: 'Cantón', sortable: false, value: 'canton' },
          { text: 'Parroquia', sortable: false, value: 'parroquia' },
          { text: 'Unidad', sortable: false, value: 'unidad' },
          { text: 'Acción', sortable: false, align: 'center', value: 'accion' },
        ],
        desserts: [
          {
            Nombre: 'Ali Jose Valero Mejías',
            fecha: '10/10/2021',
            provincia: 'Quito',
            canton: 'Quito',
            parroquia: 'San isabel',
            unidad: 'Santa isabel',
          },
        ],
      }
    },
  }
</script>
