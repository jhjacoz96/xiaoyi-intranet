import { apiHttp } from '../axiosApi'

import {
    webDiabeticPath,
    webUsPath,
    webServicePath,
    webOlderAdultPath,
    webSubcriptionPath,
    webContactPath,
    webOrganizationPath,
} from '../config/apiRoute'

export const webDiabeticPostApi = (body) => apiHttp('POST', `${webDiabeticPath}`, body)
export const webDiabeticAllApi = () => apiHttp('GET', `${webDiabeticPath}`)
export const webUsPostApi = (body) => apiHttp('POST', `${webUsPath}`, body)
export const webUsAllApi = (body) => apiHttp('GET', `${webUsPath}`)
export const webServiceAllApi = () => apiHttp('GET', `${webServicePath}`)
export const webServicePostApi = (body) => apiHttp('POST', `${webServicePath}`, body)
export const webOlderAdultAllApi = () => apiHttp('GET', `${webOlderAdultPath}`)
export const webOlderAdultPostApi = (body) => apiHttp('POST', `${webOlderAdultPath}`, body)
export const webSubcriptionAllApi = () => apiHttp('GET', `${webSubcriptionPath}`)
export const webSubcriptionPostApi = (body) => apiHttp('POST', `${webSubcriptionPath}`, body)
export const webContactAllApi = () => apiHttp('GET', `${webContactPath}`)
export const webContactPostApi = (body) => apiHttp('POST', `${webContactPath}`, body)
export const webOrganizationAllApi = () => apiHttp('GET', `${webOrganizationPath}`)
export const webOrganizationPostApi = (body) => apiHttp('POST', `${webOrganizationPath}`, body)
