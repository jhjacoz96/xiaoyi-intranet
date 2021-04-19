<template>
  <section class="mb-12 text-center">
    <h1
      class="font-weight-light mb-2 text-h3"
      v-text="heading"
    />

    <span
      class="font-weight-light text-subtitle-1"
    >
      {{ text }}
    </span>
  </section>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>
