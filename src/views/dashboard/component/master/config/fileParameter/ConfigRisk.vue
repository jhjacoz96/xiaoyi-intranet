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
          <template v-slot:item.typeRisk="{ item }">
            <v-template v-if="item.typeRisk">
              {{ item.typeRisk }}
            </v-template>
            <v-template v-else>
              Sin registro
            </v-template>
          </template>
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
                    v-model="editedItem.typeRisk"
                    label="Tipo de riesgo"
                    dense
                    :items="typeRisk"
                    outlined
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
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre del riesgo',
            value: 'name',
          },
          {
            text: 'Tipo de riesgo',
            value: 'typeRisk',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [
          {
            name: 'Contaminación de desechos industriales cerca',
            typeRisk: undefined,
          },
        ],
        typeRisk: ['Biológicos'],
        editedItem: {
          name: '',
          typeRisk: undefined,
        },
        defaultItem: {
          name: '',
          typeRisk: undefined,
        },
      }
    },
    methods: {
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      addItem () {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.close()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
  }
</script>
