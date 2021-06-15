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
                Bienvenida
              </v-tab>
              <v-tab>
                Servicios
              </v-tab>
              <v-tab>
                Descargar aplicación móvil
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <carrusel />
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
                Nosotros
              </v-tab>
              <v-tab>
                Misión
              </v-tab>
              <v-tab>
                Visión
              </v-tab>
              <v-tab>
                Objetivos
              </v-tab>
              <v-tab>
                valores
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab2">
              <v-tab-item>
                <us />
              </v-tab-item>
              <v-tab-item>
                <mission />
              </v-tab-item>
              <v-tab-item>
                <vision />
              </v-tab-item>
              <v-tab-item>
                <objetivo />
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
                Servicios
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="!open">Información de la sección de servicios</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <service-section />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Cuidados de adultos mayores
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="!open">Información de la sección de cuidados de adultos mayores</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <older-adult-section />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Suscripción de cuidadores
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="!open">Información de la sección de suscripción de cuidadores</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <subcription-section />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Contáctanos
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
            <contact-section />
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
      Services: () => import('../contentWeb/inicio/Services'),
      DowloandApp: () => import('../contentWeb/inicio/DowloandApp'),
      Us: () => import('../contentWeb/values/Us'),
      Mission: () => import('../contentWeb/values/Mission'),
      Vision: () => import('../contentWeb/values/Vision'),
      Value: () => import('../contentWeb/values/Value'),
      Objetivo: () => import('../contentWeb/values/Objetivo'),
      ServiceSection: () => import('../contentWeb/ServiceSection'),
      OlderAdultSection: () => import('../contentWeb/OlderAdultSection'),
      SubcriptionSection: () => import('../contentWeb/SubcriptionSection'),
      ContactSection: () => import('../contentWeb/ContactSection'),
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
