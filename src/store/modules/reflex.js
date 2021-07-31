import {
    reflexPostApi,
       reflexAllApi,
       reflexDeleteApi,
       reflexGetApi,
       reflexUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async reflexPostActions (commit, payload) {
               const serviceResponse = await reflexPostApi(payload)
               return serviceResponse
           },
           async reflexAllActions (commit) {
               const serviceResponse = await reflexAllApi()
               return serviceResponse
           },
           async reflexDeleteActions (commit, payload) {
               const serviceResponse = await reflexDeleteApi(payload)
               return serviceResponse
           },
           async reflexGetActions (commit, payload) {
               const serviceResponse = await reflexGetApi(payload)
               return serviceResponse
           },
           async reflexUpdateActions (commit, payload) {
               const serviceResponse = await reflexUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
