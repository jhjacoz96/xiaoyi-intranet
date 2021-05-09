import { apiHttp } from '../axiosApi'

import {
    levelRiskPath,
} from '../config/apiRoute'

export const levelRiskPostApi = (body) => apiHttp('POST', `${levelRiskPath}`, body)
export const levelRiskUpdateApi = (body, id) => apiHttp('PUT', `${levelRiskPath}/${id}`, body)
export const levelRiskGetApi = (id) => apiHttp('GET', `${levelRiskPath}/${id}`)
export const levelRiskAllApi = () => apiHttp('GET', `${levelRiskPath}`)
export const levelRiskDeleteApi = (id) => apiHttp('DELETE', `${levelRiskPath}/${id}`)
