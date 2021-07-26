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
              Configuración de permisos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite asignar permisos de acceso a cada rol registrado
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
              <span>Editar rol</span>
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
            <span class="text-h5">Configurar rol</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Nombre del rol"
                    dense
                    disabled
                    outlined
                  />
                </v-col>
              </v-row>
              <v-subheader>
                Asignar permisos
              </v-subheader>
              <v-row
                justify="space-around"
                class="mx-auto"
              >
                <v-col
                  v-for="(item, index) in permissions"
                  :key="index"
                  cols="12"
                  sm="6"
                >
                  <v-checkbox
                    v-model="editedItem.permissions"
                    :label="item.description"
                    :value="item.name"
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col
                  cols="12"
                >
                  <v-autocomplete
                    v-model="editedItem.permissions"
                    label="Permisos"
                    item-value="name"
                    item-text="description"
                    multiple
                    chips
                    :items="permissions"
                    :filter="permissionFilter"
                    outlined
                  />
                </v-col>
              </v-row> -->
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
            text: 'Roles',
            value: 'name',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
        permissions: [],
        editedItem: {
          name: '',
          permissions: [],
        },
        defaultItem: {
          name: '',
          permissions: [],
        },
      }
    },
    created () {
      this.listItem()
      this.listItemPermission()
    },
    methods: {
      ...mapActions('role', ['roleGetActions', 'rolePermissionAllActions', 'roleAllActions', 'roleAssignPermissionActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.roleAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPermission () {
        const serviceResponse = await this.rolePermissionAllActions()
        if (serviceResponse.ok) {
          this.permissions = serviceResponse.data
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
          const serviceResponse = await this.roleAssignPermissionActions(this.editedItem)
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
          const serviceResponse = await this.servicePostActions(this.editedItem)
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
      permissionFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
    },
  }
</script>
