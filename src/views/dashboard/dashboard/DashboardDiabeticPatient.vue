<template>
  <v-card
    height="350"
  >
    <v-card-title class="text-h4">
      Diabéticos sin control
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-content>
          <v-list-item-subtitle
            v-if="data.length === 0"
            class="text-center"
            v-text="'Sin registros'"
          />
          <v-virtual-scroll
            :items="data"
            :item-height="70"
            height="246"
            weight
            cart-height="26"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.nombre }} {{ item.apellido }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Cédula: {{ item.cedula }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Fecha: {{ moment(item.diabetic_patient.created_at).format('DD-MM-YYYY') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        x-small
                        color="info"
                        v-bind="attrs"
                        class="ml-2"
                        v-on="on"
                        @click="$router.push(`/intranet/control-diabetes/${item.diabetic_patient.id}`)"
                      >
                        <v-icon>mdi-doctor</v-icon>
                      </v-btn>
                    </template>
                    <span>Control del paciente</span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-list-item-content>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        data: [],
      }
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('controlDiabetic', ['controlDiabeticAllActions', 'controlDiabeticUpdateActions', 'controlDiabeticAllRecentActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await this.controlDiabeticAllRecentActions()
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
