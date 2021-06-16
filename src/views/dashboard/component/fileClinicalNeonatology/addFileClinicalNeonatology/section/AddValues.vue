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
          <v-text-field
            v-model="editedItem.peso"
            v-validate="'required'"
            :error-messages="errors.collect('basic.peso')"
            data-vv-name="peso"
            outlined
            label="Peso (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.perimetro_abdominal"
            v-validate="'required'"
            :error-messages="errors.collect('basic.perimetro_abdominal')"
            data-vv-name="perímetro abdominal"
            outlined
            label="Perímetro abdominal (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.perimetro_cefalico"
            v-validate="'required'"
            :error-messages="errors.collect('basic.perimetro_cefalico')"
            data-vv-name="perímetro cefálico"
            outlined
            label="Perímetro cefálico (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.perimetro_toracico"
            v-validate="'required'"
            :error-messages="errors.collect('basic.perimetro_toracico')"
            data-vv-name="perímetro torácico"
            outlined
            label="Perímetro torácico (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.longitu_cefalo_caudal"
            v-validate="'required'"
            :error-messages="errors.collect('basic.longitu_cefalo_caudal')"
            data-vv-name="longitud cefalo caudal"
            outlined
            label="Longitud cefalo caudal (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.temperatura"
            v-validate="'required'"
            :error-messages="errors.collect('basic.temperatura')"
            data-vv-name="temperatura"
            outlined
            label="Temperatura (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.respiracion"
            v-validate="'required'"
            :error-messages="errors.collect('basic.respiracion')"
            :items="respiracion"
            data-vv-name="respiración"
            outlined
            label="Respiración"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.piel"
            v-validate="'required'"
            :error-messages="errors.collect('basic.piel')"
            :items="piel"
            data-vv-name="piel"
            outlined
            label="Piel"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.tonicidad"
            v-validate="'required'"
            :error-messages="errors.collect('basic.tonicidad')"
            :items="tonicidad"
            data-vv-name="tonicidad"
            outlined
            label="Tonicidad (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.cordon_umbilical"
            v-validate="'required'"
            :error-messages="errors.collect('basic.cordon_umbilical')"
            :items="cordon"
            data-vv-name="cordón umbilical"
            outlined
            label="Cordón umbilical (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.orina"
            v-validate="'required'"
            :error-messages="errors.collect('basic.orina')"
            data-vv-name="orina"
            outlined
            label="Orina (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.deposiciones"
            v-validate="'required'"
            :error-messages="errors.collect('basic.deposiciones')"
            data-vv-name="deposiciones"
            outlined
            label="Deposiciones (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.vomitos"
            v-validate="'required'"
            :error-messages="errors.collect('basic.vomitos')"
            data-vv-name="vomitos"
            outlined
            label="Vomitos (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.coordinacion_motora"
            v-validate="'required'"
            :error-messages="errors.collect('basic.coordinacion_motora')"
            data-vv-name="coordinacion_motora"
            outlined
            label="Coordinación motora (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.extreminades"
            v-validate="'required'"
            :error-messages="errors.collect('basic.extreminades')"
            data-vv-name="extreminades"
            outlined
            label="Extremidades superiores e inferiores (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.genitales"
            v-validate="'required'"
            :error-messages="errors.collect('basic.genitales')"
            data-vv-name="genitales"
            outlined
            label="Genitales (*)"
            dense
            validate-on-blur
          />
        </v-col>
      </v-row>
      <v-subheader>
        Ojos
      </v-subheader>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Profilaxis oftaálmica
          </p>
          <v-radio-group
            v-model="editedItem.profilaxis"
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
            Supuración
          </p>
          <v-radio-group
            v-model="editedItem.supuración"
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
          <v-text-field
            v-model="editedItem.posicion"
            v-validate="'required'"
            :error-messages="errors.collect('basic.posicion')"
            data-vv-name="posicion"
            outlined
            label="Posición (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.estado"
            v-validate="'required'"
            :error-messages="errors.collect('basic.estado')"
            data-vv-name="estado"
            outlined
            label="Estado (*)"
            dense
            validate-on-blur
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
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        editedItem: {
          peso: '',
          perimetro_abdominal: '',
          perimetro_cefalico: '',
          perimetro_toracico: '',
          longitu_cefalo_caudal: '',
          temperatura: '',
          profilaxis: false,
          supuración: false,
          posicion: '',
          estado: '',
          respiracion: '',
          piel: '',
          tonicidad: '',
          cordon_umbilical: '',
          orina: '',
          deposiciones: '',
          vomitos: '',
          coordinacion_motora: '',
          extreminades: '',
          genitales: '',
        },
        respiracion: [
          'Eupnético',
          'Aleteo Nasal',
          'Retracción Xifoidea',
          'Retraccion intercostal',
          'Quejido,murmullos,sibilancias',
        ],
        piel: [
          'Rosada',
          'Pálido',
          'Cianósis',
          'Lotericia',
        ],
        tonicidad: [
          'Hipertónica',
          'Hipótonica',
          'Normal',
        ],
        cordon: [
          'Buen aspecto',
          'Mal olor-supuracion',
          'Presencia de hemorragía',
        ],
      }
    },
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      availableSteps () {
        if (
          this.steps.includes(2)
        ) {
          this.setSteps(3)
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
    created () {
      this.editedItem = Object.assign({}, this.fileNeonatology)
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyGetActions', 'fileClinicalNeonatologyCheckActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('typeBlood', ['typeBloodAllActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'setFileNeonatology', 'setMiembro', 'resetFileNeonatology']),
    },
  }
</script>
