import { apiHttp } from '../axiosApi'

import {
    frequencyPath,
} from '../config/apiRoute'

export const frequencyPostApi = (body) => apiHttp('POST', `${frequencyPath}`, body)
export const frequencyUpdateApi = (body, id) => apiHttp('PUT', `${frequencyPath}/${id}`, body)
export const frequencyGetApi = (id) => apiHttp('GET', `${frequencyPath}/${id}`)
export const frequencyAllApi = () => apiHttp('GET', `${frequencyPath}`)
export const frequencyDeleteApi = (id) => apiHttp('DELETE', `${frequencyPath}/${id}`)
