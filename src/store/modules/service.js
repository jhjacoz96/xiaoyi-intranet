import {
    servicePostApi,
       serviceAllApi,
       serviceDeleteApi,
       serviceGetApi,
       serviceUpdateApi,
       serviceAssignActivitiesApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async servicePostActions (commit, payload) {
               const serviceResponse = await servicePostApi(payload)
               return serviceResponse
           },
           async serviceAllActions (commit) {
               const serviceResponse = await serviceAllApi()
               return serviceResponse
           },
           async serviceDeleteActions (commit, payload) {
               const serviceResponse = await serviceDeleteApi(payload)
               return serviceResponse
           },
           async serviceGetActions (commit, payload) {
               const serviceResponse = await serviceGetApi(payload)
               return serviceResponse
           },
           async serviceUpdateActions (commit, payload) {
               const serviceResponse = await serviceUpdateApi(payload, payload.id)
               return serviceResponse
           },
           async serviceAssignActivitiesActions (commit, payload) {
               const serviceResponse = await serviceAssignActivitiesApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
