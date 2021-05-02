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
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="editedItem.fpp"
              @input="show2Date = false"
            />
          </v-menu>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            labe="fecha probable de parto"
            outlined
            dense
            disabled
          />
        </v-col>
      </v-row>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="4"
          sm="3"
        >
          <p class="text-h6 font-weight-regular">
            Semanas de gestación
          </p>
          <v-slider
            v-model="editedItem.semanaGestacion"
            :thumb-size="24"
            max="40"
            min="1"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="4"
          sm="3"
        >
          <v-text-field
            v-model.number="editedItem.talla"
            outlined
            dense
            label="Talla"
            suffix="Cm"
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
            v-model.number="editedItem.imc"
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
            v-model="editedItem.vacunas"
            outlined
            dense
            label="Vacunas"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.examenesRutinarios"
            outlined
            dense
            label="Exames rutinarios"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.examenesTamizaje"
            outlined
            dense
            label="Examenes de tamizaje"
          />
        </v-col>
      </v-row>
      <div class="d-flex mt-5">
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
      </v-dialog>
    </v-form>
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
        dialog: false,
        value: '',
        show2Date: false,
        showDate: false,
        editedItem: {
          pathology: undefined,
          psychotropic: undefined,
          medicine: '',
          nroEmbarazos: 0,
          nroAbortos: 0,
          nroHijosVivos: 0,
          fum: undefined,
          fpp: undefined,
          semanaGestacion: 1,
          talla: 0,
          imc: 0,
          peso: 0,
          examenesRutinarios: [],
          examenesTamizage: [],
          vacunas: [],
        },
        editedItem2: {
          observacion: '',
        },
        relationship: ['Tia', 'Abuelo', 'Mamá', 'Papa', 'Esposa'],
        headers: [
          {
            text: 'Fecha de control',
            value: 'fechaControl',
          },
          { text: 'Observación', sortable: false, value: 'observacion' },
        ],
        desserts: [
          {
            fechaControl: '20-10-2020',
            observacion: 'dddeodkeodekodekodkeo',
          },
        ],
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
        dessertsControl: [
          {
            fechaConsulta: '20-10-2020',
            peso: 3,
          },
        ],
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        // if (
        // ) steps.push(1)
        steps.push(3)
        this.$emit('data', steps)
        return steps
      },
    },
    methods: {
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
