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
              Configurar empleados
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite asignar tipo de empleado, especialidad y roles a los empleados
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
              <span>Editar empleado</span>
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
            <span class="text-h5">Configurar empleado</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.role_id"
                    label="Rol"
                    outlined
                    :items="rol"
                    item-text="name"
                    item-value="name"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.type_employee_id"
                    label="Tipo de empleado"
                    outlined
                    :items="typeEmployee"
                    item-text="name"
                    item-value="id"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.specialty_id"
                    label="Especialidad"
                    outlined
                    :items="specialty"
                    item-text="name"
                    item-value="id"
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
            text: 'Nombre y apellido',
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
        typeEmployee: [],
        rol: [],
        specialty: [],
        editedItem: {
          id: undefined,
          type_employee_id: undefined,
          role_id: undefined,
          specialty_id: undefined,
        },
        defaultItem: {
          id: undefined,
          type_employee_id: undefined,
          role_id: undefined,
          specialty_id: undefined,
        },
      }
    },
    created () {
      this.listItem()
      this.listItemRole()
      this.listItemTypeEmployee()
      this.listItemSpecialty()
    },
    methods: {
      ...mapActions('employee', ['employeeGetActions', 'employeeAllActions', 'employeeUpdateActions']),
      ...mapActions('role', ['roleGetActions', 'roleAllActions']),
      ...mapActions('typeEmployee', ['typeEmployeeAllActions']),
      ...mapActions('specialty', ['specialtyAllActions']),
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
      async listItemRole () {
        const serviceResponse = await this.roleAllActions()
        if (serviceResponse.ok) {
          this.rol = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemTypeEmployee () {
        const serviceResponse = await this.typeEmployeeAllActions()
        if (serviceResponse.ok) {
          this.typeEmployee = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemSpecialty () {
        const serviceResponse = await this.specialtyAllActions()
        if (serviceResponse.ok) {
          this.specialty = serviceResponse.data
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
    },
  }
</script>
