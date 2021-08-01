import {
    webDiabeticPostApi,
    webDiabeticAllApi,
    webUsPostApi,
    webUsAllApi,
    webServiceAllApi,
    webServicePostApi,
    webOlderAdultAllApi,
    webOlderAdultPostApi,
    webSubcriptionPostApi,
    webSubcriptionAllApi,
    webContactAllApi,
    webContactPostApi,
    webOrganizationAllApi,
    webOrganizationPostApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {
         organization: {
           name: '',
           province_id: undefined,
           canton_id: undefined,
           address: '',
           institution_id: undefined,
           code_uo: '',
           parroquia: '',
           image: undefined,
         },
       },
       getters: {},
       mutations: {
         setOrganization (state, payload) {
           Object.assign(state.organization, payload)
           state.organization.image = payload.image ? payload.image.url : undefined
         },
       },
       actions: {
           async webDiabeticPostActions (commit, payload) {
               const serviceResponse = await webDiabeticPostApi(payload)
               return serviceResponse
           },
           async webDiabeticAllActions (commit) {
               const serviceResponse = await webDiabeticAllApi()
               return serviceResponse
           },
           async webUsPostActions (commit, payload) {
               const serviceResponse = await webUsPostApi(payload)
               return serviceResponse
           },
           async webUsAllActions (commit) {
               const serviceResponse = await webUsAllApi()
               return serviceResponse
           },
           async webServicePostActions (commit, payload) {
               const serviceResponse = await webServicePostApi(payload)
               return serviceResponse
           },
           async webServiceAllActions (commit) {
               const serviceResponse = await webServiceAllApi()
               return serviceResponse
           },
           async webOlderAdultPostActions (commit, payload) {
               const serviceResponse = await webOlderAdultPostApi(payload)
               return serviceResponse
           },
           async webOlderAdultAllActions (commit) {
               const serviceResponse = await webOlderAdultAllApi()
               return serviceResponse
           },
           async webSubcriptionPostActions (commit, payload) {
             const serviceResponse = await webSubcriptionPostApi(payload)
             return serviceResponse
           },
            async webSubcriptionAllActions (commit) {
              const serviceResponse = await webSubcriptionAllApi()
              return serviceResponse
            },
           async webContactPostActions (commit, payload) {
             const serviceResponse = await webContactPostApi(payload)
             return serviceResponse
           },
            async webContactAllActions (commit) {
              const serviceResponse = await webContactAllApi()
              return serviceResponse
            },
           async webOrganizationPostActions ({ commit }, payload) {
             const serviceResponse = await webOrganizationPostApi(payload)
             if (serviceResponse.ok) {
               commit('setOrganization', serviceResponse.data)
             }
             return serviceResponse
           },
            async webOrganizationAllActions ({ commit }) {
              const serviceResponse = await webOrganizationAllApi()
              if (serviceResponse.ok) {
                commit('setOrganization', serviceResponse.data)
              }
              return serviceResponse
            },
       },
   }
