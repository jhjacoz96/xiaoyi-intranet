import { apiHttp } from '../axiosApi'

import {
   genderPath,
} from '../config/apiRoute'

export const genderAllApi = () => apiHttp('GET', `${genderPath}`)
