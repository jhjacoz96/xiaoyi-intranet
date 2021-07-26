import {
    contaminationPostApi,
       contaminationAllApi,
       contaminationDeleteApi,
       contaminationGetApi,
       contaminationUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async contaminationPostActions (commit, payload) {
               const serviceResponse = await contaminationPostApi(payload)
               return serviceResponse
           },
           async contaminationAllActions (commit) {
               const serviceResponse = await contaminationAllApi()
               return serviceResponse
           },
           async contaminationDeleteActions (commit, payload) {
               const serviceResponse = await contaminationDeleteApi(payload)
               return serviceResponse
           },
           async contaminationGetActions (commit, payload) {
               const serviceResponse = await contaminationGetApi(payload)
               return serviceResponse
           },
           async contaminationUpdateActions (commit, payload) {
               const serviceResponse = await contaminationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
