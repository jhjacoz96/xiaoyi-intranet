import { apiHttp } from '../axiosApi'

import {
    disabilityPath,
} from '../config/apiRoute'

export const disabilityPostApi = (body) => apiHttp('POST', `${disabilityPath}`, body)
export const disabilityUpdateApi = (body, id) => apiHttp('PUT', `${disabilityPath}/${id}`, body)
export const disabilityGetApi = (id) => apiHttp('GET', `${disabilityPath}/${id}`)
export const disabilityAllApi = () => apiHttp('GET', `${disabilityPath}`)
export const disabilityDeleteApi = (id) => apiHttp('DELETE', `${disabilityPath}/${id}`)
