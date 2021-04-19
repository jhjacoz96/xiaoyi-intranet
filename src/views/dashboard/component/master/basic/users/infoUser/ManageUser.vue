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
              Administrar usuario
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite la administración los usuarios del sistems
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
              <!-- <v-subheader>
                Personal médico
              </v-subheader>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.idTipoPersonal"
                    small
                    label="Tipos de personal médico"
                    item-text="nombre"
                    item-value="id"
                    :items="tipoPersonal"
                    outlined
                    dense
                    @change="showEspecialidad()"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-show="editedItem.showEspecialidad"
                    v-model="editedItem.idEspecialidad"
                    small
                    label="Tipos de especialidad"
                    item-text="nombre"
                    item-value="id"
                    :items="especialidad"
                    outlined
                    dense
                  />
                </v-col>
              </v-row> -->
              <v-subheader>
                Datos personales
              </v-subheader>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.nombre"
                    dense
                    outlined
                    label="Nombres"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.apellido"
                    dense
                    outlined
                    label="Apellidos"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.sexo"
                    small
                    label="Sexo"
                    item-text="nombre"
                    item-value="id"
                    :items="sexo"
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-menu
                    v-model="show2date"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="100px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.fechaNacimiento"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.fechaNacimiento"
                      @input="showDate = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                >
                  <v-select
                    v-model="editedItem.idTipoDocumento"
                    small
                    label="Tipo de documento"
                    item-text="nombre"
                    item-value="id"
                    :items="tipoDocumento"
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                >
                  <v-text-field
                    v-model="editedItem.cedula"
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
                    v-model="editedItem.telefono"
                    dense
                    outlined
                    label="Teléfono de contacto"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.provincia"
                    dense
                    outlined
                    label="Provincia"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.canton"
                    dense
                    outlined
                    label="Cantón"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.direccion"
                    dense
                    outlined
                    label="Dirección de vivienda"
                  />
                </v-col>
              </v-row>
              <v-subheader>
                Datos de usuario
              </v-subheader>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.correo"
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
              <div class="text-h6 font-weight-medium ">
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
  export default {
    data () {
      return {

        showDate: false,
        show2date: false,
        search: '',
        dialog: false,
        dialogDelete: false,
        e6: 1,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Cédula',
            value: 'cedula',
          },
          {
            text: 'Correo electrónico',
            value: 'correo',
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
            Nombre: 'Jhon Jairo',
            apellido: 'Contreras Diaz',
            sexo: 'm',
            cedula: '26378059',
            fechaNacimiento: '13/10/1996',
            telefono: '0414-9568372',
            provincial: 'fefe',
            canton: 'frfr',
            direccion: 'av. las delicias',
            correo: 'hola@test.com',
            idTipoPersonal: 1,
            idEspecialidad: 2,
            idTipoDocumento: 1,
            idRol: 1,
          },
        ],
        especialidad: [
          {
            nombre: 'Pediatra',
            id: 2,
          },
          {
            nombre: 'Ginecólogo',
            id: 1,
          },
        ],
        sexo: [
          {
            nombre: 'Masculino',
            id: 'm',
          },
          {
            nombre: 'Femenino',
            id: 'f',
          },
        ],
        tipoPersonal: [
          {
            nombre: 'Médico',
            id: 1,
            especialidad: true,
          },
          {
            nombre: 'Enfermera',
            id: 2,
            especialidad: false,
          },
        ],
        rol: [
          {
            nombre: 'Personal medico',
            id: 1,
          },
          {
            nombre: 'Paciente',
            id: 2,
          },
        ],
        tipoDocumento: [
          {
            nombre: 'V',
            id: 1,
          },
          {
            nombre: 'E',
            id: 2,
          },
        ],
        editedItem: {
          Nombre: '',
          apellido: '',
          sexo: '',
          fechaNacimiento: '',
          telefono: '',
          provincial: '',
          canton: '',
          direccion: '',
          correo: '',
          idTipoPersonal: null,
          showEspecialidad: false,
          idEspecialidad: null,
          idRol: null,
          idTipoDocumento: null,
        },
        defaultItem: {
          Nombre: '',
          apellido: '',
          sexo: '',
          fechaNacimiento: '',
          telefono: '',
          provincial: '',
          canton: '',
          direccion: '',
          correo: '',
          idTipoPersonal: null,
          idEspecialidad: null,
          showEspecialidad: false,
          idRol: null,
          idTipoDocumento: null,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar usuario' : 'Editar usuario'
      },
      d () {
        const tipoPersonal = this.tipoPersonal.find(item => item.id === this.editedItem.idTipoPersonal)
        return tipoPersonal.espedialidad
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
      showEspecialidad () {
        const tipoPersonal = this.tipoPersonal.find(item => item.id === this.editedItem.idTipoPersonal)
        this.editedItem.showEspecialidad = tipoPersonal.especialidad
        if (!tipoPersonal.especialidad) this.editedItem.idEspecialidad = null
      },
    },
  }
</script>
