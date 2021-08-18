import { apiHttp } from '../axiosApi'

import {
    qualificationPath,
} from '../config/apiRoute'

export const qualificationPostApi = (body) => apiHttp('POST', `${qualificationPath}`, body)
export const qualificationUpdateApi = (body, id) => apiHttp('PUT', `${qualificationPath}/${id}`, body)
export const qualificationGetApi = (id) => apiHttp('GET', `${qualificationPath}/${id}`)
export const qualificationAllApi = () => apiHttp('GET', `${qualificationPath}`)
export const qualificationDeleteApi = (id) => apiHttp('DELETE', `${qualificationPath}/${id}`)
