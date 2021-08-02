<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      1. Datos generales
    </div> -->

    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-subheader>
        Datos de la ficha
      </v-subheader>
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="editedItem.numero_historia"
            v-validate="'required'"
            disabled
            :error-messages="errors.collect('basic.numero_historia')"
            data-vv-name="número historia"
            outlined
            label="Número de historia de la ficha clínica de neonatogía"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          v-if="miembro"
          cols="12"
          sm="6"
        >
          <v-select
            v-model="editedItem.pregnant_id"
            :items="miembro.prenatal_todos"
            item-text="numero_historia"
            disabled
            item-value="id"
            outlined
            label="Ficha clínica de obstetricia asignada"
            dense
          />
        </v-col>
      </v-row>
      <v-subheader>
        Datos básicos del neonatato
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
            v-model="editedItem.cedula"
            v-validate="'required'"
            :error-messages="errors.collect('basic.nombre')"
            data-vv-name="cedula"
            outlined
            label="Cédula (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.nombre"
            v-validate="'required'"
            :error-messages="errors.collect('basic.nombre')"
            data-vv-name="nombres"
            outlined
            label="Nombres (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.apellido"
            v-validate="'required'"
            :error-messages="errors.collect('basic.apellido')"
            data-vv-name="apellidos"
            outlined
            label="Apellidos (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.gender_id"
            v-validate="'required'"
            :error-messages="errors.collect('basic.genero')"
            data-vv-name="genero"
            outlined
            :items="gender"
            item-text="nombre"
            item-value="id"
            label="Genero (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-menu
            v-model="showDate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="100px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="editedItem.fecha_nacimiento"
                label="Fecha de nacimiento (*)"
                prepend-icon="mdi-calendar"
                :error-messages="errors.collect('member.fecha_nacimiento')"
                data-vv-name="fecha de nacimeinto"
                validate-on-blur
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="editedItem.fecha_nacimiento"
              @input="show2Date = false"
            />
          </v-menu>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.lugar_naciento"
            v-validate="'required'"
            :error-messages="errors.collect('basic.lugar_naciento')"
            data-vv-name="lugar de nacimiento"
            outlined
            label="Lugar nacimiento (*)"
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
  import {
    fileClinicalObstetricCheckPregnantApi,
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
        id: undefined,
        showDate: false,
        show2Date: false,
        editedItem: {
          numero_historia: null,
          pregnant_id: null,
          cedula: '',
          nombre: '',
          apellido: '',
          fecha_nacimiento: null,
          lugar_naciento: '',
          gender_id: null,
        },
        discapacindades: [],
        typeBloods: [],
        relationship: [],
        gender: [],
      }
    },
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      availableSteps () {
        if (
          this.editedItem.numero_historia &&
          this.editedItem.pregnant_id &&
          this.editedItem.nombre &&
          this.editedItem.cedula &&
          this.editedItem.fecha_nacimiento &&
          this.editedItem.lugar_naciento &&
          this.editedItem.gender_id &&
          this.editedItem.apellido
        ) {
          this.setSteps(1)
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
      this.getFileNeonatology()
      this.listItemGender()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyGetActions', 'fileClinicalNeonatologyCheckActions']),
      ...mapActions('gender', ['genderAllActions']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricCheckActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'setFileNeonatology', 'setMiembro', 'resetFileNeonatology']),
      async listItemGender () {
        const serviceResponse = await this.genderAllActions()
        if (serviceResponse.ok) {
          this.gender = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async getFileNeonatology () {
        this.resetFileNeonatology()
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          const serviceResponse = await this.fileClinicalNeonatologyGetActions(this.$route.params.id)
          if (serviceResponse.ok) {
            this.setFileNeonatology(serviceResponse.data)
            this.editedItem = Object.assign({}, serviceResponse.data)
            this.checkMember(serviceResponse.data.pregnant_cedula)
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          this.editedItem.pregnant_id = this.miembro.prenatal ? this.miembro.prenatal.id : null
          this.generateCode()
        }
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async checkMember (val) {
        const serviceResponse = await fileClinicalObstetricCheckPregnantApi(val)
        if (serviceResponse.ok) {
          this.setMiembro(serviceResponse.data)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      generateCode () {
        this.editedItem.numero_historia = `FN000${Math.round(Math.random() * (900 - 100) + 100)}`
      },
    },
  }
</script>
