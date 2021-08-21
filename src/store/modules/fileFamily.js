import {
    fileFamilyPostApi,
    fileFamilyUpdateApi,
    fileFamilyShowApi,
    fileFamilySearchApi,
    fileFamilyFilterApi,
    fileFamilyAllApi,
    fileFamilyVerifyEmailApi,
    fileFamilyVerifyDocumentApi,
  } from '@/api/modules'

export default {
  namespaced: true,
  state: {
    steps: [0],
    fileFamily: {
      longitud: 0,
      latitud: 0,
      manzana: '',
      direccion_habitual: '',
      barrio: '',
      numero_familia: '',
      numero_historia: '',
      numero_telefono: '',
      telefono_celular_uno: '',
      telefono_celular_dos: '',
      correo: '',
      numero_casa: '',
      zone_id: null,
      cultural_group_id: null,
      miembros: [],
      mortalidad: [],
      riesgos: [],
      level_total_id: null,
      total_risk: 0,
      evaluacion: [],
      contaminacion: [],
      sitios_tratamiento: [],
    },
    defaultfileFamily: {
      longitud: 0,
      latitud: 0,
      manzana: '',
      direccion_habitual: '',
      barrio: '',
      numero_familia: '',
      numero_historia: '',
      numero_telefono: '',
      telefono_celular_uno: '',
      telefono_celular_dos: '',
      correo: '',
      numero_casa: '',
      zone_id: null,
      cultural_group_id: null,
      miembros: [],
      mortalidad: [],
      riesgos: [],
      level_total_id: null,
      total_risk: 0,
      evaluacion: [],
      contaminacion: [],
      sitios_tratamiento: [],
    },
  },
  getters: {
    fileFamilyGetter: (state) => state.fileFamily,
  },
  mutations: {
    setFileFamily (state, payload) {
      state.fileFamily = Object.assign({}, payload)
    },
    setDataBasic (state, payload) {
      Object.assign(state.fileFamily, payload)
    },
    setMember (state, payload) {
      state.fileFamily.miembros = payload
    },
    setMortality (state, payload) {
      state.fileFamily.mortalidad = payload
    },
    setSteps (state, payload) {
      if (!state.steps.includes(payload)) state.steps.push(payload)
    },
    resetSteps (state, payload) {
      state.steps = [0]
    },
    resetFile (state, payload) {
      Object.assign(state.fileFamily, state.defaultfileFamily)
      state.steps = [0]
    },
    setRisks (state, payload) {
      state.fileFamily.level_total_id = payload.level_total_id
      state.fileFamily.total_risk = payload.total_risk
      state.fileFamily.riesgos = payload.riesgos
    },
    setEvolutionRisks (state, payload) {
      const evoluciones = state.fileFamily.evaluacion
      state.fileFamily.evaluacion = state.fileFamily.riesgos
      .filter(item => {
        var levelRisk = payload.find(v => {
          return item.level_risk_id === v.id
        })
        return levelRisk.value !== 0
      })
      .map(item => {
        const ids = evoluciones.map(itemE => itemE.id)
        if (ids.includes(item.id)) {
          const evolucion = evoluciones.find(itemE => itemE.id === item.id)
          return {
            ...item,
            fecha_evaluacion: evolucion.fecha_evaluacion,
            fecha_programacion: evolucion.fecha_programacion,
            compromiso_id: evolucion.compromiso_id,
            cumplio: evolucion.cumplio,
            causas: evolucion.causas,
          }
        } else {
          return {
            ...item,
            fecha_evaluacion: null,
            fecha_programacion: null,
            compromiso_id: null,
            cumplio: '',
            causas: '',
          }
        }
      })
    },
    setEvaluation (state, payload) {
      state.fileFamily.evaluacion = payload
    },
    setContaminacion (state, payload) {
      state.fileFamily.contaminacion = payload.contaminacion
      state.fileFamily.sitios_tratamiento = payload.sitios_tratamiento
    },
  },
  actions: {
    async fileFamilyPostActions (commit, payload) {
      const serviceResponse = await fileFamilyPostApi(payload)
      return serviceResponse
    },
    async fileFamilyUpdateActions (commit, payload) {
      const serviceResponse = await fileFamilyUpdateApi(payload, payload.id)
      return serviceResponse
    },
    async fileFamilyShowActions (commit, payload) {
      const serviceResponse = await fileFamilyShowApi(payload)
      return serviceResponse
    },
    async fileFamilyVerifyDocumentActions (commit, payload) {
      const serviceResponse = await fileFamilyVerifyDocumentApi(payload)
      return serviceResponse
    },
    async fileFamilyVerifyEmailActions (commit, payload) {
      const serviceResponse = await fileFamilyVerifyEmailApi(payload)
      return serviceResponse
    },
    async fileFamilySearchActions (commit, payload) {
      const serviceResponse = await fileFamilySearchApi(payload)
      return serviceResponse
    },
    async fileFamilyFilterActions (commit, payload) {
      const serviceResponse = await fileFamilyFilterApi(payload)
      return serviceResponse
    },
    async fileFamilyAllActions (commit, payload) {
      const serviceResponse = await fileFamilyAllApi(payload)
      return serviceResponse
    },
  },
}
