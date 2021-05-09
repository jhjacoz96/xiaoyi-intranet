import { apiHttp } from '../axiosApi'

import {
    vaccinePath,
} from '../config/apiRoute'

export const vaccinePostApi = (body) => apiHttp('POST', `${vaccinePath}`, body)
export const vaccineUpdateApi = (body, id) => apiHttp('PUT', `${vaccinePath}/${id}`, body)
export const vaccineGetApi = (id) => apiHttp('GET', `${vaccinePath}/${id}`)
export const vaccineAllApi = () => apiHttp('GET', `${vaccinePath}`)
export const vaccineDeleteApi = (id) => apiHttp('DELETE', `${vaccinePath}/${id}`)
