<template>
  <v-container fluid>
    <base-material-wizard-two
      v-model="tab"
      :available-steps="steps"
      :items="tabs"
      :title="!this.$route.params.id ? 'Registro de ficha clinica de neonatología' : 'Control de ficha clinica de neonatología'"
      subtitle="Llenado de ficha clinica de neonatología"
      class="mx-auto"
      :loading="loading"
      @click:event="event($event)"
      @click:next="next"
      @click:prev="tab--"
      @click:save="confirmSave"
    >
      <v-tab-item class="pb-12">
        <add-data-basic
          :click="click"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-record
          :click="click1"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-values
          :click="click2"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-test
          :click="click3"
          @click:save="confirmSave"
          @click:next="next"
        />
      </v-tab-item>

      <v-tab-item class="pb-12">
        <add-vaccination
          :click="click4"
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
      AddDataBasic: () => import('./section/AddDataBasic'),
      AddRecord: () => import('./section/AddRecord'),
      AddValues: () => import('./section/AddValues'),
      AddTest: () => import('./section/AddTest'),
      AddVaccination: () => import('./section/AddVaccination'),
    },
    data: () => ({
      dialogConfirm: false,
      click: '',
      click1: '',
      click2: '',
      click3: '',
      click4: '',
      loading: false,
      step: [],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Antecedentes', 'Valoración', 'Test', 'Vacunación'],
    }),
    computed: {
      ...mapState('fileClinicalNeonatology', ['steps', 'fileNeonatology', 'miembro']),
      scope () {
        if (this.tab === 0) return 'general'
        else if (this.tab === 1) return 'antecedents'
        else if (this.tab === 2) return 'valoracion'
        else if (this.tab === 3) return 'test'
        return 'vacunación'
      },
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalNeonatology', ['fileClinicalNeonatologyGetActions', 'fileClinicalNeonatologyUpdateActions', 'fileClinicalNeonatologyPostActions']),
      ...mapMutations('fileClinicalNeonatology', ['setSteps', 'resetSteps']),
      next () {
        if (this.tab === 0) this.click = ''
        if (this.tab === 1) this.click1 = ''
        if (this.tab === 2) this.click2 = ''
        if (this.tab === 3) this.click3 = ''
        if (this.tab === 4) this.click4 = ''
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
          const serviceResponse = await this.fileClinicalNeonatologyUpdateActions(this.fileNeonatology)
          this.loading = false
          if (serviceResponse.ok) {
            this.resetSteps()
            this.$router.push('/intranet/ficha-clinica-neonatologia')
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
          const serviceResponse = await this.fileClinicalNeonatologyPostActions(this.fileNeonatology)
          this.loading = false
          if (serviceResponse.ok) {
            this.resetSteps()
            this.$router.push('/intranet/ficha-clinica-neonatologia')
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
