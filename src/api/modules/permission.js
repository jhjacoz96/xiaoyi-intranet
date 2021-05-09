import { apiHttp } from '../axiosApi'

import {
   permissionPath,
} from '../config/apiRoute'

export const permissionApi = (body) => apiHttp('POST', `${permissionPath}`, body)
