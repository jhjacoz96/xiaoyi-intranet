import { apiHttp } from '../axiosApi'

import {
   typeDocumentPath,
} from '../config/apiRoute'

export const typeDocumentAllApi = () => apiHttp('GET', `${typeDocumentPath}`)
