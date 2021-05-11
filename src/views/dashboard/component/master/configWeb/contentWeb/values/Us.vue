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
              v-model="editedItem.description1"
              outlined
              name="input-7-3"
              dense
              label="Descripción 1"
            />
            <v-textarea
              v-model="editedItem.description2"
              outlined
              name="input-7-3"
              dense
              label="Descripción 2"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              :image="typeof editedItem.image_us === 'object' ? editedItem.image_us.url : editedItem.image_us"
              @imagen="editedItem.image_us = $event"
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
        description1: '',
        description2: '',
        image_us: undefined,
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
            this.editedItem.description1 = serviceResponse.data.description1
            this.editedItem.description2 = serviceResponse.data.description2
            this.editedItem.image_us = serviceResponse.data.image_us
            console.log(this.editedItem)
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
        formData.append('description1', this.editedItem.description1)
        formData.append('description2', this.editedItem.description2)
        formData.append('image_us', this.editedItem.image_us)
        console.log(formData)
        const serviceResponse = await this.webUsPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.description1 = serviceResponse.data.description1
          this.editedItem.description2 = serviceResponse.data.description2
          this.editedItem.image_us = serviceResponse.data.image_us
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
