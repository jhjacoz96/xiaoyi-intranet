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
              Reporte de miembros
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite filtrar los miembros de las fichas familiares y posteriormente generar reportes estructurados en formato PDF.
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
                  v-model="filter.disability"
                  outlined
                  multiple
                  dense
                  :items="disability"
                  item-text="name"
                  item-value="id"
                  label="Discapacidades"
                />
              </v-col>
              <v-col
                sm="4"
                cols="12"
              >
                <v-select
                  v-model="filter.pathology"
                  label="Patologías"
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
                  v-model="filter.groupAge"
                  label="Grupos de edades"
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
                  v-model="filter.vaccine"
                  label="Vacunación"
                  outlined
                  dense
                  item-text="nombre"
                  item-value="id"
                  :items="vacunacion"
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
                      label="Fecha de nacimiento inicial"
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
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.patologias="{ item }">
            <span v-if="item.patologias.length > 0">{{ item.patologias.join(", ") }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.discapacidades="{ item }">
            <span v-if="item.discapacidades.length > 0">{{ item.discapacidades.join(", ") }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.fecha_nacimiento="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <template v-slot:item.cedula="{ item }">
            <span v-if="item.type_document_id">
              {{ item.type_document_id.nombre.charAt(0) }}</span>-<span v-if="item.cedula">{{ item.cedula }}</span>
          </template>
          <template v-slot:item.vacunacion="{ item }">
            <v-chip
              v-if="item.vacunacion"
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
    reportMemberAllApi,
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
        disability: [],
        pathology: [],
        groupAge: [],
        gender: [],
        vacunacion: [
          {
            id: true,
            nombre: 'Completa',
          },
          {
            id: false,
            nombre: 'Incompleta',
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
            text: 'Edad',
            value: 'fecha_nacimiento',
          },
          {
            text: 'Patologías',
            value: 'patologias',
          },
          {
            text: 'Discapacidades',
            value: 'discapacidades',
          },
          {
            text: 'Genero',
            value: 'gender_id.nombre',
          },
          {
            text: 'Dirección',
            value: 'direccion_habitual',
          },
          {
            text: 'Parroquia',
            value: 'zone_id.name',
          },
          {
            text: 'Vacunación',
            value: 'vacunacion',
          },
          {
            text: 'Grupo de edad',
            value: 'groupAge.name',
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
          disability: [],
          pathology: [],
          groupAge: [],
          pregnant: undefined,
          gender: null,
          vaccine: undefined,
          startDate: null,
          endDate: null,
        },
        filter: {
          disability: [],
          pathology: [],
          groupAge: [],
          gender: [],
          vaccine: undefined,
          startDate: null,
          endDate: null,
        },
        defaultFilter: {
          disability: [],
          pathology: [],
          groupAge: [],
          gender: [],
          vaccine: undefined,
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
      this.listItemDisability()
      this.listItemPathology()
      this.listItemGroupAge()
      this.listItemGender()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('disability', ['disabilityAllActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapActions('gender', ['genderAllActions']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await reportMemberAllApi(this.filter)
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
      async listItemDisability () {
        const serviceResponse = await this.disabilityAllActions()
        if (serviceResponse.ok) {
          this.disability = serviceResponse.data
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
          this.pathology = serviceResponse.data
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
        const serviceResponse = await reportMemberAllApi(this.filter)
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
          url: this.$store.state.urlApi + '/api/report/member/generate',
          method: 'POST',
          data: this.filterDownload,
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Informe_miembros.pdf')
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
