<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Parto
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
          cols="12"
        >
          <v-textarea
            label="Observaciones"
            outlined
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <p class="text-h6 font-weight-light">
            ¿Presenta hemorragias?
          </p>
          <v-radio-group
            v-model="editedItem.hemorragia"
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
          <p class="text-h6 font-weight-light">
            Tipo de parto
          </p>
          <v-radio-group
            v-model="editedItem.tipoParto"
            mandatory
            row
          >
            <v-radio
              label="Vaginal"
              value="vaginal"
            />
            <v-radio
              label="Cesária"
              value="cesaria"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.desgarro"
            label="Desgarro"
            :items="desgarro"
            item-text="name"
            item-value="value"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.descricionGestacion"
            label="Semana de gestación"
            outlined
            dense
            disabled
          />
        </v-col>
      </v-row>
      <div class="mt-4">
        <span class="text-h5">Características del parto</span>
      </div>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Episiorrafia
          </p>
          <v-radio-group
            v-model="editedItem.episiorrafia"
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
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Hemorroides
          </p>
          <v-radio-group
            v-model="editedItem.hemorroides"
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
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Dolor
          </p>
          <v-radio-group
            v-model="editedItem.dolor"
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
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.epitomia"
            label="Epitomía/Desgarro"
            :items="epitomia"
            item-text="name"
            outlined
            dense
            item-value="value"
          />
        </v-col>
      </v-row>
      <div class="mt-4 my-3">
        <div class="d-inline-block">
          <span class="text-h5">Farmacos aministrados</span>
        </div>
        <v-btn
          fab
          color="secondary"
          class="float-right"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <tr
          v-for="(item, k) in editedItem.tratamientos"
          :key="k"
        >
          <td>
            <v-select
              v-model="item.tipoMedicina"
              label="Tipo"
              outlined
              :items="tipoMedicamento"
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.medicamento"
              label="Medicamento"
              class="ml-2"
              outlined
              :items="medicamento"
              dense
            />
          </td>
          <td>
            <v-text-field
              v-model="item.dosis"
              class="ml-2"
              label="Dosis"
              outlined
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.medida"
              class="ml-2"
              label="Medida"
              :items="medida"
              outlined
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.frecuencia"
              label="Frecuencia"
              class="ml-2"
              outlined
              dense
              :items="frecuencia"
            />
          </td>
        </tr>
      </v-card-text>
      <div
        class="d-none"
      >
        {{ availableSteps }}
      </div>
    </v-form>
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
          hemorragia: '',
          desgarro: '',
          tipoParto: '',
          descricionGestacion: 'Pretérmino',
          epitomia: '',
          episiorrafia: '',
          hemorroides: '',
          dolor: '',
          tratamientos: [
            {
              tipoMedicina: undefined,
              medicamento: undefined,
              dosis: '',
              medida: undefined,
              frecuencia: undefined,
            },
          ],
        },
        editedItemtratamiento: {
          tipoMedicina: undefined,
          medicamento: undefined,
          dosis: '',
          medida: undefined,
          frecuencia: undefined,
        },
        tipoMedicamento: [],
        frecuencia: [],
        medicamento: [],
        medida: [],
        desgarro: [
          { name: 'Sin desgarro', value: 'no' },
          { name: 'Grado 1', value: '1' },
          { name: 'Grado 2', value: '2' },
          { name: 'Grado 3', value: '3' },
          { name: 'Grado 4', value: '4' },
        ],
        epitomia: [
          { name: 'Sin desgarro', value: 'no' },
          { name: 'Grado 1', value: '1' },
          { name: 'Grado 2', value: '2' },
          { name: 'Grado 3', value: '3' },
          { name: 'Grado 4', value: '4' },
        ],
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        // if (
        // ) steps.push(1)
        steps.push(5)
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
