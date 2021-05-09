import {
    typeBloodPostApi,
       typeBloodAllApi,
       typeBloodDeleteApi,
       typeBloodGetApi,
       typeBloodUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async typeBloodPostActions (commit, payload) {
               const serviceResponse = await typeBloodPostApi(payload)
               return serviceResponse
           },
           async typeBloodAllActions (commit) {
               const serviceResponse = await typeBloodAllApi()
               return serviceResponse
           },
           async typeBloodDeleteActions (commit, payload) {
               const serviceResponse = await typeBloodDeleteApi(payload)
               return serviceResponse
           },
           async typeBloodGetActions (commit, payload) {
               const serviceResponse = await typeBloodGetApi(payload)
               return serviceResponse
           },
           async typeBloodUpdateActions (commit, payload) {
               const serviceResponse = await typeBloodUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
