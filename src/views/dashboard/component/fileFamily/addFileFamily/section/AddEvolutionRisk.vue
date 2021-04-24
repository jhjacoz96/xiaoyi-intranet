<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      6. Evolución de la gestión del riesgo familiar
    </div>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        sort-by="name"
        group-by="clasificacion.name"
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
              <th>
                <span
                  class="font-weight-light"
                  style="color:rgb(0,0,0,0.8)"
                >{{ props.props.headers[2].text }}</span>
              </th>
              <th>
                <span
                  class="font-weight-light"
                  style="color:rgb(0,0,0,0.8)"
                >{{ props.props.headers[3].text }}</span>
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
        <template v-slot:item.risk="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.id="{ item }">
          {{ item.id }}
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
        <template v-slot:item.activity="{ item }">
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
        </template>
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
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="editedItem.activity.commitment"
                  label="Compromiso de la familia"
                  outlined
                  name="input-7-4"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="editedItem.activity.commitmentTeamHealth"
                  label="Compromiso del equipo de salud"
                  outlined
                  name="input-7-4"
                />
              </v-col>
            </v-row>
          </v-container>
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
          <div class="text-h5 blue--text text-center mb-2">
            Actividad programada  ({{ editedItem.activity.dateAnalysis | moment("DD MMMM  YYYY") }})
          </div>
          <v-row>
            <v-col cols="5">
              <span class="font-weight-medium">Compromiso de la familia</span>
            </v-col>
            <v-col cols="6">
              <span>{{ editedItem.activity.commitment }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <span class="font-weight-medium">Compromiso del equipo de salud</span>
            </v-col>
            <v-col cols="6">
              {{ editedItem.activity.commitmentTeamHealth }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <div class="text-h5 blue--text text-center mb-2">
            Evaluar
          </div>
          <v-row>
            <v-col
              cols="12"
            >
              <v-subheader>
                ¿Cumplió con la actividad?
              </v-subheader>
              <v-radio-group
                v-model="editedItem.evaluation.fulfilled"
                row
              >
                <v-radio
                  label="Si"
                  value="si"
                />
                <v-radio
                  label="No"
                  value="no"
                />
                <v-radio
                  label="Parcial"
                  value="parcial"
                />
              </v-radio-group>
            </v-col>
            <v-col
              cols="12"
            >
              <v-textarea
                v-model="editedItem.evaluation.cause"
                label="Causas de incumplimiento y observaciones"
                outlined
                name="input-7-4"
              />
            </v-col>
          </v-row>
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
  export default {
    data () {
      return {
        dialogActivity: false,
        editedIndex: undefined,
        dialogEvaluation: false,
        value: '',
        headers: [
          {
            text: 'id',
            value: 'id',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Riesgo',
            value: 'name',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Fecha de analisis',
            value: 'activity',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Fecha de evaluación',
            value: 'evaluation',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Clasificación',
            value: 'clasificacion.name',
            sortable: false,
            align: 'rigtht',
          },
          {
            text: 'Acción',
            value: 'accion',
            sortable: false,
          },
        ],
        desserts: [
          {
            name: 'Personas con vacinación incompleta',
            id: 1,
            activity: {
              dateAnalysis: undefined,
              commitment: '',
              commitmentTeamHealth: '',
            },
            evaluation: {
              dateEvaluation: undefined,
              fulfilled: undefined,
              cause: '',
            },
            clasificacion: {
              name: 'Riesgos biológicos',
              id: 1,
            },
          },
          {
            name: 'Personas con malnutrición',
            id: 2,
            activity: {
              dateAnalysis: undefined,
              commitment: '',
              commitmentTeamHealth: '',
            },
            evaluation: {
              dateEvaluation: undefined,
              fulfilled: undefined,
              cause: '',
            },
            clasificacion: {
              name: 'Riesgos biológicos',
              id: 1,
            },
          },

          {
            name: 'Consumo de agua insegura',
            id: 3,
            clasificacion: {
              name: 'Riesgos sanitarios',
              id: 2,
            },
            activity: {
              dateAnalysis: undefined,
              commitment: '',
              commitmentTeamHealth: '',
            },
            evaluation: {
              dateEvaluation: undefined,
              fulfilled: undefined,
              cause: '',
            },
          },
        ],
        editedItem: {
          activity: {
            dateAnalysis: undefined,
            commitment: '',
            commitmentTeamHealth: '',
          },
          evaluation: {
            dateEvaluation: undefined,
            fulfilled: undefined,
            cause: '',
          },
        },
        defaultItem: {
          activity: {
            dateAnalysis: undefined,
            commitment: '',
            commitmentTeamHealth: '',
          },
          evaluation: {
            dateEvaluation: undefined,
            fulfilled: undefined,
            cause: '',
          },
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
          this.editedIndex = this.desserts.indexOf(item)
          Object.assign(this.editedItem.activity, item.activity)
          this.editedItem.activity.dateAnalysis = new Date()
          this.dialogActivity = true
        },
        editedEvaluation (item) {
          this.editedIndex = this.desserts.indexOf(item)
          Object.assign(this.editedItem, item)
          this.editedItem.evaluation.dateEvaluation = new Date()
          this.dialogEvaluation = true
        },
        addItemActivity () {
          Object.assign(this.desserts[this.editedIndex].activity, this.editedItem.activity)
          this.closeActivity()
        },
        addItemEvaluation () {
          Object.assign(this.desserts[this.editedIndex].evaluation, this.editedItem.evaluation)
          this.closeEvaluation()
        },
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        if (
          this.desserts.length > 0
        ) steps.push(4)
        this.$emit('data', steps)
        return steps
      },
    },
  }
</script>
