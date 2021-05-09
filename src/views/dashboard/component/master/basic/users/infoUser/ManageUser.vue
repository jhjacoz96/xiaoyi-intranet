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
              Administrar empleado
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite la administración de los empleados del centro de salud
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
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-subheader>
                Datos personales
              </v-subheader>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    dense
                    outlined
                    label="Nombres"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.gender_id"
                    small
                    label="Género"
                    item-text="nombre"
                    item-value="id"
                    :items="gender"
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                >
                  <v-select
                    v-model="editedItem.type_document_id"
                    small
                    label="Tipo de documento"
                    item-text="nombre"
                    item-value="id"
                    :items="typeDocument"
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                >
                  <v-text-field
                    v-model="editedItem.document"
                    dense
                    outlined
                    label="Cédula"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.phone"
                    dense
                    outlined
                    label="Teléfono de contacto"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    v-model="editedItem.province_id"
                    :items="province"
                    :filter="provinceFilter"
                    item-value="id"
                    item-text="name"
                    label="Provincia"
                    outlined
                    dense
                    @change="findCanton($event)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    v-model="editedItem.canton_id"
                    label="Cantón"
                    item-value="id"
                    item-text="name"
                    :items="canton"
                    :filter="cantonFilter"
                    :disabled="canton.length > 0 ? false : true"
                    dense
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.address"
                    dense
                    outlined
                    label="Dirección de vivienda"
                  />
                </v-col>
              </v-row>
              <v-subheader v-if="editedIndex === -1">
                Datos de usuario
              </v-subheader>
              <v-row v-if="editedIndex === -1">
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.email"
                    dense
                    outlined
                    label="Correo electrónico"
                  />
                </v-col>
                <!-- <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.idRol"
                    small
                    label="Rol"
                    item-text="nombre"
                    item-value="id"
                    :items="rol"
                    outlined
                    dense
                  />
                </v-col> -->
              </v-row>
              <div
                v-if="editedIndex === -1"
                class="text-h6 font-weight-medium "
              >
                Una vez el usuario sea registrado, se le enviará una contraseña temporal a su correo. Está podrá ser modificada en su perfil
              </div>
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
        editedId: undefined,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre',
            value: 'name',
          },
          {
            text: 'Cédula',
            value: 'document',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
        gender: [],
        province: [],
        canton: [],
        typeDocument: [],
        editedItem: {
          name: '',
          phone: '',
          document: '',
          address: '',
          gender_id: undefined,
          canton_id: undefined,
          province_id: undefined,
          email: '',
          type_document_id: undefined,
        },
        defaultItem: {
          name: '',
          phone: '',
          document: '',
          address: '',
          gender_id: undefined,
          canton_id: undefined,
          province_id: undefined,
          email: '',
          type_document_id: undefined,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar usuario' : 'Editar usuario'
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
      this.listItemGender()
      this.listItemTypeDocument()
      this.listProvince()
    },
    methods: {
      ...mapActions('employee', ['employeePostActions', 'employeeAllActions', 'employeeDeleteActions', 'employeeGetActions', 'employeeUpdateActions']),
      ...mapActions('gender', ['genderAllActions']),
      ...mapActions('zone', ['provinceAllActions', 'cantonFindActions']),
      ...mapActions('typeDocument', ['typeDocumentAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.employeeAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGender () {
        const serviceResponse = await this.genderAllActions()
        if (serviceResponse.ok) {
          this.gender = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemTypeDocument () {
        const serviceResponse = await this.typeDocumentAllActions()
        if (serviceResponse.ok) {
          this.typeDocument = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listProvince () {
        const serviceResponse = await this.provinceAllActions()
        if (serviceResponse.ok) {
          this.province = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async findCanton (val) {
        const serviceResponse = await this.cantonFindActions(val)
        if (serviceResponse.ok) {
          this.canton = serviceResponse.data
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
        const serviceResponse = await this.employeeDeleteActions(this.editedId)
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
          const serviceResponse = await this.employeeUpdateActions(this.editedItem)
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
          const serviceResponse = await this.employeePostActions(this.editedItem)
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
      provinceFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
      cantonFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
    },
  }
</script>
