import { apiHttp } from '../axiosApi'

import {
   servicePath,
} from '../config/apiRoute'

export const servicePostApi = (body) => apiHttp('POST', `${servicePath}`, body)
export const serviceUpdateApi = (body, id) => apiHttp('PUT', `${servicePath}/${id}`, body)
export const serviceAssignActivitiesApi = (body, id) => apiHttp('PUT', `${servicePath}/assign-activities/${id}`, body)
export const serviceGetApi = (id) => apiHttp('GET', `${servicePath}/${id}`)
export const serviceAllApi = () => apiHttp('GET', `${servicePath}`)
export const serviceDeleteApi = (id) => apiHttp('DELETE', `${servicePath}/${id}`)
