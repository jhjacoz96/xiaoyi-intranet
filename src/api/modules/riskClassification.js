import { apiHttp } from '../axiosApi'

import {
    riskClassificationPath,
} from '../config/apiRoute'

export const riskClassificationPostApi = (body) => apiHttp('POST', `${riskClassificationPath}`, body)
export const riskClassificationUpdateApi = (body, id) => apiHttp('PUT', `${riskClassificationPath}/${id}`, body)
export const riskClassificationGetApi = (id) => apiHttp('GET', `${riskClassificationPath}/${id}`)
export const riskClassificationAllApi = () => apiHttp('GET', `${riskClassificationPath}`)
export const riskClassificationDeleteApi = (id) => apiHttp('DELETE', `${riskClassificationPath}/${id}`)
