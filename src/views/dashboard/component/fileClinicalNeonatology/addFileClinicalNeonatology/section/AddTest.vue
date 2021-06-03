<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      1. Datos generales
    </div> -->

    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
        Apgar
      </div>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Frecuencia cardiaca</td>
              <td>No hay</td>
              <td>Menor de 100</td>
              <td>100 o más</td>
              <td>
                <v-select
                  v-model="editedItem.frecuencia_cardiaca"
                  :items="[0,1,2]"
                  @change="calApgar($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Esfuerzo respiratorio</td>
              <td>No hay, no respira</td>
              <td>Llanto debil, respira mal</td>
              <td>Llanto vigoroso</td>
              <td>
                <v-select
                  v-model="editedItem.esfuerzo_respiratorio"
                  :items="[0,1,2]"
                  @change="calApgar($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Tono muscular</td>
              <td>Flacidez</td>
              <td>Flexión parcial de extremidades</td>
              <td>Movimientos activos, buena flexión</td>
              <td>
                <v-select
                  v-model="editedItem.tono_muscular"
                  :items="[0,1,2]"
                  @change="calApgar($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Irritabilidad o respuesta a la estimulación</td>
              <td>No reacciona</td>
              <td>Mueca, succión, algún movimiento por estímulo</td>
              <td>Tos o estornudo, llanto, reacciona defendiendose</td>
              <td>
                <v-select
                  v-model="editedItem.irritabilidad"
                  :items="[0,1,2]"
                  @change="calApgar($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Color de la piel</td>
              <td>Cianosis o palidez</td>
              <td>Pies o manos cianoticas</td>
              <td>Completamente rosado</td>
              <td>
                <v-select
                  v-model="editedItem.color_piel"
                  :items="[0,1,2]"
                  @change="calApgar($event)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        <div class="text-center">
          {{ colorApgar.nombre }}
        </div>
        <v-progress-linear
          :value="totalApgar"
          height="25"
          :color="colorApgar.color"
        >
          <strong>{{ `Valor total: ${editedItem.total_apgar}` }}</strong>
        </v-progress-linear>
      </v-card-text>
      <div class="text-center text-h4 font-weight-bold mt-12 mb-6 blue--text">
        Test capurro
      </div>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Forma del pezón</td>
              <td>0</td>
              <td>5</td>
              <td>10</td>
              <td>15</td>
              <td />
              <td>
                <v-select
                  v-model="editedItem.forma_pezon"
                  :items="[0,5,10,15]"
                  @change="calCapurro($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Textura de la piel</td>
              <td>0</td>
              <td>5</td>
              <td>10</td>
              <td>18</td>
              <td>22</td>
              <td>
                <v-select
                  v-model="editedItem.textura_piel"
                  :items="[0,5,10,18,22]"
                  @change="calCapurro($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Forma de la oreja</td>
              <td>0</td>
              <td>5</td>
              <td>10</td>
              <td>15</td>
              <td />
              <td>
                <v-select
                  v-model="editedItem.forma_oreja"
                  :items="[0,5,10,15]"
                  @change="calCapurro($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Tamaño del tejido mamario</td>
              <td>0</td>
              <td>5</td>
              <td>10</td>
              <td>15</td>
              <td />
              <td>
                <v-select
                  v-model="editedItem.tamano_tejido"
                  :items="[0,5,10,15]"
                  @change="calCapurro($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Pliegues plantares</td>
              <td>0</td>
              <td>5</td>
              <td>10</td>
              <td>15</td>
              <td />
              <td>
                <v-select
                  v-model="editedItem.pliegue_plantares"
                  :items="[0,5,10,15]"
                  @change="calCapurro($event)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        <div class="text-center">
          {{ colorCapurro.name }}
        </div>
        <v-progress-linear
          :value="editedItem.total_test_capurro"
          height="25"
          :color="colorCapurro.color"
        >
          <strong>{{ `Valor total: ${editedItem.total_test_capurro}` }}</strong>
        </v-progress-linear>
      </v-card-text>
      <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
        Escala silverman
      </div>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>movimientos taraco-abdominals</td>
              <td>Sincronizado</td>
              <td>En inspiracion</td>
              <td>Siempre visible</td>
              <td>
                <v-select
                  v-model="editedItem.movimiento_taraco"
                  :items="[0,1,2]"
                  @change="calSilverman($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Tiraje intercostal</td>
              <td>Sin retracción</td>
              <td>Solo visible</td>
              <td>Marcado</td>
              <td>
                <v-select
                  v-model="editedItem.tijera_intercostal"
                  :items="[0,1,2]"
                  @change="calSilverman($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Retracción xifoidea</td>
              <td>Ninguno</td>
              <td>Solo visible</td>
              <td>Marcado</td>
              <td>
                <v-select
                  v-model="editedItem.retraccion_xifoidea"
                  :items="[0,1,2]"
                  @change="calSilverman($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Aleteo nasal</td>
              <td>Ninguno</td>
              <td>Mínimo</td>
              <td>Marcado</td>
              <td>
                <v-select
                  v-model="editedItem.aleteo_nasal"
                  :items="[0,1,2]"
                  @change="calSilverman($event)"
                />
              </td>
            </tr>
            <tr>
              <td>Quejido respiratorio</td>
              <td>Ninguno</td>
              <td>Solo por estetoscopio</td>
              <td>Audible al oido</td>
              <td>
                <v-select
                  v-model="editedItem.quejido_respiratorio"
                  :items="[0,1,2]"
                  @change="calSilverman($event)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        <div class="text-center">
          {{ colorSilverMan.nombre }}
        </div>
        <v-progress-linear
          :value="totalSilverman"
          height="25"
          :color="colorSilverMan.color"
        >
          <strong>{{ `Valor total: ${editedItem.total_escala_silverman}` }}</strong>
        </v-progress-linear>
      </v-card-text>
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
    gestationWeekAllApi,
  } from '@/api/modules'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        editedItem: {
          frecuencia_cardiaca: 0,
          esfuerzo_respiratorio: 0,
          tono_muscular: 0,
          irritabilidad: 0,
          color_piel: 0,
          total_apgar: 0,
          forma_pezon: 0,
          textura_piel: 0,
          gestation_week_id: null,
          forma_oreja: 0,
          tamano_tejido: 0,
          pliegue_plantares: 0,
          total_test_capurro: 0,
          movimiento_taraco: 0,
          tijera_intercostal: 0,
          retraccion_xifoidea: 0,
          aleteo_nasal: 0,
          quejido_respiratorio: 0,
          total_escala_silverman: 0,
        },
        rankValues: [
          {
            rank: [0, 0],
            nombre: 'Sin dificultad respiratoria',
            color: 'green',
          },
          {
            rank: [1, 3],
            nombre: 'Dificultad leve',
            color: 'info',
          },
          {
            rank: [4, 6],
            nombre: 'Dificultad moderada',
            color: 'yellow',
          },
          {
            rank: [7, 10],
            nombre: 'Dificultad severa',
            color: 'pink',
          },
        ],
        gestacion: [],
      }
    },
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      availableSteps () {
        if (
          this.steps.includes(3) &&
          this.editedItem.total_apgar &&
          this.editedItem.total_test_capurro &&
          this.editedItem.total_escala_silverman
        ) {
          this.setSteps(4)
          if (this.click === 'next') {
            this.setFileNeonatology(this.editedItem)
            this.$emit('click:next')
          }
          if (this.click === 'save') {
            this.setFileNeonatology(this.editedItem)
            this.$emit('click:save')
          }
        }
        return ''
      },
      totalApgar () {
        return this.editedItem.total_apgar * 10
      },
      totalSilverman () {
        return this.editedItem.total_escala_silverman * 10
      },
      colorApgar () {
        var level = {}
        this.rankValues.forEach(item => {
          if (item.rank[0] <= this.editedItem.total_apgar && this.editedItem.total_apgar <= item.rank[1]) {
            level = item
          }
        })
        return level
      },
      colorCapurro () {
        var level = {}
        this.gestacion.forEach(item => {
          var rank = JSON.parse(item.rank)
          if (rank[0] <= this.editedItem.total_test_capurro && this.editedItem.total_test_capurro <= rank[1]) {
            level = item
          }
        })
        return level
      },
      colorSilverMan () {
        var level = {}
        this.rankValues.forEach(item => {
          if (item.rank[0] <= this.editedItem.total_escala_silverman && this.editedItem.total_escala_silverman <= item.rank[1]) {
            level = item
          }
        })
        return level
      },
    },
    created () {
      this.listItemGestation()
      this.editedItem = Object.assign({}, this.fileNeonatology)
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyGetActions', 'fileClinicalNeonatologyCheckActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('typeBlood', ['typeBloodAllActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'setFileNeonatology', 'setMiembro', 'resetFileNeonatology']),
      async listItemGestation () {
        const serviceResponse = await gestationWeekAllApi()
        if (serviceResponse.ok) {
          this.gestacion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      calApgar (event) {
        this.editedItem.total_apgar = this.editedItem.frecuencia_cardiaca + this.editedItem.esfuerzo_respiratorio + this.editedItem.tono_muscular + this.editedItem.irritabilidad + this.editedItem.color_piel
      },
      calCapurro (event) {
        this.editedItem.total_test_capurro = this.editedItem.forma_pezon + this.editedItem.textura_piel + this.editedItem.forma_oreja + this.editedItem.tamano_tejido + this.editedItem.pliegue_plantares
      },
      calSilverman (event) {
        this.editedItem.total_escala_silverman = this.editedItem.movimiento_taraco + this.editedItem.tijera_intercostal + this.editedItem.retraccion_xifoidea + this.editedItem.aleteo_nasal + this.editedItem.quejido_respiratorio
      },
    },
  }
</script>
