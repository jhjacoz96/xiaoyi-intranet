import { apiHttp } from '../axiosApi'

import {
   provincePath,
} from '../config/apiRoute'

export const provinceApi = (body) => apiHttp('POST', `${provincePath}`, body)
