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
              v-model="editedItem.mission"
              outlined
              name="input-7-3"
              dense
              label="Descripción de la misión"
            />
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              :image="typeof editedItem.image_mission === 'object' ? editedItem.image_mission.url : editedItem.image_mission"
              @imagen="editedItem.image_mission = $event"
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
        mission: '',
        image_mission: undefined,
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
            this.editedItem.mission = serviceResponse.data.mission
            this.editedItem.image_mission = serviceResponse.data.image_mission
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
        formData.append('mission', this.editedItem.mission)
        formData.append('image_mission', this.editedItem.image_mission)
        console.log(formData)
        const serviceResponse = await this.webUsPostActions(formData)
        if (serviceResponse.ok) {
          this.editedItem.mission = serviceResponse.data.mission
          this.editedItem.image_mission = serviceResponse.data.image_mission
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
