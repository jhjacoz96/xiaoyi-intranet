import { apiHttp } from '../axiosApi'

import {
    pathologyPregnantPath,
} from '../config/apiRoute'

export const pathologyPregnantPostApi = (body) => apiHttp('POST', `${pathologyPregnantPath}`, body)
export const pathologyPregnantUpdateApi = (body, id) => apiHttp('PUT', `${pathologyPregnantPath}/${id}`, body)
export const pathologyPregnantGetApi = (id) => apiHttp('GET', `${pathologyPregnantPath}/${id}`)
export const pathologyPregnantAllApi = () => apiHttp('GET', `${pathologyPregnantPath}`)
export const pathologyPregnantDeleteApi = (id) => apiHttp('DELETE', `${pathologyPregnantPath}/${id}`)
