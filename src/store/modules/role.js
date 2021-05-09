import {
    rolePostApi,
       roleAllApi,
       roleDeleteApi,
       roleGetApi,
       roleUpdateApi,
       rolePermissionAllApi,
       roleAssignPermissionApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async rolePostActions (commit, payload) {
               const serviceResponse = await rolePostApi(payload)
               return serviceResponse
           },
           async roleAllActions (commit) {
               const serviceResponse = await roleAllApi()
               return serviceResponse
           },
           async rolePermissionAllActions (commit) {
               const serviceResponse = await rolePermissionAllApi()
               return serviceResponse
           },
           async roleDeleteActions (commit, payload) {
               const serviceResponse = await roleDeleteApi(payload)
               return serviceResponse
           },
           async roleGetActions (commit, payload) {
               const serviceResponse = await roleGetApi(payload)
               return serviceResponse
           },
           async roleUpdateActions (commit, payload) {
               const serviceResponse = await roleUpdateApi(payload, payload.id)
               return serviceResponse
           },
           async roleAssignPermissionActions (commit, payload) {
               const serviceResponse = await roleAssignPermissionApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
