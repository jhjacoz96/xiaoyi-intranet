<template>
  <v-card flat>
    <v-subheader>
      Administración de medicamentos
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Tipo de medicamento"
            icon="mdi-36px mdi-36px mdi-flask"
            to="/intranet/configuracion-basica/tipo-medicamento"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Medicamento"
            icon="mdi-36px mdi-36px mdi-flask"
            to="/intranet/configuracion-basica/medicamento"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Presentación"
            icon="mdi-36px mdi-36px mdi-flask-round-bottom"
            to="/intranet/configuracion-basica/presentacion"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Tipo de vías"
            icon="mdi-36px  mdi-needle"
            to="/intranet/configuracion-basica/tipo-via"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Vías"
            icon="mdi-36px mdi-needle"
            to="/intranet/configuracion-basica/vias"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Frecuencia"
            icon="mdi-36px mdi-alarm"
            to="/intranet/configuracion-basica/frecuencia"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Medida"
            icon="mdi-36px mdi-eyedropper"
            to="/intranet/configuracion-basica/medida"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Parámetros de generales para las fichas
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Grupo sanguineo"
            icon="mdi-36px mdi-36px mdi-water"
            to="/intranet/configuracion-basica/grupo-sanguineo"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Grupo cultural"
            icon="mdi-36px mdi-36px mdi-account-group"
            to="/intranet/configuracion-basica/grupo-cultural"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Parentesco"
            icon="mdi-36px mdi-36px mdi-human-male-female"
            to="/intranet/configuracion-basica/parentesco"
          />
        </v-col>
        <!-- <v-col cols="3">
          <base-item-master
            title="Escolaridad"
            icon="mdi-36px mdi-36px mdi-human-male-female"
            to="/intranet"
          />
        </v-col> -->
        <v-col cols="3">
          <base-item-master
            title="Patologías"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/patologias"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Discapacidades"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/discapacidades"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Sustancias psicotrópicas"
            icon="mdi-36px mdi-36px mdi-account-key"
            to="/intranet/configuracion-basica/sustancias-psicotropicas"
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
            title="Grupos de edad"
            icon="mdi-36px mdi-36px mdi-account-key"
            to="/intranet/configuracion-basica/grupo-edades"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Clasificación de riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/clasificacion-riesgos"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/riesgos"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Niveles de riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/nivel-riesgos"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Niveles totales"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/nivel-riesgos-total"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Parámetros de ficha obstetrícia
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Vacunas"
            icon="mdi-36px mdi-36px mdi-account-key"
            to="/intranet/configuracion-basica/vacunas"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Exámenes rutinarios"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/examenes-rutinarios"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Semana de gestción"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet/configuracion-basica/semana-gestacion"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Cacteristicas del parto"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="configuracion-basica/caracteristicas"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Señales de alarma"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="configuracion-basica/senal-alarma"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
