import {
    alterationPregnantPostApi,
       alterationPregnantAllApi,
       alterationPregnantDeleteApi,
       alterationPregnantGetApi,
       alterationPregnantUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async alterationPregnantPostActions (commit, payload) {
               const serviceResponse = await alterationPregnantPostApi(payload)
               return serviceResponse
           },
           async alterationPregnantAllActions (commit) {
               const serviceResponse = await alterationPregnantAllApi()
               return serviceResponse
           },
           async alterationPregnantDeleteActions (commit, payload) {
               const serviceResponse = await alterationPregnantDeleteApi(payload)
               return serviceResponse
           },
           async alterationPregnantGetActions (commit, payload) {
               const serviceResponse = await alterationPregnantGetApi(payload)
               return serviceResponse
           },
           async alterationPregnantUpdateActions (commit, payload) {
               const serviceResponse = await alterationPregnantUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
