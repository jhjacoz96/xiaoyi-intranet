import { apiHttp } from '../axiosApi'

import {
    filterThreePublicationPath,
} from '../config/apiRoute'

export const filterThreePublicationPostApi = (body) => apiHttp('POST', `${filterThreePublicationPath}`, body)
export const filterThreePublicationUpdateApi = (body, id) => apiHttp('PUT', `${filterThreePublicationPath}/${id}`, body)
export const filterThreePublicationGetApi = (id) => apiHttp('GET', `${filterThreePublicationPath}/${id}`)
export const filterThreePublicationFilterApi = (id) => apiHttp('GET', `${filterThreePublicationPath}/filter/${id}`)
export const filterThreePublicationAllApi = () => apiHttp('GET', `${filterThreePublicationPath}`)
export const filterThreePublicationDeleteApi = (id) => apiHttp('DELETE', `${filterThreePublicationPath}/${id}`)
