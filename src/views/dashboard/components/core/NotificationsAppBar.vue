<template>
  <div>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      :nudge-width="300"
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
          <v-badge
            v-if="notifications.length > 0"
            color="red"
            overlap
            bordered
          >
            <template
              v-slot:badge
            >
              <span>{{ notifications.length }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>
            mdi-bell
          </v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Notificaciones`"
            />
            <v-list>
              <v-list-item-content>
                <v-list-item-subtitle
                  v-if="notifications.length === 0"
                  class="text-center"
                  v-text="'Sin notificaciones'"
                />
                <v-virtual-scroll
                  :items="notifications"
                  :item-height="60"
                  height="246"
                  cart-height="26"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                      @click.prevent="readNotifications(item)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="'mdi-clock'" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.description }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ moment(item.time).locale('es').fromNow() }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list-item-content>
            </v-list>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import {
    employeeGetNotificationsApi,
    employeeReadNotificationsApi,
  } from '@/api/modules'
  import {
    mapState,
    mapMutations,
  } from 'vuex'
  // Components
  // import { VHover, VListItem } from 'vuetify/lib'
  export default {
    components: {
      // AppBarItem: {
      //   render (h) {
      //     return h(VHover, {
      //       scopedSlots: {
      //         default: ({ hover }) => {
      //           return h(VListItem, {
      //             attrs: this.$attrs,
      //             class: {
      //               'black--text': !hover,
      //               'white--text secondary elevation-12': hover,
      //             },
      //             props: {
      //               activeClass: '',
      //               dark: hover,
      //               link: true,
      //               ...this.$attrs,
      //             },
      //           }, this.$slots.default)
      //         },
      //       },
      //     })
      //   },
      // },
    },
    data () {
      return {
        notifications: [],
        selectItem: 1,
        comment_id: null,
      }
    },
    computed: {
      ...mapState('auth', ['permissions']),
      ...mapState('auth', ['user']),
    },
    created () {
      this.listItem()
    },
    mounted () {
      if (this.permissions.includes('evaluate_suggestion_access')) {
        window.Echo.channel('comment-adult-old')
          .listen('CommentAdultOldEvent', (res) => {
            this.notifications.unshift({
              id: res.comment.id,
              description: 'Nuevo comentario del portal web',
              url: '/intranet/evaluar-sugerencias',
              time: new Date(),
            })
          })
      }

      if (this.permissions.includes('obstetrics_access')) {
        window.Echo.channel('file-clinical-obstetric')
          .listen('FileClinicalObstetricEvent', (res) => {
            console.log(res.pregnant)
            if (this.user.employee.id !== res.pregnant.employee_id) {
              this.notifications.unshift({
                id: res.pregnant.id,
                description: 'Ficha clinica de obstetría finalizada',
                url: `/intranet/ficha-clinica-obstetricia/actualizar/${res.pregnant.id}`,
                time: new Date(),
              })
            }
          })
      }
      if (this.permissions.includes('diabetes_control_access')) {
        window.Echo.channel('diabetic-patient')
          .listen('DiabeticPatientEvent', (res) => {
            console.log(res.diabeticPatient)
            this.notifications.unshift({
              id: res.diabeticPatient.id,
              description: 'Nuevo paciente diabético',
              url: '/intranet/control-diabetes',
              time: new Date(),
            })
          })
      }
    },
    methods: {
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponsee = await employeeGetNotificationsApi()
        console.log(serviceResponsee)
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            this.notifications = serviceResponsee.data.map(this.formatNotifications)
            console.log(this.notifications)
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async readNotifications (val) {
        const serviceResponsee = await employeeReadNotificationsApi(val.id)
        if (serviceResponsee.ok) {
          var index = this.notifications.indexOf(val)
          this.notifications.splice(index, 1)
          this.$router.push(val.url)
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      formatNotifications (val) {
        if (val.data.type_notification === 'Comentario en el sitio web') {
          return {
            id: val.data.id,
            description: 'Nuevo comentario del portal web',
            url: '/intranet/evaluar-sugerencias',
            time: val.created_at,
          }
        } else if (val.data.type_notification === 'Ficha clinica de obstetricia') {
          return {
            id: val.data.id,
            description: 'Ficha clinica de obstetría finalizada',
            url: `/intranet/ficha-clinica-obstetricia/actualizar/${val.data.id}`,
            time: val.created_at,
          }
        } else {
          return {
            id: val.data.id,
            description: 'Nuevo paciente diabético',
            url: '/intranet/control-diabetes',
            time: val.created_at,
          }
        }
      },
    },
  }
</script>
