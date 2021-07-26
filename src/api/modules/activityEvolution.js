import { apiHttp } from '../axiosApi'

import {
    activityEvolutionPath,
} from '../config/apiRoute'

export const activityEvolutionPostApi = (body) => apiHttp('POST', `${activityEvolutionPath}`, body)
export const activityEvolutionUpdateApi = (body, id) => apiHttp('PUT', `${activityEvolutionPath}/${id}`, body)
export const activityEvolutionGetApi = (id) => apiHttp('GET', `${activityEvolutionPath}/${id}`)
export const activityEvolutionAllApi = () => apiHttp('GET', `${activityEvolutionPath}`)
export const activityEvolutionDeleteApi = (id) => apiHttp('DELETE', `${activityEvolutionPath}/${id}`)
