import {
    filterThreePublicationPostApi,
       filterThreePublicationAllApi,
       filterThreePublicationDeleteApi,
       filterThreePublicationGetApi,
       filterThreePublicationUpdateApi,
       filterThreePublicationFilterApi,
     } from '@/api/modules'

    export default {
        namespaced: true,
        state: {},
        getters: {},
        mutations: {},
        actions: {
            async filterThreePublicationPostActions (commit, payload) {
                const serviceResponse = await filterThreePublicationPostApi(payload)
                return serviceResponse
            },
            async filterThreePublicationAllActions (commit) {
                const serviceResponse = await filterThreePublicationAllApi()
                return serviceResponse
            },
            async filterThreePublicationFilterActions (commit, payload) {
                const serviceResponse = await filterThreePublicationFilterApi(payload)
                return serviceResponse
            },
            async filterThreePublicationDeleteActions (commit, payload) {
                const serviceResponse = await filterThreePublicationDeleteApi(payload)
                return serviceResponse
            },
            async filterThreePublicationGetActions (commit, payload) {
                const serviceResponse = await filterThreePublicationGetApi(payload)
                return serviceResponse
            },
            async filterThreePublicationUpdateActions (commit, payload) {
                const serviceResponse = await filterThreePublicationUpdateApi(payload, payload.id)
                return serviceResponse
            },
        },
    }
