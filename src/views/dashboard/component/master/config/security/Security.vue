<template>
  <v-card flat>
    <v-subheader>
      Accesibilidad
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col
          cols="6"
          md="3"
        >
          <base-item-master
            title="Configurar permisos"
            icon="mdi-36px mdi-security"
            to="/intranet/configuracion-maestros/permisos"
          />
        </v-col>
        <v-col
          cols="6"
          md="3"
        >
          <base-item-master
            title="Configurar empleados"
            icon="mdi-36px mdi-security"
            to="/intranet/configuracion-maestros/usuarios"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
