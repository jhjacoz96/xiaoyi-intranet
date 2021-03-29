<template>
  <v-card flat>
    <v-container fluid>
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  Inicio
                </v-col>
                <v-col
                  cols="8"
                  class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                    <span
                      v-if="!open"
                      key="0"
                    >
                      Información en la sección de inicio
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="primary"
            >
              <v-tab>
                Carrusel
              </v-tab>
              <v-tab>
                ¿Quíenes somos?
              </v-tab>
              <v-tab>
                Servicios
              </v-tab>
              <v-tab>
                Descargar aplicación movil
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <carrusel />
              </v-tab-item>
              <v-tab-item>
                <info-center />
              </v-tab-item>
              <v-tab-item>
                <services />
              </v-tab-item>
              <v-tab-item>
                <dowloand-app />
              </v-tab-item>
            </v-tabs-items>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Nosotros
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span
                    v-if="!open"
                    key="0"
                  >
                    Información referente al centro de salud
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs
              v-model="tab2"
              background-color="transparent"
              color="primary"
            >
              <v-tab>
                Misión
              </v-tab>
              <v-tab>
                Visión
              </v-tab>
              <v-tab>
                valores
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab2">
              <v-tab-item>
                <mission />
              </v-tab-item>
              <v-tab-item>
                <vision />
              </v-tab-item>
              <v-tab-item>
                <value />
              </v-tab-item>
            </v-tabs-items>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Pié de pagina
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="!open">Información de comunicación</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <end-page />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'ConfigContent',
    components: {
      Carrusel: () => import('../contentWeb/inicio/Carrusel'),
      InfoCenter: () => import('../contentWeb/inicio/InfoCenter'),
      Services: () => import('../contentWeb/inicio/Services'),
      DowloandApp: () => import('../contentWeb/inicio/DowloandApp'),
      Mission: () => import('../contentWeb/values/Mission'),
      Vision: () => import('../contentWeb/values/Vision'),
      Value: () => import('../contentWeb/values/Value'),
      EndPage: () => import('../contentWeb/footer/Footer'),
    },
    data: () => ({
      date: null,
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
      tab: null,
      tab2: null,
    }),
  }
</script>
