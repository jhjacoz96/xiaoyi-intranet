<template>
  <v-container fluid>
    <v-alert
      dense
      type="info"
    >
      Para avanzar al siguiente paso debe <strong>seleccionar un nivel de riesgo</strong> para cada riesgo
    </v-alert>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      5. Clasificación de riesgos familiares
      <v-btn
        class="float-right"
        fab
        color="info"
        small
        @click="dialog = !dialog"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </div>
    <!-- <v-progress-linear
      :value="progress"
      absolute
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="riesgos"
          item-key="name"
          sort-by="name"
          group-by="risk_classification_id.name"
          :disable-pagination="true"
          group-by-value="name"
          show-group-by
          hide-default-header
        >
          <template v-slot:header="props">
            <thead>
              <tr>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[0].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[1].text }}</span>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item.nivel="{ item }">
            <v-select
              v-model="item.level_risk_id"
              label="Seleccione el nivel de riesgo"
              :items="levelRisk"
              item-text="name"
              item-value="id"
              @change="getRisk(item, item.level_risk_id)"
            />
          </template>
          <template v-slot:item.risk="{ item }">
            {{ item.risk.name }}
          </template>
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <v-btn
                :ref="group"
                x-small
                icon
                @click="toggle"
              >
                <v-icon v-if="isOpen">
                  mdi-plus
                </v-icon>
                <v-icon v-else>
                  mdi-minus
                </v-icon>
              </v-btn>
              <span class="mx-5 font-weight-bold">{{ group }}</span>
            </td>
          </template>
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <v-btn
                :ref="group"
                x-small
                icon
                @click="toggle"
              >
                <v-icon v-if="isOpen">
                  mdi-plus
                </v-icon>
                <v-icon v-else>
                  mdi-minus
                </v-icon>
              </v-btn>
              <span class="mx-5 font-weight-bold">{{ group }}</span>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <!-- <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tr>
              <td
                width="20%"
                class="text-left font-weight-regular text-h5"
              >
                Total por nivel
              </td>
              <td
                width="10%"
                dark
                class="text-center green darken-1 white--text"
              >
                0
              </td>
              <td
                width="10%"
                class="text-center yellow darken-1 white--text"
              >
                0
              </td>
              <td
                width="10%"
                class="text-center yellow darken-2 white--text"
              >
                10
              </td>
              <td
                width="10%"
                class="text-center yellow darken-3 white--text"
              >
                10
              </td>
              <td
                width="10%"
                class="text-center yellow darken-4 white--text"
              >
                0
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text> -->
      <v-card-text class="text-center">
        <div>
          Riesgo total: <span class="font-weight-light">{{ colorRisk.name }}</span>
        </div>
      </v-card-text>
      <!-- <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tr>
              <td
                width="20%"
                class="font-weight-regular text-h5"
              >
                Total
              </td>
              <td>
                &nbsp;
              </td>
              <td
                width="14%"
                class="text-center yellow darken-4 text-center white--text"
              >
                100
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text> -->
      <v-card-text>
        <v-progress-linear
          :value="total_risk"
          height="25"
          :color="colorRisk.color"
        >
          <strong>{{ total_risk }}</strong>
        </v-progress-linear>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <div class="pa-3 text-center">
            Historial de rango total
          </div>
          <v-card-text>
            <v-container>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        Nivel de rango
                      </th>
                      <th>
                        Rango total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in levelTotal"
                      :key="index"
                    >
                      <td>
                        {{ item.name }}
                      </td>
                      <td>
                        <v-chip
                          dark
                          :color="item.color"
                        >
                          {{ JSON.parse(item.rank)[0] }} - {{ JSON.parse(item.rank)[1] }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="black darken-1"
              text
              @click="dialog = !dialog"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div
        class="d-none"
      >
        {{ availableSteps }}
      </div>
    </v-form>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    props: {
      click: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        interval: {},
        knowledge: 33,
        dialog: false,
        headers: [
          {
            text: 'Riesgos',
            value: 'name',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          { text: 'Clasificación de riesgos', value: 'risk_classification_id.name', sortable: false, align: 'right' },
          {
            text: 'Niveles de riesgos',
            value: 'nivel',
            align: 'center',
            groupable: false,
          },
        ],
        riesgos: [],
        levelRisk: [],
        riskClassification: [],
        getLevel: undefined,
        levelTotal: [],
        total_risk: 0,
        level_total_id: undefined,
      }
    },
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      availableSteps () {
        if (
          this.riesgos.filter(item => {
            return item.level_risk_id
          }).length === this.riesgos.length &&
          this.riesgos.length !== 0 &&
          this.steps.includes(2)
        ) {
          if (this.click) {
            this.setRisks({
              riesgos: this.riesgos,
              level_total_id: this.level_total_id,
              total_risk: this.total_risk,
            })
            this.$emit('next')
          }
          this.setSteps(3)
        }
        return ''
      },
      colorRisk () {
        var level = 'green'
        this.levelTotal.forEach(item => {
          const rank = JSON.parse(item.rank)
          if (this.total_risk >= rank[0] && this.total_risk <= rank[1]) {
            level = item
            this.level_total_id = item.id
          }
        })
        return level
      },
    },
    created () {
      this.ShowFileFamily()
      this.listItemLevelRisk()
      this.listItemRiskClassification()
      this.listItemLevelTotal()
    },
    methods: {
      ...mapActions('levelRisk', ['levelRiskAllActions']),
      ...mapActions('levelTotal', ['levelTotalAllActions']),
      ...mapActions('risk', ['riskAllActions']),
      ...mapActions('riskClassification', ['riskClassificationAllActions']),
      ...mapMutations('fileFamily', ['setRisks', 'setSteps']),
      ...mapMutations(['alert']),
      async ShowFileFamily () {
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          this.riesgos = this.fileFamily.riesgos
        } else {
          this.listItemRisk()
        }
      },
      async listItemRisk () {
        const serviceResponse = await this.riskAllActions()
        if (serviceResponse.ok) {
          this.riesgos = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemLevelTotal () {
        const serviceResponse = await this.levelTotalAllActions()
        if (serviceResponse.ok) {
          this.levelTotal = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemLevelRisk () {
        const serviceResponse = await this.levelRiskAllActions()
        if (serviceResponse.ok) {
          this.levelRisk = serviceResponse.data
          if (this.id !== undefined) this.calValueRisk()
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemRiskClassification () {
        const serviceResponse = await this.riskClassificationAllActions()
        if (serviceResponse.ok) {
          this.riskClassification = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      getRisk (risk, level) {
        var index = this.riesgos.indexOf(risk)
        this.riesgos[index].level_risk_id = level
        this.calValueRisk()
      },
      calValueRisk () {
        this.total_risk = 0
        this.riesgos.forEach(item => {
          var valueLvl = this.levelRisk.find(v => {
            return item.level_risk_id === v.id
          })
          if (valueLvl !== undefined) this.total_risk = this.total_risk + valueLvl.value
        })
      },
    },
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
