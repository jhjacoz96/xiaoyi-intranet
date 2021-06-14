<template>
  <v-card
    color="basil"
    flat
  >
    <v-card-text class="text-h5">
      Ingrese la información referente a la aplicación mávil
    </v-card-text>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
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
              label="Titulo"
              outlined
              dense
            />
            <v-textarea
              v-model="editedItem.description1"
              label="Descripción 1"
              dense
              outlined
              name="input-7-3"
            />
            <v-textarea
              v-model="editedItem.description2"
              label="Descripción 1"
              dense
              outlined
              name="input-7-3"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              :image="typeof editedItem.image === 'object' ? editedItem.image.url : editedItem.image"
              @imagen="editedItem.image = $event"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        :disabled="validated"
        class="float-none"
        color="primary"
        @click="addItem"
      >
        Actualizar
      </v-btn>
    </v-card-actions>
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
      imagen: null,
      desserts: [],
      editedItem: {
        title: '',
        description1: '',
        description2: '',
        image: {
          url: '',
        },
      },
    }),
    computed: {
      validated () {
        if (
          this.editedItem.title &&
          this.editedItem.description1 &&
          this.editedItem.description2 &&
          this.editedItem.image
        ) return false
        return true
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webDiabeticPostActions', 'webDiabeticAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.webDiabeticAllActions()
        if (serviceResponse.ok) {
          if (serviceResponse.data) {
            this.editedItem.title = serviceResponse.data.title
            this.editedItem.description1 = serviceResponse.data.description1
            this.editedItem.description2 = serviceResponse.data.description2
            this.editedItem.image = serviceResponse.data.image.url
          }
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItem () {
        const formData = new FormData()
        formData.append('title', this.editedItem.title)
        formData.append('description1', this.editedItem.description1)
        formData.append('description2', this.editedItem.description2)
        formData.append('image', typeof this.editedItem.image === 'string' ? null : this.editedItem.image)
        const serviceResponse = await this.webDiabeticPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.title = serviceResponse.data.title
          this.editedItem.description1 = serviceResponse.data.description1
          this.editedItem.description2 = serviceResponse.data.description2
          this.editedItem.image = serviceResponse.data.image
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
