<template>
  <v-container fluid>
    <base-material-wizard-two
      v-model="tab"
      :available-steps="steps"
      :items="tabs"
      :title="!this.$route.params.id ? 'Registro de ficha clinica de obstetricia' : 'Actualizar ficha clinica de obstetricia'"
      subtitle="Llenado de ficha clinica de obstetricia"
      class="mx-auto"
      :loading="loading"
      @click:event="event($event)"
      @click:next="next"
      @click:prev="tab--"
      @click:save="save"
    >
      <v-tab-item class="pb-12">
        <add-basic-data
          :click="click"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-record
          :click="click1"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-obstetric-data
          :click="click2"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-plan-birth
          :click="click3"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-birth
          :click="click4"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-puerperium
          :click="click5"
          @click:save="save"
          @click:next="next"
        />
      </v-tab-item>
    </base-material-wizard-two>
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
      AddBasicData: () => import('./section/AddBasicData'),
      AddRecord: () => import('./section/AddRecord'),
      AddObstetricData: () => import('./section/AddObstetricData'),
      AddPlanBirth: () => import('./section/AddPlanBirth'),
      AddBirth: () => import('./section/AddBirth'),
      AddPuerperium: () => import('./section/AddPuerperium'),
    },
    data: () => ({
      click: '',
      click1: '',
      click2: '',
      click3: '',
      click4: '',
      click5: '',
      loading: false,
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Antecedentes', 'Datos obstetricos', 'Planificación de parto', 'Parto', 'Purperio'],
    }),
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric', 'miembro']),
      scope () {
        if (this.tab === 0) return 'general'
        else if (this.tab === 1) return 'antecedents'
        else if (this.tab === 2) return 'obstetricos'
        else if (this.tab === 3) return 'planificacio'
        else if (this.tab === 4) return 'parto'
        return 'purperio'
      },
    },
    destroyed () {
      console.log('f')
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions', 'fileClinicalObstetricUpdateActions', 'fileClinicalObstetricPostActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'resetSteps']),
      next () {
        if (this.tab === 0) this.click = null
        if (this.tab === 1) this.click1 = null
        if (this.tab === 2) this.click2 = null
        if (this.tab === 3) this.click3 = null
        if (this.tab === 4) this.click4 = null
        if (this.tab === 5) this.click5 = null
        this.validateForm(this.scope).then(item => {
          if (!item) return

          if (this.tab === this.tabs.length - 1) {
            this.addFile()
          } else {
            this.tab++
          }
        })
      },
      save () {
        if (this.tab === 0) this.click = null
        if (this.tab === 1) this.click1 = null
        if (this.tab === 2) this.click2 = null
        if (this.tab === 3) this.click3 = null
        if (this.tab === 4) this.click4 = true
        if (this.tab === 5) this.click5 = null
        this.addFile()
      },
      async addFile () {
        this.loading = true
        console.log(this.$route.params.id)
        if (this.$route.params.id) {
          console.log('editar')
          const serviceResponse = await this.fileClinicalObstetricUpdateActions(this.fileObstetric)
          console.log(serviceResponse)
          this.loading = false
          if (serviceResponse.ok) {
            this.resetSteps()
            this.$router.push('/intranet/ficha-clinica-obstetricia')
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          console.log('guardar')
          const serviceResponse = await this.fileClinicalObstetricPostActions(this.fileObstetric)
          console.log(serviceResponse)
          this.loading = false
          if (serviceResponse.ok) {
            this.resetSteps()
            this.$router.push('/intranet/ficha-clinica-obstetricia')
            this.alert({
              text: serviceResponse.message,
              color: 'success',
            })
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        }
      },
      event (val) {
        if (this.tab === 0) this.click = val
        if (this.tab === 1) this.click1 = val
        if (this.tab === 2) this.click2 = val
        if (this.tab === 3) this.click3 = val
        if (this.tab === 4) this.click4 = val
        if (this.tab === 5) this.click5 = val
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
