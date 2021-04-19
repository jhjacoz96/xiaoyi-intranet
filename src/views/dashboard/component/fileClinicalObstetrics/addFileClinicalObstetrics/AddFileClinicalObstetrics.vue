<template>
  <v-container fluid>
    <base-material-wizard
      v-model="tab"
      :available-steps="step"
      :items="tabs"
      title="Registro de ficha clinica de obstetricia"
      subtitle="Llenado de ficha clinica de obstetricia"
      class="mx-auto"
      @click:next="next"
      @click:prev="tab--"
    >
      <v-tab-item class="pb-12">
        Datos generales
      </v-tab-item>

      <v-tab-item class="pb-12">
        Antecedentes
      </v-tab-item>

      <v-tab-item class="pb-12">
        Datos obtetricos
      </v-tab-item>

      <v-tab-item class="pb-12">
        Planificación de parto
      </v-tab-item>

      <v-tab-item class="pb-12">
        Parto
      </v-tab-item>

      <v-tab-item class="pb-12">
        Purperio
      </v-tab-item>
    </base-material-wizard>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsWizard',
    data: () => ({
      address: '',
      city: '',
      state: '',
      states: [],
      e1: 1,
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Antecedentes', 'Datos obstetricos', 'Planificación de parto', 'Parto', 'Purperio'],
    }),

    computed: {
      stringAccount () {
        return this.account.join(',')
      },
      scope () {
        if (this.tab === 0) return 'basicos'
        else if (this.tab === 1) return 'member'
        return 'risks'
      },
    },

    methods: {
      next () {
        this.validateForm(this.scope).then(item => {
          if (!item) return

          if (this.tab === this.tabs.length - 1) {
            alert('Form finished')
          } else {
            this.tab++
          }
        })
      },
      event (val) {
        this.step = val
      },
      validateForm (scope) {
        return this.$validator.validateAll(scope)
      },
    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    border-color: currentColor
    border-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    border-radius: 50%

</style>
