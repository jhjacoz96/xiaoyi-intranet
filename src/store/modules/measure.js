import {
    measurePostApi,
       measureAllApi,
       measureDeleteApi,
       measureGetApi,
       measureUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async measurePostActions (commit, payload) {
               const serviceResponse = await measurePostApi(payload)
               return serviceResponse
           },
           async measureAllActions (commit) {
               const serviceResponse = await measureAllApi()
               return serviceResponse
           },
           async measureDeleteActions (commit, payload) {
               const serviceResponse = await measureDeleteApi(payload)
               return serviceResponse
           },
           async measureGetActions (commit, payload) {
               const serviceResponse = await measureGetApi(payload)
               return serviceResponse
           },
           async measureUpdateActions (commit, payload) {
               const serviceResponse = await measureUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
