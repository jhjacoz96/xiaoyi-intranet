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
      Sección de publicaciones
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Tipos de publiaciones"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="/intranet/configuracion-web/tipo-publicacion"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Publicaciones"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/publicaciones"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Recursos multimedia
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Clasificación de recursos"
            icon="mdi-36px mdi-camera-iris"
            to="/intranet/configuracion-web/tipo-recurso"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Recursos"
            icon="mdi-36px mdi-camera-iris"
            to="/intranet/configuracion-web/recursos"
          />
        </v-col>
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
