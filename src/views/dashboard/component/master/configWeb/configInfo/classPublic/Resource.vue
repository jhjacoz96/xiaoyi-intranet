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
              Recursos multimedias
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite gestionar los recursos multimedias
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
          <template v-slot:item.imagen="{ item }">
            <v-img
              :src="item.imagen"
              width="60"
            />
          </template>
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
        max-width="500px"
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

          <v-card-text id="create">
            <v-container>
              <v-row class="justify-end">
                ->
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Nombre del recurso"
                    dense
                    outlined
                  />
                </v-col>
                <template v-if="editedIndex === -1">
                  <v-col
                    cols="12"
                  >
                    <v-speed-dial
                      v-model="fab"
                      :direction="direction"
                      :open-on-hover="hover"
                      :transition="transition"
                    >
                      <template v-slot:activator>
                        <v-btn
                          v-model="fab"
                          color="blue darken-2"
                          dark
                          fab
                        >
                          <v-icon v-if="fab">
                            mdi-close
                          </v-icon>
                          <v-icon v-else>
                            mdi-cloud-upload
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-btn
                        fab
                        dark
                        small
                        color="green"
                        @click="selectFormat('image')"
                      >
                        <v-icon>mdi-image</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="indigo"
                        @click="selectFormat('document')"
                      >
                        <v-icon>mdi-file-document</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="red"
                        @click="selectFormat('video')"
                      >
                        <v-icon>mdi-youtube</v-icon>
                      </v-btn>
                    </v-speed-dial>
                    <v-file-input
                      v-if="editedItem.format==='document' || editedItem.format=== 'image'"
                      v-model="editedItem.resource"
                      :label="editedItem.format === 'document' ? 'seleccione el resource' : 'Seleccione la imagen'"
                      outlined
                      dense
                      class="ml-16"
                    />
                    <v-text-field
                      v-if="editedItem.format==='video'"
                      v-model="editedItem.resource"
                      label="Ingrese el link de video de youtube"
                      outlined
                      dense
                      class="ml-16"
                    />
                  </v-col>
                </template>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editedItem.descripcion"
                    label="Descripción"
                    outlined
                    name="input-7-4"
                  />
                </v-col>
                <v-col
                  cols="12"
                />
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
        direction: 'bottom',
        hover: true,
        fab: true,
        transition: 'slide-y-reverse-transition',
        bottom: true,
        right: true,
        format: '',
        search: '',
        dialog: false,
        dialogDelete: false,
        imagen: null,
        resource: 'undefined',
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre',
            value: 'name',
          },
          {
            text: 'Descripción',
            value: 'descripcion',
          },
          {
            text: 'Formato',
            value: 'format',
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
            name: 'Infografia de curas de adulto mayor',
            descripcion: 'test descripcion',
            format: 'image',
          },
          {
            name: 'Video de adultos mayores y el covid',
            descripcion: 'test descripcion',
            format: 'video',
          },
        ],
        editedItem: {
          name: '',
          descripcion: '',
          format: '',
          resource: null,
        },
        defaultItem: {
          name: '',
          descripcion: '',
          format: '',
          resource: null,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar recuso' : 'Editar recurso'
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
      //   enableType (item) {
      //     const index = this.desserts.indexOf(item)
      //     this.desserts[index].viewType = !item.viewType
      //   },
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
          if (this.editedItem.format === 'video') this.editedItem.resorce = this.editedItem.resource.toString().split('').reverse().join('').slice(0, 11).split('').reverse().join('')
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
      selectFormat (val) {
        this.editedItem.format = val
        this.editedItem.resource = null
      },
    },
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
    top: 20%;
    left: 10;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
