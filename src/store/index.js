import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import institution from './modules/institution'
import zone from './modules/zone'
import gender from './modules/gender'
import typeDocument from './modules/typeDocument'
import typeEmployee from './modules/typeEmployee'
import specialty from './modules/specialty'
import activity from './modules/activity'
import service from './modules/service'
import fileFamily from './modules/fileFamily'
import auth from './modules/auth'
import employee from './modules/employee'
import role from './modules/role'
import presentation from './modules/presentation'
import medicine from './modules/medicine'
import frequency from './modules/frequency'
import measure from './modules/measure'
import typeBlood from './modules/typeBlood'
import culturalGroup from './modules/culturalGroup'
import pathology from './modules/pathology'
import pathologyPregnant from './modules/pathologyPregnant'
import pathologyNeonatal from './modules/pathologyNeonatal'
import alterationPregnant from './modules/alterationPregnant'
import reflex from './modules/reflex'
import qualification from './modules/qualification'
import qualificationLevel from './modules/qualificationLevel'
import senalAlarm from './modules/senalAlarm'
import disability from './modules/disability'
import groupAge from './modules/groupAge'
import causeMortality from './modules/causeMortality'
import contamination from './modules/contamination'
import causeContamination from './modules/causeContamination'
import activityEvolution from './modules/activityEvolution'
import riskClassification from './modules/riskClassification'
import risk from './modules/risk'
import levelRisk from './modules/levelRisk'
import levelTotal from './modules/levelTotal'
import vaccine from './modules/vaccine'
import examRutine from './modules/examRutine'
import publication from './modules/publication'
import filterOnePublication from './modules/filterOnePublication'
import filterTwoPublication from './modules/filterTwoPublication'
import filterThreePublication from './modules/filterThreePublication'
import carrusel from './modules/carrusel'
import configWeb from './modules/configWeb'
import controlDiabetic from './modules/controlDiabetic'
import fileClinicalObstetric from './modules/fileClinicalObstetric'
import fileClinicalNeonatology from './modules/fileClinicalNeonatology'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth,
    role,
    gender,
    typeDocument,
    institution,
    zone,
    service,
    activity,
    specialty,
    typeEmployee,
    employee,
    presentation,
    medicine,
    frequency,
    measure,
    typeBlood,
    culturalGroup,
    pathology,
    disability,
    groupAge,
    causeMortality,
    causeContamination,
    contamination,
    activityEvolution,
    riskClassification,
    risk,
    levelRisk,
    levelTotal,
    vaccine,
    examRutine,
    filterOnePublication,
    filterTwoPublication,
    filterThreePublication,
    publication,
    carrusel,
    configWeb,
    fileFamily,
    controlDiabetic,
    fileClinicalObstetric,
    fileClinicalNeonatology,
    reflex,
    senalAlarm,
    pathologyPregnant,
    pathologyNeonatal,
    alterationPregnant,
    qualification,
    qualificationLevel,
  },
})
