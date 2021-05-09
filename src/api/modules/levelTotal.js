import { apiHttp } from '../axiosApi'

import {
    levelTotalPath,
} from '../config/apiRoute'

export const levelTotalPostApi = (body) => apiHttp('POST', `${levelTotalPath}`, body)
export const levelTotalUpdateApi = (body, id) => apiHttp('PUT', `${levelTotalPath}/${id}`, body)
export const levelTotalGetApi = (id) => apiHttp('GET', `${levelTotalPath}/${id}`)
export const levelTotalAllApi = () => apiHttp('GET', `${levelTotalPath}`)
export const levelTotalDeleteApi = (id) => apiHttp('DELETE', `${levelTotalPath}/${id}`)
