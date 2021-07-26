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
              Reporte estructurado de fichas clinicas de obstetricia
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar las fichas clinicas de obstetricias y posteriormente generar reportes estructurados en formato PDF.
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
                  v-model="filter.groupAge"
                  label="Grupo de edad"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="groupAge"
                  multiple
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.tipo_parto"
                  label="Tipo de parto"
                  outlined
                  dense
                  :items="['Vaginal', 'Cesaria']"
                  multiple
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.embarazo_planificado"
                  label="¿Embarazo planificado?"
                  outlined
                  dense
                  item-text="name"
                  item-value="value"
                  :items="[{name: 'Si', value: true}, {name: 'No', value: false},]"
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.causa_embarazo"
                  :disabled="filter.embarazo_planificado === null"
                  label="Causa de embarazo"
                  outlined
                  dense
                  :items="filter.embarazo_planificado ? causa_embarazo_planificado : causa_embarazo_no_planificado"
                  multiple
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.embarazo"
                  label="Estado"
                  outlined
                  dense
                  item-text="name"
                  item-value="value"
                  :items="[{name: 'Control activo', value: true}, {name: 'Historal', value: false},]"
                />
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
                      label="Fecha de apertura de historia incial"
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
                      label="Fecha de apertura de historia final"
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
          <template v-slot:item.tipo_parto="{ item }">
            <span v-if="item.tipo_parto">{{ item.tipo_parto }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.descripcion_gestacion="{ item }">
            <span v-if="item.descripcion_gestacion">{{ item.descripcion_gestacion }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.causa_embarazo="{ item }">
            <span v-if="item.causa_embarazo">{{ item.causa_embarazo }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.fecha_nacimiento="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ moment(item.created_at).format('D-M-YYYY') }}
          </template>
          <template v-slot:item.embarazo_planificado="{ item }">
            <span v-if="item.embarazo_planificado === null">
              -
            </span>
            <span v-else>
              <v-chip
                v-if="item.embarazo_planificado === true"
                color="success"
              >
                Si
              </v-chip>
              <v-chip
                v-else
                color="pink"
                dark
              >
                No
              </v-chip>
            </span>
          </template>
          <template v-slot:item.embarazo="{ item }">
            <v-chip
              v-if="item.embarazo"
              color="success"
            >
              Control activo
            </v-chip>
            <v-chip
              v-else
              color="pink"
              dark
            >
              Historial
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
    gestationWeekAllApi,
    reportFileClinicalObstricAllApi,
  } from '@/api/modules'
  import { calAge } from '@/utils/calAge'
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
        gestacion: [],
        groupAge: [],
        tipo_parto: ['Vaginal', 'Cesaria'],
        causa_embarazo_planificado: ['Inseminación', 'Vientre alquilado', 'Método convencional', 'Otros'],
        causa_embarazo_no_planificado: ['Fallo de método anticonceptivo', 'Violación', 'Otros'],
        headers: [
          {
            text: 'Número de historia',
            value: 'numero_historia',
          },
          {
            text: 'Edad gestacional',
            value: 'descripcion_gestacion',
          },
          {
            text: 'Grupo de edad',
            value: 'grupo_edad.name',
          },
          {
            text: 'Edad',
            value: 'fecha_nacimiento',
          },
          {
            text: 'Tipo de parto',
            value: 'tipo_parto',
          },
          {
            text: '¿Embarazo planificado?',
            value: 'embarazo_planificado',
          },
          {
            text: 'Causa de embarazo',
            value: 'causa_embarazo',
          },
          {
            text: 'Estado',
            value: 'embarazo',
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
          gestacion: [],
          groupAge: [],
          tipo_parto: [],
          causa_embarazo: [],
          embarazo_planificado: null,
          embarazo: null,
          startDate: null,
          endDate: null,
        },
        filter: {
          gestacion: [],
          groupAge: [],
          tipo_parto: [],
          causa_embarazo: [],
          embarazo_planificado: null,
          embarazo: null,
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          gestacion: [],
          groupAge: [],
          tipo_parto: [],
          causa_embarazo: [],
          embarazo_planificado: null,
          embarazo: null,
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
      this.listItemGroupAge()
      this.listItemGestationWeek()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await reportFileClinicalObstricAllApi(this.filter)
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
      async listItemGroupAge () {
        const serviceResponse = await this.groupAgeAllActions()
        if (serviceResponse.ok) {
          this.groupAge = serviceResponse.data.filter(item => item.id >= 4)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGestationWeek () {
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
        const serviceResponse = await reportFileClinicalObstricAllApi(this.filter)
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
          url: this.$store.state.urlApi + '/api/report/file-clinical-obstetric/generate',
          method: 'POST',
          data: this.filterDownload,
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Informe_ficha_clinica_obstetrica.pdf')
          document.body.appendChild(link)
          link.click()
          this.loadingGenerate = false
        }).catch(e => {
          this.loadingGenerate = false
        })
      },
      age (val) {
        return calAge(val)
      },
    },
  }
</script>
