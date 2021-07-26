<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      2. Antcedentes
    </div> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-subheader>
        Antecedentes patológicos
      </v-subheader>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.patologias"
            :disabled="!history"
            outlined
            :items="patologias"
            multiple
            item-text="name"
            item-value="id"
            label="Patologías"
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.patologias_prenatales"
            :disabled="!history"
            outlined
            :items="patologias_prenatales"
            multiple
            item-text="nombre"
            item-value="id"
            label="Patologías prenatales"
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.patologias_maternas"
            :disabled="!history"
            outlined
            :items="patologias_maternas"
            multiple
            item-text="name"
            item-value="id"
            label="Patologías maternos"
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.patologias_paternas"
            :disabled="!history"
            outlined
            :items="patologias_paternas"
            multiple
            item-text="name"
            item-value="id"
            label="Patologías paternas"
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.sustancias_sicotropicas"
            :disabled="!history"
            outlined
            :items="sustancias_sicotroficas"
            multiple
            item-text="name"
            item-value="id"
            label="Sustancia psicotrópicas"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-textarea
            v-model="editedItem.medicamentos"
            :disabled="!history"
            outlined
            label="Indicaciones de medicamentos que ingiere"
            dense
          />
        </v-col>
      </v-row>
      <v-subheader>
        Antecedentes obstetricos
      </v-subheader>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.gestas"
            :disabled="!history"
            outlined
            label="Número de gestass"
            type="number"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.abortos"
            :disabled="!history"
            outlined
            label="Número de abortos"
            type="number"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.cesarias"
            :disabled="!history"
            outlined
            label="Número de cesarias"
            type="number"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.partos"
            :disabled="!history"
            outlined
            label="Número de partos"
            type="number"
            dense
          />
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
    psyshotrophicAllApi,
    pathologyPregnantAllApi,
  } from '@/api/modules'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
      history: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        value: '',
        editedItem: {
          antecentedes_prenatales: '',
          antecentedes_paternos: '',
          antecentedes_maternos: '',
          antecentedes_patologicos: '',
          patologias_maternas: [],
          patologias_paternas: [],
          patologias_prenatales: [],
          patologias: [],
          sustancias_sicotropicas: [],
          medicamentos: '',
          gestas: 0,
          abortos: 0,
          cesarias: 0,
          partos: 0,
        },
        sustancias_sicotroficas: [],
        patologias_maternas: [],
        patologias_paternas: [],
        patologias_prenatales: [],
        patologias: [],
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric']),
      availableSteps () {
        if (
          this.steps.includes(1)
        ) {
          this.setSteps(2)
          if (this.click) {
            if (this.click === 'next') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:next')
            }
            if (this.click === 'save') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:save')
            }
          }
        }
        return ''
      },
    },
    created () {
      this.editedItem = Object.assign({}, this.fileObstetric)
      this.itemPsicotropic()
      this.itemPathology()
      this.itemPathologyPregnant()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
      ...mapActions('pathology', ['pathologyAllActions']),
      async itemPsicotropic () {
        const serviceResponse = await psyshotrophicAllApi()
        if (serviceResponse.ok) {
          this.sustancias_sicotroficas = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemPathologyPregnant () {
        const serviceResponse = await pathologyPregnantAllApi()
        if (serviceResponse.ok) {
          this.patologias_prenatales = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemPathology () {
        const serviceResponse = await this.pathologyAllActions()
        if (serviceResponse.ok) {
          this.patologias_maternas = serviceResponse.data
          this.patologias_paternas = serviceResponse.data
          this.patologias = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
    },
  }
</script>
