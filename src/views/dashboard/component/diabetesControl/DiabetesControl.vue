<template>
  <v-container fluid>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Control de pacientes diabeticos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permites asignar tratamientos y planes al paciente con diabetes
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-card-title>
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
        >
          <template v-slot:item.semaforizacion="{ item }">
            <v-chip color="success">
              {{ item.semaforizacion }}
            </v-chip>
          </template>
          <template v-slot:item.accion="{ item }">
            <input
              type="text"
              :value="item"
              class="d-none"
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Ver</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="dialog = !dialog"
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
      max-width="600"
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
                      v-model="editedItem.idPresion"
                      label="Presión arterial"
                      outlined
                      dense
                      :items="presion"
                      item-text="nombre"
                      item-value="id"
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
                      label="Respiración"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.saturacionOxigeno"
                      label="Saturación de oxígeno"
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
                      label="Temperatura"
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
                      v-model="editedItem.peso"
                      label="Peso"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.altura"
                      label="Altura"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.imc"
                      label="Imc"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.circunferenciaApdominal"
                      label="Circunferencia abdominal"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.glusemia"
                      label="Nivel de glusemia"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item class="pb-12">
              <div class="d-flex">
                <v-subheader class="float-left">
                  Tratamientos farmacológicos
                </v-subheader>
                <v-btn
                  class="float-right"
                  color="secondary"
                  fab
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-container>
                <v-card-text>
                  <tr
                    v-for="(item, k) in editedItem.tratamientos"
                    :key="k"
                  >
                    <td>
                      <v-select
                        v-model="item.medicamento"
                        label="Tratameinto"
                        outlined
                        :items="medicamento"
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
                        v-model="item.frecuencia"
                        label="Frecuencia"
                        outlined
                        dense
                        :tems="frecuencia"
                      />
                    </td>
                  </tr>
                </v-card-text>
              </v-container>
              <v-subheader>
                Tratamientos no farmacológicos
              </v-subheader>
              <v-container>
                <v-card-text>
                  <v-textarea
                    label="Dieta"
                    outlined
                    multiple
                    dense
                  />
                </v-card-text>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="6"
                      md="4"
                    >
                      <v-text-field
                        label="Actividad fisica"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col
                      cols="6"
                      md="4"
                    >
                      <v-text-field
                        label="Tiempo"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col
                      cols="6"
                      md="4"
                    >
                      <v-select
                        label="Frecuencia"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-container>
            </v-tab-item>
          </base-material-wizard-normal>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        step: [],
        tab: 0,
        tabs: ['Signos vitales', 'Antropometria', 'Tratamientos'],
        headers: [
          { text: 'Nombre', sortable: false, value: 'nombre' },
          { text: 'Semafirización de alertas', sortable: false, value: 'semaforizacion' },
          { text: 'Cédula', sortable: false, value: 'cedula' },
          { text: 'Sexo', sortable: false, value: 'sexo' },
          { text: 'Edad', sortable: false, value: 'edad' },
          { text: 'Sector', sortable: false, value: 'sector' },
          { text: 'Acción', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            nombre: 'Aron Perez',
            semaforizacion: 'En orden',
            cedula: '26378059',
            sexo: 'Masculino',
            edad: '43A 10M 1D',
            sector: 'Pedregal',
          },
        ],
        presion: [
          { nombre: 'Sistolica', id: 1 },
          { nombre: 'Diastólica', id: 2 },
        ],
        editedItem: {
          idPresion: undefined,
          pulso: '',
          respiracion: '',
          saturacionOxigeno: '',
          temperatura: '',
          peso: '',
          altura: '',
          imc: '',
          circunferenciaApdominal: '',
          tratamientos: [
            {
              medicamento: '',
              dosis: '',
              frecuencia: '',
            },
          ],
          glusemia: '',
        },
        medicamento: ['Glutem', 'Avitix'],
        frecuencia: ['Diario'],
      }
    },
    computed: {
      cope () {
        if (this.tab === 0) return 'signos'
        else if (this.tab === 1) return 'antropometria'
        return 'tramientos'
      },
      availableSteps () {
        const steps = [0]
        if (
          this.editedItem.idPresion &&
          this.editedItem.pulso &&
          this.editedItem.respiracion &&
          this.editedItem.saturacionOxigeno &&
          this.editedItem.temperatura
        ) steps.push(1)

        if (
          this.editedItem.peso &&
          this.editedItem.altura &&
          this.editedItem.imc &&
          this.editedItem.circunferenciaApdominal &&
          this.editedItem.glusemia &&
          steps.includes(1)
        ) steps.push(2)

        // if (
        //   this.address &&
        //   this.street &&
        //   this.city &&
        //   this.state &&
        //   steps.includes(2)
        // ) steps.push(3)
        return steps
      },
    },
    methods: {
      next () {
        this.validateForm(this.scope).then(item => {
          if (!item) return

          if (this.tab === this.tabs.length - 1) {
            alert('Form finished')
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
