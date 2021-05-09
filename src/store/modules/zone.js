import {
    zonePostApi,
       zoneAllApi,
       zoneDeleteApi,
       zoneGetApi,
       institutioUpdateApi,
       provinceAllApi,
       cantonFindApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async zonePostActions (commit, payload) {
               const serviceResponse = await zonePostApi(payload)
               return serviceResponse
           },
           async zoneAllActions (commit) {
               const serviceResponse = await zoneAllApi()
               return serviceResponse
           },
           async zoneDeleteActions (commit, payload) {
               const serviceResponse = await zoneDeleteApi(payload)
               return serviceResponse
           },
           async zoneGetActions (commit, payload) {
               const serviceResponse = await zoneGetApi(payload)
               return serviceResponse
           },
           async zoneUpdateActions (commit, payload) {
               const serviceResponse = await institutioUpdateApi(payload, payload.id)
               return serviceResponse
           },
           async provinceAllActions (commit, payload) {
               const serviceResponse = await provinceAllApi()
               return serviceResponse
           },
           async cantonFindActions (commit, payload) {
               const serviceResponse = await cantonFindApi(payload)
               return serviceResponse
           },
       },
   }
