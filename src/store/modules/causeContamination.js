import {
    causeContaminationPostApi,
       causeContaminationAllApi,
       causeContaminationDeleteApi,
       causeContaminationGetApi,
       causeContaminationUpdateApi,
       causeContaminationFindApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async causeContaminationPostActions (commit, payload) {
               const serviceResponse = await causeContaminationPostApi(payload)
               return serviceResponse
           },
           async causeContaminationAllActions (commit) {
               const serviceResponse = await causeContaminationAllApi()
               return serviceResponse
           },
           async causeContaminationDeleteActions (commit, payload) {
               const serviceResponse = await causeContaminationDeleteApi(payload)
               return serviceResponse
           },
           async causeContaminationGetActions (commit, payload) {
               const serviceResponse = await causeContaminationGetApi(payload)
               return serviceResponse
           },
           async causeContaminationFindActions (commit, payload) {
               const serviceResponse = await causeContaminationFindApi(payload)
               return serviceResponse
           },
           async causeContaminationUpdateActions (commit, payload) {
               const serviceResponse = await causeContaminationUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
