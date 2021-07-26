<template>
  <v-app>
    <span class="bg" />
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
        >
          <v-col
            cols="8"
            sm="6"
            md="5"
            lg="3"
            xl="3"
          >
            <!-- <v-fade-transition mode="out-in"> -->
            <v-slide-y-transition>
              <v-card
                elevation="5"
                class="rounded-xl pa-5"
              >
                <v-card-text>
                  <v-img
                    class="ma-auto"
                    max-width="150"
                    src="@/assets/logo3.png"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card-text>
                <v-card-text class="text-center">
                  Ingresa tu nueva contraseña
                </v-card-text>
                <v-card-text>
                  <v-form
                    ref="form1"
                    v-model="valid1"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="usuario.email"
                      :rules="emailRules"
                      label="Correo electrónico"
                      rounded
                      dense
                      filled
                      name=""
                      prepend-icon="mdi-account"
                      type="text"
                      color="primary"
                    />
                    <v-text-field
                      v-model="usuario.password"
                      :rules="passwordRules"
                      filled
                      rounded
                      dense
                      label="Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      :type="show ? 'text' : 'password'"
                      color="primary"
                      :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="show = !show"
                    />
                    <v-text-field
                      v-model="usuario.password_confirm"
                      :rules="[
                        v => !!v || 'La contraseña es requerida',
                        v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres',
                        confirmacionPassword]"
                      filled
                      rounded
                      dense
                      label="COnfirmar contraseña"
                      prepend-icon="mdi-lock"
                      type="password"
                      required
                      :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="show1 = !show1"
                    />
                  </v-form>
                </v-card-text>
                <v-card-text class="text-center">
                  <router-link to="/">
                    Iniciar sesión
                  </router-link>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    rounded
                    class="elevation-4"
                    color="primary"
                    :disabled="loading"
                    :loading="loading"
                    @click="reset()"
                  >
                    Cambiar contraseña
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </v-row>
        <base-alert />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  export default {
    data () {
      return {
        valid1: false,
        show: false,
        show1: false,
        loading: false,
        usuario: {
          email: '',
          password: '',
          password_confirm: '',
          token: '',
        },
        emailRules: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+/.test(v) || 'El correo no es valido',
        ],
        passwordRules: [
          v => !!v || 'La contraseña es requerida',
          v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres',
          this.confirmacionPassword,
        ],
      }
    },
    computed: {
      confirmacionPassword () {
        return (
          this.usuario.password === this.usuario.password_confirm ||
          'La contraseña no coinciden'
        )
      },
    },
    mounted () {
      if (this.$route.query.token) this.usuario.token = this.$route.query.token
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('auth', ['resetAction']),
      async reset () {
        this.loading = true
        if (this.$refs.form1.validate()) {
          const serviceResponse = await this.resetAction(this.usuario)
          if (serviceResponse.ok) {
            this.$router.push('/').catch(() => {})
            this.loading = false
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
            this.loading = false
          }
          this.loading = false
        } else {
          this.alert({
            text: 'Campos incompletos',
            color: 'warning',
          })
          this.loading = false
        }
      },
    },
  }
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    background-image: url( '../assets/fondo.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    filter:  brightness(0.4);
    /* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,63,133,1) 29%, rgba(0,212,255,1) 100%); */
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
