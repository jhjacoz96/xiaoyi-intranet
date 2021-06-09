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
              dense
              label="Descripción 1"
            />
            <v-textarea
              v-model="editedItem.description2"
              outlined
              dense
              label="Descripción 2"
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
    data () {
      return {
        valid: false,
        editedItem: {
          description1: '',
          description2: '',
        },
      }
    },
    computed: {
      validated () {
        if (
          this.editedItem.description1 &&
          this.editedItem.description2
        ) return false
        return true
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webServicePostActions', 'webServiceAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.webServiceAllActions()
        if (serviceResponse.ok) {
          if (serviceResponse.data) {
            this.editedItem.description1 = serviceResponse.data.description1
            this.editedItem.description2 = serviceResponse.data.description2
          }
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItem () {
        const serviceResponse = await this.webServicePostActions(this.editedItem)
        if (serviceResponse.ok) {
          this.editedItem.description1 = serviceResponse.data.description1
          this.editedItem.description2 = serviceResponse.data.description2
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
