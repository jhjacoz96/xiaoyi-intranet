import {
    vaccinePostApi,
       vaccineAllApi,
       vaccineDeleteApi,
       vaccineGetApi,
       vaccineUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async vaccinePostActions (commit, payload) {
               const serviceResponse = await vaccinePostApi(payload)
               return serviceResponse
           },
           async vaccineAllActions (commit) {
               const serviceResponse = await vaccineAllApi()
               return serviceResponse
           },
           async vaccineDeleteActions (commit, payload) {
               const serviceResponse = await vaccineDeleteApi(payload)
               return serviceResponse
           },
           async vaccineGetActions (commit, payload) {
               const serviceResponse = await vaccineGetApi(payload)
               return serviceResponse
           },
           async vaccineUpdateActions (commit, payload) {
               const serviceResponse = await vaccineUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
