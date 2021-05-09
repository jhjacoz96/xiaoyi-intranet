import { apiHttp } from '../axiosApi'

import {
    riskPath,
} from '../config/apiRoute'

export const riskPostApi = (body) => apiHttp('POST', `${riskPath}`, body)
export const riskUpdateApi = (body, id) => apiHttp('PUT', `${riskPath}/${id}`, body)
export const riskGetApi = (id) => apiHttp('GET', `${riskPath}/${id}`)
export const riskAllApi = () => apiHttp('GET', `${riskPath}`)
export const riskDeleteApi = (id) => apiHttp('DELETE', `${riskPath}/${id}`)
