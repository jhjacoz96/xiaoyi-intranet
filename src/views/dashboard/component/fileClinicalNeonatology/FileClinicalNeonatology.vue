<template>
  <v-container fluid>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Ficha clínica de neonatología
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite administrar las fichas clinicas de neonatología
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="3">
            <base-item-master
              title="Control y seguimiento"
              icon="mdi-36px mdi-36px mdi-clipboard-pulse"
              to="ficha-clinica-neonatologia/seguimiento"
            />
          </v-col>
          <v-col cols="3">
            <v-template @click="dialog = !dialog">
              <base-item-master
                title="Nuevo registro"
                icon="mdi-36px mdi-36px mdi-file-document-edit"
              />
            </v-template>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog
        v-model="dialog"
        max-width="500"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Virificar paciente</span>
          </v-card-title>
          <v-card-text>
            <v-alert
              border="bottom"
              colored-border
              type="info"
              elevation="2"
            >
              Para poder registrar una nueva ficha clinica de neonatología, se debe verificar que la madre del neonato tenga un registo de una ficha clinica de obstetricia.
            </v-alert>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="cedula"
                    label="Número de cédula"
                    outlined
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
              @click="close"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              text
              :diasabled="loading"
              :loading="loading"
              @click="fileObstetricc()"
            >
              Verificar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </base-material-card>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        editedIndex: -1,
        cedula: '',
        loading: false,
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['fileObstetric', 'miembro']),
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricCheckActions']),
      ...mapMutations('fileClinicalNeonatology', ['setMiembro']),
      ...mapMutations(['alert']),
      async fileObstetricc () {
        this.loading = true
        const serviceResponse = await this.fileClinicalObstetricCheckActions(this.cedula)
        if (serviceResponse.ok) {
          this.setMiembro(serviceResponse.data)
          this.$router.push('/intranet/ficha-clinica-neonatologia/agregar')
          this.loading = false
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
          this.loading = false
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.loading = false
          this.editedIndex = -1
        })
      },
    },
  }
</script>
