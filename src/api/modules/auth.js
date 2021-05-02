import { apiHttp } from '../axiosApi'

import {
    authPath,
} from '../config/apiRoute'

export const loginApi = (body) => apiHttp('POST', `${authPath}/login`, body)
