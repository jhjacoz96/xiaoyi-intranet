<template>
  <v-card flat>
    <!-- <v-subheader>
      Contacto
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Redes sociales"
            icon="mdi-36px mdi-grease-pencil"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="NÚmero de contactos"
            icon="mdi-36px mdi-grease-pencil"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container> -->
    <v-subheader>
      Maestros para el sítio web
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Clasificación publicaciónes"
            icon="mdi-36px mdi-view-grid-plus-outline"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Publicaciones"
            icon="mdi-36px mdi-view-grid-plus-outline"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Recursos de publicaciones"
            icon="mdi-36px mdi-view-grid-plus-outline"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Preguntas frecuentes"
            icon="mdi-36px mdi-comment-question"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Configuración de publicaciones
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Configurar publicaciones"
            icon="mdi-36px mdi-camera-iris"
          />
        </v-col>
        <!-- <v-col cols="3">
          <base-item-master
            title="Configurar recursos"
            icon="mdi-36px mdi-camera-iris"
          />
        </v-col> -->
        <!-- <v-col cols="3">
          <base-item-master
            title="Formato de recursos"
            icon="mdi-36px mdi-google-maps"
            to="/intranet"
          />
        </v-col> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'ConfigInfo',
  }
</script>
