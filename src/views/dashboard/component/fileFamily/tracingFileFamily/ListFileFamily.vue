<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
      :loading="loadingdatatable"
      loading-text="Cargando... Porfavor espere"
    >
      <template v-slot:item.level_riesgo="{ item }">
        <v-chip
          v-if="item.level_total_id"
          :color="item.level_total_id.color"
        >
          {{ item.level_total_id.name }}
        </v-chip>
      </template>
      <template v-slot:item.accion="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              fab
              color="info"
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @click="$router.push(`ficha-familiar/${item.id}`)"
            >
              <v-icon>mdi-account-group</v-icon>
            </v-btn>
          </template>
          <span>Control de ficha familiar</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
  export default {
    props: {
      desserts: {
        type: Array,
        default: () => ([]),
      },
      loadingdatatable: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        headers: [
          { text: 'ID', sortable: true, value: 'id' },
          { text: 'Número de historia', sortable: true, value: 'numero_historia' },
          { text: 'Número de familia', sortable: true, value: 'numero_familia' },
          { text: 'Nivel de riesgo', sortable: true, value: 'level_riesgo' },
          { text: 'Grupo cultural', sortable: true, value: 'cultural_group_id.name' },
          { text: 'Parroquia', sortable: true, value: 'zone_id.name' },
          { text: 'Barrio', sortable: true, value: 'barrio' },
          { text: 'Manzana', sortable: true, value: 'manzana' },
          { text: 'Acción', sortable: false, align: 'center', value: 'accion' },
        ],
      }
    },
  }
</script>
