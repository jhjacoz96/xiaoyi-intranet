import { apiHttp } from '../axiosApi'

import {
   rolePath,
} from '../config/apiRoute'

export const rolePostApi = (body) => apiHttp('POST', `${rolePath}`, body)
export const roleUpdateApi = (body, id) => apiHttp('PUT', `${rolePath}/${id}`, body)
export const roleGetApi = (id) => apiHttp('GET', `${rolePath}/${id}`)
export const roleAllApi = () => apiHttp('GET', `${rolePath}`)
export const rolePermissionAllApi = () => apiHttp('GET', `${rolePath}/permission`)
export const roleAssignPermissionApi = (body, id) => apiHttp('PUT', `${rolePath}/assign-permissions/${id}`, body)
export const roleDeleteApi = (id) => apiHttp('DELETE', `${rolePath}/${id}`)
