<template>
  <v-container fluid>
    <div
      class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
    >
      <div
        class=" d-inline-block"
      >
        9. Contaminación ambiental
      </div>
      <v-btn
        fab
        color="secondary"
        class="float-right d-inline-block"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-card-text>
      <tr
        v-for="(item, index) in desserts"
        :key="index"
      >
        <td>
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
                v-model="item.dateReport"
                label="Fecha de informe"
                prepend-icon="mdi-calendar"
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="item.dateReport"
              @input="showDate = false"
              @change="test($event)"
            />
          </v-menu>
        </td>
        <td>
          <v-select
            v-model="item.typeContamination"
            label="Tipo/descripción de contaminante"
            outlined
            class="ml-2 mr-2"
            dense
            :items="['Hidrico', 'Suelo', 'acustica', 'lúminica', 'Visual', 'Terminca']"
          />
        </td>
        <td>
          <v-text-field
            label="Causante de la contaminación"
            outlined
            dense
          />
        </td>
      </tr>
    </v-card-text>
    <div
      class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
    >
      <div
        class=" d-inline-block"
      >
        10. Lugar o persona a la que acuden para tratamiento
      </div>
      <v-btn
        fab
        color="secondary"
        class="float-right d-inline-block"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-card-text
      class="text-center justify-center justify-content-center"
    >
      <tr
        v-for="(item, index) in desserts1"
        :key="index"
      >
        <td>
          <v-text-field
            v-model="item.place"
            label="Nombre del lugar o la persona"
            outlined
            dense
          />
        </td>
      </tr>
    </v-card-text>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        showDate: false,
        show2Date: false,
        desserts: [
          {
            dateReport: undefined,
            typeContamination: undefined,
            cause: '',
            placeTreatment: undefined,
          },
        ],
        editedItem: {
          dateReport: undefined,
          typeContamination: undefined,
          cause: '',
          placeTreatment: undefined,
        },
        desserts1: [
          {
            place: undefined,
          },
        ],
        editedItem1: {
          place: undefined,
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
