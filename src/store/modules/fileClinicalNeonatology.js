import {
    fileClinicalNeonatologyPostApi,
       fileClinicalNeonatologySearchApi,
       fileClinicalNeonatologyAllApi,
       fileClinicalNeonatologyDeleteApi,
       fileClinicalNeonatologyGetApi,
       fileClinicalNeonatologyUpdateApi,
       fileClinicalNeonatologyFilterApi,
    } from '@/api/modules'

   export default {
       namespaced: true,
       state: {
            steps: [0],
            miembro: null,
            fileNeonatology: {
              id: null,
              nombre: '',
              apellido: '',
              cedula: '',
              fecha_nacimiento: null,
              gender_id: null,
              group_age_id: null,
              numero_historia: null,
              lugar_naciento: '',
              pregnant_id: null,
              type_boold_mother_id: null,
              type_boold_father_id: null,
              edad_gestacional: null,
              gestation_week_id: null,
              alimentacion_neonato: '',
              aplicacion_vitamina: false,
              alergina_leche_materna: false,
              peso: '',
              perimetro_abdominal: '',
              perimetro_cefalico: '',
              perimetro_toracico: '',
              longitu_cefalo_caudal: '',
              temperatura: '',
              profilaxis: false,
              supuración: false,
              posicion: '',
              estado: '',
              respiracion: '',
              piel: '',
              tonicidad: '',
              cordon_umbilical: '',
              orina: '',
              deposiciones: '',
              vomitos: '',
              coordinacion_motora: '',
              extreminades: '',
              genitales: '',
              frecuencia_cardiaca: 0,
              esfuerzo_respiratorio: 0,
              tono_muscular: 0,
              irritabilidad: 0,
              color_piel: 0,
              total_apgar: 0,
              forma_pezon: 0,
              textura_piel: 0,
              forma_oreja: 0,
              tamano_tejido: 0,
              pliegue_plantares: 0,
              total_test_capurro: 0,
              movimiento_taraco: 0,
              tijera_intercostal: 0,
              retraccion_xifoidea: 0,
              aleteo_nasal: 0,
              quejido_respiratorio: 0,
              total_escala_silverman: 0,
              bcg: '',
              hb: '',
              rotavirus: '',
              fipv: '',
              bopv: '',
              pentavaliente: '',
              neumococo: '',
              influenza_estacionaria: '',
              patologias_maternas: [],
              antecedentes_neonatales: [],
              alteraciones_embarazo: [],
              patologias_embarazo: [],
              patologias_paternas: [],
              reflejos: [],
            },
            defaultfileNeonatology: {
              nombre: '',
              apellido: '',
              cedula: '',
              fecha_nacimiento: null,
              gender_id: null,
              group_age_id: null,
              numero_historia: null,
              lugar_naciento: '',
              pregnant_id: null,
              type_boold_mother_id: null,
              type_boold_father_id: null,
              edad_gestacional: null,
              gestation_week_id: null,
              alimentacion_neonato: '',
              aplicacion_vitamina: false,
              alergina_leche_materna: false,
              peso: '',
              perimetro_abdominal: '',
              perimetro_cefalico: '',
              perimetro_toracico: '',
              longitu_cefalo_caudal: '',
              temperatura: '',
              profilaxis: false,
              supuración: false,
              posicion: '',
              estado: '',
              respiracion: '',
              piel: '',
              tonicidad: '',
              cordon_umbilical: '',
              orina: '',
              deposiciones: '',
              vomitos: '',
              coordinacion_motora: '',
              extreminades: '',
              genitales: '',
              frecuencia_cardiaca: 0,
              esfuerzo_respiratorio: 0,
              tono_muscular: 0,
              irritabilidad: 0,
              color_piel: 0,
              total_apgar: 0,
              forma_pezon: 0,
              textura_piel: 0,
              forma_oreja: 0,
              tamano_tejido: 0,
              pliegue_plantares: 0,
              total_test_capurro: 0,
              movimiento_taraco: 0,
              retraccion_xifoidea: 0,
              aleteo_nasal: 0,
              quejido_respiratorio: 0,
              tijera_intercostal: 0,
              total_escala_silverman: 0,
              bcg: '',
              hb: '',
              rotavirus: '',
              fipv: '',
              bopv: '',
              pentavaliente: '',
              neumococo: '',
              influenza_estacionaria: '',
              patologias_maternas: [],
              antecedentes_neonatales: [],
              alteraciones_embarazo: [],
              patologias_embarazo: [],
              patologias_paternas: [],
              reflejos: [],
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
         resetFileNeonatology (state, payload) {
            Object.assign(state.fileNeonatology, state.defaultfileNeonatology)
            state.steps = [0]
         },
         setFileNeonatology (state, payload) {
           Object.assign(state.fileNeonatology, payload)
           // if (state.fileNeonatology.member_id === null) state.fileNeonatology.member_id = state.miembro.id
         },
         setMiembro (state, payload) {
            state.miembro = Object.assign({}, payload)
         },
       },
       actions: {
           async fileClinicalNeonatologyPostActions (commit, payload) {
               const serviceResponse = await fileClinicalNeonatologyPostApi(payload)
               return serviceResponse
           },
           async  fileClinicalNeonatologySearchActions (commit, payload) {
             const serviceResponse = await fileClinicalNeonatologySearchApi(payload)
             return serviceResponse
           },
           async  fileClinicalNeonatologyFilterActions (commit, payload) {
             const serviceResponse = await fileClinicalNeonatologyFilterApi(payload)
             return serviceResponse
           },
           async fileClinicalNeonatologyAllActions (commit) {
               const serviceResponse = await fileClinicalNeonatologyAllApi()
               return serviceResponse
           },
           async fileClinicalNeonatologyDeleteActions (commit, payload) {
               const serviceResponse = await fileClinicalNeonatologyDeleteApi(payload)
               return serviceResponse
           },
           async fileClinicalNeonatologyGetActions (commit, payload) {
               const serviceResponse = await fileClinicalNeonatologyGetApi(payload)
               return serviceResponse
           },
           async fileClinicalNeonatologyUpdateActions (commit, payload) {
               const serviceResponse = await fileClinicalNeonatologyUpdateApi(payload, payload.id)
               return serviceResponse
           },
       },
   }
