import { apiHttp } from '../axiosApi'

import {
    typeCommentPath,
} from '../config/apiRoute'

export const typeCommentPostApi = (body) => apiHttp('POST', `${typeCommentPath}`, body)
export const typeCommentUpdateApi = (body, id) => apiHttp('PUT', `${typeCommentPath}/${id}`, body)
export const typeCommentGetApi = (id) => apiHttp('GET', `${typeCommentPath}/${id}`)
export const typeCommentAllApi = () => apiHttp('GET', `${typeCommentPath}`)
export const typeCommentDeleteApi = (id) => apiHttp('DELETE', `${typeCommentPath}/${id}`)
