import { apiHttp } from '../axiosApi'

import {
    reportPath,
    reportStadisticPath,
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

export const reportStadisticFilefamilyLevelTotalRiskApi = (body) => apiHttp('POST', `${reportStadisticPath}/level-total-risk`, body)
export const reportStadisticFilefamilyRiskApi = (body) => apiHttp('POST', `${reportStadisticPath}/risk`, body)
export const reportStadisticFilefamilyEvolutionApi = (body) => apiHttp('POST', `${reportStadisticPath}/evolution`, body)
export const reportStadisticFilefamilyMortalityApi = (body) => apiHttp('POST', `${reportStadisticPath}/mortality`, body)

export const reportStadisticMemberPathologyApi = (body) => apiHttp('POST', `${reportStadisticPath}/pathology`, body)
export const reportStadisticMemberDisabilityApi = (body) => apiHttp('POST', `${reportStadisticPath}/disability`, body)
export const reportStadisticMemberVaccineApi = (body) => apiHttp('POST', `${reportStadisticPath}/vaccine`, body)
export const reportStadisticMemberPregnantApi = (body) => apiHttp('POST', `${reportStadisticPath}/pregnant`, body)

export const reportStadisticFileObstatricTypeBirthApi = (body) => apiHttp('POST', `${reportStadisticPath}/type-birth`, body)
export const reportStadisticFileObstatricCharacteristicApi = (body) => apiHttp('POST', `${reportStadisticPath}/characteristic`, body)
export const reportStadisticFileObstatricPlannedPregnancyApi = (body) => apiHttp('POST', `${reportStadisticPath}/planned-pregnancy`, body)

export const reportStadisticFileNeonatologyGestationApi = (body) => apiHttp('POST', `${reportStadisticPath}/gestation`, body)
export const reportStadisticFileNeonatologyVaccineApi = (body) => apiHttp('POST', `${reportStadisticPath}/vaccine-neonatology`, body)

export const reportStadisticDiabeticPatientGlucoseApi = (body) => apiHttp('POST', `${reportStadisticPath}/glucose`, body)
export const reportStadisticDiabeticPatientWeightApi = (body) => apiHttp('POST', `${reportStadisticPath}/weight`, body)
export const reportStadisticDiabeticPatientComorbidApi = (body) => apiHttp('POST', `${reportStadisticPath}/comorbid`, body)
