import { apiHttp } from '../axiosApi'

import {
    filterTwoPublicationPath,
} from '../config/apiRoute'

export const filterTwoPublicationPostApi = (body) => apiHttp('POST', `${filterTwoPublicationPath}`, body)
export const filterTwoPublicationUpdateApi = (body, id) => apiHttp('PUT', `${filterTwoPublicationPath}/${id}`, body)
export const filterTwoPublicationGetApi = (id) => apiHttp('GET', `${filterTwoPublicationPath}/${id}`)
export const filterTwoPublicationFilterApi = (id) => apiHttp('GET', `${filterTwoPublicationPath}/filter/${id}`)
export const filterTwoPublicationAllApi = () => apiHttp('GET', `${filterTwoPublicationPath}`)
export const filterTwoPublicationDeleteApi = (id) => apiHttp('DELETE', `${filterTwoPublicationPath}/${id}`)
