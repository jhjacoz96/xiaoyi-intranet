import {
    filterTwoPublicationPostApi,
       filterTwoPublicationAllApi,
       filterTwoPublicationDeleteApi,
       filterTwoPublicationGetApi,
       filterTwoPublicationUpdateApi,
       filterTwoPublicationFilterApi,
     } from '@/api/modules'

    export default {
        namespaced: true,
        state: {},
        getters: {},
        mutations: {},
        actions: {
            async filterTwoPublicationPostActions (commit, payload) {
                const serviceResponse = await filterTwoPublicationPostApi(payload)
                return serviceResponse
            },
            async filterTwoPublicationAllActions (commit) {
                const serviceResponse = await filterTwoPublicationAllApi()
                return serviceResponse
            },
            async filterTwoPublicationFilterActions (commit, payload) {
                const serviceResponse = await filterTwoPublicationFilterApi(payload)
                return serviceResponse
            },
            async filterTwoPublicationDeleteActions (commit, payload) {
                const serviceResponse = await filterTwoPublicationDeleteApi(payload)
                return serviceResponse
            },
            async filterTwoPublicationGetActions (commit, payload) {
                const serviceResponse = await filterTwoPublicationGetApi(payload)
                return serviceResponse
            },
            async filterTwoPublicationUpdateActions (commit, payload) {
                const serviceResponse = await filterTwoPublicationUpdateApi(payload, payload.id)
                return serviceResponse
            },
        },
    }
