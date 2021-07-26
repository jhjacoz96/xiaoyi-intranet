import {
    causeMortalityPostApi,
       causeMortalityAllApi,
       causeMortalityDeleteApi,
       causeMortalityGetApi,
       causeMortalityUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async causeMortalityPostActions (commit, payload) {
               const serviceResponse = await causeMortalityPostApi(payload)
               return serviceResponse
           },
           async causeMortalityAllActions (commit) {
               const serviceResponse = await causeMortalityAllApi()
               return serviceResponse
           },
           async causeMortalityDeleteActions (commit, payload) {
               const serviceResponse = await causeMortalityDeleteApi(payload)
               return serviceResponse
           },
           async causeMortalityGetActions (commit, payload) {
               const serviceResponse = await causeMortalityGetApi(payload)
               return serviceResponse
           },
           async causeMortalityUpdateActions (commit, payload) {
               const serviceResponse = await causeMortalityUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
