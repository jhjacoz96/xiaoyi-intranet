import {
    medicinePostApi,
       medicineAllApi,
       medicineDeleteApi,
       medicineGetApi,
       medicineUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async medicinePostActions (commit, payload) {
               const serviceResponse = await medicinePostApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async medicineAllActions (commit) {
               const serviceResponse = await medicineAllApi()
               console.log(serviceResponse)
               return serviceResponse
           },
           async medicineDeleteActions (commit, payload) {
               const serviceResponse = await medicineDeleteApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async medicineGetActions (commit, payload) {
               const serviceResponse = await medicineGetApi(payload)
               console.log(serviceResponse)
               return serviceResponse
           },
           async medicineUpdateActions (commit, payload) {
               const serviceResponse = await medicineUpdateApi(payload, payload.id)
               console.log(serviceResponse)
               return serviceResponse
           },
       },
   }
