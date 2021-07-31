import {
    pathologyPregnantPostApi,
       pathologyPregnantAllApi,
       pathologyPregnantDeleteApi,
       pathologyPregnantGetApi,
       pathologyPregnantUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async pathologyPregnantPostActions (commit, payload) {
               const serviceResponse = await pathologyPregnantPostApi(payload)
               return serviceResponse
           },
           async pathologyPregnantAllActions (commit) {
               const serviceResponse = await pathologyPregnantAllApi()
               return serviceResponse
           },
           async pathologyPregnantDeleteActions (commit, payload) {
               const serviceResponse = await pathologyPregnantDeleteApi(payload)
               return serviceResponse
           },
           async pathologyPregnantGetActions (commit, payload) {
               const serviceResponse = await pathologyPregnantGetApi(payload)
               return serviceResponse
           },
           async pathologyPregnantUpdateActions (commit, payload) {
               const serviceResponse = await pathologyPregnantUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
