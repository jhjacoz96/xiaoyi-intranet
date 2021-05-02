<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Planificación de parto
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
        >
          <v-text-field
            v-model="editedItem.modoParto"
            label="¿Cómo desea dar a luz?"
            outlined
            dense
            disabled
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
            v-model="editedItem.acompanante"
            label="Nombre del acompañante"
            outlined
            dense
            disabled
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Si fuera necesario, aceptaria que su hijo recibiera fórmula?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.formula"
            mandatory
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
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            En caso de hemorragia ¿aceptaría la administración de algún hemoderivado?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.administracionHemoderivado"
            mandatory
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
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Harealizado estimulación durante el embarazo?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.estimulacion"
            mandatory
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
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Ha asistido alguna capacitación prenatal?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.capacitacion"
            mandatory
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
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Desea la administrción de epidural?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.epidural"
            mandatory
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
          </v-radio-group>
        </v-col>
      </v-row>
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
          modoParto: '',
          acompanante: '',
          formula: '',
          administracionHemoderivado: '',
          estimulacion: '',
          capacitacion: '',
          epidural: '',
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
        steps.push(4)
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
