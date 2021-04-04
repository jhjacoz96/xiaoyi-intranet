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
              Datos básicos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite Configurar la información básica referente al centro de salud
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-row>
          <v-col>
            <v-subheader>
              Centro de salud
            </v-subheader>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  dense
                  outlined
                  label="Institución del sistema"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  dense
                  outlined
                  label="Nombre de la unidad operativa"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  dense
                  outlined
                  label="Correo electrónico"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader>
              Ubicación
            </v-subheader>
            <v-row>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-select
                  small
                  dense
                  label="Provincia"
                  item-text="nombre"
                  item-value="id"
                  items=""
                  outlined
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-select
                  dense
                  small
                  label="Cantón"
                  item-text="nombre"
                  item-value="id"
                  items=""
                  outlined
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  dense
                  outlined
                  label="Parroquia"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  dense
                  outlined
                  label="Dirección"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <v-subheader>
              Filosofia de gestión
            </v-subheader>
            <v-row>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Misión"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Visión"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Objetivo"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
        >
          Actualizar
        </v-btn>
      </v-card-actions>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        nombre: '',
      }
    },
  }
</script>
