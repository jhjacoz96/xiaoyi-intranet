import { apiHttp } from '../axiosApi'

import {
    fileClinicalObstetricPath,
} from '../config/apiRoute'

export const fileClinicalObstetricPostApi = (body) => apiHttp('POST', `${fileClinicalObstetricPath}`, body)
export const fileClinicalObstetricSearchApi = (body) => apiHttp('POST', `${fileClinicalObstetricPath}/search`, body)
export const fileClinicalObstetricFilterApi = (body) => apiHttp('POST', `${fileClinicalObstetricPath}/filter`, body)
export const fileClinicalObstetricUpdateApi = (body, id) => apiHttp('PUT', `${fileClinicalObstetricPath}/${id}`, body)
export const fileClinicalObstetricGetApi = (id) => apiHttp('GET', `${fileClinicalObstetricPath}/${id}`)
export const fileClinicalObstetricCheckApi = (cedula) => apiHttp('GET', `${fileClinicalObstetricPath}/check/${cedula}`)
export const fileClinicalObstetricCheckPregnantApi = (cedula) => apiHttp('GET', `${fileClinicalObstetricPath}/check-pregnant/${cedula}`)
export const fileClinicalObstetricAllApi = () => apiHttp('GET', `${fileClinicalObstetricPath}`)
export const fileClinicalObstetricDeleteApi = (id) => apiHttp('DELETE', `${fileClinicalObstetricPath}/${id}`)
