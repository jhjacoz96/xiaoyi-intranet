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
               return serviceResponse
           },
           async disabilityAllActions (commit) {
               const serviceResponse = await disabilityAllApi()
               return serviceResponse
           },
           async disabilityDeleteActions (commit, payload) {
               const serviceResponse = await disabilityDeleteApi(payload)
               return serviceResponse
           },
           async disabilityGetActions (commit, payload) {
               const serviceResponse = await disabilityGetApi(payload)
               return serviceResponse
           },
           async disabilityUpdateActions (commit, payload) {
               const serviceResponse = await disabilityUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
