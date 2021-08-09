<template>
  <base-material-card
    elevation="12"
    color="primary"
    class="v-card--wizardd"
  >
    <template
      v-slot:heading
    >
      <v-row>
        <v-col
          md="2"
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
        <v-col md="auto">
          <div class="text-h3 font-weight-medium">
            {{ title }}
          </div>
          <div class="text-subtitle-1 font-weight-light">
            {{ subtitle }}
          </div>
        </v-col>
      </v-row>
    </template>
    <!-- <v-card-title class="justify-center text-h3 font-weight-light pt-5">
      Construye tu perfil
    </v-card-title>

    <div class="text-center text-h4 grey--text font-weight-light mb-6">
      Esta información nos permitira conocer mas sobre ti
    </div> -->
    <div class="mb-6" />
    <v-tabs
      ref="tabs"
      v-model="internalValue"
      background-color="green lighten-5"
      color="white"
      slider-size="50"
      grow
      show-arrows
    >
      <v-tabs-slider
        class="mt-1"
        color="primary"
      />

      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :ripple="false"
        :disabled="!availableSteps.includes(i)"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <div class="my-6" />

    <v-card-text>
      <v-tabs-items v-model="internalValue">
        <slot />
      </v-tabs-items>
    </v-card-text>

    <v-card-actions class="pb-4 pa-4">
      <v-btn
        :disabled="internalValue === 0"
        class="white--text"
        color="grey darken-2"
        min-width="125"
        @click="$emit('click:prev')"
      >
        Anterior
      </v-btn>

      <v-spacer />
      <v-btn
        v-if="internalValue !== items.length - 1"
        :disabled="!availableSteps.includes(internalValue + 1)"
        color="primary"
        outlined
        min-width="100"
        @click="$emit('click:event', 'next')"
      >
        Siguiente
      </v-btn>
      <v-btn
        v-if="history"
        :disabled="!availableSteps.includes(internalValue + 1) || loading"
        :loading="loading"
        color="primary"
        min-width="100"
        @click="$emit('click:event', 'save')"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </base-material-card>
</template>

<script>
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'

  export default {
    name: 'BaseMaterialWizard',

    mixins: [Proxyable],

    props: {
      availableSteps: {
        type: Array,
        default: () => ([]),
      },
      items: {
        type: Array,
        default: () => ([]),
      },
      title: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
      },
      subtitle: {
        type: String,
        default: '',
      },
      history: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="sass">
  .v-card--wizardd
    overflow: visible

    .v-tabs-bar
      height: 56px
      padding: 0 8px

    .v-tabs-slider-wrapper
      overflow: visible

    .v-tabs-slider
      border-radius: 4px

    .v-tabs-slider-wrapper
      contain: initial
      z-index: 0
</style>
