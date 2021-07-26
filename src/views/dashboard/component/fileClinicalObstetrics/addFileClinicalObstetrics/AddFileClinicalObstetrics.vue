<template>
  <v-container fluid>
    <base-material-wizard-two
      v-model="tab"
      :available-steps="steps"
      :items="tabs"
      :title="history ? 'Control de ficha clinica de obstetricia' : 'Visualizar ficha clinica de obstetricia'"
      subtitle="Llenado de ficha clinica de obstetricia"
      class="mx-auto"
      :history="history"
      :loading="loading"
      @click:event="event($event)"
      @click:next="next"
      @click:prev="tab--"
      @click:save="confirmSave"
    >
      <v-tab-item class="pb-12">
        <add-basic-data
          :history="history"
          :click="click"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-record
          :history="history"
          :click="click1"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-obstetric-data
          :history="history"
          :click="click2"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-plan-birth
          :history="history"
          :click="click3"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-birth
          :history="history"
          :click="click4"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-puerperium
          :history="history"
          :click="click5"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>
    </base-material-wizard-two>
    <v-dialog
      v-model="dialogConfirm"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          ¿Está seguro de realizar esta acción?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="dialogConfirm = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="pinck"
            text
            @click="save"
          >
            Confirmar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    props: {
      history: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      dialogConfirm: false,
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
      tabs: ['Datos generales', 'Antecedentes', 'Datos obstetricos', 'Planificación de parto', 'Parto', 'Puerperio'],
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
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions', 'fileClinicalObstetricUpdateActions', 'fileClinicalObstetricPostActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'resetSteps']),
      next () {
        if (this.tab === 0) this.click = ''
        if (this.tab === 1) this.click1 = ''
        if (this.tab === 2) this.click2 = ''
        if (this.tab === 3) this.click3 = ''
        if (this.tab === 4) this.click4 = ''
        if (this.tab === 5) this.click5 = ''
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
        this.addFile()
      },
      confirmSave () {
        if (this.tab === 0) this.click = ''
        if (this.tab === 1) this.click1 = ''
        if (this.tab === 2) this.click2 = ''
        if (this.tab === 3) this.click3 = ''
        if (this.tab === 4) this.click4 = ''
        this.dialogConfirm = true
      },
      async addFile () {
        this.dialogConfirm = false
        this.loading = true
        if (this.$route.params.id) {
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
          console.log(this.fileObstetric)
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
