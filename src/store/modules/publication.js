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
               return serviceResponse
           },
           async publicationAllActions (commit) {
               const serviceResponse = await publicationAllApi()
               return serviceResponse
           },
           async publicationDeleteActions (commit, payload) {
               const serviceResponse = await publicationDeleteApi(payload)
               return serviceResponse
           },
           async publicationGetActions (commit, payload) {
               const serviceResponse = await publicationGetApi(payload)
               return serviceResponse
           },
           async publicationUpdateActions (commit, payload) {
               const serviceResponse = await publicationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
