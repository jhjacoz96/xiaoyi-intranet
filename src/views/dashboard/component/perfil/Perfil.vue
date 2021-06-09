<template>
  <div>
    <section class="section" />
    <v-container id="edit">
      <v-row class="justify-center">
        <v-col cols="8">
          <base-material-card
            class="arriba v-card-profile"
            :avatar="perfil.image ? `${$store.state.urlApi}/${perfil.image.url}` : 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'"
          >
            <v-card-text class="text-center">
              <h6 class="text-h4 mb-1 grey--text">
                {{ perfil.type_employee_id }}
              </h6>
              <h4 class="text-h3 font-weight-light mb-3 black--text">
                {{ perfil.name }}
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
            <!-- <v-speed-dial
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
                    @click="dialogPassword = true"
                  >
                    <v-icon>mdi-lock</v-icon>
                  </v-btn>
                </template>
                <span>Editar contraseña</span>
              </v-tooltip>
            </v-speed-dial> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  fab
                  dark
                  absolute
                  top
                  right
                  color="secondary"
                  v-on="on"
                  @click="dialogPassword = true"
                >
                  <v-icon>mdi-lock</v-icon>
                </v-btn>
              </template>
              <span>Editar contraseña</span>
            </v-tooltip>
            <input
              ref="file"
              type="file"
              class="d-none"
              @change="formatImage($event)"
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  elevation="4"
                  absolute
                  dark
                  fab
                  top
                  left
                  @click="$refs.file.click()"
                >
                  <v-icon>mdi-camera-plus</v-icon>
                </v-btn>
              </template>
              <span>Cambiar foto de perfil</span>
            </v-tooltip>
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
            <v-form
              ref="form1"
              v-model="valid1"
              lazy-validation
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="perfilPassword.passwordOld"
                    dense
                    outlined
                    prepend-icon="mdi-ock"
                    type="password"
                    :rules="[
                      v => !!v || 'La contraseña es requerida',
                      v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres'
                    ]"
                    counter
                    required
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
                    v-model="perfilPassword.password"
                    dense
                    outlined
                    label="Nueva contraseña"
                    prepend-icon="lock"
                    type="password"
                    :rules="[
                      v => !!v || 'La contraseña es requerida',
                      v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres']"
                    required
                    counter
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="perfilPassword.passwordVerify"
                    dense
                    outlined
                    label="Verificar contraseña"
                    prepend-icon="lock"
                    type="password"
                    :rules="[
                      v => !!v || 'La contraseña es requerida', confirmacionPassword,
                      v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres']"
                    required
                    counter
                  />
                </v-col>
              </v-row>
              {{ valid1 }}
            </v-form>
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
            :loading="loadingPassword"
            :disabled="loadingPassword || !valid1"
            color="primary"
            text
            @click="updatePassword()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {
    employeeAvatarApi,
    employePasswordUpdateApi,
    webOrganizationAllApi,
  } from '@/api/modules'
  import {
    mapMutations,
    mapState,
  } from 'vuex'
  export default {
    data () {
      return {
        hover: true,
        fab: true,
        bottom: false,
        right: true,
        top: true,
        left: false,
        valid1: false,
        loadingPassword: false,
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
          passwordOld: '',
          password: '',
          passwordVerify: '',
        },
        defaultPerfilPassword: {
          passwordOld: '',
          password: '',
          passwordVerify: '',
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
        organization: null,
      }
    },
    computed: {
      ...mapState('auth', ['user']),
      confirmacionPassword () {
        return (
          this.perfilPassword.password === this.perfilPassword.passwordVerify ||
          'La contraseña no coinciden'
        )
      },
      centroSalud () {
        return {
          icon: 'mdi-36px mdi-hospital',
          title: 'Centro de salud',
          subtitle: this.organization.name,
        }
      },
      institucion () {
        return {
          icon: 'mdi-36px mdi-hospital',
          title: 'Institución del sistema',
          subtitle: this.organization.institution.name,
        }
      },
      cedula () {
        return {
          icon: 'mdi-36px mdi-badge-account-horizontal',
          title: 'Cédula',
          subtitle: this.perfil.document,
        }
      },
      sexo () {
        return {
          icon: 'mdi-36px mdi-gender-male-female',
          title: 'Sexo',
          subtitle: this.perfil.gender_id,
        }
      },
      provincia () {
        return {
          icon: 'mdi-36px mdi-city',
          title: 'Provincia',
          subtitle: this.perfil.province_id,
        }
      },
      canton () {
        return {
          icon: 'mdi-36px mdi-city',
          title: 'Cantón',
          subtitle: this.perfil.canton_id,
        }
      },
      direccion () {
        return {
          icon: 'mdi-36px mdi-map',
          title: 'Dirección',
          subtitle: this.perfil.address,
        }
      },
      telefono () {
        return {
          icon: 'mdi-36px mdi-phone',
          title: 'Telefono',
          subtitle: this.perfil.phone,
        }
      },
      correo () {
        return {
          icon: 'mdi-36px mdi-email',
          title: 'Correo electróico',
          subtitle: this.perfil.email,
        }
      },
      items () {
        return [
          this.centroSalud,
          this.institucion,
          this.cedula,
          this.sexo,
          this.provincia,
          this.canton,
          this.direccion,
          this.correo,
        ]
      },
    },
    watch: {
      dialogPassword (val) {
        val || this.closePassword()
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapMutations('auth', ['assignAvatar']),
      formatImage (val) {
        this.editedUser.image = val.target.files[0]
        this.imageValue = URL.createObjectURL(this.editedUser.image)
        this.updateAvatar()
      },
      async listItem () {
        const serviceResponse = await webOrganizationAllApi()
        if (serviceResponse.ok) {
          this.organization = serviceResponse.data
          this.perfil = Object.assign({}, this.user.employee)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        Object(this.perfil, this.user.employee)
      },
      async updateAvatar () {
        const formData = new FormData()
        formData.append('image', this.editedUser.image)
        const serviceResponse = await employeeAvatarApi(formData, this.user.employee.id)
        if (serviceResponse.ok) {
          var avatar = serviceResponse.data.image.url
          this.assignAvatar(avatar)
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async updatePassword () {
        this.loadingPassword = true
        const serviceResponse = await employePasswordUpdateApi(this.perfilPassword)
        if (serviceResponse.ok) {
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.closePassword()
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
        this.$nextTick(() => {
          this.dialogPassword = false
          this.loadingPassword = false
          this.perfilPassword = Object.assign({}, this.defaultPerfilPassword)
        })
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
