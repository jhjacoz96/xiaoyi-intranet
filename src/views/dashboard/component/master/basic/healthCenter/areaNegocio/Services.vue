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
              Servicios asistenciales
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite gestionar los servicios asistenciales que ofrece el centro de salud
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
          <template v-slot:item.image_service="{ item }">
            <v-img
              v-if="item.image"
              :src="`${$store.state.urlImageApi}${item.image.url}`"
              width="60"
            />
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
        max-width="500px"
      >
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
                <v-col
                  cols="12"
                >
                  <base-preview-image
                    :image="typeof editedItem.image_service === 'object' ? editedItem.image_service.url : editedItem.image_service"
                    @imagen="editedItem.image_service = $event"
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
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        dialogDelete: false,
        image_service: null,
        editedId: undefined,
        editedIndex: -1,
        services: [],
        headers: [
          {
            text: 'Servicio',
            align: 'center',
            sortable: false,
            value: 'image_service',
          },
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
        desserts: [],
        editedItem: {
          id: undefined,
          nombre: '',
          descripcion: '',
          image_service: undefined,
        },
        defaultItem: {
          id: undefined,
          nombre: '',
          descripcion: '',
          image_service: undefined,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar servicio' : 'Editar servicio'
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
    },
    methods: {
      ...mapActions('service', ['servicePostActions', 'serviceAllActions', 'serviceDeleteActions', 'serviceGetActions', 'serviceUpdateActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.serviceAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
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
        const serviceResponse = await this.serviceDeleteActions(this.editedId)
        if (serviceResponse.ok) {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.closeDelete()
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
          const formData = new FormData()
          formData.append('id', this.editedItem.id)
          formData.append('nombre', this.editedItem.nombre)
          formData.append('descripcion', this.editedItem.descripcion)
          formData.append('image_service', typeof this.editedItem.image_service === 'string' ? null : this.editedItem.image_service)
          const serviceResponse = await this.serviceUpdateActions(formData)
          console.log(serviceResponse)
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
        } else {
          const formData = new FormData()
          formData.append('nombre', this.editedItem.nombre)
          formData.append('descripcion', this.editedItem.descripcion)
          formData.append('image_service', typeof this.editedItem.image_service === 'string' ? null : this.editedItem.image_service)
          const serviceResponse = await this.servicePostActions(formData)
          if (serviceResponse.ok) {
            this.desserts.push(serviceResponse.data)
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
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.editedId = undefined
        })
      },
    },
  }
</script>
