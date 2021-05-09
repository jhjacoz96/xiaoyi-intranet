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
               console.log(serviceResponse)
               return serviceResponse
           },
           async groupAgeAllActions (commit) {
               const serviceResponse = await groupAgeAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async groupAgeDeleteActions (commit, payload) {
               const serviceResponse = await groupAgeDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async groupAgeGetActions (commit, payload) {
               const serviceResponse = await groupAgeGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async groupAgeUpdateActions (commit, payload) {
               const serviceResponse = await groupAgeUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
