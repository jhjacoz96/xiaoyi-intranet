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
              v-model="editedItem.objective"
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
              :image="typeof editedItem.image_objective === 'object' ? editedItem.image_objective.url : editedItem.image_objective"
              @imagen="editedItem.image_objective = $event"
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
        objective: '',
        image_objective: undefined,
      },
    }),
    computed: {
      validated () {
        if (
          this.editedItem.objective &&
          this.editedItem.image_objective
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
          console.log(serviceResponse.data)
          if (serviceResponse.data) {
            this.editedItem.objective = serviceResponse.data.objective
            this.editedItem.image_objective = serviceResponse.data.image_objective
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
        formData.append('objective', this.editedItem.objective)
        formData.append('image_objective', this.editedItem.image_objective === 'string' ? null : this.editedItem.image_objective)
        console.log(formData)
        const serviceResponse = await this.webUsPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.objective = serviceResponse.data.objective
          this.editedItem.image_objective = serviceResponse.data.image_objective
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
