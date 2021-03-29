<template>
  <v-card
    color="basil"
    flat
  >
    <v-card-text class="text-h5">
      Información acerca del centro de salud
    </v-card-text>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        enctype="multipart/form-data"
        class="mt-2"
      >
        <v-row>
          <v-col
            md="6"
            sm="6"
            cols="12"
          >
            <v-text-field
              outlined
              label="Titulo"
              placeholder="Indique el titulo"
            />
            <v-textarea
              outlined
              name="input-7-4"
              label="Contenido"
              placeholder="Ingrese el contenido a mostrar"
            />
            <!-- <v-file-input
                v-model="imagen"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Seleccione una imagen"
                prepend-icon="mdi-camera"
                label="Imagen"
                @change="Preview_image"
                /> -->
          </v-col>
          <v-col
            md="6"
            sm="6"
            cols="12"
            class="text-end"
          >
            <base-preview-image
              @imagen="imagen = $event"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        class="float-none"
        color="primary"
      >
        <v-icon>mdi-load</v-icon>
        Actualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      valid: false,
      imagen: '',
    }),
  }
</script>
