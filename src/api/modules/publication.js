import { apiHttp } from '../axiosApi'

import {
    publicationPath,
} from '../config/apiRoute'

export const publicationPostApi = (body) => apiHttp('POST', `${publicationPath}`, body)
export const publicationUpdateApi = (body, id) => apiHttp('PUT', `${publicationPath}/${id}`, body)
export const publicationGetApi = (id) => apiHttp('GET', `${publicationPath}/${id}`)
export const publicationAllApi = () => apiHttp('GET', `${publicationPath}`)
export const publicationDeleteApi = (id) => apiHttp('DELETE', `${publicationPath}/${id}`)
