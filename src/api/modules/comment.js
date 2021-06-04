import { apiHttp } from '../axiosApi'

import {
    commentPath,
} from '../config/apiRoute'

export const commentPostApi = (body) => apiHttp('POST', `${commentPath}`, body)
export const commentUpdateApi = (body, id) => apiHttp('PUT', `${commentPath}/${id}`, body)
export const commentGetApi = (id) => apiHttp('GET', `${commentPath}/${id}`)
export const commentAllApi = () => apiHttp('GET', `${commentPath}`)
export const commentDeleteApi = (id) => apiHttp('DELETE', `${commentPath}/${id}`)
