import {
    frequencyPostApi,
       frequencyAllApi,
       frequencyDeleteApi,
       frequencyGetApi,
       frequencyUpdateApi,
     } from '@/api/modules'

    export default {
        namespaced: true,
        state: {},
        getters: {},
        mutations: {},
        actions: {
            async frequencyPostActions (commit, payload) {
                const serviceResponse = await frequencyPostApi(payload)
                return serviceResponse
            },
            async frequencyAllActions (commit) {
                const serviceResponse = await frequencyAllApi()
                return serviceResponse
            },
            async frequencyDeleteActions (commit, payload) {
                const serviceResponse = await frequencyDeleteApi(payload)
                return serviceResponse
            },
            async frequencyGetActions (commit, payload) {
                const serviceResponse = await frequencyGetApi(payload)
                return serviceResponse
            },
            async frequencyUpdateActions (commit, payload) {
                const serviceResponse = await frequencyUpdateApi(payload, payload.id)
                return serviceResponse
            },
        },
    }
