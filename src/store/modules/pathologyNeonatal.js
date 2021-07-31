import {
    pathologyNeonatalPostApi,
       pathologyNeonatalAllApi,
       pathologyNeonatalDeleteApi,
       pathologyNeonatalGetApi,
       pathologyNeonatalUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async pathologyNeonatalPostActions (commit, payload) {
               const serviceResponse = await pathologyNeonatalPostApi(payload)
               return serviceResponse
           },
           async pathologyNeonatalAllActions (commit) {
               const serviceResponse = await pathologyNeonatalAllApi()
               return serviceResponse
           },
           async pathologyNeonatalDeleteActions (commit, payload) {
               const serviceResponse = await pathologyNeonatalDeleteApi(payload)
               return serviceResponse
           },
           async pathologyNeonatalGetActions (commit, payload) {
               const serviceResponse = await pathologyNeonatalGetApi(payload)
               return serviceResponse
           },
           async pathologyNeonatalUpdateActions (commit, payload) {
               const serviceResponse = await pathologyNeonatalUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
