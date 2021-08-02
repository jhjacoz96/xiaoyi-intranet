<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col
            md="2"
            cols="2"
          >
            <v-btn
              icon
              large
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Configuración de riesgos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite configurar los riesgos
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        >
          <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="editItem(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar riego</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Configurar riesgo</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Nombre del riesgo"
                    dense
                    disabled
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.risk_classification"
                    label="Tipo de riesgo"
                    dense
                    :items="riskClassification"
                    item-value="id"
                    item-text="name"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-subheader>
                Asignar actividades de evolución de riesgos
              </v-subheader>
              <v-row>
                <v-col
                  v-for="(item, index) in activityEvolucion"
                  :key="index"
                  cols="12"
                >
                  <v-checkbox
                    v-model="editedItem.activity_evolutions_id"
                    :label="item.compromiso_familiar"
                    :value="item.id"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="black darken-1"
              text
              @click="close()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="addItem()"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </base-material-card>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        editedIndex: -1,
        editedId: undefined,
        headers: [
          {
            text: 'Nombre del riesgo',
            value: 'name',
          },
          {
            text: 'Clasificación',
            value: 'risk_classification_id.name',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
        riskClassification: [],
        activityEvolucion: [],
        editedItem: {
          name: '',
          risk_classification: undefined,
          activity_evolutions_id: [],
        },
        defaultItem: {
          name: '',
          risk_classification: undefined,
          activity_evolutions_id: [],
        },
      }
    },
    created () {
      this.listItem()
      this.listItemRiskClassification()
      this.listItemActivityEvolution()
    },
    methods: {
      ...mapActions('risk', ['riskAllActions', 'riskGetActions', 'riskUpdateActions']),
      ...mapActions('riskClassification', ['riskClassificationAllActions']),
      ...mapActions('activityEvolution', ['activityEvolutionAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.riskAllActions()
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
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
      async listItemActivityEvolution () {
        const serviceResponse = await this.activityEvolutionAllActions()
        if (serviceResponse.ok) {
          this.activityEvolucion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedId = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async addItem () {
        if (this.editedIndex > -1) {
          const serviceResponse = await this.riskUpdateActions(this.editedItem)
          if (serviceResponse.ok) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            this.close()
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.close()
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.editedId = undefined
        })
      },
    },
  }
</script>
