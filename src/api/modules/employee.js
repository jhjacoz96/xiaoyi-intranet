import { apiHttp } from '../axiosApi'

import {
   employeePath,
} from '../config/apiRoute'

export const employeePostApi = (body) => apiHttp('POST', `${employeePath}`, body)
export const employeeUpdateApi = (body, id) => apiHttp('PUT', `${employeePath}/${id}`, body)
export const employeeGetApi = (id) => apiHttp('GET', `${employeePath}/${id}`)
export const employeeAllApi = () => apiHttp('GET', `${employeePath}`)
export const employeeDeleteApi = (id) => apiHttp('DELETE', `${employeePath}/${id}`)