import { apiHttp } from '../axiosApi'

import {
    filterOnePublicationPath,
} from '../config/apiRoute'

export const filterOnePublicationPostApi = (body) => apiHttp('POST', `${filterOnePublicationPath}`, body)
export const filterOnePublicationUpdateApi = (body, id) => apiHttp('PUT', `${filterOnePublicationPath}/${id}`, body)
export const filterOnePublicationGetApi = (id) => apiHttp('GET', `${filterOnePublicationPath}/${id}`)
export const filterOnePublicationAllApi = () => apiHttp('GET', `${filterOnePublicationPath}`)
export const filterOnePublicationDeleteApi = (id) => apiHttp('DELETE', `${filterOnePublicationPath}/${id}`)
