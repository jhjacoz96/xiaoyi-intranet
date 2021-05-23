import {
    riskClassificationPostApi,
       riskClassificationAllApi,
       riskClassificationDeleteApi,
       riskClassificationGetApi,
       riskClassificationUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async riskClassificationPostActions (commit, payload) {
               const serviceResponse = await riskClassificationPostApi(payload)
               return serviceResponse
           },
           async riskClassificationAllActions (commit) {
               const serviceResponse = await riskClassificationAllApi()
               return serviceResponse
           },
           async riskClassificationDeleteActions (commit, payload) {
               const serviceResponse = await riskClassificationDeleteApi(payload)
               return serviceResponse
           },
           async riskClassificationGetActions (commit, payload) {
               const serviceResponse = await riskClassificationGetApi(payload)
               return serviceResponse
           },
           async riskClassificationUpdateActions (commit, payload) {
               const serviceResponse = await riskClassificationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
