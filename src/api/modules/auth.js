import { apiHttp } from '../axiosApi'

import {
    authPath,
} from '../config/apiRoute'

export const loginApi = (body) => apiHttp('POST', `${authPath}/login`, body)
export const forgotApi = (body) => apiHttp('POST', `${authPath}/forgot-password`, body)
export const resetApi = (body) => apiHttp('POST', `${authPath}/reset-password`, body)
