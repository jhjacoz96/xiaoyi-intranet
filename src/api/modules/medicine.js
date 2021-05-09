import { apiHttp } from '../axiosApi'

import {
    medicinePath,
} from '../config/apiRoute'

export const medicinePostApi = (body) => apiHttp('POST', `${medicinePath}`, body)
export const medicineUpdateApi = (body, id) => apiHttp('PUT', `${medicinePath}/${id}`, body)
export const medicineGetApi = (id) => apiHttp('GET', `${medicinePath}/${id}`)
export const medicineAllApi = () => apiHttp('GET', `${medicinePath}`)
export const medicineDeleteApi = (id) => apiHttp('DELETE', `${medicinePath}/${id}`)
