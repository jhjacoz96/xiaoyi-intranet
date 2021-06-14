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
        Datos básicos de la paciente
      </v-subheader>
      <v-row
        v-if="miembro"
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.nombre"
            disabled
            outlined
            label="Nombres"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.apellido"
            outlined
            disabled
            label="Apellidos"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.type_document_id !== null"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.type_document_id.nombre"
            disabled
            outlined
            label="Tipo de documento"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.cedula !== null"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.cedula"
            disabled
            outlined
            label="Cédula"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.cultural_group_id !== null"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.cultural_group_id.name"
            disabled
            outlined
            label="Grupo cultural"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.fecha_nacimiento"
            outlined
            disabled
            label="Fecha de nacimiento"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="age"
            disabled
            outlined
            label="Edad"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.zone_id !== null"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.zone_id.name"
            disabled
            outlined
            label="Sector"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.direccion_habitual"
            disabled
            outlined
            label="Direccion de domicilio"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.scholarship_id !== null"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.scholarship_id.name"
            disabled
            outlined
            label="Nivel de instrucción"
            dense
          />
        </v-col>
        <v-col
          v-if="miembro.ocupacion"
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="miembro.ocupacion"
            disabled
            outlined
            label="Ocupacion"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="miembro.disability_id"
            v-validate="'required'"
            disabled
            multiple
            :items="discapacindades"
            item-text="name"
            item-value="id"
            outlined
            label="Discapacidades"
            dense
          />
        </v-col>
      </v-row>
      <v-subheader>
        Datos básicos de la ficha clinica de obstetricia
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
            v-model="editedItem.numero_historia"
            outlined
            disabled
            label="Número de historia"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.type_blood_id"
            outlined
            :items="typeBloods"
            item-text="name"
            item-value="id"
            label="Tipo de sangre"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.estado_civil"
            v-validate="'required'"
            :error-messages="errors.collect('basic.civilStatus')"
            data-vv-name="estado civil"
            outlined
            label="Estado civil"
            :items="['Soltera/o', 'Casada/o', 'Viuda/o']"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.vive_con"
            v-validate="'required'"
            :error-messages="errors.collect('basic.liveWith')"
            data-vv-name="vive con"
            outlined
            label="Vive con"
            dense
            validate-on-blur
          />
        </v-col>
      </v-row>
      <div class="d-flex">
        <v-subheader>
          En caso de emergencia llamar a los siguientes personas
        </v-subheader>
        <v-btn
          fab
          color="secondary"
          class="float-right d-inline-block"
          @click="addTelofono()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-container>
        <tr
          v-for="(item, index) in editedItem.telefonos"
          :key="index"
        >
          <td>
            <v-text-field
              v-model="item.nombre"
              outlined
              label="Nombre"
              dense
            />
          </td>
          <td>
            <v-text-field
              v-model="item.telefono"
              class="mx-2"
              outlined
              label="Telefono"
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.relationship_id"
              outlined
              :items="relationship"
              label="Parentesco"
              item-text="name"
              item-value="id"
              dense
            />
          </td>
          <td>
            <v-btn
              color="pink"
              icon
              dark
              @click="deleteTelefono(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </v-container>
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
  import { calAge } from '@/utils/calAge'
  import { relationshipAllApi } from '@/api/modules'
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
        editedItem: {
          numero_historia: '',
          type_blood_id: null,
          estado_civil: '',
          vive_con: '',
          telefonos: [],
        },
        discapacindades: [],
        typeBloods: [],
        relationship: [],
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric', 'miembro']),
      age () {
        if (this.miembro) return calAge(this.miembro.fecha_nacimiento)
        else return ''
      },
      // progress () {
      //   var inputs = Object.values(this.editedItem)
      //   var count = inputs.filter(item => {
      //     if (item !== undefined) return item
      //   })
      //   return Math.min(100, (count.length / 16) * 100)
      // },
      availableSteps () {
        if (
          this.editedItem.type_blood_id &&
          this.editedItem.estado_civil &&
          this.editedItem.vive_con
        ) {
          this.setSteps(1)
          if (this.click === 'next') {
            this.setFileObstetric(this.editedItem)
            this.$emit('click:next')
          }
          if (this.click === 'save') {
            this.setFileObstetric(this.editedItem)
            this.$emit('click:save')
          }
        }
        return ''
      },
    },
    created () {
      this.getFileObstetric()
      this.itemDIsability()
      this.itemTypeBlood()
      this.itemRelationship()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions', 'fileClinicalObstetricCheckActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric', 'setMiembro', 'resetFileObstetric']),
      ...mapActions('disability', ['disabilityAllActions']),
      ...mapActions('typeBlood', ['typeBloodAllActions']),
      async itemDIsability () {
        const serviceResponse = await this.disabilityAllActions()
        if (serviceResponse.ok) {
          this.discapacindades = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemTypeBlood () {
        const serviceResponse = await this.typeBloodAllActions()
        if (serviceResponse.ok) {
          this.typeBloods = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemRelationship () {
        const serviceResponse = await relationshipAllApi()
        if (serviceResponse.ok) {
          this.relationship = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async getFileObstetric () {
        this.resetFileObstetric()
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          const serviceResponse = await this.fileClinicalObstetricGetActions(this.$route.params.id)
          if (serviceResponse.ok) {
            this.setFileObstetric(serviceResponse.data)
            this.editedItem = Object.assign({}, serviceResponse.data)
            this.checkMember(serviceResponse.data.cedula)
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          this.generateCode()
        }
      },
      addTelofono () {
        var telefono = {
          nombre: '',
          telefono: '',
          relationship_id: null,
        }
        this.editedItem.telefonos.push(telefono)
      },
      deleteTelefono (val) {
        var index = this.editedItem.telefonos.indexOf(val)
        this.editedItem.telefonos.splice(index, 1)
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async checkMember (val) {
        const serviceResponse = await this.fileClinicalObstetricCheckActions(val)
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
        this.editedItem.numero_historia = `FO000${Math.round(Math.random() * (900 - 100) + 100)}`
      },
    },
  }
</script>
