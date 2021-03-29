<template>
  <v-card
    color="basil"
    flat
  >
    <v-card-text class="text-h5">
      Ingrese la información referente al carrusel
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
            <v-textarea
              outlined
              name="input-7-4"
              label="Texto"
              placeholder="Asignar texto a la imagen"
            />
            <v-text-field
              outlined
              label="Url"
              placeholder="Indique la url de redirección"
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
              imagen="imagen"
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
        <v-icon>mdi-plus</v-icon>
        Agregar
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Imagen
              </th>
              <th class="text-left">
                url
              </th>
              <th class="text-left">
                Descripción
              </th>
              <th class="text-left">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.imagen"
            >
              <td>
                <v-img
                  :src="item.imagen"
                  width="60"
                />
              </td>
              <td>{{ item.url }}</td>
              <td>{{ item.descripcion }}</td>
              <td>
                <v-btn
                  fab
                  x-small
                  color="pink"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      valid: false,
      imagen: null,
      desserts: [
        {
          imagen: '@/assets/fondo.jpg',
          url: 'url test',
          descripcion: 'descripcion test',
        },
      ],
    }),
  }
</script>
