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
              Publicaciones
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite gestionar las publicaciones de cada tipo para el cuidado de adultos mayores
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
          <!-- <template v-slot:item.descripcion="{ item }">
            <div v-html="item.descripcion"/>
          </template> -->
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
                  <v-select
                    v-model="editedItem.classPublic.id"
                    small
                    label="Tipos de publicación"
                    item-text="nombre"
                    item-value="id"
                    :items="classPublic"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
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
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Titulo"
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <base-preview-image
                      imagen="imagen"
                      @imagen="imagen = $event"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <!-- <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripción"
                      outlined
                      name="input-7-4"
                    /> -->
                    <quill-editor
                      ref="myTextEditor"
                      v-model="editedItem.descripcion"
                      :config="editorOption"
                    />
                  </v-col>
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
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.js'
  export default {
    filters: {
      filterDescription: function (val) {
        var description = val.length > 45 ? val.slice(0, 45) + '...' : val
        return description
      },
    },
    components: {
      quillEditor,
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
            text: 'Imagen',
            align: 'center',
            sortable: false,
            value: 'imagen',
          },
          {
            text: 'Titulo',
            value: 'nombre',
          },
          //   {
          //     text: 'Descripción',
          //     value: 'descripcion',
          //   },
          {

            text: 'Fecha',
            value: 'fecha',
          },
          {

            text: 'Responsable',
            value: 'responsable',
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
            descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, consequatur dolores? In, temporibus labore dolorem veniam consequatur, error aut placeat quam quisquam animi rem, aliquid eaque reprehenderit vitae. Provident, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur accusamus quod, libero illo laboriosam molestias, quis a sit cum optio numquam, explicabo blanditiis sunt sapiente nulla ea iste voluptatem quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, doloremque laboriosam distinctio quo, aliquam eligendi dignissimos harum animi officiis nesciunt accusantium at voluptas minima ullam nihil atque expedita aut odio!',
            viewPublication: false,
            fecha: '30/03/2021',
            responsable: 'Jhon Contreras',
            classPublic: {
              nombre: 'Medicina alternativa',
              id: 1,
            },
          },
          {
            image: '',
            nombre: 'CUidado de heridas',
            descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, consequatur dolores? In, temporibus labore dolorem veniam consequatur, error aut placeat quam quisquam animi rem, aliquid eaque reprehenderit vitae. Provident, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur accusamus quod, libero illo laboriosam molestias, quis a sit cum optio numquam, explicabo blanditiis sunt sapiente nulla ea iste voluptatem quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, doloremque laboriosam distinctio quo, aliquam eligendi dignissimos harum animi officiis nesciunt accusantium at voluptas minima ullam nihil atque expedita aut odio!',
            viewPublication: true,
            fecha: '30/03/2021',
            responsable: 'Jhon Contreras',
            classPublic: {
              nombre: 'Cuidados de la piel',
              id: 2,
            },
          },
        ],
        editedItem: {
          image: '',
          nombre: '',
          descripcion: '',
          viewPublication: false,
          classPublic: {
            nombre: '',
            id: null,
          },
        },
        defaultItem: {
          image: '',
          nombre: '',
          descripcion: '',
          viewPublication: false,
          classPublic: {
            nombre: '',
            id: null,
          },
        },
        classPublic: [
          {
            nombre: 'Cuidados de la piel',
            id: 1,
          },
          {
            nombre: 'Medicina alternativa',
            id: 2,
          },
        ],
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar publicación' : 'Editar  publicación'
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
