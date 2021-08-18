import {
    qualificationPostApi,
       qualificationAllApi,
       qualificationDeleteApi,
       qualificationGetApi,
       qualificationUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async qualificationPostActions (commit, payload) {
               const serviceResponse = await qualificationPostApi(payload)
               return serviceResponse
           },
           async qualificationAllActions (commit) {
               const serviceResponse = await qualificationAllApi()
               return serviceResponse
           },
           async qualificationDeleteActions (commit, payload) {
               const serviceResponse = await qualificationDeleteApi(payload)
               return serviceResponse
           },
           async qualificationGetActions (commit, payload) {
               const serviceResponse = await qualificationGetApi(payload)
               return serviceResponse
           },
           async qualificationUpdateActions (commit, payload) {
               const serviceResponse = await qualificationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
