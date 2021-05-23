import {
    presentationPostApi,
       presentationAllApi,
       presentationDeleteApi,
       presentationGetApi,
       presentationUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async presentationPostActions (commit, payload) {
               const serviceResponse = await presentationPostApi(payload)
               return serviceResponse
           },
           async presentationAllActions (commit) {
               const serviceResponse = await presentationAllApi()
               return serviceResponse
           },
           async presentationDeleteActions (commit, payload) {
               const serviceResponse = await presentationDeleteApi(payload)
               return serviceResponse
           },
           async presentationGetActions (commit, payload) {
               const serviceResponse = await presentationGetApi(payload)
               return serviceResponse
           },
           async presentationUpdateActions (commit, payload) {
               const serviceResponse = await presentationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
