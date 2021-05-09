import {
    levelTotalPostApi,
       levelTotalAllApi,
       levelTotalDeleteApi,
       levelTotalGetApi,
       levelTotalUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async levelTotalPostActions (commit, payload) {
               const serviceResponse = await levelTotalPostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async levelTotalAllActions (commit) {
               const serviceResponse = await levelTotalAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async levelTotalDeleteActions (commit, payload) {
               const serviceResponse = await levelTotalDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async levelTotalGetActions (commit, payload) {
               const serviceResponse = await levelTotalGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async levelTotalUpdateActions (commit, payload) {
               const serviceResponse = await levelTotalUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
