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
              Clasificación de publicaciones
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite clasificacificar las publicaciones
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
          <template v-slot:item.imagen="{ item }">
            <v-img
              :src="item.imagen"
              width="60"
            />
          </template>
          <template v-slot:item.accion="{ item }">
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  color="info"
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  @click="enableType(item)"
                >
                  <v-icon>{{ item.viewType ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </v-btn>
              </template>
              <span>{{ item.viewType ? 'Mostrado' : 'Mostrar' }}</span>
            </v-tooltip> -->
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
        max-width="500px"
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
                <v-col
                  cols="12"
                >
                  <v-switch
                    v-model="editedItem.viewType"
                    inset
                    label="¿Habilitar?"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.nombre"
                    label="Nombre"
                    outlined
                  />
                </v-col>
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
        tab: null,
        search: '',
        dialog: false,
        dialogDelete: false,
        imagen: null,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre',
            value: 'nombre',
          },
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
            image: '',
            nombre: 'Medicina alternativa',
            descripcion: 'test descripcion',
            viewType: false,
          },
          {
            image: '',
            nombre: 'CUidado de heridas',
            descripcion: 'test descripcion',
            viewType: true,
          },
        ],
        editedItem: {
          descripcion: '',
          viewType: false,
        },
        defaultItem: {
          nombre: '',
          descripcion: '',
          viewType: false,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Clasificación de publicación' : 'Editar Clasificación de publicación'
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
      //   enableType (item) {
      //     const index = this.desserts.indexOf(item)
      //     this.desserts[index].viewType = !item.viewType
      //   },
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
    },
  }
</script>
