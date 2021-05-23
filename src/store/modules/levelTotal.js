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
               return serviceResponse
           },
           async levelTotalAllActions (commit) {
               const serviceResponse = await levelTotalAllApi()
               return serviceResponse
           },
           async levelTotalDeleteActions (commit, payload) {
               const serviceResponse = await levelTotalDeleteApi(payload)
               return serviceResponse
           },
           async levelTotalGetActions (commit, payload) {
               const serviceResponse = await levelTotalGetApi(payload)
               return serviceResponse
           },
           async levelTotalUpdateActions (commit, payload) {
               const serviceResponse = await levelTotalUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
