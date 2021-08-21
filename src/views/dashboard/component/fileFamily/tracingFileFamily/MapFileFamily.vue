<template>
  <v-container>
    <v-sheet
      v-if="loadingdatatable"
      width="100%"
      height="250"
      class="d-flex justify-center align-center"
    >
      <div class="d-flex">
        <v-progress-circular
          :size="75"
          :width="7"
          color="primary"
          indeterminate
        >
          <span>
            Cargando
          </span>
        </v-progress-circular>
      </div>
    </v-sheet>
    <base-google-map
      v-else
      :prop-markers="coordinates"
      :clickable="true"
      :draggable="false"
    />
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
        // ...
      }
    },
    computed: {
      coordinates () {
        const coordinates = this.desserts
          .filter(item => {
            return item.latitud && item.longitud
          })
          .map(item => {
            return {
              lat: item.latitud,
              lng: item.longitud,
              title: item.numero_historia,
            }
          })
        return coordinates
      },
    },
  }
</script>
