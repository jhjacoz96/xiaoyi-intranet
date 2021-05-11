import { apiHttp } from '../axiosApi'

import {
    carruselPath,
} from '../config/apiRoute'

export const carruselPostApi = (body) => apiHttp('POST', `${carruselPath}`, body)
export const carruselUpdateApi = (body, id) => apiHttp('PUT', `${carruselPath}/${id}`, body)
export const carruselGetApi = (id) => apiHttp('GET', `${carruselPath}/${id}`)
export const carruselAllApi = () => apiHttp('GET', `${carruselPath}`)
export const carruselDeleteApi = (id) => apiHttp('DELETE', `${carruselPath}/${id}`)
