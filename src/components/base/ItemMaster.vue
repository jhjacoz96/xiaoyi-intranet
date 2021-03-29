<template>
  <v-hover
    v-slot="{ hover }"
    close-delay="200"
  >
    <v-card
      :color="hover ? 'secondary' : 'transparent'"
      width="120"
      height="100"
      class="text-center rounded-xl pa-3 ma-0"
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
        class="font-weight-medium pa-1"
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
    },
  }
</script>

<style>
    a  {
        text-decoration: none;
    }
</style>
