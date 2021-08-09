<template>
  <v-container fluid>
    <v-alert
      dense
      type="info"
    >
      Para avanzar al siguiente paso debe <strong>programar las actividades</strong> para cada riesgo
    </v-alert>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Evolución de la gestión del riesgo familiar
    </div>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="evolucion"
        item-key="name"
        sort-by="name"
        group-by="risk_classification_id.name"
        :disable-pagination="true"
        group-by-value="name"
        show-group-by
        hide-default-header
      >
        <template v-slot:header="props">
          <thead>
            <tr>
              <th>
                <span
                  class="font-weight-light"
                  style="color:rgb(0,0,0,0.8)"
                >{{ props.props.headers[0].text }}</span>
              </th>
              <th>
                <span
                  class="font-weight-light"
                  style="color:rgb(0,0,0,0.8)"
                >{{ props.props.headers[1].text }}</span>
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn
              :ref="group"
              x-small
              icon
              @click="toggle"
            >
              <v-icon v-if="isOpen">
                mdi-plus
              </v-icon>
              <v-icon v-else>
                mdi-minus
              </v-icon>
            </v-btn>
            <span class="mx-5 font-weight-bold">{{ group }}</span>
          </td>
        </template>
        <template v-slot:item.level_risk_id="{ item }">
          <v-chip
            v-if="item.level_risk_id"
            :color="getColorLevelRisk(item.level_risk_id)"
          >
            {{ getNameLevelRisk(item.level_risk_id) }}
          </v-chip>
        </template>
        <template v-slot:item.compromiso_id="{ item }">
          <v-chip
            :color="item.compromiso_id ? 'success' : 'warning'"
            outlined
          >
            {{ item.compromiso_id ? 'Programada' : 'Sin programar' }}
          </v-chip>
        </template>
        <template v-slot:item.cumplio="{ item }">
          <v-chip
            :color="item.cumplio ? 'success' : 'warning'"
            outlined
          >
            {{ item.cumplio ? 'Evaluada' : 'sin evaluar' }}
          </v-chip>
        </template>
        <template v-slot:item.accion="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-small
                color="warning"
                fab
                v-bind="attrs"
                v-on="on"
                @click="editedActivity(item)"
              >
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </template>
            <span>Programar actividad</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-small
                color="warning"
                class="ml-2"
                fab
                v-bind="attrs"
                v-on="on"
                @click="editedEvaluation(item)"
              >
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </template>
            <span>Evaluar actividad</span>
          </v-tooltip>
        </template>
        <!-- <template v-slot:item.activity="{ item }">
          <v-template v-if="item.activity.dateAnalysis !== undefined">
            {{ item.activity.dateAnalysis | moment("dddd, MMMM Do YYYY") }}
          </v-template>
          <v-template v-else>
            Sin registros
          </v-template>
        </template>
        <template v-slot:item.evaluation="{ item }">
          <v-template v-if="item.activity.dateAnalysis !== undefined">
            {{ item.evaluation.dateEvaluation | moment("dddd, MMMM Do YYYY") }}
          </v-template>
          <v-template v-else>
            Sin registros
          </v-template>
        </template> -->
      </v-data-table>
    </v-card-text>
    <v-dialog
      v-model="dialogActivity"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Programar actividades</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            data-vv-scope="actividad"
            lazy-validation
          >
            <v-container>
              <v-card-text>
                <v-select
                  v-model="editedItem.compromiso_id"
                  :items="editedItem.activity_evolutions"
                  item-text="compromiso_familiar"
                  item-value="id"
                  dense
                  outlined
                  label="Seleccione una actividad (*)"
                  @change="getActivity"
                />
                <v-menu
                  v-model="show3Date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="100px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.fecha_programacion"
                      label="Fecha de programación de actividad (*)"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedItem.fecha_programacion"
                    @input="show4Date = false"
                  />
                </v-menu>
              </v-card-text>
              <v-card-text v-if="editedItem.compromiso_id">
                <v-row>
                  <v-col cols="5">
                    <span class="font-weight-medium">Compromiso de la familia</span>
                  </v-col>
                  <v-col cols="6">
                    <span>{{ compromiso_familiar }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <span class="font-weight-medium">Compromiso del equipo de salud</span>
                  </v-col>
                  <v-col cols="6">
                    {{ compromiso_equipo }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="closeActivity()"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="validateCompromiso"
            color="primary"
            text
            @click="addItemActivity()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogEvaluation"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Evaluación de actividad</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="5">
              <span class="font-weight-medium">Compromiso de la familia</span>
            </v-col>
            <v-col cols="6">
              <span>{{ compromiso_familiar }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <span class="font-weight-medium">Compromiso del equipo de salud</span>
            </v-col>
            <v-col cols="6">
              {{ compromiso_equipo }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <div class="text-h5 blue--text text-center mb-2">
            Evaluar
          </div>
          <v-form
            ref="form"
            v-model="valid1"
            data-vv-scope="evaluacion"
            lazy-validation
          >
            <v-row>
              <v-col
                cols="12"
              >
                <v-subheader>
                  ¿Cumplió con la actividad?
                </v-subheader>
                <v-radio-group
                  v-model="editedItem.cumplio"
                  v-validate="'required'"
                  row
                  :error-messages="errors.collect('evaluacion.cumplio')"
                  data-vv-name="cumplio"
                  validate-on-blur
                >
                  <v-radio
                    label="Si"
                    value="si"
                    @click="editedItem.causas = ''"
                  />
                  <v-radio
                    label="No"
                    value="no"
                    @click="editedItem.causas = ''"
                  />
                  <v-radio
                    label="Parcial"
                    value="parcial"
                    @click="editedItem.causas = ''"
                  />
                </v-radio-group>
              </v-col>
              <v-col
                v-if="editedItem.cumplio !== 'si'"
                cols="12"
              >
                <v-textarea
                  v-model="editedItem.causas"
                  label="Causas de incumplimiento y observaciones"
                  outlined
                  name="input-7-4"
                />
              </v-col>
              <v-col>
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
                      v-model="editedItem.fecha_evaluacion"
                      label="Fecha de evaluación"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedItem.fecha_evaluacion"
                    @input="showDate = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="closeAnalysis()"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="validateEvaluacion"
            color="primary"
            text
            @click="addItemEvaluation()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="d-none"
    >
      {{ availableSteps }}
    </div>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    props: {
      click: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        id: null,
        dialogActivity: false,
        editedIndex: undefined,
        dialogEvaluation: false,
        value: '',
        valid: false,
        valid1: false,
        show2Date: false,
        showDate: false,
        show3Date: false,
        show4Date: false,
        compromiso_familiar: '',
        compromiso_equipo: '',
        l: 400,
        headers: [
          {
            text: 'Riesgo',
            value: 'name',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Nivel de riesgo',
            value: 'level_risk_id',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Programación de actividad',
            value: 'compromiso_id',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Evaluación de actividad',
            value: 'cumplio',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Clasificación',
            value: 'risk_classification_id.name',
            sortable: false,
            align: 'rigtht',
          },
          {
            text: 'Acción',
            value: 'accion',
            sortable: false,
          },
        ],
        editedItem: {
          activity_evolutions: [],
          fecha_evaluacion: null,
          fecha_programacion: null,
          compromiso_id: null,
          cumplio: '',
          causas: '',
        },
        defaultItem: {
          activity_evolutions: [],
          fecha_evaluacion: null,
          fecha_programacion: null,
          compromiso_id: null,
          cumplio: '',
          causas: '',
        },
        evolucion: [],
        levelRisk: [],
      }
    },
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      availableSteps () {
        if (this.evolucion.length > 0 && this.l !== 400) {
          if (
            this.evolucion.filter(item => {
              return item.compromiso_id !== null && item.fecha_programacion !== null
            }).length === this.evolucion.length &&
            this.evolucion.filter(item => {
              return item.compromiso_id !== null && item.fecha_programacion !== null
            }).length !== 0 &&
            this.steps.includes(3)
          ) {
            if (this.click) {
              this.setEvaluation(this.evolucion)
              this.$emit('next')
            }
            this.setSteps(4)
          }
        } else if (
          this.steps.includes(3) &&
          this.l !== 400
        ) {
          if (this.click) {
            this.setEvaluation(this.evolucion)
            this.$emit('next')
          }
          this.setSteps(4)
        }
        return ''
      },
      validateCompromiso () {
        if (
          !this.editedItem.fecha_programacion ||
          !this.editedItem.compromiso_id
        ) return true
        else return false
      },
      validateEvaluacion () {
        if (
          !this.editedItem.cumplio
        ) return true
        else return false
      },
    },
    watch: {
      dialogActivity (val) {
        val || this.closeActivity()
      },
      dialogEvaluation (val) {
        val || this.closeEvaluation()
      },
      fileFamily: {
        handler (val) {
          this.evolucion = val.evaluacion
          this.l = val.evaluacion.length
        },
        deep: true,
      },
    },
    created () {
      this.listItemLevelRisk()
    },
    methods: {
      ...mapActions('levelRisk', ['levelRiskAllActions']),
      ...mapMutations('fileFamily', ['setSteps', 'setEvaluation']),
      ...mapMutations(['alert']),
      async listItemLevelRisk () {
        const serviceResponse = await this.levelRiskAllActions()
        if (serviceResponse.ok) {
          this.levelRisk = serviceResponse.data
          this.evolucion = this.fileFamily.evaluacion
          this.l = this.fileFamily.evaluacion.length
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      filterEvolution () {
        this.id = this.$route.params.id
        this.evolucion = this.fileFamily.riesgos.filter(this.filterFilterEvolution)
        this.l = this.fileFamily.riesgos.filter(this.filterFilterEvolution).length
      },
      mapfilterEvolution (item) {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty('compromiso_id')) {
          return {
            ...item,
            fecha_evaluacion: item.fecha_evaluacion,
            fecha_programacion: item.fecha_programacion,
            compromiso_id: item.compromiso_id,
            cumplio: item.cumplio,
            causas: item.causas,
          }
        } else {
          return {
            ...item,
            fecha_evaluacion: null,
            fecha_programacion: null,
            compromiso_id: null,
            cumplio: '',
            causas: '',
          }
        }
      },
      filterFilterEvolution (item) {
        var levelRisk = this.levelRisk.find(v => {
          return item.level_risk_id === v.id
        })
        return levelRisk.value !== 0
      },
      closeActivity () {
        this.dialogActivity = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeEvaluation () {
        this.dialogEvaluation = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      editedActivity (item) {
        this.editedIndex = this.evolucion.indexOf(item)
        Object.assign(this.editedItem, item)
        if (this.editedItem.compromiso_id) this.getActivity(this.editedItem.compromiso_id)
        this.dialogActivity = true
      },
      editedEvaluation (item) {
        this.editedIndex = this.evolucion.indexOf(item)
        Object.assign(this.editedItem, item)
        if (this.editedItem.compromiso_id) this.getActivity(this.editedItem.compromiso_id)
        this.dialogEvaluation = true
      },
      addItemActivity () {
        Object.assign(this.evolucion[this.editedIndex], this.editedItem)
        this.compromiso_equipo = ''
        this.compromiso_familiar = ''
        this.setEvaluation(this.evolucion)
        this.closeActivity()
      },
      addItemEvaluation () {
        Object.assign(this.evolucion[this.editedIndex], this.editedItem)
        this.compromiso_equipo = ''
        this.compromiso_familiar = ''
        this.setEvaluation(this.evolucion)
        this.closeEvaluation()
      },
      getActivity (val) {
        const actvity = this.editedItem.activity_evolutions.find(item => item.id === val)
        this.compromiso_familiar = actvity.compromiso_familiar
        this.compromiso_equipo = actvity.compromiso_equipo
      },
      getNameLevelRisk (val) {
        if (this.levelRisk.length >= 0) {
          var levelRisk = this.levelRisk.find(item => item.id === val)
          return levelRisk.name
        }
      },
      getColorLevelRisk (val) {
        if (this.levelRisk.length >= 0) {
          var levelRisk = this.levelRisk.find(item => item.id === val)
          return levelRisk.color
        }
      },
    },
  }
</script>
