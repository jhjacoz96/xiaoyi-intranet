import {
    specialtyPostApi,
       specialtyAllApi,
       specialtyDeleteApi,
       specialtyGetApi,
       specialtyUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async specialtyPostActions (commit, payload) {
               const serviceResponse = await specialtyPostApi(payload)
               return serviceResponse
           },
           async specialtyAllActions (commit) {
               const serviceResponse = await specialtyAllApi()
               return serviceResponse
           },
           async specialtyDeleteActions (commit, payload) {
               const serviceResponse = await specialtyDeleteApi(payload)
               return serviceResponse
           },
           async specialtyGetActions (commit, payload) {
               const serviceResponse = await specialtyGetApi(payload)
               return serviceResponse
           },
           async specialtyUpdateActions (commit, payload) {
               const serviceResponse = await specialtyUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
