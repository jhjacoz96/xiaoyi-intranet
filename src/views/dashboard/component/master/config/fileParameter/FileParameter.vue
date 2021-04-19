<template>
  <v-card flat>
    <v-subheader>
      Administración de medicamentos
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Configuración medicamento"
            icon="mdi-36px mdi-36px mdi-pill"
            to="/intranet/configuracion-basica/medicamento"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Configuración vías"
            icon="mdi-36px  mdi-needle"
            to="/intranet/configuracion-basica/tipo-via"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Parámetros de ficha familiar
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="configuración riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/riesgos"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
