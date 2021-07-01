<template>
  <v-container fluid>
    <v-row>
      <!-- <v-col cols="3">
        <base-item-master
          title="Canal de escucha"
          icon="mdi-36px mdi-file"
        />
      </v-col>-->
      <v-col cols="3">
        <base-item-master
          title="Ficha familiar"
          icon="mdi-36px mdi-file"
          to="reportes/estructurados/ficha-familiar"
        />
      </v-col>
      <v-col cols="3">
        <base-item-master
          title="Miembros"
          icon="mdi-36px mdi-file"
          to="reportes/estructurados/miembros"
        />
      </v-col>
      <v-col cols="3">
        <base-item-master
          title="Ficha clinica neonatología"
          to="reportes/estructurados/ficha-clinica-neonatologia"
          icon="mdi-36px mdi-file"
        />
      </v-col>
      <v-col cols="3">
        <base-item-master
          title="Ficha clinica obstetricia"
          icon="mdi-36px mdi-file"
          to="reportes/estructurados/ficha-clinica-obstetricia"
        />
      </v-col>
      <v-col cols="3">
        <base-item-master
          title="Pacientes diabéticos"
          icon="mdi-36px mdi-file"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
