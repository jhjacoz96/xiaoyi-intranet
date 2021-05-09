import { apiHttp } from '../axiosApi'

import {
    groupAgePath,
} from '../config/apiRoute'

export const groupAgePostApi = (body) => apiHttp('POST', `${groupAgePath}`, body)
export const groupAgeUpdateApi = (body, id) => apiHttp('PUT', `${groupAgePath}/${id}`, body)
export const groupAgeGetApi = (id) => apiHttp('GET', `${groupAgePath}/${id}`)
export const groupAgeAllApi = () => apiHttp('GET', `${groupAgePath}`)
export const groupAgeDeleteApi = (id) => apiHttp('DELETE', `${groupAgePath}/${id}`)
