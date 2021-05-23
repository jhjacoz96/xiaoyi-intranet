import {
    levelRiskPostApi,
       levelRiskAllApi,
       levelRiskDeleteApi,
       levelRiskGetApi,
       levelRiskUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async levelRiskPostActions (commit, payload) {
               const serviceResponse = await levelRiskPostApi(payload)
               return serviceResponse
           },
           async levelRiskAllActions (commit) {
               const serviceResponse = await levelRiskAllApi()
               return serviceResponse
           },
           async levelRiskDeleteActions (commit, payload) {
               const serviceResponse = await levelRiskDeleteApi(payload)
               return serviceResponse
           },
           async levelRiskGetActions (commit, payload) {
               const serviceResponse = await levelRiskGetApi(payload)
               return serviceResponse
           },
           async levelRiskUpdateActions (commit, payload) {
               const serviceResponse = await levelRiskUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
