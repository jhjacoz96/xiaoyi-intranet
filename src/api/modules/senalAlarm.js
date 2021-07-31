import { apiHttp } from '../axiosApi'

import {
    senalAlarmPath,
} from '../config/apiRoute'

export const senalAlarmPostApi = (body) => apiHttp('POST', `${senalAlarmPath}`, body)
export const senalAlarmUpdateApi = (body, id) => apiHttp('PUT', `${senalAlarmPath}/${id}`, body)
export const senalAlarmGetApi = (id) => apiHttp('GET', `${senalAlarmPath}/${id}`)
export const senalAlarmAllApi = () => apiHttp('GET', `${senalAlarmPath}`)
export const senalAlarmDeleteApi = (id) => apiHttp('DELETE', `${senalAlarmPath}/${id}`)
