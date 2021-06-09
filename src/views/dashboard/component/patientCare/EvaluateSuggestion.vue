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
              v-if="item.respuesta"
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
          <template v-slot:item.created_at="{ item }">
            {{ moment(item.created_at).locale('es').fromNow() }}
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
                  @click="editItem(item)"
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
                  v-text="editedItem.nombre"
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
                  v-text="editedItem.correo"
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
                  v-text="'Fecha'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="moment(editedItem.created_at).locale('es').fromNow()"
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
                  v-text="'Tipo de comentario'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="editedItem.typeComment.nombre"
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
                  v-text="'Comentario'"
                />
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <span
                  class="tim-note"
                  v-text="editedItem.pregunta"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="editedItem.respuesta"
                  label="Respuesta"
                  outlined
                />
              </v-col>
            </v-row>
            <v-alert
              border="top"
              colored-border
              type="info"
              elevation="2"
            >
              Su respuesta será enviada al correo del usuario.
            </v-alert>
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
            :disabled="loading"
            :loading="loading"
            color="primary"
            text
            @click="addItem()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {
    mapMutations,
  } from 'vuex'
  import {
    commentUpdateApi,
    commentAllApi,
    typeCommentAllApi,
  } from '@/api/modules'
  export default {
    data () {
      return {
        loading: false,
        dialog: false,
        search: '',
        headers: [
          { text: 'Nombre', sortable: false, value: 'nombre' },
          { text: 'Tipo de comentario', sortable: false, value: 'typeComment.nombre' },
          { text: 'Estado', sortable: false, value: 'estado' },
          { text: 'Fecha', sortable: false, value: 'created_at' },
          { text: 'Acción', sortable: false, align: 'center', value: 'accion' },
        ],
        desserts: [],
        typeComment: [],
        editedItem: {
          nombre: '',
          correo: '',
          pregunta: '',
          respuesta: '',
          type_comment_id: null,
          typeComment: {
            nombre: '',
          },
          id: null,
        },
        defaultItem: {
          nombre: '',
          correo: '',
          pregunta: '',
          respuesta: '',
          type_comment_id: null,
          typeComment: null,
          id: null,
        },
      }
    },
    created () {
      this.listItem()
      this.listItemTypeComment()
    },
    methods: {
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await commentAllApi()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemTypeComment () {
        const serviceResponse = await typeCommentAllApi()
        if (serviceResponse.ok) {
          this.typeComment = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async addItem () {
        this.loading = true
        const serviceResponse = await commentUpdateApi(this.editedItem, this.editedItem.id)
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
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.loading = false
        })
      },
    },
  }
</script>
