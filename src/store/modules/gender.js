import {
       genderAllApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async genderAllActions (commit) {
               const serviceResponse = await genderAllApi()
               return serviceResponse
           },
       },
   }
