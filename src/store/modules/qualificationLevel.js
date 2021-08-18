import {
    qualificationLevelPostApi,
       qualificationLevelAllApi,
       qualificationLevelDeleteApi,
       qualificationLevelGetApi,
       qualificationLevelUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async qualificationLevelPostActions (commit, payload) {
               const serviceResponse = await qualificationLevelPostApi(payload)
               return serviceResponse
           },
           async qualificationLevelAllActions (commit) {
               const serviceResponse = await qualificationLevelAllApi()
               return serviceResponse
           },
           async qualificationLevelDeleteActions (commit, payload) {
               const serviceResponse = await qualificationLevelDeleteApi(payload)
               return serviceResponse
           },
           async qualificationLevelGetActions (commit, payload) {
               const serviceResponse = await qualificationLevelGetApi(payload)
               return serviceResponse
           },
           async qualificationLevelUpdateActions (commit, payload) {
               const serviceResponse = await qualificationLevelUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
