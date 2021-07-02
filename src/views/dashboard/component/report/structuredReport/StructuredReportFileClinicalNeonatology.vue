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
              Reporte de fichas clínicas de neonatología
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar las fichas clínicas de neonatología y posteriormente generar reportes estructurados en formato PDF.
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
                <v-select
                  v-model="filter.gestacion"
                  outlined
                  multiple
                  dense
                  :items="gestacion"
                  item-text="name"
                  item-value="name"
                  label="Edad gestacional"
                />
                <v-subheader>
                  Rango de peso (g)
                </v-subheader>

                <v-range-slider
                  v-model="filter.peso"
                  :max="5000"
                  :min="700"
                  hide-details
                  class="align-center mb-3"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="filter.peso[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(filter.peso, 0, $event)"
                    />
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="filter.peso[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(filter.peso, 1, $event)"
                    />
                  </template>
                </v-range-slider>
                <v-select
                  v-model="filter.gender"
                  label="Genero"
                  outlined
                  dense
                  item-text="nombre"
                  item-value="id"
                  :items="gender"
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
                      label="Fecha de nacimiento inicial"
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
                      label="Fecha de nacimiento final"
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
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.peso="{ item }">
            {{ item.peso }} g
          </template>
          <template v-slot:item.fecha_nacimiento="{ item }">
            {{ moment(item.fecha_nacimiento).format('D-M-YYYY') }}
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
    gestationWeekAllApi,
    reportFileClinicalNeonatologyAllApi,
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
        gender: [],
        gestacion: [],
        headers: [
          {
            text: 'Número de historia',
            value: 'numero_historia',
          },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Genero',
            value: 'gender_id.nombre',
          },
          {
            text: 'Fecha de nacimiento',
            value: 'fecha_nacimiento',
          },
          {
            text: 'Peso',
            value: 'peso',
          },
          {
            text: 'Edad gestacional',
            value: 'gestation_week_id',
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
          gestacion: [],
          peso: [700, 5000],
          gender: null,
          startDate: null,
          endDate: null,
        },
        filter: {
          gestacion: [],
          peso: [700, 5000],
          gender: null,
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          gestacion: [],
          peso: [700, 5000],
          gender: null,
          startDate: null,
          endDate: null,
        },
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemGender()
      this.listItemGestation()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('gender', ['genderAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await reportFileClinicalNeonatologyAllApi(this.filter)
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
      async listItemGender () {
        const serviceResponse = await this.genderAllActions()
        if (serviceResponse.ok) {
          this.gender = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGestation () {
        const serviceResponse = await gestationWeekAllApi()
        if (serviceResponse.ok) {
          this.gestacion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportFileClinicalNeonatologyAllApi(this.filter)
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
          url: this.$store.state.urlApi + '/api/report/file-clinical-neonatology/generate',
          method: 'POST',
          data: this.filterDownload,
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Informe_ficha_clinica_neonatologia.pdf')
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
