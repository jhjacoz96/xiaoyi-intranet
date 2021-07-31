import { apiHttp } from '../axiosApi'

import {
    fileClinicalNeonatologyPath,
} from '../config/apiRoute'

export const fileClinicalNeonatologyPostApi = (body) => apiHttp('POST', `${fileClinicalNeonatologyPath}`, body)
export const fileClinicalNeonatologyUpdateApi = (body, id) => apiHttp('PUT', `${fileClinicalNeonatologyPath}/${id}`, body)
export const fileClinicalNeonatologyGetApi = (id) => apiHttp('GET', `${fileClinicalNeonatologyPath}/${id}`)
export const fileClinicalNeonatologyAllApi = () => apiHttp('GET', `${fileClinicalNeonatologyPath}`)
export const fileClinicalNeonatologyDeleteApi = (id) => apiHttp('DELETE', `${fileClinicalNeonatologyPath}/${id}`)
export const fileClinicalNeonatologySearchApi = (body) => apiHttp('POST', `${fileClinicalNeonatologyPath}/search`, body)
export const fileClinicalNeonatologySearchNumberApi = (id) => apiHttp('GET', `${fileClinicalNeonatologyPath}/search/${id}`)
export const fileClinicalNeonatologyFilterApi = (body) => apiHttp('POST', `${fileClinicalNeonatologyPath}/filter`, body)
export const fileClinicalNeonatologyCheckPregnantApi = (cedula) => apiHttp('GET', `${fileClinicalNeonatologyPath}/check-pregnant/${cedula}`)
