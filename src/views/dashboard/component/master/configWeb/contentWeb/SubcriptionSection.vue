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
            <v-text-field
              v-model="editedItem.description1"
              outlined
              dense
              label="Titulo de sección"
            />
            <v-textarea
              v-model="editedItem.description2"
              outlined
              name="7-3"
              dense
              label="Descripción"
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
      valid: false,
      editedItem: {
        description1: '',
        description2: '',
      },
    }),
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
      ...mapActions('configWeb', ['webSubcriptionPostActions', 'webSubcriptionAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponsee = await this.webSubcriptionAllActions()
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            this.editedItem.description1 = serviceResponsee.data.description1
            this.editedItem.description2 = serviceResponsee.data.description2
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async addItem () {
        const serviceResponsee = await this.webSubcriptionPostActions(this.editedItem)
        if (serviceResponsee.ok) {
          this.editedItem.description1 = serviceResponsee.data.description1
          this.editedItem.description2 = serviceResponsee.data.description2
          this.alert({
            text: serviceResponsee.message,
            color: 'success',
          })
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
