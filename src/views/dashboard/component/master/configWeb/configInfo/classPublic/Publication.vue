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
              Permite dar de alta publicaciones en el sitio web
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
          <template v-slot:item.image_mini="{ item }">
            <div
              v-if="item.image_mini"
              class="my-4"
            >
              <v-img
                :src="`${$store.state.urlApi}/${item.image_mini.url}`"
                width="100"
                height="100"
              />
            </div>
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
        max-width="700px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <!-- <v-col
                    cols="12"
                  >
                    <v-switch
                      v-model="editedItem.viewPublication"
                      inset
                      label="¿Habilitar?"
                    />
                  </v-col> -->
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Titulo"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <div>
                    <p class="text-h6 font-weight-regular">
                      Filtros de búsqueda
                    </p>
                  </div>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="editedItem.filter_one_publication_id"
                        label="Primer filtro"
                        outlined
                        dense
                        :items="filterOne"
                        item-text="name"
                        item-value="id"
                        @change="getFilterTwo($event)"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="editedItem.filter_two_publication_id"
                        label="Segundo filtro"
                        outlined
                        dense
                        :items="filterTwo"
                        :disabled="filterTwo.length > 0 ? false : true"
                        item-text="name"
                        item-value="id"
                        @change="getFilterThree($event)"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="editedItem.filter_three_publication_id"
                        label="Tercer filtro"
                        :items="filterThree"
                        item-text="name"
                        item-value="id"
                        :disabled="filterThree.length > 0 ? false : true"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                >
                  <p class="text-h6 font-weight-regular">
                    Imagen miniatura
                  </p>
                  <base-preview-image
                    :image="typeof editedItem.image_mini === 'object' ? editedItem.image_mini.url : editedItem.image_mini"
                    @imagen="editedItem.image_mini = $event"
                  />
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-select
                    v-model="editedItem.type_resource"
                    :disabled="editedIndex !== -1"
                    :items="['image', 'video', 'document']"
                    outlined
                    label="Tipo de recurso"
                    dense
                    @click.prevent="editedItem.resource = null"
                  />
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-file-input
                    v-if="editedItem.type_resource==='image' || editedItem.type_resource==='document'"
                    v-model="editedItem.resource"
                    :disabled="editedIndex !== -1"
                    label="Seleccione la imagen"
                    outlined
                    dense
                    class="ml-2"
                  />
                  <v-text-field
                    v-else
                    v-model="editedItem.resource"
                    :disabled="editedIndex !== -1"
                    label="Ingrese el link de video de youtube"
                    outlined
                    dense
                    class="ml-2"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <p class="text-h6 font-weight-regular">
                    Descripción de la publicación
                  </p>
                  <quill-editor
                    ref="myTextEditor"
                    v-model="editedItem.description"
                    :config="editorOption"
                  />
                </v-col>
                <!-- <v-col
                  cols="12"
                >
                  <div class="mt-4 my-3">
                    <div class="d-inline-block">
                      <span class="text-h5">Agregar recursos</span>
                    </div>
                    <v-btn
                      fab
                      color="secondary"
                      class="float-right"
                      @click="addResource()"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <v-card-text>
                    <tr
                      v-for="(item, k) in editedItem.resources"
                      :key="k"
                    >
                      <td>
                        <v-select
                          v-model="item.type_resource"
                          :items="['image', 'video']"
                          outlined
                          label="Tipo de recurso"
                          dense
                        />
                      </td>
                      <td>
                        <v-file-input
                          v-if="item.type_resource==='image'"
                          v-model="item.url"
                          label="Seleccione la imagen"
                          outlined
                          dense
                          class="ml-2"
                        />
                        <v-text-field
                          v-else
                          v-model="item.url"
                          label="Ingrese el link de video de youtube"
                          outlined
                          dense
                          class="ml-2"
                        />
                      </td>
                      <td>
                        <v-btn
                          icon
                          color="pink"
                          class="ml-2"
                          @click="deletedResource(item)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </v-card-text>
                </v-col> -->
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
              :loading="loaderDialog"
              :disabled="loaderDialog"
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
              :loading="loaderDialogDelete"
              :disabled="loaderDialogDelete"
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
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
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
        loaderDialog: false,
        loaderDialogDelete: false,
        editedIndex: -1,
        editedId: undefined,
        headers: [
          {
            text: 'Titulo',
            value: 'name',
          },
          {

            text: 'Fecha',
            value: 'created_at',
          },
          {

            text: 'Imagen mini',
            value: 'image_mini',
          },
          {

            text: 'Responsable',
            value: 'employee.name',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
        filterOne: [],
        filterTwo: [],
        filterThree: [],
        editedItem: {
          name: '',
          description: '',
          filter_three_publication_id: null,
          filter_two_publication_id: null,
          filter_one_publication_id: null,
          image_mini: undefined,
          resource: null,
          type_resource: '',
        },
        defaultItem: {
          name: '',
          description: '',
          filter_three_publication_id: null,
          filter_two_publication_id: null,
          filter_one_publication_id: null,
          image_mini: undefined,
          resource: null,
          type_resource: '',
        },
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
    created () {
      this.listItem()
      this.listItemFIlterOne()
    },
    methods: {
      ...mapActions('publication', ['publicationPostActions', 'publicationAllActions', 'publicationDeleteActions', 'publicationGetActions', 'publicationUpdateActions']),
      ...mapActions('filterOnePublication', ['filterOnePublicationAllActions']),
      ...mapActions('filterTwoPublication', ['filterTwoPublicationFilterActions']),
      ...mapActions('filterThreePublication', ['filterThreePublicationFilterActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.publicationAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemFIlterOne () {
        const serviceResponse = await this.filterOnePublicationAllActions()
        if (serviceResponse.ok) {
          this.filterOne = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async getFilterTwo (id) {
        const serviceResponse = await this.filterTwoPublicationFilterActions(id)
        if (serviceResponse.ok) {
          this.filterTwo = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async getFilterThree (id) {
        const serviceResponse = await this.filterThreePublicationFilterActions(id)
        if (serviceResponse.ok) {
          this.filterThree = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedId = item.id
        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        this.loaderDialogDelete = true
        const serviceResponse = await this.publicationDeleteActions(this.editedId)
        if (serviceResponse.ok) {
          this.desserts.splice(this.editedIndex, 1)
          this.loaderDialogDelete = false
          this.closeDelete()
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.loaderDialogDelete = false
          this.closeDelete()
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        Object.assign(this.editedItem, item)
        this.editedId = item.id
        this.dialog = true
        if (this.editedItem.filter_one_publication_id) this.getFilterTwo(this.editedItem.filter_one_publication_id)
        if (this.editedItem.filter_two_publication_id) this.getFilterThree(this.editedItem.filter_two_publication_id)
      },
      async addItem () {
        this.loaderDialog = true
        if (this.editedIndex > -1) {
          console.log(this.editedItem)
          const formData = new FormData()
          formData.append('name', this.editedItem.name)
          formData.append('description', this.editedItem.description)
          formData.append('filter_one_publication_id', this.editedItem.filter_one_publication_id)
          formData.append('filter_two_publication_id', this.editedItem.filter_two_publication_id)
          formData.append('filter_three_publication_id', this.editedItem.filter_three_publication_id)
          formData.append('image_mini', this.editedItem.image_mini)
          formData.append('resource', this.editedItem.resource)
          formData.append('type_resource', this.editedItem.type_resource)

          const serviceResponse = await this.publicationUpdateActions(this.editedItem)
          if (serviceResponse.ok) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            this.loaderDialog = false
            this.close()
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.loaderDialog = false
            this.close()
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          // this.formatYoutube()
          console.log(this.editedItem)
          const formData = new FormData()
          formData.append('name', this.editedItem.name)
          formData.append('description', this.editedItem.description)
          formData.append('filter_one_publication_id', this.editedItem.filter_one_publication_id)
          formData.append('filter_two_publication_id', this.editedItem.filter_two_publication_id)
          formData.append('filter_three_publication_id', this.editedItem.filter_three_publication_id)
          formData.append('image_mini', this.editedItem.image_mini)
          formData.append('resource', this.editedItem.resource)
          formData.append('type_resource', this.editedItem.type_resource)
          const serviceResponse = await this.publicationPostActions(formData)
          if (serviceResponse.ok) {
            this.desserts.push(serviceResponse.data)
            this.loaderDialog = false
            this.close()
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.loaderDialog = false
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
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.editedId = undefined
        })
      },
      addResource () {
        this.editedItem.resources.push(this.defaultItem.resources[0])
      },
      deletedResource (val) {
        var index = this.editedItem.resources.indexOf(val)
        this.editedItem.resources.splice(index, 1)
      },
      formatYoutube () {
        if (this.editedItem.type_resource === 'video' && this.editedItem.resource.length > 11) {
          this.editedItem.resource = this.editedItem.resource.toString().split('').reverse().join('').slice(0, 11).split('').reverse().join('')
        }
      },
    },
  }
</script>
