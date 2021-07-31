import { apiHttp } from '../axiosApi'

import {
    pathologyNeonataPath,
} from '../config/apiRoute'

export const pathologyNeonatalPostApi = (body) => apiHttp('POST', `${pathologyNeonataPath}`, body)
export const pathologyNeonatalUpdateApi = (body, id) => apiHttp('PUT', `${pathologyNeonataPath}/${id}`, body)
export const pathologyNeonatalGetApi = (id) => apiHttp('GET', `${pathologyNeonataPath}/${id}`)
export const pathologyNeonatalAllApi = () => apiHttp('GET', `${pathologyNeonataPath}`)
export const pathologyNeonatalDeleteApi = (id) => apiHttp('DELETE', `${pathologyNeonataPath}/${id}`)
