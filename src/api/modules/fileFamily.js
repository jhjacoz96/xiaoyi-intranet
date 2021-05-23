import { apiHttp } from '../axiosApi'

import {
    fileFamilyPath,
} from '../config/apiRoute'

export const fileFamilyPostApi = (body) => apiHttp('POST', `${fileFamilyPath}`, body)
export const fileFamilySearchApi = (body) => apiHttp('POST', `${fileFamilyPath}/search`, body)
export const fileFamilyFilterApi = (body) => apiHttp('POST', `${fileFamilyPath}/filter`, body)
export const fileFamilyUpdateApi = (body, id) => apiHttp('PUT', `${fileFamilyPath}/${id}`, body)
export const fileFamilyShowApi = (id) => apiHttp('GET', `${fileFamilyPath}/${id}`)
export const fileFamilyAllApi = () => apiHttp('GET', `${fileFamilyPath}`)
export const fileFamilyDeleteApi = (id) => apiHttp('DELETE', `${fileFamilyPath}/${id}`)
