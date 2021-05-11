import {
    carruselPostApi,
       carruselAllApi,
       carruselDeleteApi,
       carruselGetApi,
       carruselUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async carruselPostActions (commit, payload) {
               const serviceResponse = await carruselPostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async carruselAllActions (commit) {
               const serviceResponse = await carruselAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async carruselDeleteActions (commit, payload) {
               const serviceResponse = await carruselDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async carruselGetActions (commit, payload) {
               const serviceResponse = await carruselGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async carruselUpdateActions (commit, payload) {
               const serviceResponse = await carruselUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
