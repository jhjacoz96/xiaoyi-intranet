<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Datos obstetricos
    </div> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        justify="center"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
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
                v-model="editedItem.fum"
                label="Fecha de ultima mestruación"
                prepend-icon="mdi-calendar"
                :error-messages="errors.collect('member.birthday')"
                data-vv-name="Fecha de cupleaños"
                validate-on-blur
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="editedItem.fum"
              @input="show2Date = false"
            />
          </v-menu>
        </v-col>
        <v-col
          cols="6"
          sm="5"
        >
          <v-text-field
            :value="date | moment('dddd, MMMM Do YYYY')"
            dense
            outlined
            disabled
            label="Fecha probable de parto"
          />
        </v-col>
      </v-row>
      <v-row
        class="mx-auto"
        justify="center"
        style="max-width: 900px;"
      >
        <v-col
          cols="4"
          sm="3"
        >
          <v-text-field
            v-model.number="editedItem.talla"
            outlined
            dense
            label="Talla"
            suffix="Mtrs"
          />
        </v-col>
        <v-col
          cols="4"
          sm="3"
        >
          <v-text-field
            v-model.number="editedItem.peso"
            outlined
            dense
            label="Peso"
            suffix="Kg"
          />
        </v-col>
        <v-col
          cols="4"
          sm="3"
        >
          <v-text-field
            v-model.number="imc"
            outlined
            disabled
            dense
            label="Imc"
          />
        </v-col>
        <v-col
          cols="5"
          sm="4"
        >
          <v-select
            v-model="editedItem.vacuna"
            outlined
            multiple
            :items="vaccine"
            item-value="id"
            item-text="name"
            dense
            label="Vacunas"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.examenes_rutinarios"
            :items="examRutine"
            item-value="id"
            item-text="name"
            multiple
            outlined
            dense
            label="Examenes rutinarios"
          />
        </v-col>
        <!-- <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.examenesTamizaje"
            outlined
            dense
            label="Examenes de tamizaje"
          />
        </v-col> -->
      </v-row>
      <v-row
        class="mx-auto"
        justify="center"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            ¿Embarazo planificado?
          </p>
          <v-radio-group
            v-model="editedItem.embarazo_planificado"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-select
            v-if="editedItem.embarazo_planificado === 1"
            v-model="editedItem.causa_embarazo"
            label="Causa de embarazo"
            :items="['Inseminación', 'Vientre alqulado', 'Otros']"
            dense
            outlined
          />
          <v-select
            v-else
            v-model="editedItem.causa_embarazo"
            label="Causa de embarazo"
            :items="['Fallo de método anticonceptivo', 'Violación', 'Otros']"
            dense
            outlined
          />
        </v-col>
        <v-col
          v-if="editedItem.causa_embarazo === 'Violación'"
          cols="12"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.ayuda_violacion"
            label="Ayuda psicológica"
            placeholder="En caso de violación"
            dense
            outlined
          />
          <v-text-field
            v-if="editedItem.causa_embarazo === 'Fallo de método anticonceptivo'"
            v-model="editedItem.ayuda_anticoceptivo"
            label="Educación sexual"
            placeholder="En caso de  falla de método anticoceptivo"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <!-- <div class="d-flex mt-5">
        <v-subheader>
          Control prenatal
        </v-subheader>
        <v-btn
          fab
          color="secondary"
          class="float-right d-inline-block"
          @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        />
      </v-container>
      <div class="d-flex mt-5">
        <v-subheader>
          Ganancia de peso
        </v-subheader>
        <v-btn
          fab
          color="secondary"
          class="float-right d-inline-block"
          @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-container>
        <v-data-table
          :headers="headersControl"
          :items="dessertsControl"
          class="elevation-1"
        />
      </v-container>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar control</span>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="editedItem2.observacion"
              label="Observación"
              outlined
              dense
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
            >
              Cerrar
            </v-btn>
            <v-btn
              text
              color="primary"
            >
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-form>
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
  import { calFpp } from '@/utils/calAge'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        dialog: false,
        value: '',
        show2Date: false,
        showDate: false,
        editedItem: {
          fum: null,
          fpp: null,
          talla: 0,
          peso: 0,
          vacuna: [],
          examenes_rutinarios: [],
          embarazo_planificado: false,
          causa_embarazo: '',
          ayuda_violacion: '',
          ayuda_anticoceptivo: '',
        },
        editedItem2: {},
        vaccine: [],
        examRutine: [],
        headers: [
          {
            text: 'Fecha de control',
            value: 'fechaControl',
          },
          { text: 'Observación', sortable: false, value: 'observacion' },
        ],
        desserts: [],
        headersControl: [
          {
            text: 'Fecha de consulta',
            sortable: false,
            value: 'fechaConsulta',
          },
          {
            text: 'Peso',
            sortable: false,
            value: 'peso',
          },
        ],
        dessertsControl: [],
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric']),
      availableSteps () {
        if (
          this.editedItem.fum &&
          this.editedItem.talla &&
          this.editedItem.peso &&
          this.steps.includes(2)
        ) {
          this.setSteps(3)
          if (this.click) {
            if (this.click === 'next') {
              console.log('entro')
              this.setFileObstetric(this.editedItem)
              this.$emit('click:next')
            }
            if (this.click === 'save') {
              console.log('entro')
              this.setFileObstetric(this.editedItem)
              this.$emit('click:save')
            }
          }
        }
        return ''
      },
      date () {
        var date = new Date(calFpp(this.editedItem.fum))
        return date
      },
      imc (val) {
        if (this.editedItem.peso === 0 || !this.editedItem.talla === 0) return
        var imc = (this.editedItem.peso) / Math.round(Math.pow(this.editedItem.talla, 2), -2)
        return imc
      },
    },
    created () {
      this.editedItem = Object.assign({}, this.fileObstetric)
      this.itemVaccine()
      this.itemExam()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
      ...mapActions('vaccine', ['vaccineAllActions']),
      ...mapActions('examRutine', ['examRutineAllActions']),
      async itemVaccine () {
        const serviceResponse = await this.vaccineAllActions()
        if (serviceResponse.ok) {
          this.vaccine = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemExam () {
        const serviceResponse = await this.examRutineAllActions()
        if (serviceResponse.ok) {
          this.examRutine = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
    },
  }
</script>
