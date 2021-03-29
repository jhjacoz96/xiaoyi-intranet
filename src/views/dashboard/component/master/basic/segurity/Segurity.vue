<template>
  <v-card flat>
    <v-subheader>
      Accesibilidad
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Roles"
            icon="mdi-36px mdi-36px mdi-account-key"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Permisos"
            icon="mdi-36px mdi-security"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
