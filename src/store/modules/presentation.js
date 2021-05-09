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
               console.log(serviceResponse)
               return serviceResponse
           },
           async presentationAllActions (commit) {
               const serviceResponse = await presentationAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async presentationDeleteActions (commit, payload) {
               const serviceResponse = await presentationDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async presentationGetActions (commit, payload) {
               const serviceResponse = await presentationGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async presentationUpdateActions (commit, payload) {
               const serviceResponse = await presentationUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
