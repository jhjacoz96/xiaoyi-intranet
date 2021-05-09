import { apiHttp } from '../axiosApi'

import {
    measurePath,
} from '../config/apiRoute'

export const measurePostApi = (body) => apiHttp('POST', `${measurePath}`, body)
export const measureUpdateApi = (body, id) => apiHttp('PUT', `${measurePath}/${id}`, body)
export const measureGetApi = (id) => apiHttp('GET', `${measurePath}/${id}`)
export const measureAllApi = () => apiHttp('GET', `${measurePath}`)
export const measureDeleteApi = (id) => apiHttp('DELETE', `${measurePath}/${id}`)
