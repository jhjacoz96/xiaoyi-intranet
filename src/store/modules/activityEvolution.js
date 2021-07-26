import {
    activityEvolutionPostApi,
       activityEvolutionAllApi,
       activityEvolutionDeleteApi,
       activityEvolutionGetApi,
       activityEvolutionUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async activityEvolutionPostActions (commit, payload) {
               const serviceResponse = await activityEvolutionPostApi(payload)
               return serviceResponse
           },
           async activityEvolutionAllActions (commit) {
               const serviceResponse = await activityEvolutionAllApi()
               return serviceResponse
           },
           async activityEvolutionDeleteActions (commit, payload) {
               const serviceResponse = await activityEvolutionDeleteApi(payload)
               return serviceResponse
           },
           async activityEvolutionGetActions (commit, payload) {
               const serviceResponse = await activityEvolutionGetApi(payload)
               return serviceResponse
           },
           async activityEvolutionUpdateActions (commit, payload) {
               const serviceResponse = await activityEvolutionUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
