<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quiltx
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <!-- <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    /> -->

    <v-spacer />

    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field> -->

    <div class="mx-3" />

    <notifications-app-bar />

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-lock'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle v-text="'Cerrar sesión'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>

  // Utilities
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      NotificationsAppBar: () => import('./NotificationsAppBar'),
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      selectedItem: 1,
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions('auth', ['logoutAction']),
      async logout () {
        this.logoutAction()
      },
    },
  }
</script>
