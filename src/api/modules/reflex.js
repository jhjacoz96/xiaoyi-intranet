import { apiHttp } from '../axiosApi'

import {
    reflexPath,
} from '../config/apiRoute'

export const reflexPostApi = (body) => apiHttp('POST', `${reflexPath}`, body)
export const reflexUpdateApi = (body, id) => apiHttp('PUT', `${reflexPath}/${id}`, body)
export const reflexGetApi = (id) => apiHttp('GET', `${reflexPath}/${id}`)
export const reflexAllApi = () => apiHttp('GET', `${reflexPath}`)
export const reflexDeleteApi = (id) => apiHttp('DELETE', `${reflexPath}/${id}`)
