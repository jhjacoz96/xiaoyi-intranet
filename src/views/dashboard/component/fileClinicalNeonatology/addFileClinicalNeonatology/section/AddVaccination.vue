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
          <v-select
            v-model="editedItem.bcg"
            v-validate="'required'"
            :error-messages="errors.collect('basic.bcg')"
            data-vv-name="bcg"
            outlined
            :items="bcg"
            label="Bcg (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.hb"
            v-validate="'required'"
            :error-messages="errors.collect('basic.hb')"
            data-vv-name="hb"
            outlined
            :items="hb"
            label="Hb (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.rotavirus"
            v-validate="'required'"
            :error-messages="errors.collect('basic.rotavirus')"
            data-vv-name="rotavirus"
            outlined
            :items="rotavirus"
            label="Rotavirus (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.fipv"
            v-validate="'required'"
            :error-messages="errors.collect('basic.fipv')"
            data-vv-name="fipv"
            outlined
            :items="fipv"
            label="Fipv (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.bopv"
            v-validate="'required'"
            :error-messages="errors.collect('basic.bopv')"
            data-vv-name="bopv"
            outlined
            :items="bopv"
            label="Bopv (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.pentavaliente"
            v-validate="'required'"
            :error-messages="errors.collect('basic.pentavaliente')"
            data-vv-name="pentavaliente"
            outlined
            :items="pentavaliente"
            label="Pentavaliente (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.neumococo"
            v-validate="'required'"
            :error-messages="errors.collect('basic.neumococo')"
            data-vv-name="neumococo"
            outlined
            :items="neumococo"
            label="Neumococo (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.influenza_estacionaria"
            v-validate="'required'"
            :error-messages="errors.collect('basic.influenza_estacionaria')"
            data-vv-name="Influenza_estacionaria"
            outlined
            :items="influenza_estacionaria"
            label="influenza_estacionaria (*)"
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
        value: '',
        id: undefined,
        showDate: false,
        show2Date: false,
        editedItem: {
          bcg: '',
          hb: '',
          rotavirus: '',
          fipv: '',
          bopv: '',
          pentavaliente: '',
          neumococo: '',
          influenza_estacionaria: '',
        },
        bcg: [
          'Dosis unica (24 H)',
        ],
        hb: [
          'Dosis unica (24 H)',
        ],
        rotavirus: [
          '1era dosis (2m)',
          '2da dosis (4m)',
        ],
        fipv: [
          '1era dosis (2m)',
          '2da dosis (4m)',
        ],
        bopv: [
          '1era dosis (6m)',
        ],
        pentavaliente: [
          '1era dosis (2m)',
          '2da dosis (4m)',
          '3ra dosis (6m)',
        ],
        neumococo: [
          '1era dosis (2m)',
          '2da dosis (4m)',
          '3ra dosis (6m)',
        ],
        influenza_estacionaria: [
          '1era dosis (6m)',
          '2da dosis (al mes de 1era dosis)',
        ],
      }
    },
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      availableSteps () {
        if (
          this.steps.includes(4)
        ) {
          this.setSteps(5)
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
      ...mapActions('gender', ['genderAllActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'setFileNeonatology', 'setMiembro', 'resetFileNeonatology']),
    },
  }
</script>
