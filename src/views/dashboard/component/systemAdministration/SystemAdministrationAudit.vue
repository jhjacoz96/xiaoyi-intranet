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
              Auditoria de transacciones del sistema
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite mantener un historial las transacciones que se han hecho en las entiedades del sistema
            </div>
          </v-col>
        </v-row>
      </template>
      <v-container>
        <v-card-text class="font-weight-bold text-center">
          Criterios busqueda
        </v-card-text>
        <v-card-text>
          <v-row
            justify="center"
            class="mx-auto"
            style="max-width: 500px;"
          >
            <v-col
              sm="6"
              cols="12"
            >
              <v-select
                v-model="filter.auditable_type"
                outlined
                dense
                :items="auditableType"
                item-text="name"
                item-value="id"
                label="Entidades"
              />
            </v-col>
            <v-col
              sm="6"
              cols="12"
            >
              <v-select
                v-model="filter.user_id"
                label="Empleados"
                outlined
                dense
                item-text="name"
                item-value="user_id"
                :items="employee"
              />
            </v-col>
            <v-col
              sm="6"
              cols="12"
            >
              <v-menu
                v-model="showDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="100px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="filter.date_start"
                    label="Fecha de creación inicial"
                    prepend-icon="mdi-calendar"
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="filter.date_start"
                  @input="showDate = false"
                />
              </v-menu>
            </v-col>
            <v-col
              sm="6"
              cols="12"
            >
              <v-menu
                v-model="show1Date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="100px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="filter.date_end"
                    label="Fecha de creación final"
                    prepend-icon="mdi-calendar"
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="filter.date_end"
                  @input="show1Date = false"
                />
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="loadingFilter"
            :loading="loadingFilter"
            @click="listItem"
          >
            <v-icon>mdi-filter</v-icon>
            Filtrar
          </v-btn>
          <v-btn
            color="secondary"
            :disabled="loadingFilter"
            outlined
            @click="share()"
          >
            Limpiar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-container>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :loading="loadingDataTable"
          loading-text="Cargando... Porfavor espere"
        >
          <template v-slot:item.created_at="{ item }">
            {{ moment(item.created_at).format('D-M-YYYY') }}
          </template>
          <template v-slot:item.user="{ item }">
            E-{{ item.user }}
          </template>
          <!-- <template v-slot:item.accion="{ item }">
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
                  @click.prevent="listChange(item.file_name)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Descargar</span>
            </v-tooltip>
          </template> -->
        </v-data-table>
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import {
    auditAllApi,
    employeeAllApi,
  } from '@/api/modules'
  import {
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        showDate: false,
        show1Date: false,
        loadingDataTable: false,
        loadingFilter: false,
        itemIndex: null,
        headers: [
          {
            text: 'Nombre',
            value: 'user.name',
          },
          {
            text: 'Cédula',
            value: 'user.document',
          },
          {
            text: 'Evento',
            value: 'event',
          },
          {
            text: 'Entidad',
            value: 'auditable_type',
          },
          {
            text: 'Objetivo',
            value: 'auditable_id',
          },
          {
            text: 'Fecha',
            value: 'created_at',
          },
        ],
        desserts: [],
        filter: {
          auditable_type: null,
          user_id: null,
          date_start: null,
          date_end: null,
        },
        filterDefault: {
          auditable_type: null,
          user_id: null,
          date_start: null,
          date_end: null,
        },
        employee: [],
        auditableType: [
          {
            name: 'Ficha familiar',
            id: 'App\\FileFamily',
          },
          {
            name: 'Ficha clinica de obstetricia',
            id: 'App\\Pregnant',
          },
          {
            name: 'Ficha clinica de neonatolgía',
            id: 'App\\FileClinicalNeonatology',
          },
          {
            name: 'Control de diabeticos',
            id: 'App\\DiabeticPatient',
          },
        ],
      }
    },
    created () {
      this.listItem()
      this.listItemEmployee()
    },
    methods: {
      ...mapMutations(['alert']),
      async listItem () {
        this.loadingDataTable = true
        this.loadingFilter = true
        const serviceResponse = await auditAllApi(this.filter)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
          Object.assign(this.filter, this.filterDefault)
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingDataTable = false
        this.loadingFilter = false
      },
      share () {
        Object.assign(this.filter, this.filterDefault)
      },
      async listItemEmployee () {
        const serviceResponse = await employeeAllApi()
        if (serviceResponse.ok) {
          this.employee = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
