<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    color="primary"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
      class="justify-content align-center"
    >
      <v-list-item
        two-line
      >
        <img
          src="@/assets/logo2.png"
          width="60"
          max-width="60"
          class="mr-2"
        >
        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            v-text="'Xiaoyi'"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      dense
      nav
    >
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-home',
          title: 'Incio',
          group: '',
          to: '/intranet/inicio',
        },
        {
          icon: 'mdi-cog',
          title: 'Información inicial',
          group: '',
          children: [
            {
              icon: 'mdi-file-cog-outline',
              title: 'Maestros',
              to: 'intranet/maestros-basicos',
            },
            {
              icon: 'mdi-file-cog',
              title: 'Configuración de maestros',
              to: 'intranet/configuracion',
            },
            {
              icon: 'mdi-application',
              title: 'Configuración del sítio web',
              to: 'intranet/configuracion-web',
            },
            {
              icon: 'mdi-application',
              title: 'Configuración de la móvil',
              to: 'intranet/configuracion-movil',
            },
          ],
        },
        {
          icon: 'mdi-file',
          title: 'Ficha familiar',
          group: '',
          to: '/intranet/ficha-familiar',
        },
        {
          icon: 'mdi-file',
          title: 'Ficha Clínica',
          group: '',
          children: [
            {
              icon: 'mdi-baby',
              title: 'Neonatología',
              to: 'intranet/ficha-clinica-neonatologia',
            },
            {
              icon: 'mdi-human-pregnant',
              title: 'Obstetricia',
              to: 'intranet/ficha-clinica-obstetricia',
            },
          ],
        },
        {
          icon: 'mdi-water',
          title: 'Pacientes diabeticos',
          group: '',
          to: '/intranet/control-diabetes',
        },
        {
          icon: 'mdi-account-voice',
          title: 'Atención al paciente',
          group: '',
          children: [
            {
              icon: 'mdi-comment',
              title: 'Evaluar sugerencias',
              to: 'intranet/atencion-paciente/evaluar-sugerencias',
            },
          ],
        },
        {
          icon: 'mdi-file',
          title: 'Reportes',
          group: '',
          to: '/intranet/reportes',
        },
        {
          icon: 'mdi-file',
          title: 'Administración del sistema',
          group: '',
          to: '/intranet/adminsitracion-sistema',
        },
        // {
        //   icon: 'mdi-account',
        //   title: 'user',
        //   to: '/intranet/pages/user',
        // },
        // {
        //   title: 'rtables',
        //   icon: 'mdi-clipboard-outline',
        //   to: '/intranet/tables/regular-tables',
        // },
        // {
        //   title: 'typography',
        //   icon: 'mdi-format-font',
        //   to: '/intranet/components/typography',
        // },
        // {
        //   title: 'icons',
        //   icon: 'mdi-chart-bubble',
        //   to: '/intranet/components/icons',
        // },
        // {
        //   title: 'google',
        //   icon: 'mdi-map-marker',
        //   to: '/intranet/maps/google-maps',
        // },
        // {
        //   title: 'notifications',
        //   icon: 'mdi-bell',
        //   to: '/intranet/components/notifications',
        // },
      ],
      profile: {
        avatar: true,
        title: 'Ali Ferrer',
        group: '',
        children: [
          {
            to: 'intranet/perfil',
            title: 'Perfil',
            icon: 'mdi-account',
          },
        ],
      },
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
