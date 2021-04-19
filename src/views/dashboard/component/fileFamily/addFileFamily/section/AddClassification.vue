<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Clasificación de riesgos familiares
    </div>
    <!-- <v-progress-linear
      :value="progress"
      absolute
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 700px;"
      >
        <v-col
          cols="12"
        >
          dddd
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        value: '',
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
          address: 'ddd',
          numberHouse: 22,
          idComunity: 1,
          idCulturalGroup: 1,
          nomberBoss: 'dd',
        },
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
    },
  }
</script>
