import {
    activityPostApi,
       activityAllApi,
       activityDeleteApi,
       activityGetApi,
       activityUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async activityPostActions (commit, payload) {
               const activityResponse = await activityPostApi(payload)
               return activityResponse
           },
           async activityAllActions (commit) {
               const activityResponse = await activityAllApi()
               return activityResponse
           },
           async activityDeleteActions (commit, payload) {
               const activityResponse = await activityDeleteApi(payload)
               return activityResponse
           },
           async activityGetActions (commit, payload) {
               const activityResponse = await activityGetApi(payload)
               return activityResponse
           },
           async activityUpdateActions (commit, payload) {
               const activityResponse = await activityUpdateApi(payload, payload.id)
               return activityResponse
           },
       },
   }
