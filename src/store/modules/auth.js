import router from '@/router'
import {
    loginApi,
    forgotApi,
    resetApi,
} from '@/api/modules'

export default {
    namespaced: true,
    state: {
      token: '',
      user: '',
      permissions: [],
      expiresAt: '',
      authenticated: false,
    },
    getters: {
        tokenGetter: state => state.token,
        userGetter: state => state.user,
        permissionsGetter: state => state.permissions,
        authenticatedGetter: state => state.authenticated,
    },
    mutations: {
        assignAvatar (state, payload) {
            state.user.employee.image.url = payload
        },
        getUser (state, payload) {
            if (payload === '') {
                state.token = ''
                state.user = ''
                state.authenticated = false
                state.permissions = []
                state.expiresAt = undefined
            } else {
                state.token = payload.access_token
                state.expiresAt = payload.expires_at
                state.user = payload.user
                state.permissions = payload.permissions
                state.authenticated = true
            }
        },
        can (state, payload) {
            if (state.permissions.length <= 0) return false
            var access = state.permissions.includes(payload)
            return access
        },
    },
    actions: {
        async forgotAction ({ commit }, payload) {
            const serviceResponse = await forgotApi(payload)
            return serviceResponse
        },
        async resetAction ({ commit }, payload) {
            const serviceResponse = await resetApi(payload)
            return serviceResponse
        },
        async loginAction ({ commit }, payload) {
            const serviceResponse = await loginApi(payload)
            if (serviceResponse.title === 'OK') {
              commit('getUser', serviceResponse)
              localStorage.setItem('token', serviceResponse.access_token)
              localStorage.setItem('expires_at', serviceResponse.expires_at)
              localStorage.setItem('user', JSON.stringify(serviceResponse.user))
              localStorage.setItem('permissions', JSON.stringify(serviceResponse.permissions))
              localStorage.setItem('authenticated', true)
              return serviceResponse
            } else {
              return serviceResponse
            }
        },
        checkToken ({ commit }) {
            const token = localStorage.getItem('token')
            if (token) {
                const user = JSON.parse(localStorage.getItem('user'))
                const permissions = JSON.parse(localStorage.getItem('permissions'))
                const authenticated = true
                const payload = {
                    token,
                    user,
                    permissions,
                    authenticated,
                }
                commit('getUser', payload)
            } else {
                commit('getUser', '')
            }
        },
        logoutAction ({ commit }, payload) {
            localStorage.clear()
            commit('getUser', '')
            router.push('/')
        },
    },
}
