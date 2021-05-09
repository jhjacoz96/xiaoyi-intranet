import { apiHttp } from '../axiosApi'

import {
    cantonPath,
} from '../config/apiRoute'

export const cantonApi = (body) => apiHttp('POST', `${cantonPath}`, body)
