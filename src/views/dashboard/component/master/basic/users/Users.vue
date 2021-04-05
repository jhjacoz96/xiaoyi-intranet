<template>
  <v-card flat>
    <v-subheader>
      Información de usuarios
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Administrar usuarios"
            icon="mdi-36px mdi-account-multiple"
            to="/intranet/configuracion-basica/usuarios"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Tipo de documento"
            icon="mdi-36px mdi-badge-account-horizontal"
            to="/intranet/configuracion-basica/tipo-documentos"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
