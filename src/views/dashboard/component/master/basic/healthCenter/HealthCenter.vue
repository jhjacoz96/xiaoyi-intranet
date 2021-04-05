<template>
  <v-card flat>
    <v-subheader>
      Centro de salud
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Datos básicos"
            icon="mdi-36px mdi-home-edit"
            to="/intranet/configuracion-basica/datos-basicos"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Instituciones del sistema"
            icon="mdi-36px mdi-hospital"
            to="/intranet/configuracion-basica/institucion-sistema"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Servicios asistenciales"
            icon="mdi-36px mdi-medical-bag"
            to="/intranet/configuracion-basica/servicios"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Actividades de servicios"
            icon="mdi-36px mdi-medical-bag"
            to="/intranet/configuracion-basica/actividades-servicio"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Especialidades"
            icon="mdi-36px mdi-doctor"
            to="/intranet/configuracion-basica/especialidades"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Tipo de empleado"
            icon="mdi-36px mdi-doctor"
            to="/intranet/configuracion-basica/tipo-empleado"
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
            title="Grupo poblacional"
            icon="mdi-36px mdi-google-maps"
            to="/intranet/configuracion-basica/zonas"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
