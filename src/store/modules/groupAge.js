import {
   groupAgePostApi,
      groupAgeAllApi,
      groupAgeDeleteApi,
      groupAgeGetApi,
      groupAgeUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async groupAgePostActions (commit, payload) {
               const serviceResponse = await groupAgePostApi(payload)
               return serviceResponse
           },
           async groupAgeAllActions (commit) {
               const serviceResponse = await groupAgeAllApi()
               return serviceResponse
           },
           async groupAgeDeleteActions (commit, payload) {
               const serviceResponse = await groupAgeDeleteApi(payload)
               return serviceResponse
           },
           async groupAgeGetActions (commit, payload) {
               const serviceResponse = await groupAgeGetApi(payload)
               return serviceResponse
           },
           async groupAgeUpdateActions (commit, payload) {
               const serviceResponse = await groupAgeUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
