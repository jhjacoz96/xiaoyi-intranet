import {
    pathologyPostApi,
       pathologyAllApi,
       pathologyDeleteApi,
       pathologyGetApi,
       pathologyUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async pathologyPostActions (commit, payload) {
               const serviceResponse = await pathologyPostApi(payload)
               return serviceResponse
           },
           async pathologyAllActions (commit) {
               const serviceResponse = await pathologyAllApi()
               return serviceResponse
           },
           async pathologyDeleteActions (commit, payload) {
               const serviceResponse = await pathologyDeleteApi(payload)
               return serviceResponse
           },
           async pathologyGetActions (commit, payload) {
               const serviceResponse = await pathologyGetApi(payload)
               return serviceResponse
           },
           async pathologyUpdateActions (commit, payload) {
               const serviceResponse = await pathologyUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
