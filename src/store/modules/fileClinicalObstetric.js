import {
    fileClinicalObstetricPostApi,
       fileClinicalObstetricSearchApi,
       fileClinicalObstetricAllApi,
       fileClinicalObstetricDeleteApi,
       fileClinicalObstetricGetApi,
       fileClinicalObstetricCheckApi,
       fileClinicalObstetricUpdateApi,
       fileClinicalObstetricFilterApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {
            steps: [0],
            miembro: null,
            fileObstetric: {
                numero_historia: '',
                member_id: null,
                telefonos: [],
                fum: null,
                fpp: null,
                antecedentes_patologicos: '',
                semana_gestacion: 0,
                gestas: 0,
                partos: 0,
                abortos: 0,
                cesarias: 0,
                type_blood_id: null,
                estado_civil: '',
                descripcion_gestacion: '',
                vive_con: '',
                antecentedes_paternos: '',
                antecentedes_maternos: '',
                antecentedes_prenatales: '',
                medicamentos: '',
                embarazo_planificado: false,
                causa_embarazo: '',
                ayuda_violacion: '',
                ayuda_anticoceptivo: '',
                talla: 0,
                peso: 0,
                dar_luz: '',
                nombre_acompanate: '',
                aceptaria_formula: false,
                estimulacion_embarazo: false,
                administrar_hemoderivado: false,
                capacitacion_prenatal: false,
                capacitacion_epidural: false,
                observacion_parto: '',
                hemorragia: false,
                desgarro: false,
                grado_desgarro: '',
                tipo_parto: '',
                episiorria: false,
                hemorroides: false,
                dolor: false,
                epitomia: false,
                grado_epitomia: '',
                loquios: false,
                involucion_uterina: false,
                dolor_eva: '',
                educacion_lactancia: false,
                satisfaccion_lactancia: 0,
                score_mama_inmediato: 0,
                score_mama_mediato: 0,
                educacion_paciente: false,
                educacion_depresion: false,
                proporcionar_telefono: false,
                vaccine_dt: '',
                tratamiento: [],
                señal_alarma: '',
                vacuna: [],
                examenes_rutinarios: [],
                sustancias_sicotropicas: [],
                recomendaciones: '',
            },
            defaultFileObstetric: {
                numero_historia: '',
                member_id: null,
                telefonos: [],
                fum: null,
                fpp: null,
                antecedentes_patologicos: '',
                semana_gestacion: 0,
                gestas: 0,
                partos: 0,
                abortos: 0,
                cesarias: 0,
                type_blood_id: null,
                estado_civil: '',
                descripcion_gestacion: '',
                vive_con: '',
                antecentedes_paternos: '',
                antecentedes_maternos: '',
                antecentedes_prenatales: '',
                medicamentos: '',
                embarazo_planificado: false,
                causa_embarazo: '',
                ayuda_violacion: '',
                ayuda_anticoceptivo: '',
                talla: 0,
                peso: 0,
                dar_luz: '',
                nombre_acompanate: '',
                aceptaria_formula: false,
                estimulacion_embarazo: false,
                administrar_hemoderivado: false,
                capacitacion_prenatal: false,
                capacitacion_epidural: false,
                observacion_parto: '',
                hemorragia: false,
                desgarro: false,
                grado_desgarro: '',
                tipo_parto: '',
                episiorria: false,
                hemorroides: false,
                dolor: false,
                epitomia: false,
                grado_epitomia: '',
                loquios: false,
                involucion_uterina: false,
                dolor_eva: '',
                educacion_lactancia: false,
                satisfaccion_lactancia: 0,
                score_mama_inmediato: 0,
                score_mama_mediato: 0,
                educacion_paciente: false,
                educacion_depresion: false,
                proporcionar_telefono: false,
                vaccine_dt: '',
                tratamiento: [],
                señal_alarma: '',
                vacuna: [],
                examenes_rutinarios: [],
                sustancias_sicotropicas: [],
            },
       },
       getters: {},
       mutations: {
         setSteps (state, payload) {
           if (!state.steps.includes(payload)) state.steps.push(payload)
         },
         resetSteps (state, payload) {
            state.steps = [0]
         },
         resetFileObstetric (state, payload) {
            Object.assign(state.fileObstetric, state.defaultFileObstetric)
            state.steps = [0]
         },
         setFileObstetric (state, payload) {
           Object.assign(state.fileObstetric, payload)
           if (state.fileObstetric.member_id === null) state.fileObstetric.member_id = state.miembro.id
         },
         setMiembro (state, payload) {
            state.miembro = Object.assign({}, payload)
         },
       },
       actions: {
           async fileClinicalObstetricPostActions (commit, payload) {
               const serviceResponse = await fileClinicalObstetricPostApi(payload)
               return serviceResponse
           },
           async  fileClinicalObstetricSearchActions (commit, payload) {
             const serviceResponse = await fileClinicalObstetricSearchApi(payload)
             return serviceResponse
           },
           async  fileClinicalObstetricFilterActions (commit, payload) {
             const serviceResponse = await fileClinicalObstetricFilterApi(payload)
             return serviceResponse
           },
           async fileClinicalObstetricAllActions (commit) {
               const serviceResponse = await fileClinicalObstetricAllApi()
               return serviceResponse
           },
           async fileClinicalObstetricDeleteActions (commit, payload) {
               const serviceResponse = await fileClinicalObstetricDeleteApi(payload)
               return serviceResponse
           },
           async fileClinicalObstetricGetActions (commit, payload) {
               const serviceResponse = await fileClinicalObstetricGetApi(payload)
               return serviceResponse
           },
           async fileClinicalObstetricCheckActions (commit, payload) {
               const serviceResponse = await fileClinicalObstetricCheckApi(payload)
               return serviceResponse
           },
           async fileClinicalObstetricUpdateActions (commit, payload) {
               const serviceResponse = await fileClinicalObstetricUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
