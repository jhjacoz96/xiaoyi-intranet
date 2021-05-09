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
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskClassificationAllActions (commit) {
               const serviceResponse = await riskClassificationAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskClassificationDeleteActions (commit, payload) {
               const serviceResponse = await riskClassificationDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskClassificationGetActions (commit, payload) {
               const serviceResponse = await riskClassificationGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskClassificationUpdateActions (commit, payload) {
               const serviceResponse = await riskClassificationUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
