import {
    filterOnePublicationPostApi,
       filterOnePublicationAllApi,
       filterOnePublicationDeleteApi,
       filterOnePublicationGetApi,
       filterOnePublicationUpdateApi,
     } from '@/api/modules'

    export default {
        namespaced: true,
        state: {},
        getters: {},
        mutations: {},
        actions: {
            async filterOnePublicationPostActions (commit, payload) {
                const serviceResponse = await filterOnePublicationPostApi(payload)
                return serviceResponse
            },
            async filterOnePublicationAllActions (commit) {
                const serviceResponse = await filterOnePublicationAllApi()
                return serviceResponse
            },
            async filterOnePublicationDeleteActions (commit, payload) {
                const serviceResponse = await filterOnePublicationDeleteApi(payload)
                return serviceResponse
            },
            async filterOnePublicationGetActions (commit, payload) {
                const serviceResponse = await filterOnePublicationGetApi(payload)
                return serviceResponse
            },
            async filterOnePublicationUpdateActions (commit, payload) {
                const serviceResponse = await filterOnePublicationUpdateApi(payload, payload.id)
                return serviceResponse
            },
        },
    }
