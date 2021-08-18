import { apiHttp } from '../axiosApi'

import {
    qualificationLevelPath,
} from '../config/apiRoute'

export const qualificationLevelPostApi = (body) => apiHttp('POST', `${qualificationLevelPath}`, body)
export const qualificationLevelUpdateApi = (body, id) => apiHttp('PUT', `${qualificationLevelPath}/${id}`, body)
export const qualificationLevelGetApi = (id) => apiHttp('GET', `${qualificationLevelPath}/${id}`)
export const qualificationLevelAllApi = () => apiHttp('GET', `${qualificationLevelPath}`)
export const qualificationLevelDeleteApi = (id) => apiHttp('DELETE', `${qualificationLevelPath}/${id}`)
