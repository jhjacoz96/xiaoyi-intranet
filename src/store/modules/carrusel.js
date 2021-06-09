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
               return serviceResponse
           },
           async carruselAllActions (commit) {
               const serviceResponse = await carruselAllApi()
               return serviceResponse
           },
           async carruselDeleteActions (commit, payload) {
               const serviceResponse = await carruselDeleteApi(payload)
               return serviceResponse
           },
           async carruselGetActions (commit, payload) {
               const serviceResponse = await carruselGetApi(payload)
               return serviceResponse
           },
           async carruselUpdateActions (commit, payload) {
               const serviceResponse = await carruselUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
