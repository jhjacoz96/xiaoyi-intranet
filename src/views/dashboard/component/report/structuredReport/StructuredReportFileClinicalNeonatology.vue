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
          <v-col md="8">
            <div class="text-h3 font-weight-medium">
              Reporte estructurado de fichas clínicas de neonatología
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar las fichas clínicas de neonatología y posteriormente generar reportes estructurados en formato PDF.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-container>
          <v-card-text class="font-weight-bold text-center">
            Criterios de busqueda
          </v-card-text>
          <v-card-text>
            <v-row
              justify="center"
              class="mx-auto"
              style="max-width: 500px;"
            >
              <v-col
                sm="4"
                cols="12"
              >
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
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.gender"
                  label="Genero"
                  outlined
                  dense
                  item-text="nombre"
                  item-value="id"
                  :items="gender"
                  multiple
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
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
                <div class="text-subtitle-1 font-weight-light">
                  Rango de peso (g)
                </div>
              </v-col>
              <v-col
                sm="6"
                cols="12"
              >
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
              </v-col>
              <v-col
                sm="6"
                cols="12"
              >
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
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.bcg"
                  outlined
                  :items="bcg"
                  label="Vacuna bcg"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.hb"
                  outlined
                  :items="hb"
                  label="Vacuna hb"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.rotavirus"
                  outlined
                  :items="rotavirus"
                  label="Vacuna rotavirus"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.fipv"
                  outlined
                  :items="fipv"
                  label="Vacuna fipv"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.bopv"
                  outlined
                  :items="bopv"
                  label="Vacuna bopv"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.pentavaliente"
                  outlined
                  :items="pentavaliente"
                  label="Vacuna pentavaliente"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.neumococo"
                  outlined
                  :items="neumococo"
                  label="Vacuna neumococo"
                  dense
                  multiple
                />
              </v-col>
              <v-col
                v-if="show"
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.influenza_estacionaria"
                  outlined
                  :items="influenza_estacionaria"
                  label="Vacuna influenza estacionaria"
                  dense
                  multiple
                />
              </v-col>
              <v-col cols="12">
                <v-card-actions class="pa-0 ma-0">
                  <v-subheader>
                    {{ show ? 'Reducir' : 'Expandir' }} criterios
                  </v-subheader>

                  <v-spacer />

                  <v-btn
                    text
                    @click="show = !show"
                  >
                    <v-icon>
                      {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="loadingFilter"
              :loading="loadingFilter"
              @click="addItemFilter()"
            >
              <v-icon>mdi-filter</v-icon>
              Filtrar
            </v-btn>
            <v-btn
              :disabled="loadingGenerate"
              :loading="loadingGenerate"
              color="secondary"
              outlined
              @click="dowloandFile"
            >
              <v-icon>mdi-file-pdf</v-icon>
              Descargar
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-container>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.peso="{ item }">
            {{ item.peso || '-' }}
          </template>
          <template v-slot:item.gestation_week_id="{ item }">
            {{ item.gestation_week_id || '-' }}
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
        show: false,
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
            text: 'Cédula',
            value: 'cedula',
          },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Lugar de nacimiento',
            value: 'lugar_naciento',
          },
          {
            text: 'Genero',
            value: 'gender_id.nombre',
          },
          {
            text: 'Peso (g)',
            value: 'peso',
          },
          {
            text: 'Edad gestacional',
            value: 'gestation_week_id',
          },
          {
            text: 'Fecha de nacimiento',
            value: 'fecha_nacimiento',
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
          gender: [],
          startDate: null,
          endDate: null,
          bcg: [],
          hb: [],
          rotavirus: [],
          fipv: [],
          bopv: [],
          pentavaliente: [],
          neumococo: [],
          influenza_estacionaria: [],
        },
        filter: {
          gestacion: [],
          peso: [700, 5000],
          gender: [],
          startDate: null,
          endDate: null,
          bcg: [],
          hb: [],
          rotavirus: [],
          fipv: [],
          bopv: [],
          pentavaliente: [],
          neumococo: [],
          influenza_estacionaria: [],
        },
        defaultFilter: {
          gestacion: [],
          peso: undefined,
          gender: [],
          startDate: null,
          endDate: null,
          bcg: [],
          hb: [],
          rotavirus: [],
          fipv: [],
          bopv: [],
          pentavaliente: [],
          neumococo: [],
          influenza_estacionaria: [],
        },
        bcg: [
          'Dosis unica (24 H)',
        ],
        hb: [
          'Dosis unica (24 H)',
        ],
        rotavirus: [
          '1era dosis (2m)',
          '2da dosis (4m)',
        ],
        fipv: [
          '1era dosis (2m)',
          '2da dosis (4m)',
        ],
        bopv: [
          '1era dosis (6m)',
        ],
        pentavaliente: [
          '1era dosis (2m)',
          '2da dosis (4m)',
          '3ra dosis (6m)',
        ],
        neumococo: [
          '1era dosis (2m)',
          '2da dosis (4m)',
          '3ra dosis (6m)',
        ],
        influenza_estacionaria: [
          '1era dosis (6m)',
          '2da dosis (al mes de 1era dosis)',
        ],
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
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingFilter = false
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
