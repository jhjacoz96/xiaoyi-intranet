<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      2. Antcedentes
    </div> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-subheader>
        Antecedentes patológicos
      </v-subheader>
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.pathology"
            v-validate="'required'"
            :error-messages="errors.collect('basic.pathology')"
            data-vv-name="pathology"
            outlined
            label="Patologias personales"
            i
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.psychotropic "
            v-validate="'required'"
            :error-messages="errors.collect('basic.psychotropic ')"
            data-vv-name="psychotropic "
            outlined
            label="Sustancia psicotroficas"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.medicine "
            v-validate="'required'"
            :error-messages="errors.collect('basic.medicine')"
            data-vv-name="medicine "
            outlined
            label="Medicamentos que ingiere"
            dense
            validate-on-blur
          />
        </v-col>
      </v-row>
      <v-subheader>
        Antecedentes obstetricos
      </v-subheader>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de hijos vivos
          </v-subheader>
          <v-slider
            v-model="editedItem.nroHijosVivos"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de abortos
          </v-subheader>
          <v-slider
            v-model="editedItem.nroAbortos"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de embarazos
          </v-subheader>
          <v-slider
            v-model="editedItem.nroEmbarazos"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Tipo de embrazo
          </v-subheader>
          <v-radio-group
            v-model="editedItem.tipoEmbarazo"
            mandatory
            row
          >
            <v-radio
              label="Vaginal"
              value="vaginal"
            />
            <v-radio
              label="Cesaria"
              value="cesarea"
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
        value: '',
        editedItem: {
          pathology: undefined,
          psychotropic: undefined,
          medicine: '',
          nroEmbarazos: 0,
          nroAbortos: 0,
          nroHijosVivos: 0,
          tipoEmbarazo: '',
        },
        relationship: ['Tia', 'Abuelo', 'Mamá', 'Papa', 'Esposa'],
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        // if (
        // ) steps.push(1)
        steps.push(2)
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
