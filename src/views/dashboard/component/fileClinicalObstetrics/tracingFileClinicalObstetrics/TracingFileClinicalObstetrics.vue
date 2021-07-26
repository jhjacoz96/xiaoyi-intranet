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
              {{ history ? `Control y seguimiento de ficha clínica de obstetricia` : `Historial de ficha clínica de obstetricia` }}
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
                  v-model="editedItemFilter.gestacion"
                  outlined
                  multiple
                  dense
                  :items="gestacion"
                  item-text="name"
                  item-value="name"
                  label="Edad gestacional"
                />
                <v-select
                  v-model="editedItemFilter.groupAge"
                  label="Grupo de edad"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="groupAge"
                  multiple
                />

                <v-select
                  v-model="editedItemFilter.tipo_parto"
                  label="Tipo de parto"
                  outlined
                  dense
                  :items="['Vaginal', 'Cesaria']"
                  multiple
                />
                <p class="text-h6 font-weight-light">
                  ¿Embarazo planificado?
                </p>
                <v-radio-group
                  v-model="editedItemFilter.embarazo_planificado"
                  row
                >
                  <v-radio
                    label="Si"
                    :value="true"
                  />
                  <v-radio
                    label="No"
                    :value="false"
                  />
                </v-radio-group>
                <v-select
                  v-model="editedItemFilter.causa_embarazo"
                  :disabled="editedItemFilter.embarazo_planificado === null"
                  label="Causa de embarazo"
                  outlined
                  dense
                  :items="editedItemFilter.embarazo_planificado ? causa_embarazo_planificado : causa_embarazo_no_planificado"
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
                      v-model="editedItemFilter.startDate"
                      label="Fecha de inicial"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedItemFilter.startDate"
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
                      v-model="editedItemFilter.endDate"
                      label="Fecha de inicial"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedItemFilter.endDate"
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
          :items-per-page="5"
          class="elevation-1"
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }}
          </template>
          <template v-slot:item.edad="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
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
          <template v-slot:item.created_at="{ item }">
            {{ moment(item.created_at).format('D-M-YYYY') }}
          </template>
          <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  outlined
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
              <span>Control de ficha familiar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  fab
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  :to="`/intranet/ficha-clinica-obstetricia/${history ? 'actualizar' : 'visualizar'}/${item.id}`"
                  v-on="on"
                >
                  <v-icon>mdi-human-pregnant</v-icon>
                </v-btn>
              </template>
              <span>{{ history ? `Control de` : `Visualizar` }} ficha clínica de obstetrica</span>
            </v-tooltip>
          </template>
        </v-data-table>
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
  import {
    gestationWeekAllApi,
  } from '@/api/modules'
  export default {
    props: {
      history: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        dialog: false,
        search: '',
        showDate: null,
        show1Date: null,
        show2Date: null,
        show3Date: null,
        loadingSearch: false,
        loadingFilter: false,
        loadingDataTable: false,
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
            text: 'Edad gestacional',
            value: 'descripcion_gestacion',
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
            text: 'Fecha de apertura de historia',
            value: 'created_at',
          },
          {
            text: 'Acción',
            sortable: false,
            value: 'accion',
          },
        ],
        desserts: [],
        gestacion: [],
        groupAge: [],
        tipo_parto: ['Vaginal', 'Cesaria'],
        causa_embarazo_planificado: ['Inseminación', 'Vientre alquilado', 'Otros'],
        causa_embarazo_no_planificado: ['Fallo de método anticonceptivo', 'Violación', 'Otros'],
        editedItemSearch: {
          search: '',
          embarazo: null,
        },
        defaultItemSearch: {
          search: '',
          embarazo: null,
        },
        editedItemFilter: {
          gestacion: [],
          groupAge: [],
          tipo_parto: [],
          causa_embarazo: [],
          embarazo_planificado: null,
          embarazo: null,
          startDate: null,
          endDate: null,
        },
        defaultItemFilter: {
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
    created () {
      this.listItem()
      this.listItemGroupAge()
      this.listItemGestationWeek()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricAllActions', 'fileClinicalObstetricSearchActions', 'fileClinicalObstetricFilterActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      async listItem () {
        this.loadingDataTable = true
        this.editedItemFilter.embarazo = this.history
        const serviceResponse = await this.fileClinicalObstetricFilterActions(this.editedItemFilter)
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
      age (val) {
        return calAge(val)
      },
      async addItemSearch () {
        this.loadingSearch = true
        this.editedItemSearch.embarazo = this.history
        console.log(this.editedItemSearch)
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
        this.editedItemSearch.embarazo = this.history
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
