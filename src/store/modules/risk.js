import {
    riskPostApi,
       riskAllApi,
       riskDeleteApi,
       riskGetApi,
       riskUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async riskPostActions (commit, payload) {
               const serviceResponse = await riskPostApi(payload)
               return serviceResponse
           },
           async riskAllActions (commit) {
               const serviceResponse = await riskAllApi()
               return serviceResponse
           },
           async riskDeleteActions (commit, payload) {
               const serviceResponse = await riskDeleteApi(payload)
               return serviceResponse
           },
           async riskGetActions (commit, payload) {
               const serviceResponse = await riskGetApi(payload)
               return serviceResponse
           },
           async riskUpdateActions (commit, payload) {
               const serviceResponse = await riskUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
