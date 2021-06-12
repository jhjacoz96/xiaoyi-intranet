<template>
  <v-card
    color="basil"
    flat
  >
    <v-card-text class="text-h5">
      Ingrese la información referente al carrusel
    </v-card-text>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        enctype="multipart/form-data"
        class="mt-2"
      >
        <v-row>
          <v-col
            md="6"
            sm="6"
            cols="12"
          >
            <v-text-field
              v-model="editedItem.title"
              outlined
              label="Titulo"
              dense
            />
            <v-text-field
              v-model="editedItem.url"
              outlined
              label="Url"
              dense
            />
            <v-textarea
              v-model="editedItem.description"
              outlined
              name="input-7-4"
              dense
              label="Texto"
              placeholder="Asignar texto a la imagen"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              imagen="imagen"
              @imagen="editedItem.image = $event"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        class="float-none"
        color="primary"
        @click="addItem()"
      >
        <v-icon>mdi-plus</v-icon>
        Agregar
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Titulo
              </th>
              <th class="text-left">
                Imagen
              </th>
              <th class="text-left">
                url
              </th>
              <th class="text-left">
                Descripción
              </th>
              <th class="text-left">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.imagen"
            >
              <td>{{ item.title }}</td>
              <td>
                <v-img
                  v-if="item.image"
                  :src="item.image.url"
                  width="60"
                />
              </td>
              <td>{{ item.url }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-btn
                  fab
                  x-small
                  color="pink"
                  @click="deleteItem (item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
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
            color="pink"
            text
            @click="deleteItemConfirm"
          >
            Eliminar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      valid: false,
      desserts: [],
      dialogDelete: false,
      editedItem: {
        image: undefined,
        title: '',
        description: '',
        url: '',
      },
    }),
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('carrusel', ['carruselPostActions', 'carruselAllActions', 'carruselDeleteActions', 'carruselGetActions', 'carruselUpdateActions', 'provinceAllActions', 'cantonFindActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.carruselAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedId = item.id
        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        const serviceResponse = await this.carruselDeleteActions(this.editedId)
        if (serviceResponse.ok) {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.closeDelete()
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
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.editedId = undefined
        })
      },
      async addItem () {
        const formData = new FormData()
        formData.append('image', this.editedItem.image)
        formData.append('title', this.editedItem.title)
        formData.append('description', this.editedItem.description)
        formData.append('url', this.editedItem.url)
        const serviceResponse = await this.carruselPostActions(formData)
        if (serviceResponse.ok) {
          this.desserts.push(serviceResponse.data)
          this.close()
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
    },
  }
</script>
