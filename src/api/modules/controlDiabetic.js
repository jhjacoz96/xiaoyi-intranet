import { apiHttp } from '../axiosApi'

import {
    controlDiabeticPath,
} from '../config/apiRoute'

export const controlDiabeticUpdateApi = (body, id) => apiHttp('PUT', `${controlDiabeticPath}/${id}`, body)
export const controlDiabeticAllApi = () => apiHttp('GET', `${controlDiabeticPath}`)
export const controlDiabeticAllRecentApi = () => apiHttp('GET', `${controlDiabeticPath}/index-recent`)
export const controlDiabeticGetApi = (id) => apiHttp('GET', `${controlDiabeticPath}/${id}`)
