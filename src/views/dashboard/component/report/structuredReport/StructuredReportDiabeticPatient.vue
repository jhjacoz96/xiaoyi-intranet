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
              Reporte estructurado de pacientes diabeticos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar los pacientes diabeticos y posteriormente generar reportes estructurados en formato PDF.
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-container>
          <v-card-text class="font-weight-bold text-center">
            Criterios busqueda
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
                  v-model="filter.groupAge"
                  outlined
                  multiple
                  dense
                  :items="groupAge"
                  item-text="name"
                  item-value="id"
                  label="Grupo de edad"
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.pathology"
                  label="Comorbidates"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="pathology"
                  multiple
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.treatment"
                  label="Medicamentos"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="treatment"
                  multiple
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
                <v-select
                  v-model="filter.imc"
                  label="Clasificación de imc"
                  outlined
                  dense
                  multiple
                  :items="imc"
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.alertTreatment"
                  label="Incumplimiento de medicamento"
                  outlined
                  dense
                  item-text="name"
                  item-value="value"
                  :items="alertTreatment"
                />
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
          <template v-slot:item.descripcion_imc="{ item }">
            {{ item.descripcion_imc ? item.descripcion_imc : '-' }}
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
        imc: [
          'Desnutrición',
          'Peso normal',
          'Sobrepeso',
          'Obesidad',
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
            text: 'Medicamentos',
            value: 'tratamiento_farmacologico',
          },
          {
            text: 'Comorbidades',
            value: 'patologias',
          },
          {
            text: 'Clasificación imc',
            value: 'descripcion_imc',
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
          imc: [],
          alertTreatment: null,
        },
        filter: {
          groupAge: [],
          pathology: [],
          treatment: [],
          gender: [],
          imc: [],
          alertTreatment: null,
        },
        defaultFilter: {
          groupAge: [],
          pathology: [],
          treatment: [],
          gender: [],
          imc: [],
          alertTreatment: null,
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
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingFilter = false
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
