import { apiHttp } from '../axiosApi'

import {
  typeEmployeePath,
} from '../config/apiRoute'

export const typeEmployeePostApi = (body) => apiHttp('POST', `${typeEmployeePath}`, body)
export const typeEmployeeUpdateApi = (body, id) => apiHttp('PUT', `${typeEmployeePath}/${id}`, body)
export const typeEmployeeGetApi = (id) => apiHttp('GET', `${typeEmployeePath}/${id}`)
export const typeEmployeeAllApi = () => apiHttp('GET', `${typeEmployeePath}`)
export const typeEmployeeDeleteApi = (id) => apiHttp('DELETE', `${typeEmployeePath}/${id}`)
