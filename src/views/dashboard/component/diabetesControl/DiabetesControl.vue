<template>
  <v-container fluid>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Control de pacientes diabéticos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite asignar tratamientos farmacológicos y no farmacológicos a los pacientes con diabetes
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-card-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.edad="{ item }">
            {{ age(item.fecha_nacimiento) }}
          </template>
          <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="editItem(item)"
                >
                  <v-icon>mdi-doctor</v-icon>
                </v-btn>
              </template>
              <span>Control del paciente</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
    <v-dialog
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Control de paciente diabetico</span>
        </v-card-title>

        <v-card-text>
          <base-material-wizard-normal
            v-model="tab"
            :available-steps="availableSteps"
            :items="tabs"
            class="mx-auto"
            @click:next="next"
            @click:prev="tab--"
          >
            <v-tab-item class="pb-12">
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-select
                      v-model="editedItem.presion_arterial"
                      label="Presión arterial (*)"
                      outlined
                      dense
                      :items="presion"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.pulso"
                      label="Pulso"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.respiracion"
                      label="Respiración (*)"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.saturacion_oxigeno"
                      label="Saturación de oxígeno (*)"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.temperatura"
                      label="Temperatura (*)"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model.number="editedItem.peso"
                      label="Peso (*)"
                      outlined
                      type="number"
                      dense
                      suffix="Kg"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model.number="editedItem.altura"
                      label="Altura (*)"
                      outlined
                      type="number"
                      dense
                      suffix="Mtrs"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="imc"
                      label="Imc"
                      outlined
                      type="number"
                      disabled
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model.number="editedItem.circunferencia"
                      label="Circunferencia abdominal (*)"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model.number="editedItem.nivel_glusemia"
                      label="Nivel de glucemia (*)"
                      outlined
                      type="number"
                      dense
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <div
                class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
              >
                <div
                  class=" d-inline-block"
                >
                  Tratamiento farmacológico
                </div>
              </div>
              <v-card-text
                class="text-center text-h5 d-fleX mb-6 align-center"
              >
                <div
                  class=" d-inline-block float-left"
                >
                  Medicamentos
                </div>
                <v-btn
                  fab
                  color="secondary"
                  class="float-right d-inline-block"
                  @click="addMedicine"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-text>
              <v-card-text>
                <tr
                  v-for="(item, k) in editedItem.tratamiento_farmacologico"
                  :key="k"
                >
                  <td>
                    <v-select
                      v-model="item.presentation_id"
                      label="Presentación"
                      outlined
                      :items="presentation"
                      item-text="name"
                      item-value="id"
                      dense
                    />
                  </td>
                  <td>
                    <v-select
                      v-model="item.medicine_id"
                      label="Medicamento"
                      outlined
                      :items="medicamentos"
                      item-text="name"
                      item-value="id"
                      dense
                    />
                  </td>
                  <td>
                    <v-text-field
                      v-model="item.dosis"
                      class="mx-2"
                      label="Dosis"
                      outlined
                      dense
                    />
                  </td>
                  <td>
                    <v-select
                      v-model="item.measure_id"
                      class="mx-2"
                      label="Unidad de medida"
                      :items="measure"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                    />
                  </td>
                  <td>
                    <v-menu
                      ref="dialog"
                      v-model="item.menu2Hora"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="item.hora"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="item.hora"
                          outlined
                          dense
                          class="mx-2"
                          label="Hora"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="item.menu2Hora"
                        v-model="item.hora"
                        outline
                        dense
                        class="mx-2"
                        format="24hr"
                        full-width
                        @click:minute="$refs.dialog[k].save(item.hora)"
                      />
                    </v-menu>
                  </td>
                  <td>
                    <v-btn
                      icon
                      dark
                      class="mx-2"
                      color="pink"
                      @click="deleteMedicine(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </v-card-text>
              <div
                class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
              >
                <div
                  class=" d-inline-block"
                >
                  Tratamiento no farmacológico
                </div>
              </div>
              <v-card-text>
                <v-textarea
                  v-model="editedItem.dieta"
                  label="Dieta"
                  outlined
                  multiple
                  dense
                />
              </v-card-text>
              <v-card-text
                class="text-center text-h5 d-fleX mb-6 align-center"
              >
                <div
                  class=" d-inline-block float-left"
                >
                  Actividades físicas
                </div>
                <v-btn
                  fab
                  color="secondary"
                  class="float-right d-inline-block"
                  @click="addActivity"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-text>
              <v-card-text class="justify-center">
                <tr
                  v-for="(item, k) in editedItem.tratamiento_no_farmacologico"
                  :key="k"
                >
                  <td>
                    <v-text-field
                      v-model="item.actividad"
                      label="Actividad"
                      outlined
                      dense
                    />
                  </td>
                  <td>
                    <v-text-field
                      v-model="item.duracion"
                      label="Duración"
                      outlined
                      class="mx-2"
                      dense
                    />
                  </td>
                  <td>
                    <v-menu
                      ref="dialog1"
                      v-model="item.menuHora"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="item.hora"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="item.hora"
                          outlined
                          dense
                          class="mx-2"
                          label="Hora"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="item.menuHora"
                        v-model="item.hora"
                        outline
                        dense
                        format="24hr"
                        full-width
                        @click:minute="$refs.dialog1[k].save(item.hora)"
                      />
                    </v-menu>
                  </td>
                  <td>
                    <v-btn
                      icon
                      dark
                      class="mx-2"
                      color="pink"
                      @click="deleteActivity(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </v-card-text>
            </v-tab-item>
          </base-material-wizard-normal>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  import { calAge } from '@/utils/calAge'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        step: [],
        tab: 0,
        tabs: ['Signos vitales', 'Antropometría', 'Tratamientos'],
        headers: [
          { text: 'Nombre', sortable: true, value: 'nombre' },
          { text: 'Cédula', sortable: false, value: 'cedula' },
          { text: 'Cédula', sortable: false, value: 'cedula' },
          { text: 'Género', sortable: false, value: 'gender_id.nombre' },
          { text: 'Edad', sortable: false, value: 'edad' },
          { text: 'Acción', sortable: false, value: 'accion' },
        ],
        desserts: [],
        presion: ['Sistolica', 'Diastólica'],
        medicamentos: [],
        measure: [],
        presentation: [],
        loadingDataTable: false,
        steps: [0],
        editedItem: {
          dieta: '',
          presion_arterial: '',
          pulso: '',
          respiracion: '',
          temperatura: '',
          saturacion_oxigeno: '',
          peso: 0,
          altura: 0,
          circunferencia: 0,
          tratamiento_farmacologico: [],
          tratamiento_no_farmacologico: [],
          nivel_glusemia: 0,
        },
        defaultItem: {
          dieta: '',
          presion_arterial: '',
          pulso: '',
          respiracion: '',
          temperatura: '',
          saturacion_oxigeno: '',
          peso: 0,
          altura: 0,
          circunferencia: 0,
          tratamiento_farmacologico: [],
          tratamiento_no_farmacologico: [],
          nivel_glusemia: 0,
        },
        typecontrolDiabetic: ['Antibióticos', 'Analgésicos', 'Aines', 'Opiodides', 'Diureticos'],
      }
    },
    computed: {
      scope () {
        if (this.tab === 0) return 'signos'
        else if (this.tab === 1) return 'antropometria'
        return 'tramientos'
      },
      availableSteps () {
        var steps = this.steps
        if (
          this.editedItem.presion_arterial &&
          this.editedItem.pulso &&
          this.editedItem.respiracion &&
          this.editedItem.saturacion_oxigeno &&
          this.editedItem.temperatura
        ) steps.push(1)

        if (
          this.editedItem.peso &&
          this.editedItem.altura &&
          this.editedItem.circunferencia &&
          this.editedItem.nivel_glusemia &&
          steps.includes(1)
        ) steps.push(2)
        if (
          this.editedItem.tratamiento_farmacologico.length > 0 &&
          this.editedItem.tratamiento_no_farmacologico.length > 0 &&
          this.editedItem.dieta &&
          steps.includes(2)
        ) steps.push(3)
        // if (
        //   this.address &&
        //   this.street &&
        //   this.city &&
        //   this.state &&
        //   steps.includes(2)
        // ) steps.push(3)
        return steps
      },
      imc () {
        if (!this.editedItem.peso || !this.editedItem.altura) return 0
        var imc = (this.editedItem.peso) / Math.pow(this.editedItem.altura, 2)
        return imc
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemMedicine()
      this.listItemPresentation()
      this.listItemMeasure()
    },
    methods: {
      ...mapActions('controlDiabetic', ['controlDiabeticAllActions', 'controlDiabeticUpdateActions']),
      ...mapActions('medicine', ['medicineAllActions']),
      ...mapActions('measure', ['measureAllActions']),
      ...mapActions('presentation', ['presentationAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await this.controlDiabeticAllActions()
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
      async listItemMedicine () {
        const serviceResponse = await this.medicineAllActions()
        if (serviceResponse.ok) {
          this.medicamentos = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPresentation () {
        const serviceResponse = await this.presentationAllActions()
        if (serviceResponse.ok) {
          this.presentation = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemMeasure () {
        const serviceResponse = await this.measureAllActions()
        if (serviceResponse.ok) {
          this.measure = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item.diabetic_patient)
        this.dialog = true
      },
      async addItem () {
        const serviceResponse = await this.controlDiabeticUpdateActions(this.editedItem)
        if (serviceResponse.ok) {
          this.close()
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
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
          this.steps = [0]
          this.tab = 0
          this.editedItem = Object.assign({}, this.defaultItem)
        })
      },
      next () {
        this.validateForm(this.scope).then(item => {
          if (!item) return

          if (this.tab === this.tabs.length - 1) {
            this.addItem()
          } else {
            this.tab++
          }
        })
      },
      event (val) {
        this.step = val
      },
      validateForm (scope) {
        return this.$validator.validateAll(scope)
      },
      age (val) {
        return calAge(val)
      },
      addMedicine () {
        const editedMedicine = {
          medicine_id: null,
          hora: null,
          menu2Hora: false,
          dosis: 0,
          measure_id: null,
          presentation_id: null,
        }
        this.editedItem.tratamiento_farmacologico.push(editedMedicine)
      },
      addActivity () {
        const editedActivity = {
          id: null,
          actividad: '',
          menuHora: false,
          duracion: '',
          hora: null,
          presentation_id: null,
        }
        this.editedItem.tratamiento_no_farmacologico.push(editedActivity)
      },
      deleteActivity (item) {
        var index = this.editedItem.tratamiento_no_farmacologico.indexOf(item)
        this.editedItem.tratamiento_no_farmacologico.splice(index, 1)
      },
      deleteMedicine (item) {
        var index = this.editedItem.tratamiento_farmacologico.indexOf(item)
        this.editedItem.tratamiento_farmacologico.splice(index, 1)
      },
    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    border-color: currentColor
    border-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    border-radius: 50%

</style>
