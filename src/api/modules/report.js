import { apiHttp } from '../axiosApi'

import {
    reportPath,
} from '../config/apiRoute'
var options = {
    responseType: 'blob',
}
export const reportPostApi = (body) => apiHttp('POST', `${reportPath}`, body)
export const reportFilefamilyAllApi = (body) => apiHttp('POST', `${reportPath}/file-family`, body)
export const reportMemberAllApi = (body) => apiHttp('POST', `${reportPath}/member`, body)
export const reportFileClinicalObstricAllApi = (body) => apiHttp('POST', `${reportPath}/file-clinical-obstetric`, body)
export const reportFileClinicalNeonatologyAllApi = (body) => apiHttp('POST', `${reportPath}/file-clinical-neonatology`, body)
export const reportFilefamilyDownloadApi = (body) => apiHttp('POST', `${reportPath}/file-family/generate`, body, options)
export const reportMemberDownloadApi = (body) => apiHttp('POST', `${reportPath}/member/generate`, body, options)
export const pdfApi = () => apiHttp('GET', `${reportPath}/pdf`, options)
export const reportDiabeticPatientAllApi = (body) => apiHttp('POST', `${reportPath}/diabetic-patient`, body)
export const reportDiabeticPatientDownloadApi = (body) => apiHttp('POST', `${reportPath}/diabetic-patient/generate`, body, options)
