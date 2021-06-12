<template>
  <v-container>
    <v-card-title>
      <!-- Nutrition
      <v-spacer /> -->
      <v-col
        md="6"
        sm="6"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
      <template v-slot:item.imagen="{ item }">
        <v-img
          v-if="item.image"
          :src="item.image.url"
          width="60"
        />
      </template>
      <template v-slot:item.accion="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              x-small
              color="info"
              v-bind="attrs"
              v-on="on"
              @click="edited(item)"
            >
              <v-icon>{{ item.view_web ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.view_web ? 'Mostrado' : 'Mostrar' }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
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
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="editedConfirm"
          >
            Editar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        editedIndex: undefined,
        editedId: undefined,
        headers: [
          {
            text: 'Imagen',
            align: 'center',
            sortable: false,
            value: 'imagen',
          },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Descripción',
            value: 'descripcion',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
        editedItem: {
          id: undefined,
          nombre: '',
          descripcion: '',
          view_web: undefined,
        },
        defaultItem: {
          id: undefined,
          nombre: '',
          descripcion: '',
          view_web: undefined,
        },
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('service', ['servicePostActions', 'serviceAllActions', 'serviceDeleteActions', 'serviceGetActions', 'serviceUpdateActions', 'provinceAllActions', 'cantonFindActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.serviceAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
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
          this.editedId = undefined
        })
      },
      async edited (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem.id = item.id
        this.editedItem.nombre = item.nombre
        this.editedItem.descripcion = item.descripcion
        this.editedItem.view_web = item.view_web
        this.editedId = item.id
        this.dialog = true
      },
      async editedConfirm () {
        this.editedItem.view_web = !this.editedItem.view_web
        const serviceResponse = await this.serviceUpdateActions(this.editedItem)
        if (serviceResponse.ok) {
          Object.assign(this.desserts[this.editedIndex], serviceResponse.data)
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
    },
  }
</script>
