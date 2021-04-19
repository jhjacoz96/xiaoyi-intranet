
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
              Medicamentos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite gestionar los medicamentos para los pacientes
            </div>
          </v-col>
        </v-row>
        <v-btn
          absolute
          fab
          right
          color="secondary"
          @click="dialog = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        >
          <template v-slot:item.tipoMedicamento="{ item }">
            {{ item.tipoMedicamento.nombre }}
          </template>
          <template v-slot:item.tipoVia="{ item }">
            {{ item.tipoVia.nombre }}
          </template>
          <template v-slot:item.via="{ item }">
            {{ item.via.nombre }}
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
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="pink"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="deleteItem(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2 d-none"
            v-bind="attrs"
            v-on="on"
          >
            New Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.tipoMedicamento.id"
                    small
                    label="Tipos de medicamentos"
                    item-text="nombre"
                    item-value="id"
                    :items="tipoMedicamento"
                    outlined
                    dense
                    @change="seletedMedicine"
                  />
                </v-col> -->
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.nombre"
                    label="Nombre"
                    dense
                    outlined
                  />
                </v-col>
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.tipoVia.id"
                    small
                    label="Tipos de vías"
                    item-text="nombre"
                    item-value="id"
                    :items="tipoVia"
                    outlined
                    dense
                    @change="seletedTypeVia"
                  />
                </v-col> -->
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.via.id"
                    :disabled="editedItem.disabledVia"
                    small
                    label="Vías"
                    item-text="nombre"
                    item-value="id"
                    :items="editedItem.viasSelected"
                    outlined
                    dense
                    @change="seletedVia"
                  />
                </v-col> -->
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editedItem.descripcion"
                    label="Descripción"
                    outlined
                    name="input-7-4"
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
      </v-dialog>
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5">
            ¿Está seguro de realizar esta acción?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="black darken-1"
              text
              @click="closeDelete"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="pinck"
              text
              @click="deleteItemConfirm"
            >
              Eliminar
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        dialogDelete: false,
        imagen: null,
        editedIndex: -1,
        headers: [
          // {
          //   text: 'Tipo medicamento',
          //   value: 'tipoMedicamento',
          // },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          // {
          //   text: 'Tipo de vía',
          //   value: 'tipoVia',
          // },
          // {
          //   text: 'Vía',
          //   value: 'via',
          // },
          {
            text: 'Descripción',
            value: 'descripcion',
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
            nombre: 'Calcibón d',
            descripcion: 'test descripcion',
            tipoVia: {
              nombre: 'Enteral',
              id: 1,
            },
            via: {
              nombre: 'Oral',
              id: 1,
            },
            tipoMedicamento: {
              nombre: 'Analgécicos',
              id: 2,
            },
          },
        ],
        tipoVia: [
          {
            nombre: 'Entral',
            id: 1,
          },
          {
            nombre: 'Parenteral',
            id: 2,
          },
        ],
        via: [
          {
            nombre: 'Oral',
            id: 1,
            idTipoVia: 1,
          },
          {
            nombre: 'Sublingual',
            id: 2,
            idTipoVia: 1,
          },
          {
            nombre: 'Intradérmica',
            id: 3,
            idTipoVia: 2,
          },
          {
            nombre: 'Subcutánea',
            id: 4,
            idTipoVia: 2,
          },
        ],
        tipoMedicamento: [
          {
            nombre: 'Analgécicos',
            id: 1,
          },
          {
            nombre: 'Antibióticos',
            id: 2,
          },
        ],
        editedItem: {
          nombre: '',
          disabledVia: true,
          viasSelected: [],
          tipoVia: {
            nombre: '',
            id: null,
          },
          via: {
            nombre: '',
            id: null,
          },
          tipoMedicamento: {
            nombre: '',
            id: null,
          },
          descripcion: '',
        },
        defaultItem: {
          nombre: '',
          disabledVia: true,
          viasSelected: [],
          tipoVia: {
            nombre: '',
            id: null,
          },
          via: {
            nombre: '',
            id: null,
          },
          tipoMedicamento: {
            nombre: '',
            id: null,
          },
          descripcion: '',
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar vía' : 'Editar vía'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
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
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
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
      seletedMedicine (id) {
        const tipoMedicamento = this.tipoMedicamento.find(item => item.id === id)
        Object.assign(this.editedItem.tipoMedicamento, tipoMedicamento)
      },
      seletedTypeVia (id) {
        const tipoVia = this.tipoVia.find(item => item.id === id)
        Object.assign(this.editedItem.tipoVia, tipoVia)
        this.editedItem.viasSelected = this.via.filter(item => item.idTipoVia === id)
        this.editedItem.disabledVia = false
      },
      seletedVia (id) {
        const via = this.editedItem.viasSelected.find(item => item.id === id)
        Object.assign(this.editedItem.via, via)
      },

    },
  }
</script>
