<template>
  <v-container>
    <gmap-map
      ref="mapPosition"
      :center="center"
      :zoom="13"
      style="width: 100%; height: 500px"
    >
      <gmap-marker
        v-for="(m, index) in formatMarkers"
        :key="index"
        :position="m.position"
        :title="m.title"
        :clickable="clickable"
        :draggable="draggable"
        @drag="updateCoordinates($event)"
      />
    </gmap-map>
  </v-container>
</template>
<script>
  export default {
    props: {
      propMarkers: {
        type: Array,
        default: () => ([]),
      },
      clickable: {
        type: Boolean,
        default: true,
      },
      draggable: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        center: { lat: 45.508, lng: -73.587 },
      }
    },
    computed: {
      mapMarkers () {
        return this.propMarkers
      },
      formatMarkers () {
        return this.mapMarkers.map(item => {
          return {
            position: {
              lat: item.lat,
              lng: item.lng,
            },
            title: item.title,
          }
        })
      },
    },
    mounted () {
      this.geolocate()
    },
    methods: {
      geolocate () {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      },
      updateCoordinates (val) {
        if (this.draggable) {
          var coordinate = {
            lat: val.latLng.lat(),
            lng: val.latLng.lng(),
          }
          this.$emit('change:coordinate', coordinate)
        }
      },
    },
  }
</script>
