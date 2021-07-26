import { apiHttp } from '../axiosApi'

import {
    contaminationPath,
} from '../config/apiRoute'

export const contaminationPostApi = (body) => apiHttp('POST', `${contaminationPath}`, body)
export const contaminationUpdateApi = (body, id) => apiHttp('PUT', `${contaminationPath}/${id}`, body)
export const contaminationGetApi = (id) => apiHttp('GET', `${contaminationPath}/${id}`)
export const contaminationAllApi = () => apiHttp('GET', `${contaminationPath}`)
export const contaminationDeleteApi = (id) => apiHttp('DELETE', `${contaminationPath}/${id}`)
