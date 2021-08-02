<template>
  <v-container fluid>
    <base-material-wizard
      v-model="tab"
      :available-steps="steps"
      :items="tabs"
      :title="this.$route.params.id !== null ? 'Control de ficha familiar' : 'Encuesta para una nueva fichas familiares'"
      subtitle="Llenado de ficha familiar"
      class="mx-auto"
      :loading="loading"
      @click:next="next"
      @click:prev="tab--"
    >
      <v-tab-item class="pb-12">
        <add-data-basic
          :click="click"
          @next="click = false"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-member
          :click="click1"
          @next="click1 = false"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-classification
          :click="click2"
          @next="click2 = false"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-evolution-risk
          :click="click3"
          @next="click3 = false"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-contamination-point
          :click="click4"
          @next="click4 = false"
        />
      </v-tab-item>
    </base-material-wizard>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
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
      loading: false,
      address: '',
      city: '',
      state: '',
      states: [],
      e1: 1,
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Miembros', 'Clasificación de riesgos', 'Evolución de la gestión de risgo familiar', 'Contaminación ambiental'],
      click: false,
      click1: false,
      click2: false,
      click3: false,
      click4: false,
    }),
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      stringAccount () {
        return this.account.join(',')
      },
      scope () {
        if (this.tab === 0) return 'basicos'
        else if (this.tab === 1) return 'member'
        else if (this.tab === 2) return 'clasificacion'
        else if (this.tab === 3) return 'evolucion'
        return 'contamination'
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
      ...mapActions('fileFamily', ['fileFamilyPostActions', 'fileFamilyShowActions', 'fileFamilyUpdateActions']),
      ...mapMutations('fileFamily', ['setFileFamily', 'resetSteps']),
      ...mapMutations(['alert']),
      next () {
        if (this.tab === 0) this.click = true
        else if (this.tab === 1) this.click1 = true
        else if (this.tab === 2) this.click2 = true
        else if (this.tab === 3) this.click3 = true
        else if (this.tab === 4) this.click4 = true
        this.validateForm(this.scope).then(item => {
          if (!item) return
          if (this.tab === this.tabs.length - 1) {
            this.saveFileFamily()
          } else {
            this.tab++
          }
        })
      },
      validateForm (scope) {
        return this.$validator.validateAll(scope)
      },
      async saveFileFamily () {
        this.loading = true
        var id = this.$route.params.id
        if (id !== undefined) {
          const serviceResponse = await this.fileFamilyUpdateActions(this.fileFamily)
          console.log(serviceResponse)
          if (serviceResponse.ok) {
            this.$router.push('/intranet/ficha-familiar')
            this.loading = false
            this.resetSteps()
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.loading = false
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          const serviceResponse = await this.fileFamilyPostActions(this.fileFamily)
          if (serviceResponse.ok) {
            this.$router.push('/intranet/ficha-familiar')
            this.loading = false
            this.resetSteps()
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.loading = false
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        }
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
