<template>
  <v-card
    height="350"
  >
    <v-card-title class="text-h4 mb-2">
      Acceso rápido
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="search"
        outlined
        dense
        label="¿Qué desea buscar?"
        item-text="name"
        item-value="name"
        :items="filterTypeFiles"
      />
      <v-text-field
        v-model="editedItem.numero_historia"
        :label="label"
        dense
        outlined
        prepend-inner-icon="mdi-file"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :loading="loading"
        :disabled="loading || avalided"
        color="primary"
        @click="addItem"
      >
        Buscar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {
    fileFamilySearchNumberApi,
    fileClinicalObstetricSearchNumberApi,
    fileClinicalNeonatologySearchNumberApi,
  } from '@/api/modules'
  import {
    mapMutations,
    mapState,
  } from 'vuex'
  export default {
    data () {
      return {
        loading: false,
        search: 'Ficha familiar',
        data: null,
        editedItem: {
          numero_historia: '',
        },
        typeFiles: [
          {
            name: 'Ficha familiar',
            can: 'file_familiy_access',
          },
          {
            name: 'Ficha clinica de obstetricia',
            can: 'obstetrics_access',
          },
          {
            name: 'Ficha clinica de neonatología',
            can: 'neonatology_access',
          },
        ],
      }
    },
    computed: {
      ...mapState('auth', ['user', 'permissions']),
      avalided () {
        if (this.editedItem.numero_historia === '') return true
        return false
      },
      filterTypeFiles () {
        return this.typeFiles.filter(item => this.permissions.includes(item.can))
      },
      label () {
        if (this.search === 'Ficha familiar') return 'Número de historia óo cédula de miembro'
        if (this.search === 'Ficha clinica de obstetricia') return 'Número de historia'
        if (this.search === 'Ficha clinica de neonatología') return 'Número de historia o cédula'
        return 'Número de historia'
      },
    },
    methods: {
      ...mapMutations(['alert']),
      async addItem () {
        this.loading = true
        var serviceResponse = null
        if (this.search === 'Ficha familiar') {
          serviceResponse = await fileFamilySearchNumberApi(this.editedItem.numero_historia)
        } else if (this.search === 'Ficha clinica de obstetricia') {
          serviceResponse = await fileClinicalObstetricSearchNumberApi(this.editedItem.numero_historia)
          console.log(serviceResponse)
        } else {
          serviceResponse = await fileClinicalNeonatologySearchNumberApi(this.editedItem.numero_historia)
        }
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
          if (this.search === 'Ficha familiar') {
            this.$router.push(`/intranet/ficha-familiar/${this.data.id}`)
          } else if (this.search === 'Ficha clinica de obstetricia') {
            this.$router.push(`/intranet/ficha-clinica-obstetricia/${this.data.recomendaciones !== null ? 'visualizar' : 'actualizar'}/${this.data.id}`)
          } else {
            this.$router.push(`/intranet/ficha-clinica-neonatologia/${this.data.id}`)
          }
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loading = false
        this.editedItem.numero_historia = ''
      },
    },
  }
</script>
