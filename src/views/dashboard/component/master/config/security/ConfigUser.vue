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
              Configuración usuarios
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite asignar tipo de empleado, especialidad y roles a los usuarios
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
          <template v-slot:item.rol="{ item }">
            <v-template v-if="item.rol">
              {{ item.rol }}
            </v-template>
            <v-template v-else>
              Sin registro
            </v-template>
          </template>
          <template v-slot:item.typeEmployee="{ item }">
            <v-template v-if="item.typeEmployee">
              {{ item.typeEmployee }}
            </v-template>
            <v-template v-else>
              Sin registro
            </v-template>
          </template>
          <template v-slot:item.specialty="{ item }">
            <v-template v-if="item.specialty">
              {{ item.specialty }}
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
              <span>Editar usuario</span>
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
            <span class="text-h5">Configurar usuario</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Nombre del usuario"
                    dense
                    disabled
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.ci"
                    label="Cédula del usuario"
                    dense
                    disabled
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.rol"
                    label="Rol"
                    outlined
                    :items="rol"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.typeEmployee"
                    label="Tipo de empleado"
                    outlined
                    :items="typeEmployee"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="editedItem.specialty"
                    label="Especialidad"
                    outlined
                    :items="specialty"
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
            text: 'Nombre y apellido',
            value: 'name',
          },
          {
            text: 'Cédula',
            value: 'ci',
          },
          {
            text: 'Tipo de empleado',
            value: 'typeEmployee',
          },
          {
            text: 'Especialidad',
            value: 'specialty',
          },
          {
            text: 'Rol',
            value: 'rol',
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
            name: 'Asdrubal Gutierrez',
            ci: '26378059',
            typeEmployee: 'Director',
            specialty: 'Pediatra',
          },
          {
            name: 'Micaela Gutierrez',
            ci: '26378059',
            typeEmployee: 'Doctora',
            specialty: undefined,
          },
          {
            name: 'Marisol Gutierrez',
            ci: '26378059',
            typeEmployee: 'Enfermera',
            specialty: undefined,
          },
        ],
        typeEmployee: ['Enfermera', 'doctor', 'Director', 'Secreataria'],
        rol: ['Enfermera', 'Doctor', 'Administrdor', 'Pasante'],
        specialty: ['Pediatra', 'Neonatología', 'Obstetricia'],
        editedItem: {
          name: '',
          typeEmployee: undefined,
          rol: undefined,
          especialidad: undefined,
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
