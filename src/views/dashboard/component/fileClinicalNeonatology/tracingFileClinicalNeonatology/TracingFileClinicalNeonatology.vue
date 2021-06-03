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
              Perminite realizar busquedas y filtrados de las fichas clínicas de neonatología, así como actualizar y visualidar los registros registros específicos.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-card-actions class="justify-center">
          <v-form>
            <v-row>
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
              <!-- <v-col
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
              </v-col> -->
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
                cc
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
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.fecha_nacimiento="{ item }">
            {{ item.fecha_naciento }}
          </template>
          <template v-slot:item.edad="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  fab
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="$router.push(`/intranet/ficha-familiar/${item.file_family_id}`)"
                >
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>Visualizar ficha familiar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  fab
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="$router.push(`/intranet/ficha-clinica-obstetricia/actualizar/${item.pregnant_id}`)"
                >
                  <v-icon>mdi-human-pregnant</v-icon>
                </v-btn>
              </template>
              <span>Visualizar ficha clinica de obstetrica de la madre</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  fab
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="$router.push(`/intranet/ficha-clinica-neonatologia/actualizar/${item.id}`)"
                >
                  <v-icon>mdi-baby</v-icon>
                </v-btn>
              </template>
              <span>Visualizar ficha clinica de neonatología</span>
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
  import { calAge } from '@/utils/calAge'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        loadingFilter: false,
        loadingSearch: false,
        loadingDataTable: false,
        headers: [
          { text: 'Número de historia', sortable: false, value: 'numero_historia' },
          { text: 'Nombres y apellidos', sortable: false, value: 'nombre' },
          { text: 'Lugar nacimiento', sortable: false, value: 'lugar_naciento' },
          { text: 'Edad', sortable: false, value: 'edad' },
          { text: 'Acción', sortable: false, value: 'accion' },
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
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyAllActions', 'fileClinicalNeonatologySearchActions', 'fileClinicalNeonatologyFilterActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await this.fileClinicalNeonatologyAllActions()
        if (serviceResponse.ok) {
          this.loadingDataTable = false
          this.desserts = serviceResponse.data
        } else {
          this.loadingDataTable = false
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
        const serviceResponse = await this.fileClinicalNeonatologySearchActions(this.editedItemSearch)
        console.log(serviceResponse)
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
        const serviceResponse = await this.fileClinicalNeonatologyFilterActions(this.editedItemFilter)
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
