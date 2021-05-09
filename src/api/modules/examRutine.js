import { apiHttp } from '../axiosApi'

import {
    examRutinePath,
} from '../config/apiRoute'

export const examRutinePostApi = (body) => apiHttp('POST', `${examRutinePath}`, body)
export const examRutineUpdateApi = (body, id) => apiHttp('PUT', `${examRutinePath}/${id}`, body)
export const examRutineGetApi = (id) => apiHttp('GET', `${examRutinePath}/${id}`)
export const examRutineAllApi = () => apiHttp('GET', `${examRutinePath}`)
export const examRutineDeleteApi = (id) => apiHttp('DELETE', `${examRutinePath}/${id}`)
