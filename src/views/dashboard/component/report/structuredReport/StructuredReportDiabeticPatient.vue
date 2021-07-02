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
              Reporte de pacientes diabeticos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar los pacientes diabeticos y posteriormente generar reportes estructurados en formato PDF.
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
                  v-model="filter.groupAge"
                  outlined
                  multiple
                  dense
                  :items="groupAge"
                  item-text="name"
                  item-value="id"
                  label="Grupo de edad"
                />
                <v-select
                  v-model="filter.pathology"
                  label="Patologías (Comorbidates)"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="pathology"
                  multiple
                />
                <v-select
                  v-model="filter.treatment"
                  label="Tratamientos no farmacológicos"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="treatment"
                  multiple
                />
                <v-select
                  v-model="filter.gender"
                  label="Genero"
                  outlined
                  dense
                  item-text="nombre"
                  item-value="id"
                  :items="gender"
                />
                <v-select
                  v-model="filter.alertTreatment"
                  label="Incumplimiento de tratamiento no farmacologíco"
                  outlined
                  dense
                  item-text="name"
                  item-value="value"
                  :items="alertTreatment"
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
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.created_at="{ item }">
           {{ moment(item.created_at).format('D-M-YYYY') }}
          </template>
          <template v-slot:item.patologias="{ item }">
            <span v-if="item.patologias.length > 0">{{ item.patologias.join(", ") }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.tratamiento_farmacologico="{ item }">
            <span v-if="item.tratamiento_farmacologico.length > 0">{{ item.tratamiento_farmacologico.join(", ") }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.fecha_nacimiento="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <template v-slot:item.cedula="{ item }">
            <span v-if="item.type_document_id">
              {{ item.type_document_id.nombre.charAt(0) }}</span>-<span v-if="item.cedula">{{ item.cedula }}</span>
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
    reportDiabeticPatientAllApi,
  //  reportMemberDownloadApi,
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
        treatment: [],
        pathology: [],
        groupAge: [],
        gender: [],
        alertTreatment: [
          {
            value: 1,
            name: '1 dia de retrazo',
          },
          {
            value: 2,
            name: '2 dias de retrazo',
          },
          {
            value: 3,
            name: 'Más de 3 dias de retrazo',
          },
        ],
        headers: [
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Cédula',
            value: 'cedula',
          },
          {
            text: 'Genero',
            value: 'gender_id.nombre',
          },
          {
            text: 'Grupo de edad',
            value: 'groupAge.name',
          },
          {
            text: 'Edad',
            value: 'fecha_nacimiento',
          },
          {
            text: 'Tratamiento farmacologíco',
            value: 'tratamiento_farmacologico',
          },
          {
            text: 'Patologías (Comorbidades)',
            value: 'patologias',
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
          groupAge: [],
          pathology: [],
          treatment: [],
          gender: [],
          alertTreatment: null,
          startDate: null,
          endDate: null,
        },
        filter: {
          groupAge: [],
          pathology: [],
          treatment: [],
          gender: [],
          alertTreatment: null,
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          groupAge: [],
          pathology: [],
          treatment: [],
          gender: [],
          alertTreatment: null,
          startDate: null,
          endDate: null,
        },
      }
    },
    computed: {
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemMedicine()
      this.listItemPathology()
      this.listItemGroupAge()
      this.listItemGender()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('medicine', ['medicineAllActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapActions('gender', ['genderAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await reportDiabeticPatientAllApi(this.filter)
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
      async listItemMedicine () {
        const serviceResponse = await this.medicineAllActions()
        if (serviceResponse.ok) {
          this.treatment = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathology () {
        const serviceResponse = await this.pathologyAllActions()
        if (serviceResponse.ok) {
          this.pathology = serviceResponse.data.filter(item => item.id !== 1)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
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
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await reportDiabeticPatientAllApi(this.filter)
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
      async dowloandFile () {
        this.loadingGenerate = true
        /* const serviceResponse = await reportMemberDownloadApi(this.filterDownload)
        const url = window.URL.createObjectURL(new Blob([serviceResponse.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Informe_miembros.pdf')
        document.body.appendChild(link)
        link.click()
        this.loadingGenerate = false */
        const { token } = localStorage
        const defaultHeaders = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + `${token}`,
        }
        axios({
          url: this.$store.state.urlApi + '/api/report/diabetic-patient/generate',
          method: 'POST',
          data: this.filterDownload,
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Informe_paciente_diabetico.pdf')
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
