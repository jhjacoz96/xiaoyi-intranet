<template>
  <v-container>
    <v-subheader>
      Redes sociales
    </v-subheader>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="3">
        <v-text-field
          label="Facebook"
          prepend-icon="mdi-facebook"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Instagram"
          prepend-icon="mdi-instagram"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Twitter"
          prepend-icon="mdi-twitter"
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader>
      Contacto
    </v-subheader>
    <v-row
      justify="space-around"
      no-gutters
    >
      <v-col cols="3">
        <v-text-field
          label="Telefono 1"
          prepend-icon="mdi-phone"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Telefono de emergencia"
          prepend-icon="mdi-phone"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Correo electrónico"
          prepend-icon="mdi-email"
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader>
      Localización
    </v-subheader>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Dirección"
          prepend-icon="mdi-map"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end">
        <v-btn color="primary">
          <v-icon>mdi-plus</v-icon>
          Actualizar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>
