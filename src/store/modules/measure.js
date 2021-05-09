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
               console.log(serviceResponse)
               return serviceResponse
           },
           async measureAllActions (commit) {
               const serviceResponse = await measureAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async measureDeleteActions (commit, payload) {
               const serviceResponse = await measureDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async measureGetActions (commit, payload) {
               const serviceResponse = await measureGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async measureUpdateActions (commit, payload) {
               const serviceResponse = await measureUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
