import {
       controlDiabeticAllApi,
       controlDiabeticUpdateApi,
       controlDiabeticGetApi,
       controlDiabeticAllRecentApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async controlDiabeticAllActions (commit) {
               const serviceResponse = await controlDiabeticAllApi()
               return serviceResponse
           },
           async controlDiabeticAllRecentActions (commit) {
               const serviceResponse = await controlDiabeticAllRecentApi()
               return serviceResponse
           },
           async controlDiabeticUpdateActions (commit, payload) {
               const serviceResponse = await controlDiabeticUpdateApi(payload, payload.id)
               return serviceResponse
           },
           async controlDiabeticGetActions (commit, payload) {
               const serviceResponse = await controlDiabeticGetApi(payload, payload)
               return serviceResponse
           },
       },
   }
