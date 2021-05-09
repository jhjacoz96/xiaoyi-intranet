import {
    disabilityPostApi,
       disabilityAllApi,
       disabilityDeleteApi,
       disabilityGetApi,
       disabilityUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async disabilityPostActions (commit, payload) {
               const serviceResponse = await disabilityPostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async disabilityAllActions (commit) {
               const serviceResponse = await disabilityAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async disabilityDeleteActions (commit, payload) {
               const serviceResponse = await disabilityDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async disabilityGetActions (commit, payload) {
               const serviceResponse = await disabilityGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async disabilityUpdateActions (commit, payload) {
               const serviceResponse = await disabilityUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
