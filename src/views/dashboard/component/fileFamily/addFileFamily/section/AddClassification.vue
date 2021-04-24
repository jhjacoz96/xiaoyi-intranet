<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      5. Clasificación de riesgos familiares
      <v-btn
        class="float-right"
        fab
        color="info"
        small
        @click="dialog = !dialog"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </div>
    <!-- <v-progress-linear
      :value="progress"
      absolute
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          item-key="name"
          sort-by="name"
          group-by="clasificacion.name"
          :disable-pagination="true"
          group-by-value="name"
          show-group-by
          hide-default-header
        >
          <template v-slot:header="props">
            <thead>
              <tr>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[0].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[1].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[2].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[3].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[4].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[5].text }}</span>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item.notRisk="{ item }">
            <v-checkbox
              v-model="item.notRisk"
              color="green darken-1"
              value="item.notRisk"
              hide-details
            />
          </template>
          <template v-slot:item.veryLowRisk="{ item }">
            <v-checkbox
              v-model="item.veryLowRisk"
              color="yellow darken-1"
              value="item.notRisk"
              hide-details
            />
          </template>
          <template v-slot:item.lowRisk="{ item }">
            <v-checkbox
              v-model="item.lowRisk"
              color="yellow darken-2"
              value="item.notRisk"
              hide-details
            />
          </template>
          <template v-slot:item.moderateRisk="{ item }">
            <v-checkbox
              v-model="item.moderateRisk"
              color="yellow darken-3"
              value="item.notRisk"
              hide-details
            />
          </template>
          <template v-slot:item.highRisk="{ item }">
            <v-checkbox
              v-model="item.highRisk"
              color="yellow darken-4"
              value="item.notRisk"
              hide-details
            />
          </template>
          <template v-slot:item.risk="{ item }">
            {{ item.risk.name }}
          </template>
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <v-btn
                :ref="group"
                x-small
                icon
                @click="toggle"
              >
                <v-icon v-if="isOpen">
                  mdi-plus
                </v-icon>
                <v-icon v-else>
                  mdi-minus
                </v-icon>
              </v-btn>
              <span class="mx-5 font-weight-bold">{{ group }}</span>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tr>
              <td
                width="20%"
                class="text-left font-weight-regular text-h5"
              >
                Total por nivel
              </td>
              <td
                width="10%"
                dark
                class="text-center green darken-1 white--text"
              >
                0
              </td>
              <td
                width="10%"
                class="text-center yellow darken-1 white--text"
              >
                0
              </td>
              <td
                width="10%"
                class="text-center yellow darken-2 white--text"
              >
                10
              </td>
              <td
                width="10%"
                class="text-center yellow darken-3 white--text"
              >
                10
              </td>
              <td
                width="10%"
                class="text-center yellow darken-4 white--text"
              >
                0
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tr>
              <td
                width="20%"
                class="font-weight-regular text-h5"
              >
                Total
              </td>
              <td>
                &nbsp;
              </td>
              <td
                width="14%"
                class="text-center yellow darken-4 text-center white--text"
              >
                100
              </td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <div class="pa-3 text-center">
            Historial de rango total
          </div>
          <v-card-text>
            <v-container>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        Nivel de rango
                      </th>
                      <th>
                        Rango total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Sin riesgo
                      </td>
                      <td>
                        <v-chip
                          dark
                          color="green darken-1"
                        >
                          0
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Bajo
                      </td>
                      <td>
                        <v-chip
                          dark
                          color="yellow darken-1"
                        >
                          1-14
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Medio
                      </td>
                      <td>
                        <v-chip
                          dark
                          color="yellow darken-2"
                        >
                          15-34
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Alto
                      </td>
                      <td>
                        <v-chip
                          dark
                          color="yellow darken-3"
                        >
                          35-72
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="black darken-1"
              text
              @click="dialog = !dialog"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div
        class="d-none"
      >
        {{ availableSteps }}
      </div>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        value: '',
        headers: [
          {
            text: 'Riesgos',
            value: 'risk',
            sortable: false,
            align: 'left',
            groupable: false,
          },
          {
            text: 'Sin riesgos',
            value: 'notRisk',
            align: 'center',
            groupable: false,
          },
          {
            text: 'Riesgo muy bajo',
            value: 'veryLowRisk',
            align: 'center',
            groupable: false,
          },
          {
            text: 'Riesgo bajo',
            value: 'lowRisk',
            groupable: false,
            align: 'center',
          },
          {
            text: 'Riesgo moderado',
            value: 'moderateRisk',
            groupable: false,
            align: 'center',
          },
          {
            text: 'Riesgo alto',
            value: 'highRisk',
            align: 'center',
            groupable: false,
          },
          {
            text: 'Clasificación',
            value: 'clasificacion.name',
            sortable: false,
            align: 'rigtht',
          },
        ],
        desserts: [
          {
            risk: {
              name: 'Personas con vacinación incompleta',
              id: 1,
            },
            clasificacion: {
              name: 'Riesgos biológicos',
              id: 1,
            },
            notRisk: true,
            veryLowRisk: true,
            lowRisk: true,
            moderateRisk: true,
            highRisk: true,
          },
          {
            risk: {
              name: 'Personas con malnutrición',
              id: 2,
            },
            clasificacion: {
              name: 'Riesgos biológicos',
              id: 1,
            },
            notRisk: true,
            veryLowRisk: true,
            lowRisk: true,
            moderateRisk: true,
            highRisk: true,
          },
          {
            risk: {
              name: 'Consumo de agua insegura',
              id: 3,
            },
            clasificacion: {
              name: 'Riesgos sanitarios',
              id: 2,
            },
            notRisk: true,
            veryLowRisk: true,
            lowRisk: true,
            moderateRisk: true,
            highRisk: true,
          },
        ],
      }
    },
    computed: {
      availableSteps () {
        const steps = [0]
        if (
          this.desserts.length > 0
        ) steps.push(3)
        this.$emit('data', steps)
        return steps
      },
    },
  }
</script>
