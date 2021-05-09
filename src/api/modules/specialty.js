import { apiHttp } from '../axiosApi'

import {
   specialtyPath,
} from '../config/apiRoute'

export const specialtyPostApi = (body) => apiHttp('POST', `${specialtyPath}`, body)
export const specialtyUpdateApi = (body, id) => apiHttp('PUT', `${specialtyPath}/${id}`, body)
export const specialtyGetApi = (id) => apiHttp('GET', `${specialtyPath}/${id}`)
export const specialtyAllApi = () => apiHttp('GET', `${specialtyPath}`)
export const specialtyDeleteApi = (id) => apiHttp('DELETE', `${specialtyPath}/${id}`)
