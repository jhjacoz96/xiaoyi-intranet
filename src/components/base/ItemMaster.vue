<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      v-bind="$attrs"
      :color="hover ? 'secondary' : 'transparent'"
      :width="width"
      :height="height"
      class="text-center rounded-xl pa-3 ma-0 "
      :elevation="hover ? 10 : 3"
      :class="{ 'on-hover': hover }"
      @click.prevent="$router.push(to)"
    >
      <span>
        <v-icon :dark="hover">
          {{ icon }}
        </v-icon>
      </span>
      <div
        :class="{'white--text' : hover}"
      >
        {{ title }}
      </div>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      to: {
        type: String,
        default: '',
      },
      width: {
        type: String,
        default: '140',
      },
      height: {
        type: String,
        default: '110',
      },
    },
  }
</script>

<style>
    a  {
        text-decoration: none;
    }
</style>
