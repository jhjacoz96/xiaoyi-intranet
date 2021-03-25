<template>
  <v-app>
    <span class="bg" />
    <span class="bgColor" />
    <v-content>
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
            <v-fade-transition mode="out-in">
              <v-card
                elevation="5"
                class="rounded-xl pa-5"
              >
                <v-card-text>
                  <v-img
                    class="ma-auto"
                    max-width="150"
                    src="@/assets/logo2.png"
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
                <v-text-title class="text-center">
                  <div class="d-5">
                    Inicia sesión con tus credencales
                  </div>
                </v-text-title>
                <v-card-text>
                  <v-form
                    ref="form1"
                    v-model="valid1"
                    lazy-validation
                  >
                    <v-text-field
                      label="Usuario"
                      rounded
                      dense
                      filled
                      name="username"
                      prepend-icon="mdi-account"
                      type="text"
                      color="primary"
                    />
                    <v-text-field
                      id="password"
                      filled
                      rounded
                      dense
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      :type="show ? 'text' : 'password'"
                      color="primary"
                      :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="show = !show"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    rounded
                    color="primary"
                    :loading="loading"
                    :disabled="loading"
                    @click="session"
                  >
                    Iniciar sesión
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-fade-transition>
          </v-col>
        </v-row>
        <base-alert />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        loading: false,
      }
    },
    methods: {
      session () {
        this.loading = true
        setTimeout(() => (this.loading = false), 3000)
        this.$router.push('/intranet')
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
    background: url( '../assets/fondo.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    /* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,63,133,1) 29%, rgba(0,212,255,1) 100%); */
  }
  .bgColor {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
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
