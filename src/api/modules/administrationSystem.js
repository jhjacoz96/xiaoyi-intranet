import { apiHttp } from '../axiosApi'

import {
    administrationSystemPath,
} from '../config/apiRoute'

export const backupAllApi = () => apiHttp('GET', `${administrationSystemPath}/backup-db`)
export const auditAllApi = (data) => apiHttp('POST', `${administrationSystemPath}/audit`, data)
export const backupCreateApi = () => apiHttp('GET', `${administrationSystemPath}/backup-db/store`)
export const backupDownloadApi = (filename) => apiHttp('GET', `${administrationSystemPath}/backup-db/download/${filename}`)
export const backupDeleteApi = (filename) => apiHttp('GET', `${administrationSystemPath}/backup-db/destroy/${filename}`)
