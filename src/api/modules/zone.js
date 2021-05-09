import { apiHttp } from '../axiosApi'

import {
  zonePath,
} from '../config/apiRoute'

export const zonePostApi = (body) => apiHttp('POST', `${zonePath}`, body)
export const zoneUpdateApi = (body, id) => apiHttp('PUT', `${zonePath}/${id}`, body)
export const zoneGetApi = (id) => apiHttp('GET', `${zonePath}/${id}`)
export const zoneAllApi = () => apiHttp('GET', `${zonePath}`)
export const zoneDeleteApi = (id) => apiHttp('DELETE', `${zonePath}/${id}`)
export const provinceAllApi = () => apiHttp('GET', '/api/province')
export const cantonFindApi = (id) => apiHttp('GET', `/api/canton/${id}`)
