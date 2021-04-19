<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Evaluar sugerencias y comentarios
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite evaluar las sugerencias y comentarios hechos por desde el portal web
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.estado="{ item }">
            <v-chip
              v-if="item.estado"
              color="success"
              outlined
            >
              <span>Evaluado</span>
            </v-chip>
            <v-chip
              v-else
              outlined
              color="warning"
            >
              <span>Pendiente</span>
            </v-chip>
          </template>
          <template v-slot:item.accion="{ item }">
            <input
              type="text"
              :value="item"
              class="d-none"
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="warning"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="dialog = !dialog"
                >
                  <v-icon>mdi-file</v-icon>
                </v-btn>
              </template>
              <span>Evaluar sugerencia</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Evaluar sugerencias y comentarios</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row justify="center">
              <v-col
                cols="3"
                md="5"
              >
                <span
                  class="font-weight-medium"
                  v-text="'Nombre'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="'Jhon Contreras'"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="3"
                md="5"
              >
                <span
                  class="font-weight-medium"
                  v-text="'Correo electrónico'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="'zka22@gmial.com'"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="3"
                md="5"
              >
                <span
                  class="font-weight-medium"
                  v-text="'Fechas'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="'02/01/2021'"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="3"
                md="5"
              >
                <span
                  class="font-weight-medium"
                  v-text="'Descripción'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="'Descripciónt test'"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  label="Responder sugerencia ó comentario"
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
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          { text: 'Nombre', sortable: false, value: 'nombre' },
          { text: 'Fecha', sortable: false, value: 'fecha' },
          { text: 'Estado', sortable: false, value: 'estado' },
          { text: 'Acción', sortable: false, align: 'center', value: 'accion' },
        ],
        desserts: [
          {
            nombre: 'Jhon Contreras',
            estado: true,
            fecha: '02/01/2021',
          },
          {
            nombre: 'Albert Acevedo',
            estado: false,
            fecha: '05/01/2021',
          },
        ],
      }
    },
  }
</script>
