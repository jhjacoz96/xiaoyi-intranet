import {
    typeEmployeePostApi,
       typeEmployeeAllApi,
       typeEmployeeDeleteApi,
       typeEmployeeGetApi,
       typeEmployeeUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async typeEmployeePostActions (commit, payload) {
               const serviceResponse = await typeEmployeePostApi(payload)
               return serviceResponse
           },
           async typeEmployeeAllActions (commit) {
               const serviceResponse = await typeEmployeeAllApi()
               return serviceResponse
           },
           async typeEmployeeDeleteActions (commit, payload) {
               const serviceResponse = await typeEmployeeDeleteApi(payload)
               return serviceResponse
           },
           async typeEmployeeGetActions (commit, payload) {
               const serviceResponse = await typeEmployeeGetApi(payload)
               return serviceResponse
           },
           async typeEmployeeUpdateActions (commit, payload) {
               const serviceResponse = await typeEmployeeUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
