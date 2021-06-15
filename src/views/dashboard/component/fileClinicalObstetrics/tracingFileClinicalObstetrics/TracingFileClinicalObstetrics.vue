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
              Control y seguimiento de ficha clínica de obstetricia
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite hacer busquedas y filtrados de las fichas clínicas de obstetricia.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-card-actions class="justify-center">
          <v-form>
            <v-row>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    class="mb-5"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-help
                  </v-icon>
                </template>
                <span>Búsqueda por número de historia, nombre, cédula, parroquia</span>
              </v-tooltip>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItemSearch.search"
                  placeholder="Búsqueda"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="2"
              >
                <v-btn
                  color="primary"
                  class="ml-1"
                  :disabled="loadingSearch"
                  :loading="loadingSearch"
                  @click="addItemSearch()"
                >
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="2"
              >
                <v-btn
                  color="primary"
                  outlined
                  class="ml-5"
                  @click="dialog = true"
                >
                  <v-icon>
                    mdi-filter
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-actions>
        <v-dialog
          v-model="dialog"
          width="400"
        >
          <v-card>
            <v-container>
              <v-card-text class="font-weight-bold text-center">
                filtrar busqueda
              </v-card-text>
              <v-card-text>
                <v-select
                  v-model="editedItemFilter.group_age_id"
                  outlined
                  multiple
                  dense
                  :items="groupAge"
                  item-text="name"
                  item-value="id"
                  label="Grupo de edad"
                />
                <p class="text-h6 font-weight-light">
                  En estado de embarado
                </p>
                <v-radio-group
                  v-model="editedItemFilter.embarazo"
                  row
                  mandatory
                >
                  <v-radio
                    label="Solo embarazadas actuales"
                    :value="1"
                  />
                  <v-radio
                    label="Todas"
                    :value="0"
                  />
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="loadingFilter"
                  :loading="loadingFilter"
                  @click="addItemFilter()"
                >
                  Filtrar
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="id"
          show-expand
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.embarazo="{ item }">
            <v-chip
              v-if="item.embarazo"
              color="success"
              class="white--text"
            >
              Si
            </v-chip>
            <v-chip
              v-else
              color="pink"
              class="white--text"
            >
              No
            </v-chip>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-container>
                <v-row class="justify-center">
                  <v-col
                    v-for="(file, index) in item.prenatal_todos"
                    :key="index"
                    cols="4"
                  >
                    <v-card
                      class="mx-auto"
                      max-width="344"
                      outlined
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-h5 mb-1">
                            Número de historia:
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ file.numero_historia }}
                          </v-list-item-subtitle>
                          <v-list-item-title class="text-h5 mb-1">
                            Fecha de creación
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ moment(file.created_at).format('D-M-YYYY') }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          outlined
                          text
                          :to="`/intranet/ficha-clinica-obstetricia/actualizar/${file.id}`"
                        >
                          Control
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </template>
          <template v-slot:item.edad="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <!-- <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="$router.push(`/intranet/ficha-clinica-obstetricia/${item.id}`)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar</span>x
            </v-tooltip>
          </template> -->
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
  import { calAge } from '@/utils/calAge'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        expanded: [],
        singleExpand: false,
        loadingSearch: false,
        loadingFilter: false,
        loadingDataTable: false,
        headers: [
          { text: 'Nombres y apellidos', sortable: false, value: 'nombre' },
          { text: 'Cédula', sortable: false, value: 'cedula' },
          { text: 'Edad', sortable: false, value: 'edad' },
          { text: 'En estado de embarazo', align: 'center', sortable: false, value: 'embarazo' },
          { text: 'Parroquia', sortable: false, value: 'zone_id.name' },
        ],
        desserts: [],
        groupAge: [],
        editedItemSearch: {
          search: '',
          filter: '',
        },
        defaultItemSearch: {
          search: '',
          filter: '',
        },
        editedItemFilter: {
          embarazo: undefined,
          group_age_id: [],
        },
        defaultItemFilter: {
          embarazo: undefined,
          group_age_id: [],
        },
      }
    },
    created () {
      this.listItem()
      this.listItemGroupAge()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricAllActions', 'fileClinicalObstetricSearchActions', 'fileClinicalObstetricFilterActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await this.fileClinicalObstetricAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingDataTable = false
      },
      async listItemGroupAge () {
        const serviceResponse = await this.groupAgeAllActions()
        if (serviceResponse.ok) {
          this.groupAge = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      age (val) {
        return calAge(val)
      },
      async addItemSearch () {
        this.loadingSearch = true
        const serviceResponse = await this.fileClinicalObstetricSearchActions(this.editedItemSearch)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingSearch = false
        this.editedItemSearch = Object.assign({}, this.defaultItemSearch)
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await this.fileClinicalObstetricFilterActions(this.editedItemFilter)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
          this.close()
        } else {
          this.close()
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItemFilter = Object.assign({}, this.defaultItemFilter)
        })
        this.loadingFilter = false
      },
    },
  }
</script>
