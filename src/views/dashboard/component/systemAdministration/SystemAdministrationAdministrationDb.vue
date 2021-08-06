<template>
  <v-container>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col
            cols="2"
          >
            <v-btn
              icon
              large
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="10"
          >
            <div class="text-h3 font-weight-medium">
              Administración de base de datos
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite realizar todas las operaciones básicas referente a la base de datos
            </div>
          </v-col>
        </v-row>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              absolute
              fab
              right
              color="secondary"
              :disabled="loadingBackup"
              :loading="loadingBackup"
              v-bind="attrs"
              v-on="on"
              @click.prevent="itemBackup"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Crear backup</span>
        </v-tooltip>
      </template>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.last_modified="{ item }">
            {{ moment(item.last_modified*1000, 'x').locale('es').format('DD MMM YYYY hh:mm') }}
          </template>
          <template v-slot:item.accion="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  :loading="loadingDownload"
                  :disabled="loadingDownload"
                  color="info"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click.prevent="dowloandFile(item.file_name)"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                </v-btn>
              </template>
              <span>Descargar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  color="pink"
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                  @click="deleteItem(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
    <v-dialog
      v-model="dialogDelete"
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
            @click="closeDelete"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="pinck"
            text
            @click="deleteItemConfirm"
          >
            Eliminar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import {
    backupAllApi,
    backupDeleteApi,
    backupCreateApi,
  } from '@/api/modules'
  import {
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        dialogDelete: false,
        loadingDownload: false,
        loadingBackup: false,
        loadingDataTable: false,
        itemIndex: null,
        headers: [
          {
            text: 'Archivo',
            value: 'file_name',
          },
          {
            text: 'Tamaño',
            value: 'file_size',
          },
          {
            text: 'Fecha',
            value: 'last_modified',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [],
      }
    },
    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.listItem()
    },
    methods: {
      ...mapMutations(['alert']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await backupAllApi()
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingDataTable = false
      },
      async dowloandFile (filename) {
        this.loadingDownload = true
        const { token } = localStorage
        const defaultHeaders = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + `${token}`,
        }
        axios({
          url: this.$store.state.urlApi + `/api/administration-system/backup-db/download/${filename}`,
          method: 'GET',
          headers: defaultHeaders,
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'KATHANI.zip')
          document.body.appendChild(link)
          link.click()
          this.loadingDownload = false
        }).catch(e => {
          this.loadingDownload = false
        })
      },
      async deleteItem (item) {
        this.itemIndex = item.file_name
        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        const serviceResponse = await backupDeleteApi(this.itemIndex)
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.alert({
            text: serviceResponse.message,
            color: 'success',
          })
          var item = this.desserts.find(item => item.file_name === this.itemIndex)
          var index = this.desserts.indexOf(item)
          this.desserts.splice(index, 1)
        } else {
          this.alert({
            text: serviceResponse.message.text + 'por favor recargue la página para visualizar el registro',
            color: 'warning',
          })
        }
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.itemIndex = null
        })
      },
      async itemBackup () {
        this.loadingBackup = true
        const serviceResponse = await backupCreateApi()
        if (serviceResponse.ok) {
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
        this.loadingBackup = false
      },
    },
  }
</script>
