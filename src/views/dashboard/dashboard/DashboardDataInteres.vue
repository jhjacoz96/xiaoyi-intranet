<template>
  <v-card
    max-width="300"
    color="primary"
    dark
    elevation="6"
  >
    <v-card-title class="text-h4">
      Datos de interés
    </v-card-title>
    <v-card-text>
      <v-list
        color="primary"
        three-line
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Diabeticos
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="`${diabeticos} de la población es diabetica`"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Adultos mayores
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="`${adultosMayores} de la población es adulta mayor`"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Embarazos precoz
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="`${embarazoPrecoz} de los embarazos son precoz`"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Embarazos
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="`Edad promedio de embarazo es de ${promedioEmbarazo} años`"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      diabeticos: {
        type: [String, Number],
        default: undefined,
      },
      adultosMayores: {
        type: [String, Number],
        default: undefined,
      },
      embarazoPrecoz: {
        type: [String, Number],
        default: undefined,
      },
      promedioEmbarazo: {
        type: [String, Number],
        default: undefined,
      },
    },
  }
</script>
