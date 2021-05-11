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
      Información básica
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Primer filtro de busqueda"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/primer-filtro-busqueda"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Segundo filtro de busqueda"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/segundo-filtro-busqueda"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Tercer filtro de busqueda"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/tercer-filtro-busqueda"
          />
        </v-col>
        <!-- <v-col cols="3">
          <base-item-master
            title="Recursos de multimedia"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/recursos"
          />
        </v-col> -->
        <!-- <v-col cols="3">
          <base-item-master
            title="Preguntas frecuentes"
            icon="mdi-36px mdi-comment-question"
            to="configuracion-web/preguntas-frecuentes"
          />
        </v-col> -->
      </v-row>
    </v-container>
    <v-subheader>
      Configuración de publicaciones
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Publicaciones"
            icon="mdi-36px mdi-view-grid-plus-outline"
            to="configuracion-web/publicaciones"
          />
        </v-col>
        <!-- <v-col cols="3">
          <base-item-master
            title="Configurar publicaciones"
            icon="mdi-36px mdi-camera-iris"
            to="configuracion-web/configurar-publicaciones"
          />
        </v-col> -->
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
