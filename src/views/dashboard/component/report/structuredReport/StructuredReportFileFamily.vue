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
              Reporte de fichas familiares
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar las fichas familiares y posteriormente generar reportes estructurados en formato PDF.
            </div>
          </v-col>
        </v-row>
        <v-btn
          absolute
          fab
          right
          :disabled="loadingGenerate"
          :loading="loadingGenerate"
          color="secondary"
          @click="dowloandFile"
        >
          <v-icon>mdi-file-pdf</v-icon>
        </v-btn>
      </template>
      <v-card-text>
        <v-dialog
          v-model="dialog"
          width="400"
        >
          <v-card>
            <v-container>
              <v-card-text class="font-weight-bold text-center">
                Filtrar busqueda
              </v-card-text>
              <v-card-text>
                <v-subheader>
                  Familias
                </v-subheader>
                <v-select
                  v-model="filter.zone"
                  outlined
                  multiple
                  dense
                  :items="zone"
                  item-text="name"
                  item-value="id"
                  label="Parroquias"
                />
                <v-select
                  v-model="filter.levelTotalRisk"
                  label="Niveles de riesgo"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="levelTotal"
                  multiple
                />
                <v-select
                  v-model="filter.culturalGroup"
                  label="Grupos culturales"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="culturalGroup"
                  multiple
                />
                <v-menu
                  v-model="showDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="100px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filter.startDate"
                      label="Fecha inicial"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filter.startDate"
                    @input="show1Date = false"
                  />
                </v-menu>
                <v-menu
                  v-model="show2Date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="100px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filter.endDate"
                      label="Fecha final"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filter.endDate"
                    @input="show3Date = false"
                  />
                </v-menu>
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
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:top>
            <v-spacer />
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
          </template>
          <template v-slot:item.jefe_familia="{ item }">
            {{ item.jefe_familia ? item.jefe_familia : '-' }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ moment(item.created_at).format('D-M-YYYY') }}
          </template>
          <template v-slot:item.level_total_id="{ item }">
            <v-chip
              v-if="item.level_total_id"
              :color="item.level_total_id.color"
            >
              {{ item.level_total_id.name }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  import {
    reportFilefamilyAllApi,
  } from '@/api/modules'
  export default {
    data () {
      return {
        showDate: null,
        show1Date: null,
        show2Date: null,
        show3Date: null,
        search: '',
        dialog: false,
        loadingSearch: false,
        loadingFilter: false,
        loadingDataTable: false,
        loadingGenerate: false,
        zone: [],
        levelTotal: [],
        culturalGroup: [],
        headers: [
          {
            text: 'Número de historia',
            value: 'numero_historia',
          },
          {
            text: 'Parroquia',
            value: 'zone_id.name',
          },
          {
            text: 'Dirección',
            value: 'direccion_habitual',
          },
          {
            text: 'Número de casa',
            value: 'numero_casa',
          },
          {
            text: 'Número de telefono',
            value: 'numero_telefono',
          },
          {
            text: 'Jefe de familia',
            value: 'jefe_familia',
          },
          {
            text: 'Nivel de riesgo',
            value: 'level_total_id',
          },
          {
            text: 'Fecha de apertura de historia',
            value: 'created_at',
          },
        ],
        desserts: [],
        editedItem: {
          name: '',
        },
        defaultItem: {
          name: '',
        },
        filterDownload: {
          zone: [],
          levelTotalRisk: [],
          culturalGroup: [],
          startDate: null,
          endDate: null,
        },
        filter: {
          zone: [],
          levelTotalRisk: [],
          culturalGroup: [],
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          zone: [],
          levelTotalRisk: [],
          culturalGroup: [],
          startDate: null,
          endDate: null,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar riesgo' : 'Editar riesgo'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemZone()
      this.listItemLevelTotal()
      this.listItemCulturalGroup()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('levelTotal', ['levelTotalAllActions']),
      ...mapActions('culturalGroup', ['culturalGroupAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await reportFilefamilyAllApi(this.filter)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
          this.loadingDataTable = false
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
          this.loadingDataTable = false
        }
      },
      async listItemZone () {
        const serviceResponse = await this.zoneAllActions()
        if (serviceResponse.ok) {
          this.zone = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemLevelTotal () {
        const serviceResponse = await this.levelTotalAllActions()
        if (serviceResponse.ok) {
          this.levelTotal = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemCulturalGroup () {
        const serviceResponse = await this.culturalGroupAllActions()
        if (serviceResponse.ok) {
          this.culturalGroup = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportFilefamilyAllApi(this.filter)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
          Object.assign(this.filterDownload, this.filter)
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
          this.loadingFilter = false
          this.filter = Object.assign({}, this.defaultFilter)
        })
      },
      dowloandFile () {
        this.loadingGenerate = true
        const { token } = localStorage
        const defaultHeaders = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + `${token}`,
        }
        axios({
          url: this.$store.state.urlApi + '/api/report/file-family/generate',
          method: 'POST',
          data: this.filterDownload,
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Informe_ficha_familiar.pdf')
          document.body.appendChild(link)
          link.click()
          this.loadingGenerate = false
        }).catch(e => {
          this.loadingGenerate = false
        })
      },
    },
  }
</script>
