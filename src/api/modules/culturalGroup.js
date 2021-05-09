import { apiHttp } from '../axiosApi'

import {
    culturalGroupPath,
} from '../config/apiRoute'

export const culturalGroupPostApi = (body) => apiHttp('POST', `${culturalGroupPath}`, body)
export const culturalGroupUpdateApi = (body, id) => apiHttp('PUT', `${culturalGroupPath}/${id}`, body)
export const culturalGroupGetApi = (id) => apiHttp('GET', `${culturalGroupPath}/${id}`)
export const culturalGroupAllApi = () => apiHttp('GET', `${culturalGroupPath}`)
export const culturalGroupDeleteApi = (id) => apiHttp('DELETE', `${culturalGroupPath}/${id}`)
