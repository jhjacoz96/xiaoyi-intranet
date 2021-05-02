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
        <add-basic-data @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-record @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-obstetric-data @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-plan-birth @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-birth @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-puerperium @data="event($event)" />
      </v-tab-item>
    </base-material-wizard>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsWizard',
    components: {
      AddBasicData: () => import('./section/AddBasicData'),
      AddRecord: () => import('./section/AddRecord'),
      AddObstetricData: () => import('./section/AddObstetricData'),
      AddPlanBirth: () => import('./section/AddPlanBirth'),
      AddBirth: () => import('./section/AddBirth'),
      AddPuerperium: () => import('./section/AddPuerperium'),
    },
    data: () => ({
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Antecedentes', 'Datos obstetricos', 'Planificación de parto', 'Parto', 'Purperio'],
    }),

    computed: {
      scope () {
        if (this.tab === 0) return 'general'
        else if (this.tab === 1) return 'antecedents'
        else if (this.tab === 2) return 'obstetricos'
        else if (this.tab === 3) return 'planificacio'
        return 'purperio'
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
