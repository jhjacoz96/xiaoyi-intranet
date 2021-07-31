import { apiHttp } from '../axiosApi'

import {
     alterationPregnantPath,
} from '../config/apiRoute'

export const alterationPregnantPostApi = (body) => apiHttp('POST', `${alterationPregnantPath}`, body)
export const alterationPregnantUpdateApi = (body, id) => apiHttp('PUT', `${alterationPregnantPath}/${id}`, body)
export const alterationPregnantGetApi = (id) => apiHttp('GET', `${alterationPregnantPath}/${id}`)
export const alterationPregnantAllApi = () => apiHttp('GET', `${alterationPregnantPath}`)
export const alterationPregnantDeleteApi = (id) => apiHttp('DELETE', `${alterationPregnantPath}/${id}`)
