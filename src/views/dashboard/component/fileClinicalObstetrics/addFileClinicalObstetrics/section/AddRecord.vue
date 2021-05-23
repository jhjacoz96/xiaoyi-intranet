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
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-textarea
            v-model="editedItem.antecentedes_prenatales"
            v-validate="'required'"
            :error-messages="errors.collect('basic.antecentedes_prenatales')"
            data-vv-name="antecedntes prenatales"
            outlined
            label="Antecedentes prenatales"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-textarea
            v-model="editedItem.antecentedes_paternos"
            v-validate="'required'"
            :error-messages="errors.collect('basic.antecentedes_paternos')"
            data-vv-name="antecedntes paternos"
            outlined
            label="Antecedentes paternos"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-textarea
            v-model="editedItem.antecentedes_maternos"
            v-validate="'required'"
            :error-messages="errors.collect('basic.antecentedes_maternos')"
            data-vv-name="antecedntes maternos"
            outlined
            label="Antecedentes maternos"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-textarea
            v-model="editedItem.antecentedes_patologicos"
            v-validate="'required'"
            :error-messages="errors.collect('basic.antecentedes_patologicos')"
            data-vv-name="antecedntes patológicos"
            outlined
            label="Antecedentes patológicos"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.sustancias_sicotropicas"
            v-validate="'required'"
            :error-messages="errors.collect('basic.psychotropic')"
            data-vv-name="sustancias psicotrópicas"
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
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.medicamentos"
            v-validate="'required'"
            :error-messages="errors.collect('basic.medicine')"
            data-vv-name="medicine "
            outlined
            label="Medicamentos que ingiere"
            dense
            validate-on-blur
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
          <v-subheader class="pl-0">
            Número de gestas
          </v-subheader>
          <v-slider
            v-model="editedItem.gestas"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de abortos
          </v-subheader>
          <v-slider
            v-model="editedItem.abortos"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de cesarias
          </v-subheader>
          <v-slider
            v-model="editedItem.cesarias"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Número de partos
          </v-subheader>
          <v-slider
            v-model="editedItem.partos"
            :thumb-size="24"
            max="50"
            min="0"
            :thumb-label="true"
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
        value: '',
        editedItem: {
          antecentedes_prenatales: '',
          antecentedes_paternos: '',
          antecentedes_maternos: '',
          antecentedes_patologicos: '',
          sustancias_sicotropicas: [],
          medicamentos: '',
          gestas: 0,
          abortos: 0,
          cesarias: 0,
          partos: 0,
        },
        sustancias_sicotroficas: [],
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
              console.log('entro')
              this.setFileObstetric(this.editedItem)
              this.$emit('click:next')
            }
            if (this.click === 'save') {
              console.log('entro')
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
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
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
