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
              Seguimiento de ficha familiar
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite administrar fichas familiares de una comunidad
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
                      label="Barrio"
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
                    <v-select
                      dense
                      outlined
                      label="Zona"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      dense
                      outlined
                      label="Gestor"
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
        <!-- <v-card-title class="my-3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          />
        </v-card-title> -->
        <v-data-table
          :headers="headers"
          dense
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
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Ver</span>
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
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          { text: 'Numero de historia', sortable: false, value: 'codigo' },
          { text: 'Nivel de riesgo', sortable: false, value: 'levelRiesgo' },
          { text: 'Sector', sortable: false, value: 'sector' },
          { text: 'Acción', sortable: false, align: 'center', value: 'accion' },
        ],
        desserts: [],
      }
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('fileFamily', ['fileFamilyPostActions', 'fileFamilyAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.fileFamilyAllActions()
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
