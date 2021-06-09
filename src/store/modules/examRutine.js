import {
    examRutinePostApi,
       examRutineAllApi,
       examRutineDeleteApi,
       examRutineGetApi,
       examRutineUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async examRutinePostActions (commit, payload) {
               const serviceResponse = await examRutinePostApi(payload)
               return serviceResponse
           },
           async examRutineAllActions (commit) {
               const serviceResponse = await examRutineAllApi()
               return serviceResponse
           },
           async examRutineDeleteActions (commit, payload) {
               const serviceResponse = await examRutineDeleteApi(payload)
               return serviceResponse
           },
           async examRutineGetActions (commit, payload) {
               const serviceResponse = await examRutineGetApi(payload)
               return serviceResponse
           },
           async examRutineUpdateActions (commit, payload) {
               const serviceResponse = await examRutineUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
