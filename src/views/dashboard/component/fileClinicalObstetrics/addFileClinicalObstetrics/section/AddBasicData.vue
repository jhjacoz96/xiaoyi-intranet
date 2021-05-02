<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      1. Datos generales
    </div> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.name"
            v-validate="'required'"
            :error-messages="errors.collect('basic.name')"
            data-vv-name="name"
            outlined
            label="Nombres"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.surname"
            v-validate="'required'"
            :error-messages="errors.collect('basic.surname')"
            data-vv-name="surname"
            outlined
            label="Apellidos"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.typeDocument"
            v-validate="'required'"
            :error-messages="errors.collect('basic.typeDocument')"
            data-vv-name="typeDocument"
            outlined
            label="Tipo de documento"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.document"
            v-validate="'required'"
            :error-messages="errors.collect('basic.document')"
            data-vv-name="document"
            outlined
            label="Cédula"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.bloodType"
            v-validate="'required'"
            :error-messages="errors.collect('basic.bloodType')"
            data-vv-name="bloodType"
            outlined
            label="Tipo de sangre"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.culturalGroup"
            v-validate="'required'"
            :error-messages="errors.collect('basic.culturalGroup')"
            data-vv-name="culturalGroup"
            outlined
            label="Grupo cultural"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.dateBirth"
            v-validate="'required'"
            :error-messages="errors.collect('basic.dateBirth')"
            data-vv-name="dateBirth"
            outlined
            label="Fecha de nacimiento"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.age"
            v-validate="'required'"
            :error-messages="errors.collect('basic.age')"
            data-vv-name="age"
            outlined
            label="Edad"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.civilStatus"
            v-validate="'required'"
            :error-messages="errors.collect('basic.civilStatus')"
            data-vv-name="civilStatus"
            outlined
            label="Estado civil"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.province"
            v-validate="'required'"
            :error-messages="errors.collect('basic.province')"
            data-vv-name="province"
            outlined
            label="Provincia"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.canton"
            v-validate="'required'"
            :error-messages="errors.collect('basic.canton')"
            data-vv-name="canton"
            outlined
            label="Cantón"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.address"
            v-validate="'required'"
            :error-messages="errors.collect('basic.Address')"
            data-vv-name="Address"
            outlined
            label="Direccion de domicilio"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.instructionLevel"
            v-validate="'required'"
            :error-messages="errors.collect('basic.instructionLevel')"
            data-vv-name="instructionLevel"
            outlined
            label="Nivel de instrucción"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.occupation"
            v-validate="'required'"
            :error-messages="errors.collect('basic.occupation')"
            data-vv-name="occupation"
            outlined
            label="Ocupacion"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.disability"
            v-validate="'required'"
            :error-messages="errors.collect('basic.disability')"
            data-vv-name="disability"
            outlined
            label="Discapacidad"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.liveWith"
            v-validate="'required'"
            :error-messages="errors.collect('basic.liveWith')"
            data-vv-name="liveWith"
            outlined
            label="Vive con"
            dense
            validate-on-blur
          />
        </v-col>
      </v-row>
      <div class="d-flex">
        <v-subheader>
          En caso de emergencia llamar a los siguientes personas
        </v-subheader>
        <v-btn
          fab
          color="secondary"
          class="float-right d-inline-block"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-container>
        <tr
          v-for="(item, index) in editedItem.emergency"
          :key="index"
        >
          <td>
            <v-text-field
              v-model="editedItem.emergency.name"
              outlined
              label="Nombre"
              dense
            />
          </td>
          <td>
            <v-text-field
              v-model="editedItem.phone"
              class="mx-2"
              outlined
              label="Telefono"
              dense
            />
          </td>
          <td>
            <v-select
              v-model="editedItem.relationship"
              outlined
              :items="relationship"
              label="Parentesco"
              dense
            />
          </td>
        </tr>
      </v-container>
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
          name: '',
          surname: '',
          typeDocument: undefined,
          document: '',
          bloodType: undefined,
          culturalGroup: undefined,
          dateBirth: undefined,
          age: '',
          civilStatus: undefined,
          province: undefined,
          canton: undefined,
          instructionLevel: undefined,
          occupation: undefined,
          liveWith: undefined,
          emergency: [
            {
              name: '',
              phone: '',
              relationship: undefined,
            },
          ],
        },
        emergency: {
          name: '',
          phone: '',
          relationship: undefined,
        },
        relationship: ['Tia', 'Abuelo', 'Mamá', 'Papa', 'Esposa'],
      }
    },
    computed: {
      // progress () {
      //   var inputs = Object.values(this.editedItem)
      //   var count = inputs.filter(item => {
      //     if (item !== undefined) return item
      //   })
      //   return Math.min(100, (count.length / 16) * 100)
      // },
      availableSteps () {
        const steps = [0]
        // if (
        // ) steps.push(1)
        steps.push(1)
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
