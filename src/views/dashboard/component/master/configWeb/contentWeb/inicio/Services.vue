<template>
  <v-container>
    <v-card-title>
      <!-- Nutrition
      <v-spacer /> -->
      <v-col
        md="6"
        sm="6"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
      <template v-slot:item.accion="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              x-small
              color="info"
              v-bind="attrs"
              v-on="on"
              @click="enableService(item)"
            >
              <v-icon>{{ item.viewService ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.viewService ? 'Mostrado' : 'Mostrar' }}</span>
        </v-tooltip>
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }"> -->
        <!-- <input
              type="button"
              class="d-none"
              v-bind="attrs"
              v-on="on"
            > -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              x-small
              color="info"
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @click="viewServices(item)"
            >
              <v-icon>mdi-stethoscope</v-icon>
            </v-btn>
          </template>
          <span>Servicios</span>
        </v-tooltip>
        <!-- </template>
          <span>Servicios</span>
        </v-tooltip> -->
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          x-small
          color="info"
          class="ml-2 d-none"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-stethoscope</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Servicios: {{ editedItem.nombre }}</v-card-title>
        <v-divider />
        <v-card-text style="height: 300px;">
          <v-row>
            <v-col
              v-for="(items, index) in editedItem.services"
              :key="index"
            >
              <v-checkbox
                :value="items.view"
                :label="items.nombre"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="black darken-1"
            text
            @click="closeModal()"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        dialogm1: '',
        dialog: false,
        editedItem: {},
        headers: [
          {
            text: 'Imagen',
            align: 'center',
            sortable: false,
            value: 'imagen',
          },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Descripción',
            value: 'descripcion',
          },
          {
            text: 'Acción',
            sortable: false,
            align: 'center',
            value: 'accion',
          },
        ],
        desserts: [
          {
            image: '',
            nombre: 'Consultas',
            descripcion: 'test descripcion',
            viewService: false,
            services: [
              {
                id: 1,
                nombre: 'Pediatra',
                value: 'pediatra',
                view: false,
              },
              {
                id: 2,
                nombre: 'Oncologo',
                value: 'oncologo',
                view: false,
              },
              {
                id: 3,
                nombre: 'Oncologo',
                value: 'oncologo',
                view: false,
              },
              {
                id: 4,
                nombre: 'Oncologo',
                value: 'oncologo',
                view: false,
              },
              {
                id: 5,
                nombre: 'Oncologo',
                value: 'oncologo',
                view: true,
              },
            ],
          },
          {
            image: '',
            nombre: 'Rehabilitación',
            descripcion: 'test descripcion',
            viewService: true,
            services: [
              {
                id: 1,
                nombre: 'Terapias',
                value: 'terapias',
                view: true,
              },
              {
                id: 2,
                nombre: 'Psicologo',
                value: 'psicologo',
                view: false,
              },
            ],
          },
          {
            image: '',
            nombre: 'Diagnostico por imagenes',
            descripcion: 'test descripcion',
            viewService: false,
            services: [
              {
                id: 1,
                nombre: 'rayos x',
                value: 'rayosx',
                view: false,
              },
              {
                id: 2,
                nombre: 'rezonancia',
                value: 'rezonancia',
                view: true,
              },
            ],
          },
          {
            image: '',
            nombre: 'Laboratorio',
            descripcion: 'test descripcion',
            viewService: false,
            services: [
              {
                id: 1,
                nombre: 'examenes',
                value: 'examenes',
                view: true,
              },
            ],
          },
        ],
      }
    },
    watch: {
      dialog (val) {
        val || this.closeModal()
      },
    },
    methods: {
      closeModal () {
        this.dialog = false
      },
      viewServices (item) {
        this.editedItem = {}
        this.editedItem = item
        this.dialog = true
      },
      enableService (item) {
        const index = this.desserts.indexOf(item)
        this.desserts[index].viewService = !item.viewService
      },
    },
  }
</script>
