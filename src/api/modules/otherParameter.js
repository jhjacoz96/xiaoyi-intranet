import { apiHttp } from '../axiosApi'

export const relationshipAllApi = () => apiHttp('GET', '/api/relationship')
export const psyshotrophicAllApi = () => apiHttp('GET', '/api/psyshotrophic')
export const scholarshipAllApi = () => apiHttp('GET', '/api/scholarship')
export const gestationWeekAllApi = () => apiHttp('GET', '/api/gestation-week')
export const reflexAllApi = () => apiHttp('GET', '/api/reflex')
export const alterationPregnantAllApi = () => apiHttp('GET', '/api/alteration-pregnant')
export const pathologyNeonatalAllApi = () => apiHttp('GET', '/api/pathology-neonatal')
export const pathologyPregnantAllApi = () => apiHttp('GET', '/api/pathology-pregnant')
export const senalAlarmAllApi = () => apiHttp('GET', '/api/senal-alarm')
