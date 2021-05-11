<template>
  <v-card
    color="basil"
    flat
  >
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
            <v-textarea
              v-model="editedItem.vision"
              outlined
              name="input-7-3"
              dense
              label="Descripción de la visión"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              :image="typeof editedItem.image_vision === 'object' ? editedItem.image_vision.url : editedItem.image_vision"
              @imagen="editedItem.image_vision = $event"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
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
      editedItem: {
        vision: '',
        image_vision: undefined,
      },
    }),
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webUsPostActions', 'webUsAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.webUsAllActions()
        if (serviceResponse.ok) {
          console.log(serviceResponse.data)
          if (serviceResponse.data) {
            this.editedItem.vision = serviceResponse.data.vision
            this.editedItem.image_vision = serviceResponse.data.image_vision
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
        formData.append('vision', this.editedItem.vision)
        formData.append('image_vision', this.editedItem.image_vision)
        console.log(formData)
        const serviceResponse = await this.webUsPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.vision = serviceResponse.data.vision
          this.editedItem.image_vision = serviceResponse.data.image_vision
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
