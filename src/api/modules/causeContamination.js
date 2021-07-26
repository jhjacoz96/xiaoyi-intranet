import { apiHttp } from '../axiosApi'

import {
    causeContaminationPath,
} from '../config/apiRoute'

export const causeContaminationPostApi = (body) => apiHttp('POST', `${causeContaminationPath}`, body)
export const causeContaminationUpdateApi = (body, id) => apiHttp('PUT', `${causeContaminationPath}/${id}`, body)
export const causeContaminationGetApi = (id) => apiHttp('GET', `${causeContaminationPath}/${id}`)
export const causeContaminationFindApi = (id) => apiHttp('GET', `${causeContaminationPath}/find/${id}`)
export const causeContaminationAllApi = () => apiHttp('GET', `${causeContaminationPath}`)
export const causeContaminationDeleteApi = (id) => apiHttp('DELETE', `${causeContaminationPath}/${id}`)
