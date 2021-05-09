import {
    publicationPostApi,
       publicationAllApi,
       publicationDeleteApi,
       publicationGetApi,
       publicationUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async publicationPostActions (commit, payload) {
               const serviceResponse = await publicationPostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async publicationAllActions (commit) {
               console.log('hola')
               const serviceResponse = await publicationAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async publicationDeleteActions (commit, payload) {
               const serviceResponse = await publicationDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async publicationGetActions (commit, payload) {
               const serviceResponse = await publicationGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async publicationUpdateActions (commit, payload) {
               const serviceResponse = await publicationUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
