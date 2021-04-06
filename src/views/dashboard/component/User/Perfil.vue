<template>
  <div>
    <section class="section" />
    <v-container id="edit">
      <v-row class="justify-center">
        <v-col cols="8">
          <base-material-card
            class="arriba v-card-profile"
            :avatar="editedUser.image ? imageValue : 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'"
          >
            <v-card-text class="text-center">
              <h6 class="text-h4 mb-1 grey--text">
                Médico familiar
              </h6>
              <h4 class="text-h3 font-weight-light mb-3 black--text">
                Alec Thompson
              </h4>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(item, index) in items"
                  :key="index"
                  cols="12"
                  md="6"
                >
                  <base-item-list :item="item" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-speed-dial
              v-model="fab"
              :direction="direction"
              :open-on-hover="hover"
              :transition="transition"
              :top="top"
              :right="right"
              color="secondary"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="secondary"
                  dark
                  fab
                >
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    color="green"
                    v-bind="attrs"
                    v-on="on"
                    @click="editedItem()"
                  >
                    <v-icon>mdi-account-edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar perfil</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    fab
                    dark
                    small
                    color="indigo"
                    v-on="on"
                    @click="editedPassword()"
                  >
                    <v-icon>mdi-lock</v-icon>
                  </v-btn>
                </template>
                <span>Editar contraseña</span>
              </v-tooltip>
            </v-speed-dial>
            <input
              ref="file"
              type="file"
              class="d-none"
              @change="formatImage($event)"
            >
            <v-btn
              color="secondary"
              rounded
              elevation="4"
              absolute
              top
              left
              outlined
              icon
              @click="$refs.file.click()"
            >
              <v-icon>mdi-camera-plus</v-icon>
            </v-btn>
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar datos básicos</span>
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
                  v-model="editedUser.nombre"
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
                  v-model="editedUser.apellido"
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
                  v-model="editedUser.valueSexo"
                  small
                  label="Sexo"
                  item-text="nombre"
                  item-value="value"
                  :items="allSexo"
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
                      v-model="editedUser.fechaNacimiento"
                      label="Fecha de nacimiento"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedUser.fechaNacimiento"
                    @input="showDate = false"
                  />
                </v-menu>
              </v-col>
              <v-col
                cols="6"
                sm="3"
              >
                <v-select
                  v-model="editedUser.idTipoDocumento"
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
                  v-model="editedUser.cedula"
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
                  v-model="editedUser.telefono"
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
                  v-model="editedUser.correo"
                  dense
                  outlined
                  label="Correo electrónico"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="editedUser.provincia"
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
                  v-model="editedUser.canton"
                  dense
                  outlined
                  label="Cantón"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="editedUser.direccion"
                  dense
                  outlined
                  label="Dirección de vivienda"
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
      v-model="dialogPassword"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar contraseña</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="perfilPassword.oldPassword"
                  dense
                  outlined
                  label="Antigua contraseña"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="perfilPassword.newPassword"
                  dense
                  outlined
                  label="Nueva contraseña"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="perfilPassword.verifyPassword"
                  dense
                  outlined
                  label="Verificar contraseña"
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
            @click="closePassword()"
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hover: true,
        fab: true,
        bottom: false,
        right: true,
        top: true,
        left: false,
        direction: 'bottom',
        transition: 'slide-y-reverse-transition',
        show2date: false,
        showDate: false,
        dialog: false,
        dialogPassword: false,
        editedUser: {
          image: undefined,
          nombre: '',
          apellido: '',
          valueSexo: '',
          fechaNacimiento: '',
          cedula: '',
          telefono: '',
          provincia: '',
          idTipoDocumento: null,
          canton: '',
          direccion: '',
          correo: '',
        },
        defaultUser: {
          image: undefined,
          nombre: '',
          apellido: '',
          valueSexo: '',
          fechaNacimiento: '',
          cedula: '',
          telefono: '',
          provincia: '',
          idTipoDocumento: null,
          canton: '',
          direccion: '',
          correo: '',
        },
        perfil: {
          image: undefined,
          nombre: 'Jhon Jairo',
          apellido: 'Contreras Diaz',
          valueSexo: 'm',
          fechaNacimiento: '',
          telefono: '04149568372',
          provincia: 'zuay',
          cedula: '26378059',
          idTipoDocumento: 1,
          canton: 'paz',
          direccion: 'Av. Florencio Gimenez',
          correo: 'jhjacoz96@gmail.com',
        },
        perfilPassword: {
          oldPassword: '',
          newPassword: '',
          verifyPassword: '',
        },
        imageValue: undefined,
        allSexo: [
          {
            nombre: 'Masculino',
            value: 'm',
          },
          {
            nombre: 'Femenino',
            value: 'f',
          },
        ],
        tipoDocumento: [
          {
            nombre: 'Venezolano',
            id: 1,
          },
          {
            nombre: 'Extranjero',
            id: 2,
          },
        ],
      }
    },
    computed: {
      getSexo () {
        var sexo = this.allSexo.find(item => item.value === this.perfil.valueSexo)
        return sexo.nombre
      },
      getDocumento () {
        var tipo = this.tipoDocumento.find(item => item.id === this.perfil.idTipoDocumento)
        return tipo.nombre
      },
      centroSalud () {
        return {
          icon: 'mdi-36px mdi-hospital',
          title: 'Centro de salud',
          subtitle: 'Centro de salud 4 de Julio',
        }
      },
      institucion () {
        return {
          icon: 'mdi-36px mdi-hospital',
          title: 'Institución del sistema',
          subtitle: 'MSP',
        }
      },
      cedula () {
        return {
          icon: 'mdi-36px mdi-badge-account-horizontal',
          title: 'Cédula',
          subtitle: this.perfil.cedula,
        }
      },
      sexo () {
        return {
          icon: 'mdi-36px mdi-gender-male-female',
          title: 'Sexo',
          subtitle: this.getSexo,
        }
      },
      fechaNacimiento () {
        return {
          icon: 'mdi-36px mdi-phone',
          title: 'Fecha de nacimiento',
          subtitle: this.perfil.fechaNacimiento,
        }
      },
      provincia () {
        return {
          icon: 'mdi-36px mdi-city',
          title: 'Provincia',
          subtitle: this.perfil.provincia,
        }
      },
      canton () {
        return {
          icon: 'mdi-36px mdi-city',
          title: 'Cantón',
          subtitle: this.perfil.canton,
        }
      },
      direccion () {
        return {
          icon: 'mdi-36px mdi-map',
          title: 'Dirección',
          subtitle: this.perfil.direccion,
        }
      },
      Telefono () {
        return {
          icon: 'mdi-36px mdi-phone',
          title: 'éelefono',
          subtitle: this.perfil.telefono,
        }
      },
      items () {
        return [
          this.centroSalud,
          this.institucion,
          this.cedula,
          this.sexo,
          this.fechaNacimiento,
          this.provincia,
          this.canton,
          this.direccion,
        ]
      },
    },
    methods: {
      formatImage (val) {
        this.editedUser.image = val.target.files[0]
        this.imageValue = URL.createObjectURL(this.editedUser.image)
      },
      editedItem () {
        Object.assign(this.editedUser, this.perfil)
        this.dialog = true
      },
      addItem () {
        Object.assign(this.perfil, this.editedUser)
        this.close()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultUser)
        })
      },
      closePassword () {
        this.dialogPassword = false
      },
      editedPassword () {
        this.dialogPassword = true
      },
    },
  }
</script>

<style>
  .arriba{
      position: relative;
      top: -80px;
      margin-bottom: -32px;
  }

    .section {
      height: 250px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      background-image: url( '../../../../assets/login.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
      filter:  brightness(0.4);
   }

    #edit .v-speed-dial {
    position: absolute;
  }

  #edit .v-btn--floating {
    position: relative;
  }

</style>
