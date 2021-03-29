<template>
  <v-card flat>
    <v-subheader>
      Parámetros medicametos
    </v-subheader>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <base-item-master
            title="Tipo de medicamento"
            icon="mdi-36px mdi-36px mdi-flask"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Presentación"
            icon="mdi-36px mdi-36px mdi-flask-round-bottom"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Tipo de vías"
            icon="mdi-36px  mdi-needle"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Vías"
            icon="mdi-36px mdi-needle"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Frecuencia"
            icon="mdi-36px mdi-alarm"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Dosis"
            icon="mdi-36px mdi-eyedropper"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-subheader>
      Parámetros de ficha familiar
    </v-subheader>
    <v-container fluid>
      <v-row>
        <!-- <v-col cols="3">
          <base-item-master
              title="Grupo sanguineo"
              icon="mdi-36px mdi-36px mdi-water"
              to="/intranet"
          />
          </v-col> -->
        <v-col cols="3">
          <base-item-master
            title="Grupo cultural"
            icon="mdi-36px mdi-36px mdi-account-group"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Parentesco"
            icon="mdi-36px mdi-36px mdi-human-male-female"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Escolaridad"
            icon="mdi-36px mdi-36px mdi-human-male-female"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Grupos de edad"
            icon="mdi-36px mdi-36px mdi-account-key"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Patologías"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Clasificación de riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet"
          />
        </v-col>
        <v-col cols="3">
          <base-item-master
            title="Nivel de riesgos"
            icon="mdi-36px mdi-36px mdi-bacteria"
            to="/intranet"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
