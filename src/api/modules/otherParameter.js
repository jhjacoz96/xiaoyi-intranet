import { apiHttp } from '../axiosApi'

export const relationshipAllApi = () => apiHttp('GET', '/api/relationship')
export const psyshotrophicAllApi = () => apiHttp('GET', '/api/psyshotrophic')
export const scholarshipAllApi = () => apiHttp('GET', '/api/scholarship')
export const gestationWeekAllApi = () => apiHttp('GET', '/api/gestation-week')
