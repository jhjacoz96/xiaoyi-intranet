<template>
  <div>
    <input
      ref="file"
      class="d-none"
      type="file"
      @change="preview_image"
    >
    <v-hover v-slot="{ hover }">
      <v-card
        class="mx-auto mt-0 d-inline-flex v-card--account"
        :class="{ 'on-hover': hover }"
        width="300"
        @click="$refs.file.click()"
      >
        <v-img
          v-if="imagen || (image != '')"
          :src="imagenPreview"
          height="100%"
          width="100%"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal text-h4 white--text"
              style="height:20%"
            >
              Cambiar imagen
            </div>
          </v-expand-transition>
        </v-img>
        <v-img
          v-else
          src="@/assets/fondoDefault.jpg"
          height="100%"
          width="100%"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal text-h4 white--text"
              style="height:20%"
            >
              Seleccione una imagen
            </div>
          </v-expand-transition>
        </v-img>
        <slot />
      </v-card>
    </v-hover>
  </div>
</template>

<script>
  export default {
    props: {
      image: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        imagen: null,
        imagenPreview: null,
      }
    },
    watch: {
      image (val) {
        console.log(val)
        if (val !== '') this.imagenPreview = `${this.$store.state.urlApi}/${val}`
      },
    },
    methods: {
      preview_image (e) {
        if (e) {
          this.imagen = e.target.files[0]
          this.imagenPreview = URL.createObjectURL(this.imagen)
          this.$emit('imagen', this.imagen)
        }
      },
    },
  }
</script>

<style>
    .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
