import { apiHttp } from '../axiosApi'

import {
    controlDiabeticPath,
} from '../config/apiRoute'

export const controlDiabeticUpdateApi = (body, id) => apiHttp('PUT', `${controlDiabeticPath}/${id}`, body)
export const controlDiabeticAllApi = () => apiHttp('GET', `${controlDiabeticPath}`)
