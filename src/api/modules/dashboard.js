import { apiHttp } from '../axiosApi'

import {
    dashboardPath,
} from '../config/apiRoute'

export const dashboardGetApi = () => apiHttp('GET', `${dashboardPath}`)
export const dashboardReportPathologyApi = (data) => apiHttp('GET', `${dashboardPath}/report-pathology?group_age_id=${data}`)
