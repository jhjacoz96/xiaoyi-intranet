import { apiHttp } from '../axiosApi'

import {
    causeMortalityPath,
} from '../config/apiRoute'

export const causeMortalityPostApi = (body) => apiHttp('POST', `${causeMortalityPath}`, body)
export const causeMortalityUpdateApi = (body, id) => apiHttp('PUT', `${causeMortalityPath}/${id}`, body)
export const causeMortalityGetApi = (id) => apiHttp('GET', `${causeMortalityPath}/${id}`)
export const causeMortalityAllApi = () => apiHttp('GET', `${causeMortalityPath}`)
export const causeMortalityDeleteApi = (id) => apiHttp('DELETE', `${causeMortalityPath}/${id}`)
