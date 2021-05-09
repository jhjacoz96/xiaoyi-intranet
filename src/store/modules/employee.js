import {
    employeePostApi,
       employeeAllApi,
       employeeDeleteApi,
       employeeGetApi,
       employeeUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async employeePostActions (commit, payload) {
               const serviceResponse = await employeePostApi(payload)
               return serviceResponse
           },
           async employeeAllActions (commit) {
               const serviceResponse = await employeeAllApi()
               return serviceResponse
           },
           async employeeDeleteActions (commit, payload) {
               const serviceResponse = await employeeDeleteApi(payload)
               return serviceResponse
           },
           async employeeGetActions (commit, payload) {
               const serviceResponse = await employeeGetApi(payload)
               return serviceResponse
           },
           async employeeUpdateActions (commit, payload) {
               const serviceResponse = await employeeUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
