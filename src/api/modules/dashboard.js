import { apiHttp } from '../axiosApi'

import {
    dashboardPath,
} from '../config/apiRoute'

export const dashboardGetApi = () => apiHttp('GET', `${dashboardPath}`)
