import {
    culturalGroupPostApi,
       culturalGroupAllApi,
       culturalGroupDeleteApi,
       culturalGroupGetApi,
       culturalGroupUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async culturalGroupPostActions (commit, payload) {
               const serviceResponse = await culturalGroupPostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async culturalGroupAllActions (commit) {
               const serviceResponse = await culturalGroupAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async culturalGroupDeleteActions (commit, payload) {
               const serviceResponse = await culturalGroupDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async culturalGroupGetActions (commit, payload) {
               const serviceResponse = await culturalGroupGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async culturalGroupUpdateActions (commit, payload) {
               const serviceResponse = await culturalGroupUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
