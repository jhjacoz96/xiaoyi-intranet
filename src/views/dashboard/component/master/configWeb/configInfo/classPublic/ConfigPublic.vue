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
              Configuración de publicaciones
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite configurar las publicaciones agregadas y asignarles recursos multimedias
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar publicación"
          single-line
          hide-details
        />
      </v-card-title>
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
              <span>Editar</span>
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
            <span class="text-h5">Configurar publicación</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="editedItem.name"
                  label="Titulo de la publicación"
                  outlined
                  dense
                  disabled
                />
                <v-col
                  cols="12"
                >
                  <v-switch
                    v-model="editedItem.viewPublication"
                    inset
                    label="¿Habilitar?"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <base-preview-image
                    imagen="imagen"
                    @imagen="editedItem.resource = $event"
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
              color="pink"
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
    filters: {
      filterDescription: function (val) {
        var description = val.length > 45 ? val.slice(0, 45) + '...' : val
        return description
      },
    },
    data () {
      return {
        content: 'esta es una demostración simple',
        editorOption: {
          theme: 'bubble',
          placeholder: 'Agrege el contenido de la publicación...',
        },
        tab: null,
        search: '',
        dialog: false,
        dialogDelete: false,
        imagen: null,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre de la publicación',
            value: 'name',
          },
          {
            text: 'Estado',
            value: 'viewPublication',
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
            name: 'Medicina alternativa',
            descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, consequatur dolores? In, temporibus labore dolorem veniam consequatur, error aut placeat quam quisquam animi rem, aliquid eaque reprehenderit vitae. Provident, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur accusamus quod, libero illo laboriosam molestias, quis a sit cum optio numquam, explicabo blanditiis sunt sapiente nulla ea iste voluptatem quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, doloremque laboriosam distinctio quo, aliquam eligendi dignissimos harum animi officiis nesciunt accusantium at voluptas minima ullam nihil atque expedita aut odio!',
            viewPublication: false,
            fecha: '30/03/2021',
            responsable: 'Jhon Contreras',
            resourse: [],
          },
          {
            name: 'CUidado de heridas',
            descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, consequatur dolores? In, temporibus labore dolorem veniam consequatur, error aut placeat quam quisquam animi rem, aliquid eaque reprehenderit vitae. Provident, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur accusamus quod, libero illo laboriosam molestias, quis a sit cum optio numquam, explicabo blanditiis sunt sapiente nulla ea iste voluptatem quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, doloremque laboriosam distinctio quo, aliquam eligendi dignissimos harum animi officiis nesciunt accusantium at voluptas minima ullam nihil atque expedita aut odio!',
            viewPublication: true,
            fecha: '30/03/2021',
            responsable: 'Jhon Contreras',
            resourse: [],
          },
        ],
        resource: ['Infogrcia de cuidados de heridadas', 'Video de medicina alternativa'],
        editedItem: {
          name: '',
          descripcion: '',
          resource: [],
          viewPublication: false,
        },
        defaultItem: {
          name: '',
          descripcion: '',
          resource: [],
          viewPublication: false,
        },
      }
    },
    computed: {
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
