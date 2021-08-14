import { apiHttp } from '../axiosApi'

import {
    administrationSystemPath,
} from '../config/apiRoute'

export const backupAllApi = (disk) => apiHttp('GET', `${administrationSystemPath}/backup-db?select_disk=${disk}`)
export const auditAllApi = (data) => apiHttp('POST', `${administrationSystemPath}/audit`, data)
export const backupCreateApi = (disk) => apiHttp('GET', `${administrationSystemPath}/backup-db/store?select_disk=${disk}`)
export const backupDownloadApi = (disk, filename) => apiHttp('GET', `${administrationSystemPath}/backup-db/download/${filename}?select_disk=${disk}`)
export const backupDeleteApi = (disk, filename) => apiHttp('GET', `${administrationSystemPath}/backup-db/destroy/${filename}?select_disk=${disk}`)
