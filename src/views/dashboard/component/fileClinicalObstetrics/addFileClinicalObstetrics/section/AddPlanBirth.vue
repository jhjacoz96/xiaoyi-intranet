<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Planificación de parto
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
        >
          <v-text-field
            v-model="editedItem.dar_luz"
            v-validate="'required'"
            label="¿Cómo desea dar a luz?"
            outlined
            dense
            :error-messages="errors.collect('basic.dar_luz')"
            data-vv-name="estado civil"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
            v-model="editedItem.nombre_acompanate"
            v-validate="'required'"
            label="Nombre del acompañante"
            outlined
            dense
            :error-messages="errors.collect('basic.nombre_acompanate')"
            data-vv-name="nombre del acompañante"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Si fuera necesario, aceptaria que su hijo recibiera fórmula?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.aceptaria_formula"
            row
            mandatory
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            En caso de hemorragia ¿aceptaría la administración de algún hemoderivado?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.administrar_hemoderivado"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Ha realizado estimulación durante el embarazo?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.estimulacion_embarazo"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Ha asistido alguna capacitación prenatal?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.capacitacion_prenatal"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-subheader class="pl-0">
            ¿Desea la administrción de epidural?
          </v-subheader>
          <v-radio-group
            v-model="editedItem.capacitacion_epidural"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="1"
            />
            <v-radio
              label="No"
              :value="0"
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
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        dialog: false,
        value: '',
        show2Date: false,
        showDate: false,
        editedItem: {
          dar_luz: '',
          nombre_acompanate: '',
          aceptaria_formula: false,
          administrar_hemoderivado: false,
          estimulacion_embarazo: false,
          capacitacion_prenatal: false,
          capacitacion_epidural: false,
        },
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric']),
      availableSteps () {
        if (
          this.editedItem.dar_luz &&
          this.editedItem.nombre_acompanate &&
          this.steps.includes(3)
        ) {
          this.setSteps(4)
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
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
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
