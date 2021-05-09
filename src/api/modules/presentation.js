import { apiHttp } from '../axiosApi'

import {
    presentationPath,
} from '../config/apiRoute'

export const presentationPostApi = (body) => apiHttp('POST', `${presentationPath}`, body)
export const presentationUpdateApi = (body, id) => apiHttp('PUT', `${presentationPath}/${id}`, body)
export const presentationGetApi = (id) => apiHttp('GET', `${presentationPath}/${id}`)
export const presentationAllApi = () => apiHttp('GET', `${presentationPath}`)
export const presentationDeleteApi = (id) => apiHttp('DELETE', `${presentationPath}/${id}`)
