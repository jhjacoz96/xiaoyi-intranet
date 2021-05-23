import {
       controlDiabeticAllApi,
       controlDiabeticUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async controlDiabeticAllActions (commit) {
               const serviceResponse = await controlDiabeticAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async controlDiabeticUpdateActions (commit, payload) {
               const serviceResponse = await controlDiabeticUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
