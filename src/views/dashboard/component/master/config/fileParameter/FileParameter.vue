<template>
  <v-card flat>
    <!-- <v-subheader>
      Administración de medicamentos
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Configurar medicamento"
            icon="mdi-36px mdi-36px mdi-pill"
            to="/intranet/configuracion-maestros/medicamentos"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Configurar vías"
            icon="mdi-36px  mdi-needle"
            to="/intranet/configuracion-maestros/vias"
          />
        </v-col>
      </v-row>
    </v-container> -->
    <v-subheader>
      Parámetros de ficha familiar
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="configurar riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-maestros/riesgos"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
