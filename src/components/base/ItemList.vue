<template>
  <v-list>
    <v-list-item>
      <v-list-item-icon>
        <v-icon v-text="item.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          class="font-weight-medium"
          v-text="item.title"
        />
        <div
          class="font-weight-regular"
          v-text="item.subtitle"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({
          icon: undefined,
          title: undefined,
          subtitle: undefined,
        }),
      },
    },
  }
</script>
