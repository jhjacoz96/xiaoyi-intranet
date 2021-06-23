import { apiHttp } from '../axiosApi'

import {
   employeePath,
} from '../config/apiRoute'

export const employeePostApi = (body) => apiHttp('POST', `${employeePath}`, body)
export const employeeUpdateApi = (body, id) => apiHttp('PUT', `${employeePath}/${id}`, body)
export const employeeAvatarApi = (body) => apiHttp('POST', `${employeePath}/avatar`, body)
export const employePasswordUpdateApi = (body) => apiHttp('POST', `${employeePath}/password`, body)
export const employeeGetApi = (id) => apiHttp('GET', `${employeePath}/${id}`)
export const employeeGetNotificationsApi = () => apiHttp('GET', `${employeePath}/notifications`)
export const employeeReadNotificationsApi = (id) => apiHttp('GET', `${employeePath}/read-notifications/${id}`)
export const employeeReadAllNotificationsApi = () => apiHttp('GET', `${employeePath}/read-all-notifications`)
export const employeeAllApi = () => apiHttp('GET', `${employeePath}`)
export const employeeDeleteApi = (id) => apiHttp('DELETE', `${employeePath}/${id}`)
