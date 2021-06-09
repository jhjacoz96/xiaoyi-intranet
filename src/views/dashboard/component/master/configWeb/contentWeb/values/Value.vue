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
              v-model="editedItem.value"
              outlined
              name="input-7-3"
              dense
              label="Descripción del objetivo"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              :image="typeof editedItem.image_value === 'object' ? editedItem.image_value.url : editedItem.image_value"
              @imagen="editedItem.image_value = $event"
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
      editedItem: {
        value: '',
        image_value: undefined,
      },
    }),
    computed: {
      validated () {
        if (
          this.editedItem.value &&
          this.editedItem.image_value
        ) return false
        return true
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webUsPostActions', 'webUsAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.webUsAllActions()
        if (serviceResponse.ok) {
          if (serviceResponse.data) {
            this.editedItem.value = serviceResponse.data.value
            this.editedItem.image_value = serviceResponse.data.image_value
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
        formData.append('value', this.editedItem.value)
        formData.append('image_value', this.editedItem.image_value === 'string' ? null : this.editedItem.image_value)
        const serviceResponse = await this.webUsPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.value = serviceResponse.data.value
          this.editedItem.image_value = serviceResponse.data.image_value
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
