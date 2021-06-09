<template>
  <v-container>
    <v-subheader>
      Sección de contáctanos
    </v-subheader>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="5">
        <v-textarea
          v-model="editedItem.description1"
          label="Descripción de sección de contáctanos"
          name="7-3"
          outlined
        />
      </v-col>
      <v-col cols="5">
        <v-textarea
          v-model="editedItem.description2"
          label="Descripción de sección de enviar comentario"
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader>
      Links de redes sociales
    </v-subheader>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="3">
        <v-text-field
          v-model="editedItem.facebook"
          label="Facebook"
          prepend-icon="mdi-facebook"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="editedItem.instagram"
          label="Instagram"
          prepend-icon="mdi-instagram"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="editedItem.twitter"
          label="Twitter"
          prepend-icon="mdi-twitter"
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader>
      Teléfonos
    </v-subheader>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="5">
        <v-text-field
          v-model="editedItem.descripcion_phone1"
          label="Descripción del telefono 1"
          outlined
        />
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="editedItem.phone1"
          label="Telefono 1"
          prepend-icon="mdi-phone"
          outlined
        />
      </v-col>
    </v-row>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="5">
        <v-text-field
          v-model="editedItem.descripcion_phone2"
          label="Descripción del telefono 2"
          outlined
        />
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="editedItem.pone2"
          label="Telefono 2"
          prepend-icon="mdi-phone"
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader>
      Otros contactos
    </v-subheader>
    <v-row
      justify="start"
      no-gutters
    >
      <v-col cols="6">
        <v-text-field
          v-model="editedItem.email"
          label="Correo electrónico"
          prepend-icon="mdi-email"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end">
        <v-btn
          color="primary"
          @click="addItem"
        >
          Actualizar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
        email: '',
        descripcion_phone1: '',
        descripcion_phone2: '',
        phone1: '',
        pone2: '',
        twitter: '',
        facebook: '',
        instagram: '',
      },
    }),
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webContactPostActions', 'webContactAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponsee = await this.webContactAllActions()
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            Object.assign(this.editedItem, serviceResponsee.data)
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async addItem () {
        const serviceResponsee = await this.webContactPostActions(this.editedItem)
        if (serviceResponsee.ok) {
          Object.assign(this.editedItem, serviceResponsee.data)
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
