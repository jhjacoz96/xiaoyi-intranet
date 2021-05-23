import {
    culturalGroupPostApi,
       culturalGroupAllApi,
       culturalGroupDeleteApi,
       culturalGroupGetApi,
       culturalGroupUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async culturalGroupPostActions (commit, payload) {
               const serviceResponse = await culturalGroupPostApi(payload)
               return serviceResponse
           },
           async culturalGroupAllActions (commit) {
               const serviceResponse = await culturalGroupAllApi()
               return serviceResponse
           },
           async culturalGroupDeleteActions (commit, payload) {
               const serviceResponse = await culturalGroupDeleteApi(payload)
               return serviceResponse
           },
           async culturalGroupGetActions (commit, payload) {
               const serviceResponse = await culturalGroupGetApi(payload)
               return serviceResponse
           },
           async culturalGroupUpdateActions (commit, payload) {
               const serviceResponse = await culturalGroupUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
