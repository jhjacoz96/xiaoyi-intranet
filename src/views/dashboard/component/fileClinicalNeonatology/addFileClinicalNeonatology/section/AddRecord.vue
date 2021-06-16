<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      1. Datos generales
    </div> -->

    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.patologias_maternas"
            disabled
            outlined
            :items="pathology"
            multiple
            :filter="customFilter"
            item-text="name"
            item-value="id"
            label="Patologías maternas"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.patologias_paternas"
            outlined
            :items="pathology"
            :filter="customFilter"
            multiple
            item-text="name"
            item-value="id"
            label="Patologías paternas"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.type_boold_mother_id"
            outlined
            :items="typeBlood"
            item-text="name"
            item-value="id"
            label="Tipo de sangre de la madre (*)"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.type_boold_father_id"
            outlined
            :items="typeBlood"
            item-text="name"
            item-value="id"
            label="Tipo de sangre del padre (*)"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.alteraciones_embarazo"
            outlined
            :items="alterationPregnant"
            :filter="customFilter"
            multiple
            item-text="nombre"
            item-value="id"
            label="Alteraciones detectadas durante el embarazo"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.patologias_embarazo"
            outlined
            :items="pathologyPregnant"
            :filter="customFilter"
            multiple
            item-text="nombre"
            item-value="id"
            label="Patologías durante el embarazo"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.antecedentes_neonatales"
            outlined
            multiple
            :items="pathologyNeonatal"
            item-text="nombre"
            item-value="id"
            label="Antecedentes neonatales"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.reflejos"
            outlined
            multiple
            :items="reflex"
            :filter="customFilter"
            item-text="nombre"
            item-value="id"
            label="Reflejos"
            dense
          />
        </v-col>
      </v-row>
      <v-subheader>
        Antecedentes postnatales
      </v-subheader>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <!-- <v-col
          cols="12"
        >
          <div class="text-center">
            <v-progress-circular
              :size="200"
              :width="30"
              :value="value"
              color="red"
            >
              {{ value }}
            </v-progress-circular>
          </div>
        </v-col> -->
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.total_apgar"
            disabled
            label="Apgar"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.total_escala_silverman"
            disabled
            label="Silverman"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.total_test_capurro"
            disabled
            label="Capurro"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.alimentacion_neonato"
            v-validate="'required'"
            :error-messages="errors.collect('basic.alimentacion_neonato')"
            data-vv-name="alimentación del neonato"
            validate-on-blur
            :items="alimentacion"
            label="Alimentación del neonato"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Aplicación de vitamina k
          </p>
          <v-radio-group
            v-model="editedItem.aplicacion_vitamina"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Alergia a la leche materna
          </p>
          <v-radio-group
            v-model="editedItem.alergina_leche_materna"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
      </v-row>
    </v-form>
    <div
      class="d-none"
    >
      {{ availableSteps }}
    </div>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
  import {
    reflexAllApi,
    alterationPregnantAllApi,
    pathologyNeonatalAllApi,
    pathologyPregnantAllApi,
  } from '@/api/modules'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        interval: {},
        value: 0,
        editedItem: {
          reflejos: [],
          patologias_maternas: [],
          patologias_paternas: [],
          type_boold_mother_id: null,
          type_boold_father_id: null,
          gestation_week_id: null,
          total_apgar: 0,
          total_escala_silverman: 0,
          total_test_capurro: 0,
          alimentacion_neonato: '',
          aplicacion_vitamina: false,
          alergina_leche_materna: false,

          antecedentes_neonatales: [],
          alteraciones_embarazo: [],
          patologias_embarazo: [],
        },
        alimentacion: ['Leche materna', 'Fórmula'],
        reflex: [],
        alterationPregnant: [],
        pathologyNeonatal: [],
        pathologyPregnant: [],
        pathology: [],
        typeBlood: [],
      }
    },
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      availableSteps () {
        if (
          this.editedItem.type_boold_mother_id &&
          this.editedItem.type_boold_father_id &&
          this.steps.includes(1)
        ) {
          this.setSteps(2)
          if (this.click === 'next') {
            this.setFileNeonatology(this.editedItem)
            this.$emit('click:next')
          }
          if (this.click === 'save') {
            this.setFileNeonatology(this.editedItem)
            this.$emit('click:save')
          }
        }
        return ''
      },
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
    created () {
      this.listItemReflex()
      this.listItemAlterationPregnant()
      this.listItemPathologyNeonatal()
      this.listItemPathologyPregnant()
      this.listItemPathology()
      this.listItemTypeBlood()
      this.editedItem = Object.assign({}, this.fileNeonatology)
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyGetActions', 'fileClinicalNeonatologyCheckActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('typeBlood', ['typeBloodAllActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'setFileNeonatology', 'setMiembro', 'resetFileNeonatology']),
      async listItemTypeBlood () {
        const serviceResponse = await this.typeBloodAllActions()
        if (serviceResponse.ok) {
          this.typeBlood = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathology () {
        const serviceResponse = await this.pathologyAllActions()
        if (serviceResponse.ok) {
          this.pathology = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemReflex () {
        const serviceResponse = await reflexAllApi()
        if (serviceResponse.ok) {
          this.reflex = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemAlterationPregnant () {
        const serviceResponse = await alterationPregnantAllApi()
        if (serviceResponse.ok) {
          this.alterationPregnant = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathologyNeonatal () {
        const serviceResponse = await pathologyNeonatalAllApi()
        if (serviceResponse.ok) {
          this.pathologyNeonatal = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathologyPregnant () {
        const serviceResponse = await pathologyPregnantAllApi()
        if (serviceResponse.ok) {
          this.pathologyPregnant = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
      },
    },
  }
</script>

<style scoped>
    .v-progress-circular {
    margin: 1rem;
    }
</style>
