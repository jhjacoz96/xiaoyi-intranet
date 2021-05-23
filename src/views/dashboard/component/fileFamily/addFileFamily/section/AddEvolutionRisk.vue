<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      6. Evolución de la gestión del riesgo familiar
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
        <template v-slot:item.name="{ item }">
          {{ item.name }}
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
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editedItem.compromiso_familiar"
                    v-validate="'required'"
                    label="Compromiso de la familia"
                    outlined
                    name="input-7-4"
                    :error-messages="errors.collect('actividad.compromiso_familiar')"
                    data-vv-name="compromiso familiar"
                    validate-on-blur
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editedItem.compromiso_equipo"
                    v-validate="'required'"
                    label="Compromiso del equipo de salud"
                    outlined
                    name="input-7-4"
                    :error-messages="errors.collect('actividad.compromiso_equipo')"
                    data-vv-name="compromiso equipo médico"
                    validate-on-blur
                  />
                </v-col>
              </v-row>
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
              <span>{{ editedItem.compromiso_familiar }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <span class="font-weight-medium">Compromiso del equipo de salud</span>
            </v-col>
            <v-col cols="6">
              {{ editedItem.compromiso_equipo }}
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
        headers: [
          {
            text: 'Riesgo',
            value: 'name',
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
          compromiso_familiar: '',
          compromiso_equipo: '',
          cumplio: '',
          causas: '',
        },
        defaultItem: {
          compromiso_familiar: '',
          compromiso_equipo: '',
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
        if (
          this.evolucion.filter(item => {
            return item.compromiso_familiar !== '' && item.compromiso_equipo !== ''
          }).length === this.evolucion.length &&
          this.evolucion.filter(item => {
            return item.compromiso_familiar !== '' && item.compromiso_equipo !== ''
          }).length !== 0 &&
          this.steps.includes(3)
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
          !this.editedItem.compromiso_familiar ||
          !this.editedItem.compromiso_equipo
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
          this.filterEvolution()
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      filterEvolution () {
        this.id = this.$route.params.id
        this.evolucion = this.fileFamily.riesgos.map(item => {
          if (this.id !== undefined) {
            return {
              ...item,
              compromiso_familiar: item.compromiso_familiar,
              compromiso_equipo: item.compromiso_familiar,
              cumplio: item.cumplio,
              causas: item.causas,
            }
          } else {
            return {
              ...item,
              compromiso_familiar: '',
              compromiso_equipo: '',
              cumplio: '',
              causas: '',
            }
          }
        }).filter(item => {
          var levelRisk = this.levelRisk.find(v => {
            return item.level_risk_id === v.id
          })
          return levelRisk.value !== 0
        })
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
        this.dialogActivity = true
      },
      editedEvaluation (item) {
        this.editedIndex = this.evolucion.indexOf(item)
        Object.assign(this.editedItem, item)
        this.dialogEvaluation = true
      },
      addItemActivity () {
        Object.assign(this.evolucion[this.editedIndex], this.editedItem)
        // this.setEvaluation(this.evolucion)
        this.closeActivity()
      },
      addItemEvaluation () {
        Object.assign(this.evolucion[this.editedIndex], this.editedItem)
        // this.setEvaluation(this.evolucion)
        this.closeEvaluation()
      },
    },
  }
</script>
