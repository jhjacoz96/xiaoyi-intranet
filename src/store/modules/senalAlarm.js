import {
    senalAlarmPostApi,
       senalAlarmAllApi,
       senalAlarmDeleteApi,
       senalAlarmGetApi,
       senalAlarmUpdateApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {},
       getters: {},
       mutations: {},
       actions: {
           async senalAlarmPostActions (commit, payload) {
               const senalAlarmResponse = await senalAlarmPostApi(payload)
               return senalAlarmResponse
           },
           async senalAlarmAllActions (commit) {
               const senalAlarmResponse = await senalAlarmAllApi()
               return senalAlarmResponse
           },
           async senalAlarmDeleteActions (commit, payload) {
               const senalAlarmResponse = await senalAlarmDeleteApi(payload)
               return senalAlarmResponse
           },
           async senalAlarmGetActions (commit, payload) {
               const senalAlarmResponse = await senalAlarmGetApi(payload)
               return senalAlarmResponse
           },
           async senalAlarmUpdateActions (commit, payload) {
               const senalAlarmResponse = await senalAlarmUpdateApi(payload, payload.id)
               return senalAlarmResponse
           },
       },
   }
