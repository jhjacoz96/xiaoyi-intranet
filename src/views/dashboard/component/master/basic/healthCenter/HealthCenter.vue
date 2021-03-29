<template>
  <v-card flat>
    <v-subheader>
      Área de negocio
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Datos básicos"
            icon="mdi-36px mdi-grease-pencil"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Instituci'on del sistema"
            icon="mdi-36px mdi-grease-pencil"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Servicios asistenciales"
            icon="mdi-36px mdi-medical-bag"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Actividades de servicios"
            icon="mdi-36px mdi-medical-bag"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Especialidades"
            icon="mdi-36px mdi-medical-bag"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Cobertura
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Zonas básicas"
            icon="mdi-36px mdi-google-maps"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
