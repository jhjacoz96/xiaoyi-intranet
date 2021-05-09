import { apiHttp } from '../axiosApi'

import {
    institutionPath,
} from '../config/apiRoute'

export const institutionPostApi = (body) => apiHttp('POST', `${institutionPath}`, body)
export const institutioUpdateApi = (body, id) => apiHttp('PUT', `${institutionPath}/${id}`, body)
export const institutionGetApi = (id) => apiHttp('GET', `${institutionPath}/${id}`)
export const institutionAllApi = () => apiHttp('GET', `${institutionPath}`)
export const institutionDeleteApi = (id) => apiHttp('DELETE', `${institutionPath}/${id}`)
