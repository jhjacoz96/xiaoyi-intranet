import { apiHttp } from '../axiosApi'

import {
    activityPath,
} from '../config/apiRoute'

export const activityPostApi = (body) => apiHttp('POST', `${activityPath}`, body)
export const activityUpdateApi = (body, id) => apiHttp('PUT', `${activityPath}/${id}`, body)
export const activityGetApi = (id) => apiHttp('GET', `${activityPath}/${id}`)
export const activityAllApi = () => apiHttp('GET', `${activityPath}`)
export const activityDeleteApi = (id) => apiHttp('DELETE', `${activityPath}/${id}`)
