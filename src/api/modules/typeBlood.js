import { apiHttp } from '../axiosApi'

import {
   typeBloodPath,
} from '../config/apiRoute'

export const typeBloodPostApi = (body) => apiHttp('POST', `${typeBloodPath}`, body)
export const typeBloodUpdateApi = (body, id) => apiHttp('PUT', `${typeBloodPath}/${id}`, body)
export const typeBloodGetApi = (id) => apiHttp('GET', `${typeBloodPath}/${id}`)
export const typeBloodAllApi = () => apiHttp('GET', `${typeBloodPath}`)
export const typeBloodDeleteApi = (id) => apiHttp('DELETE', `${typeBloodPath}/${id}`)
