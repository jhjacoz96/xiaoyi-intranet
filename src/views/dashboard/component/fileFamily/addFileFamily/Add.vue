<template>
  <v-container fluid>
    <base-material-wizard
      v-model="tab"
      :available-steps="step"
      :items="tabs"
      title="Encuesta para una nueva fichas familiares"
      subtitle="Llenado de ficha familiar"
      class="mx-auto"
      @click:next="next"
      @click:prev="tab--"
    >
      <v-tab-item class="pb-12">
        <add-data-basic @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-member @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-classification @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-evolution-risk @data="event($event)" />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-contamination-point @data="event($event)" />
      </v-tab-item>
    </base-material-wizard>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsWizard',
    components: {
      AddDataBasic: () => import('./section/AddDataBasic'),
      AddMember: () => import('./section/AddMember'),
      AddClassification: () => import('./section/AddClassification'),
      AddEvolutionRisk: () => import('./section/AddEvolutionRisk'),
      AddContaminationPoint: () => import('./section/AddContaminationPoint'),
    },
    data: () => ({
      address: '',
      city: '',
      state: '',
      states: [],
      e1: 1,
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Miembros', 'Clasificación de riesgos', 'Evolución de la gestión de risgo familiar', 'Contaminación ambiental'],
    }),

    computed: {
      stringAccount () {
        return this.account.join(',')
      },
      scope () {
        if (this.tab === 0) return 'basicos'
        else if (this.tab === 1) return 'member'
        else if (this.tab === 2) return 'clasificacion'
        return 'evolution'
      },
      // availableSteps () {
      //   const steps = [0]
      //   steps.push(1)

      //   if (this.stringAccount && steps.includes(1)) steps.push(2)

      //   if (
      //     this.address &&
      //     this.street &&
      //     this.city &&
      //     this.state &&
      //     steps.includes(2)
      //   ) steps.push(3)

      //   return steps
      // },
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
