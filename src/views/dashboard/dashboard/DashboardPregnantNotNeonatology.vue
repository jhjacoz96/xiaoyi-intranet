<template>
  <v-card
    height="350"
  >
    <v-card-title class="text-h4 mb-2">
      <div>Fichas de obstetricia sin un control prenantal asignado</div>
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
                    Número de historia: {{ item.numero_historia }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        x-small
                        fab
                        color="info"
                        v-bind="attrs"
                        class="ml-2"
                        v-on="on"
                        @click="addFileClinicalNeonatology(item.cedula)"
                      >
                        <v-icon>mdi-baby</v-icon>
                      </v-btn>
                    </template>
                    <span>Iniciar control  de ficha de neonatología</span>
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
    fileClinicalObstetricAllNotNeonatologyApi,
    fileClinicalNeonatologyCheckPregnantApi,
  } from '@/api/modules'
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        data: [],
        groupAge: [],
        editedItem: {
          group_age_id: null,
        },
      }
    },
    computed: {
      chart () {
        return {
          data: [],
        }
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricCheckActions']),
      ...mapMutations('fileClinicalNeonatology', ['setMiembro']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponse = await fileClinicalObstetricAllNotNeonatologyApi()
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addFileClinicalNeonatology (val) {
        const serviceResponse = await fileClinicalNeonatologyCheckPregnantApi(val)
        if (serviceResponse.ok) {
          this.setMiembro(serviceResponse.data)
          this.$router.push('/intranet/ficha-clinica-neonatologia/agregar')
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
