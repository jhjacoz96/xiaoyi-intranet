<template>
  <v-container fluid>
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
        Inmediato
      </div>
      <v-row
        class="mx-auto"
        style="max-widtd: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-regular">
            Loquios
          </p>
          <v-radio-group
            v-model="editedItem.inmediato.loquios"
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
            Imvolución uterina
          </p>
          <v-radio-group
            v-model="editedItem.inmediato.involucion"
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
            v-model="editedItem.inmediato.dolor"
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
            Lactancia
          </p>
          <v-radio-group
            v-model="editedItem.inmediato.lactancia"
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
          v-if="editedItem.inmediato.lactancia === 'si'"
          cols="6"
          sm="4"
        >
          <v-select
            v-movel="editedItem.inmediato.satisfaccion"
            label="Nivel de satifacción"
            :items="text"
            item-text="text"
            item-value="value"
            outlined
            dense
          />
        </v-col>
      </v-row>
      <div class="mt-4 my-3">
        <p class="text-h6 font-weight-regular">
          Score mama
        </p>
      </div>
      <v-container>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  Puntuación
                </td>
                <td>
                  3
                </td>
                <td>
                  2
                </td>
                <td>
                  1
                </td>
                <td class="orange lighten-3">
                  0
                </td>
                <td>
                  1
                </td>
                <td>
                  2
                </td>
                <td>
                  3
                </td>
                <td>
                  Puntualicón
                </td>
                <td>
                  Total
                </td>
              </tr>
              <tr>
                <td>FC</td>
                <td>Menor igual a 59</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  60-100
                </td>
                <td>101-110</td>
                <td>111-119</td>
                <td> Mayor igual a 120</td>
                <td>FC</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[0]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Sistólica</td>
                <td>Menor igual a 70</td>
                <td>71-89</td>
                <td>90</td>
                <td class="orange lighten-3">
                  91-139
                </td>
                <td>-</td>
                <td>140-159</td>
                <td> Mayor igual a 160</td>
                <td>Sistólica</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[1]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Diastólica</td>
                <td>Menor igual a  50</td>
                <td>51-59</td>
                <td>-</td>
                <td class="orange lighten-3">
                  60-85
                </td>
                <td>86-89</td>
                <td>90-109</td>
                <td>Mayor igual a  110</td>
                <td>Diastólica</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[2]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>FR</td>
                <td>Menor igual a 10</td>
                <td>-</td>
                <td>11</td>
                <td class="orange lighten-3">
                  12-20
                </td>
                <td>-</td>
                <td>21-29</td>
                <td>Mayor igual a 30</td>
                <td>FR</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[3]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr><tr>
                <td>T(*c)</td>
                <td>Menor igual a 36</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  36.1-37.6
                </td>
                <td>-</td>
                <td>37.7-38.4</td>
                <td>Mayor igual a 38.5</td>
                <td>T(*C)</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[4]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Sat (**)</td>
                <td>Menor igual a 85</td>
                <td>86-89</td>
                <td>90-93*</td>
                <td class="orange lighten-3">
                  94-100
                </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>Sat</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[5]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Estado</td>
                <td>-</td>
                <td>confusa/agitada</td>
                <td>-</td>
                <td class="orange lighten-3">
                  alerta
                </td>
                <td>responde a la voz/somnolient</td>
                <td>responde a la voz/estuporosa</td>
                <td>no responde</td>
                <td>Estado de conciencia</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[6]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Proteinuria(*)</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  (-)
                </td>
                <td>(+)</td>
                <td>-</td>
                <td>-</td>
                <td>Proteinuria</td>
                <td>
                  <v-select
                    v-model="editedItem.inmediato.scoreMama[7]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr class="text-end">
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td
                  colspan="10"
                  class="warning white--text text-center"
                >
                  4
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <div class="text-center text-h4 mt-10 font-weight-bold mb-6 blue--text">
        Mediato
      </div>
      <v-row>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            ¿Se realizó aseo?
          </p>
          <v-radio-group
            v-model="editedItem.mediato.aseo"
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
      <div class="mt-4 my-3">
        <p class="text-h6 font-weight-regular">
          Score mama
        </p>
      </div>
      <v-container>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  Puntuación
                </td>
                <td>
                  3
                </td>
                <td>
                  2
                </td>
                <td>
                  1
                </td>
                <td class="orange lighten-3">
                  0
                </td>
                <td>
                  1
                </td>
                <td>
                  2
                </td>
                <td>
                  3
                </td>
                <td>
                  Puntualicón
                </td>
                <td>
                  Total
                </td>
              </tr>
              <tr>
                <td>FC</td>
                <td>Menor igual a 59</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  60-100
                </td>
                <td>101-110</td>
                <td>111-119</td>
                <td> Mayor igual a 120</td>
                <td>FC</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[0]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Sistólica</td>
                <td>Menor igual a 70</td>
                <td>71-89</td>
                <td>90</td>
                <td class="orange lighten-3">
                  91-139
                </td>
                <td>-</td>
                <td>140-159</td>
                <td> Mayor igual a 160</td>
                <td>Sistólica</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[1]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Diastólica</td>
                <td>Menor igual a  50</td>
                <td>51-59</td>
                <td>-</td>
                <td class="orange lighten-3">
                  60-85
                </td>
                <td>86-89</td>
                <td>90-109</td>
                <td>Mayor igual a  110</td>
                <td>Diastólica</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[2]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>FR</td>
                <td>Menor igual a 10</td>
                <td>-</td>
                <td>11</td>
                <td class="orange lighten-3">
                  12-20
                </td>
                <td>-</td>
                <td>21-29</td>
                <td>Mayor igual a 30</td>
                <td>FR</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[3]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr><tr>
                <td>T(*c)</td>
                <td>Menor igual a 36</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  36.1-37.6
                </td>
                <td>-</td>
                <td>37.7-38.4</td>
                <td>Mayor igual a 38.5</td>
                <td>T(*C)</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[4]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Sat (**)</td>
                <td>Menor igual a 85</td>
                <td>86-89</td>
                <td>90-93*</td>
                <td class="orange lighten-3">
                  94-100
                </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>Sat</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[5]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Estado</td>
                <td>-</td>
                <td>confusa/agitada</td>
                <td>-</td>
                <td class="orange lighten-3">
                  alerta
                </td>
                <td>responde a la voz/somnolient</td>
                <td>responde a la voz/estuporosa</td>
                <td>no responde</td>
                <td>Estado de conciencia</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[6]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr>
                <td>Proteinuria(*)</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td class="orange lighten-3">
                  (-)
                </td>
                <td>(+)</td>
                <td>-</td>
                <td>-</td>
                <td>Proteinuria</td>
                <td>
                  <v-select
                    v-model="editedItem.mediato.scoreMama[7]"
                    :items="[1,2,3]"
                  />
                </td>
              </tr>
              <tr class="text-end">
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td
                  colspan="10"
                  class="warning white--text text-center"
                >
                  4
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <div class="text-center text-h4 font-weight-bold mt-10 mb-6 blue--text">
        Tardio
      </div>
      <v-container>
        <v-row>
          <v-col
            class="col"
            sm="6"
          >
            <v-text-field
              dense
              outlined
              disabled
              label="Codigo de ficha familiar"
              value="001"
            />
          </v-col>
          <v-col
            class="col"
            sm="6"
          >
            <v-text-field
              dense
              outlined
              disabled
              label="Centro de salud"
              value="Santa isabel"
            />
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <p class="text-h6 font-weight-light">
              Educación a la paciente y/o familiar
            </p>
            <v-radio-group
              v-model="editedItem.tardio.educacion"
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
              ¿Se informó, educó a la paciente y/o familiar a identificar depreción post parto?
            </p>
            <v-radio-group
              v-model="editedItem.tardio.depresion"
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
              ¿Se proporcionó número de telefono para consultar?
            </p>
            <v-radio-group
              v-model="editedItem.tardio.informar"
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
          >
            <v-select
              v-model="editedItem.tardio.alarma"
              label="señales de alarmas en las que se educó a la paciente"
              outlined
              :items="senalesAlarma"
              item-text="text"
              item-value="value"
              dense
              multiple
            />
          </v-col>
        </v-row>
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
          inmediato: {
            loquios: '',
            involucion: '',
            dolor: '',
            lactancia: '',
            satisfaccion: '',
            scoreMama: [],
          },
          mediato: {
            aseo: '',
            scoreMama: [],
          },
          tardio: {
            informar: '',
            depresion: '',
            educacion: '',
            alarma: undefined,
          },
        },

        headersMediato: [
          {
            text: 'Fecha',
            align: 'start',
            value: 'fecha',
          },
          { text: 'Hora', value: 'hora' },
          { text: 'Total', value: 'total' },
        ],
        dessertsMediato: [
          {
            fecha: '20-10-2010',
            hora: '20:!0',
            total: 159,
          },
        ],
        senalesAlarma: [
          {
            text: 'Signos de infección',
            value: 1,
          },
          {
            text: 'Cuidado de la herida por Cesárea ',
            value: 2,
          },
          {
            text: 'Cuidado de la Episiorrafia',
            value: 3,
          },
          {
            text: 'Cantidad normal de salida de loquios',
            value: 4,
          },
          {
            text: 'Cuidado de los pezones',
            value: 5,
          },
          {
            text: 'Señales de HTA',
            value: 6,
          },
          {
            text: 'Signos y síntomas de infección de las vías urinarias',
            value: 7,
          },
          {
            text: 'Signos y síntomas de infección de las vías urinarias',
            value: 8,
          },
          {
            text: 'Alimentos que debe evitar en su dieta',
            value: 9,
          },
        ],
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        // if (
        // ) steps.push(1)
        steps.push(1)
        this.$emit('data', steps)
        return steps
      },
    },
    metdods: {
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
