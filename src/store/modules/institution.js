import {
 institutionPostApi,
    institutionAllApi,
    institutionDeleteApi,
    institutionGetApi,
    institutioUpdateApi,
 } from '@/api/modules'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async institutionPostActions (commit, payload) {
            const serviceResponse = await institutionPostApi(payload)
            return serviceResponse
        },
        async institutionAllActions (commit) {
            const serviceResponse = await institutionAllApi()
            return serviceResponse
        },
        async institutionDeleteActions (commit, payload) {
            const serviceResponse = await institutionDeleteApi(payload)
            return serviceResponse
        },
        async institutionGetActions (commit, payload) {
            const serviceResponse = await institutionGetApi(payload)
            return serviceResponse
        },
        async institutionUpdateActions (commit, payload) {
            const serviceResponse = await institutioUpdateApi(payload, payload.id)
            return serviceResponse
        },
    },
}
