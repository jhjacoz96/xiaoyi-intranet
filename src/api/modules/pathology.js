import { apiHttp } from '../axiosApi'

import {
    pathologyPath,
} from '../config/apiRoute'

export const pathologyPostApi = (body) => apiHttp('POST', `${pathologyPath}`, body)
export const pathologyUpdateApi = (body, id) => apiHttp('PUT', `${pathologyPath}/${id}`, body)
export const pathologyGetApi = (id) => apiHttp('GET', `${pathologyPath}/${id}`)
export const pathologyAllApi = () => apiHttp('GET', `${pathologyPath}`)
export const pathologyDeleteApi = (id) => apiHttp('DELETE', `${pathologyPath}/${id}`)
