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
            v-model="editedItem.loquios"
            :disabled="!history"
            row
            mandatory
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Involución uterina
          </p>
          <v-radio-group
            v-model="editedItem.involucion_uterina"
            :disabled="!history"
            row
            mandatory
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.dolor_eva"
            :disabled="!history"
            label="Dolor eva"
            :items="[1, 2, 3, 4, 5]"
            outlined
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Lactancia
          </p>
          <v-radio-group
            v-model="editedItem.educacion_lactancia"
            :disabled="!history"
            row
            mandatory
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
              @click.prevent="editedItem.satisfaccion_lactancia = null"
            />
          </v-radio-group>
        </v-col>

        <v-col
          v-if="editedItem.educacion_lactancia === true"
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.satisfaccion_lactancia"
            :disabled="!history"
            label="Nivel de satifacción"
            :items="[1, 2, 3, 4, 5]"
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
                Puntuación
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
                  v-model="score_mama_inmediato[0]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[1]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[2]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[3]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[4]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[5]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[6]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
                  v-model="score_mama_inmediato[7]"
                  :disabled="!history"
                  :items="[0,1,2,3]"
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
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        <div class="text-center">
          {{ colorInmediato.mensaje }}
        </div>
        <v-progress-linear
          :value="editedItem.score_mama_inmediato"
          height="25"
          :color="colorInmediato.color"
        >
          <strong>{{ `Valor total: ${editedItem.score_mama_inmediato}` }}</strong>
        </v-progress-linear>
      </v-card-text>
      <div class="text-center text-h4 mt-10 font-weight-bold mb-6 blue--text">
        Mediato
      </div>
      <!-- <v-row>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            ¿Se realizó aseo?
          </p>
          <v-radio-group
            v-model="editedItem.aseo"
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
      </v-row> -->
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
                  Puntuación
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
                    v-model="score_mama_mediato[0]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[1]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[2]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[3]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[4]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[5]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[6]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
                    v-model="score_mama_mediato[7]"
                    :disabled="!history"
                    :items="[0,1,2,3]"
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
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <v-card-text>
        <div class="text-center">
          {{ colorMediato.mensaje }}
        </div>
        <v-progress-linear
          :value="editedItem.score_mama_mediato"
          height="25"
          :color="colorMediato.color"
        >
          <strong>{{ `Valor total: ${editedItem.score_mama_mediato}` }}</strong>
        </v-progress-linear>
      </v-card-text>
      <div class="text-center text-h4 font-weight-bold mt-10 mb-6 blue--text">
        Tardío
      </div>
      <v-container>
        <v-row v-if="organization">
          <v-col
            class="col"
            sm="6"
          >
            <v-text-field
              dense
              outlined
              disabled
              label="Código de la unidad operativa"
              :value="organization.code_uo"
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
              label="Nombre de la unidad operativa"
              :value="organization.name"
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
              v-model="editedItem.educacion_paciente"
              :disabled="!history"
              row
              mandatory
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
            cols="6"
            sm="4"
          >
            <p class="text-h6 font-weight-light">
              ¿Se informó, educó a la paciente y/o familiar a identificar depreción post parto?
            </p>
            <v-radio-group
              v-model="editedItem.educacion_depresion"
              :disabled="!history"
              row
              mandatory
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
            cols="6"
            sm="4"
          >
            <p class="text-h6 font-weight-light">
              ¿Se proporcionó número de telefono para consultar?
            </p>
            <v-radio-group
              v-model="editedItem.proporcionar_telefono"
              :disabled="!history"
              row
              mandatory
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
          >
            <v-select
              v-model="editedItem.senal_alarma"
              :disabled="!history"
              label="señales de alarmas en las que se educó a la paciente"
              outlined
              item-text="nombre"
              item-value="id"
              multiple
              :items="senalesAlarma"
              dense
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-textarea
              v-model="editedItem.recomendaciones"
              :disabled="!history"
              label="Recomendaciones (*)"
              outlined
              dense
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
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
  import {
    senalAlarmAllApi,
    webOrganizationAllApi,
  } from '@/api/modules'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
      history: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        value: '',
        editedItem: {
          loquios: true,
          involucion_uterina: true,
          dolor_eva: 0,
          educacion_lactancia: true,
          satisfaccion_lactancia: 0,
          score_mama_inmediato: 0,
          score_mama_mediato: 0,
          educacion_paciente: false,
          educacion_depresion: false,
          recomendaciones: '',
          proporcionar_telefono: true,
          senal_alarma: [],
        },
        score_mama_mediato: [],
        score_mama_inmediato: [],
        senalesAlarma: [],
        organization: {
          name: '',
          cede_uo: '',
        },
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric']),
      colorInmediato () {
        var level = {
          color: '',
          mensaje: '',
        }
        if (this.editedItem.score_mama_inmediato === 0) {
          level.color = 'success'
          level.mensaje = 'Sin riesgo'
        } else if (this.editedItem.score_mama_inmediato === 1) {
          level.color = 'yellow'
          level.mensaje = 'Riesgo bajo'
        } else if (
          this.editedItem.score_mama_inmediato > 1 &&
          this.editedItem.score_mama_inmediato <= 4
        ) {
          level.color = 'warning'
          level.mensaje = 'Riesgo medio'
        } else if (
          this.editedItem.score_mama_inmediato > 4
        ) {
          level.color = 'red'
          level.mensaje = 'Riesgo alto'
        } else {
          level.color = 'success'
          level.mensaje = 'Sin riesgo'
        }
        return level
      },
      colorMediato () {
        var level = {
          color: '',
          mensaje: '',
        }
        if (this.editedItem.score_mama_mediato === 0) {
          level.color = 'success'
          level.mensaje = 'Sin riesgo'
        } else if (this.editedItem.score_mama_mediato === 1) {
          level.color = 'yellow'
          level.mensaje = 'Riesgo bajo'
        } else if (
          this.editedItem.score_mama_mediato > 1 &&
          this.editedItem.score_mama_mediato <= 4
        ) {
          level.color = 'warning'
          level.mensaje = 'Riesgo medio'
        } else if (
          this.editedItem.score_mama_mediato > 4
        ) {
          level.color = 'red'
          level.mensaje = 'Riesgo alto'
        } else {
          level.color = 'success'
          level.mensaje = 'Sin riesgo'
        }
        return level
      },
      availableSteps () {
        if (
          this.editedItem.recomendaciones &&
          this.steps.includes(5)
        ) {
          this.setSteps(6)
          if (this.click) {
            if (this.click === 'next') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:next')
            }
            if (this.click === 'save') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:save')
            }
          }
        }
        return ''
      },
    },
    watch: {
      score_mama_inmediato (value) {
        var count = 0
        value.forEach(item => {
          count += item
        })
        this.editedItem.score_mama_inmediato = count
      },
      score_mama_mediato (value) {
        var count = 0
        value.forEach(item => {
          count += item
        })
        this.editedItem.score_mama_mediato = count
      },
    },
    created () {
      this.editedItem = Object.assign({}, this.fileObstetric)
      this.listItem()
      this.itemOrganization()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async listItem () {
        const serviceResponse = await senalAlarmAllApi()
        if (serviceResponse.ok) {
          this.senalesAlarma = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemOrganization () {
        const serviceResponse = await webOrganizationAllApi()
        if (serviceResponse.ok) {
          this.organization = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
