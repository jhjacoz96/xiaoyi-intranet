import {
    typeDocumentAllApi,
 } from '@/api/modules'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async typeDocumentAllActions (commit) {
            const serviceResponse = await typeDocumentAllApi()
            return serviceResponse
        },
    },
}
