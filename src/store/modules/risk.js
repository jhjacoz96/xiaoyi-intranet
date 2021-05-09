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
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskAllActions (commit) {
               console.log('hola')
               const serviceResponse = await riskAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskDeleteActions (commit, payload) {
               const serviceResponse = await riskDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskGetActions (commit, payload) {
               const serviceResponse = await riskGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async riskUpdateActions (commit, payload) {
               const serviceResponse = await riskUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
