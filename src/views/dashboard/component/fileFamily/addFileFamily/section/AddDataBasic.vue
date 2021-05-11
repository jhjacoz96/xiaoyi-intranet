<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      1. Datos generales
    </div>
    <v-form
      ref="form"
      data-vv-scope="risk"
    >
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.institution"
            v-validate="'required'"
            :error-messages="errors.collect('basic.institution')"
            data-vv-name="institution"
            outlined
            dense
            label="institución del sistema"
            :items="institution"
            item-text="name"
            validate-on-blur
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.unidad"
            v-validate="'required'"
            :error-messages="errors.collect('basic.unidad')"
            data-vv-name="unidad"
            outlined
            label="Nombre de la unidad operativa"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.codeOu"
            v-validate="'required'"
            :error-messages="errors.collect('basic.codeUo')"
            data-vv-name="codeUo"
            outlined
            label="Código UO"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model.number="editedItem.number"
            v-validate="'required'"
            :error-messages="errors.collect('basic.number')"
            data-vv-name="number"
            outlined
            label="Número de área"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.idProvince"
            v-validate="'required'"
            :error-messages="errors.collect('basic.province')"
            :autocomplete="customFilter"
            data-vv-name="province"
            :items="states"
            item-text="name"
            item-value="id"
            outlined
            dense
            label="Provincia"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            v-model="editedItem.idCanton"
            v-validate="'required'"
            :error-messages="errors.collect('basic.canton')"
            data-vv-name="canton"
            outlined
            dense
            label="Cantón"
            validate-on-blur
            :autocomplete="customFilter"
            :items="canton"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.parish"
            v-validate="'required'"
            :error-messages="errors.collect('basic.parish')"
            data-vv-name="parish"
            dense
            outlined
            label="Parroquia"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.sector"
            v-validate="'required'"
            :error-messages="errors.collect('basic.sector')"
            data-vv-name="sector"
            dense
            outlined
            label="Sector"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.apple"
            v-validate="'required'"
            :error-messages="errors.collect('basic.apple')"
            data-vv-name="apple"
            dense
            outlined
            label="Manzana"
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model.number="editedItem.numberFamily"
            v-validate="'required'"
            :error-messages="errors.collect('basic.numberFamily')"
            data-vv-name="numberFamily"
            outlined
            label="Número de familia"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.address"
            v-validate="'required'"
            :error-messages="errors.collect('basic.address')"
            data-vv-name="address"
            outlined
            label="Dircción habitual de la familia"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.neighborhood"
            v-validate="'required'"
            :error-messages="errors.collect('basic.neighborhood')"
            data-vv-name="neighborhood"
            validate-on-blur
            outlined
            label="Barrio"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.numberHouse"
            v-validate="'required'"
            :error-messages="errors.collect('basic.numberHouse')"
            data-vv-name="numberHouse"
            outlined
            label="Número de casa"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.idComunity"
            v-validate="'required'"
            :error-messages="errors.collect('basic.community')"
            data-vv-name="community"
            outlined
            label="Comunidad"
            dense
            validate-on-blur
            :items="comunity"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.idCulturalGroup"
            v-validate="'required'"
            :error-messages="errors.collect('basic.culturalGroup')"
            data-vv-name="culturalGroup"
            outlined
            label="Grupo cultural"
            dense
            validate-on-blur
            :items="cuturalGroup"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.nomberBoss"
            v-validate="'required'"
            :error-messages="errors.collect('basic.nomberBoss')"
            data-vv-name="nomberBoss"
            outlined
            label="Nombre y apellido del jefe de la familia"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.phone"
            v-validate="'required'"
            :error-messages="errors.collect('basic.phone')"
            data-vv-name="phone"
            outlined
            label="Número de telefono"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.folderNumber"
            v-validate="'required'"
            :error-messages="errors.collect('basic.folderNumber')"
            data-vv-name="folderNumber"
            outlined
            label="Número de carpeta"
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
    mapActions,
  } from 'vuex'
  export default {
    data () {
      return {
        value: '',
        states: [
          { name: 'Florida', abbr: 'FL', id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2 },
          { name: 'Nebraska', abbr: 'NE', id: 3 },
          { name: 'California', abbr: 'CA', id: 4 },
          { name: 'New York', abbr: 'NY', id: 5 },
        ],
        canton: [
          { name: 'Zuay', abbr: 'FL', id: 1 },
          { name: 'Quito', abbr: 'GA', id: 2 },
          { name: 'Guayaquil', abbr: 'NE', id: 3 },
        ],
        institution: [
          { name: 'Fuerzas armadas', id: 1 },
          { name: 'MSP', id: 2 },
        ],
        cuturalGroup: [
          { name: 'Inka', id: 1 },
          { name: 'Yanomani', id: 2 },
        ],
        comunity: [
          { name: 'La paz', id: 1 },
          { name: 'Pichinca', id: 2 },
        ],
        editedItem: {
          institution: 1,
          unidad: 'd',
          codeOu: 'd',
          number: 2,
          idProvince: 1,
          idCanton: 1,
          parish: 'dd',
          sector: 'ddd',
          numberFamily: 1,
          apple: 'ddd',
          neighborhood: 'ddd',
          folderNumber: 12321,
          address: 'ddd',
          numberHouse: 22,
          phone: '2222',
          idComunity: 1,
          idCulturalGroup: 1,
          nomberBoss: 'dd',
        },
        organization: {},
      }
    },
    computed: {
      // progress () {
      //   var inputs = Object.values(this.editedItem)
      //   var count = inputs.filter(item => {
      //     if (item !== undefined) return item
      //   })
      //   return Math.min(100, (count.length / 16) * 100)
      // },
      availableSteps () {
        const steps = [0]
        if (
          this.editedItem.institution &&
          this.editedItem.unidad &&
          this.editedItem.codeOu &&
          this.editedItem.number &&
          this.editedItem.idProvince &&
          this.editedItem.idCanton &&
          this.editedItem.parish &&
          this.editedItem.sector &&
          this.editedItem.phone &&
          this.editedItem.numberFamily &&
          this.editedItem.folderNumber &&
          this.editedItem.apple &&
          this.editedItem.neighborhood &&
          this.editedItem.address &&
          this.editedItem.numberHouse &&
          this.editedItem.idComunity &&
          this.editedItem.idCulturalGroup &&
          this.editedItem.nomberBoss
        ) steps.push(1)
        this.$emit('data', steps)
        return steps
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapActions('configWeb', ['webOrganizationPostActions', 'webOrganizationAllActions']),
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async listItem () {
        const serviceResponsee = await this.webOrganizationAllActions()
        if (serviceResponsee.ok) {
          this.organization = serviceResponsee.data
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
