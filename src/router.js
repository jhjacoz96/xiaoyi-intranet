import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/',
      component: () => import('@/views/Login'),
    },
    {
      path: '/intranet',
      meta: { requiresAuth: true },
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'inicio',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Maestros básicos',
          path: 'maestros-basicos',
          component: () => import('@/views/dashboard/component/master/basic/Basic'),
        },
        {
          name: 'Configuración básica',
          path: 'configuracion',
          component: () => import('@/views/dashboard/component/master/config/Config'),
        },
        {
          name: 'Perfil',
          path: 'perfil',
          component: () => import('@/views/dashboard/component/perfil/Perfil'),
        },
        {
          name: 'Configuración de contenido en el sítio web',
          path: 'configuracion-web',
          component: () => import('@/views/dashboard/component/master/configWeb/ConfigWeb'),
        },
        {
          name: 'Primer filtro de busqueda',
          path: 'configuracion-web/primer-filtro-busqueda',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/OneFilter'),
        },
        {
          name: 'Segundo filtro de busqueda',
          path: 'configuracion-web/segundo-filtro-busqueda',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/TwoFilter'),
        },
        {
          name: 'Tercer filtro de busqueda',
          path: 'configuracion-web/tercer-filtro-busqueda',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/ThreeFilter'),
        },
        {
          name: 'Tipo de comentarios',
          path: 'configuracion-web/tipo-comentario',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/TypeComment'),
        },
        {
          name: 'Configuración de publicaciones',
          path: 'configuracion-web/configurar-publicaciones',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/ConfigPublic'),
        },
        {
          name: 'Publicaciones',
          path: 'configuracion-web/publicaciones',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/Publication'),
        },
        {
          name: 'Recursos',
          path: 'configuracion-web/recursos',
          component: () => import('@/views/dashboard/component/master/configWeb/configInfo/classPublic/Resource'),
        },
        {
          name: 'Datos básicos',
          path: 'configuracion-basica/datos-basicos',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/BasicData'),
        },
        {
          name: 'Institución del sistema',
          path: 'configuracion-basica/institucion-sistema',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/InstitutionSystem'),
        },
        {
          name: 'Servicios',
          path: 'configuracion-basica/servicios',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/Services'),
        },
        {
          name: 'Actividades de servicio',
          path: 'configuracion-basica/actividades-servicio',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/activityService'),
        },
        {
          name: 'Especialidades',
          path: 'configuracion-basica/especialidades',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/Especiality'),
        },
        {
          name: 'Zonas básicas',
          path: 'configuracion-basica/zonas',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/locality/Zone'),
        },
        {
          name: 'Tipo de empleados',
          path: 'configuracion-basica/tipo-empleado',
          component: () => import('@/views/dashboard/component/master/basic/healthCenter/areaNegocio/TypeEmpleado'),
        },
        {
          name: 'Permisos',
          path: 'configuracion-basica/permisos',
          component: () => import('@/views/dashboard/component/master/basic/security/accesibility/Permission'),
        },
        {
          name: 'Roles',
          path: 'configuracion-basica/roles',
          component: () => import('@/views/dashboard/component/master/basic/security/accesibility/Rol'),
        },
        {
          name: 'Gestionar usuarios',
          path: 'configuracion-basica/usuarios',
          component: () => import('@/views/dashboard/component/master/basic/users/infoUser/ManageUser'),
        },
        {
          name: 'Tipo de documento',
          path: 'configuracion-basica/tipo-documentos',
          component: () => import('@/views/dashboard/component/master/basic/users/infoUser/TypeDocument'),
        },
        {
          name: 'Activiades físicas',
          path: 'configuracion-basica/actividades-fisicas',
          component: () => import('@/views/dashboard/component/master/basic/diabetic/PhysicalActivity'),
        },
        {
          name: 'Tipos de medicamento',
          path: 'configuracion-basica/tipo-medicamento',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/TypeMedicine'),
        },
        {
          name: 'Medicamento',
          path: 'configuracion-basica/medicamento',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/Medicine'),
        },
        {
          name: 'Presentación',
          path: 'configuracion-basica/presentacion',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/Presentation'),
        },
        {
          name: 'Tipo de vías',
          path: 'configuracion-basica/tipo-via',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/TypeVia'),
        },
        {
          name: 'Vía',
          path: 'configuracion-basica/vias',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/Via'),
        },
        {
          name: 'Frecuencia',
          path: 'configuracion-basica/frecuencia',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/Frequency'),
        },
        {
          name: 'Medida',
          path: 'configuracion-basica/medida',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/adminMedical/Measure'),
        },
        {
          name: 'Grupo sanguineo',
          path: 'configuracion-basica/grupo-sanguineo',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/TypeBlood'),
        },
        {
          name: 'Grupo cultural',
          path: 'configuracion-basica/grupo-cultural',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/CulturalGroup'),
        },
        {
          name: 'Parentesco',
          path: 'configuracion-basica/parentesco',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/Relationship'),
        },
        {
          name: 'Patologías',
          path: 'configuracion-basica/patologias',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/Pathologies'),
        },
        {
          name: 'Discapacidades',
          path: 'configuracion-basica/discapacidades',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/Disabilities'),
        },
        {
          name: 'Sustancias psicotrópicas',
          path: 'configuracion-basica/sustancias-psicotropicas',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterGeneral/PsychotropicSubstances'),
        },
        {
          name: 'Grupo de edades',
          path: 'configuracion-basica/grupo-edades',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileFamily/AgeGroup'),
        },
        {
          name: 'Clasificación de riesgos',
          path: 'configuracion-basica/clasificacion-riesgos',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileFamily/RiskClassification'),
        },
        {
          name: 'Riesgos',
          path: 'configuracion-basica/riesgos',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileFamily/Risk'),
        },
        {
          name: 'Niveles de riesgos',
          path: 'configuracion-basica/nivel-riesgos',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileFamily/LevelRisk'),
        },
        {
          name: 'Niveles de riesgos total',
          path: 'configuracion-basica/nivel-riesgos-total',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileFamily/TotalValueRisk'),
        },
        {
          name: 'Vacunas',
          path: '/intranet/configuracion-basica/vacunas',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileObstetric/Vaccines'),
        },
        {
          name: 'Examenes rutinarios',
          path: 'configuracion-basica/examenes-rutinarios',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileObstetric/RoutineExams'),
        },
        {
          name: 'Semanas de gestación',
          path: 'configuracion-basica/semana-gestacion',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileObstetric/GestationWeeks'),
        },
        {
          name: 'Características del parto',
          path: 'configuracion-basica/caracteristicas',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileObstetric/FeacturesBirth'),
        },
        {
          name: 'Señales de alarma',
          path: 'configuracion-basica/senal-alarma',
          component: () => import('@/views/dashboard/component/master/basic/fileParameter/parameterFileObstetric/AlarmSignals'),
        },
        {
          name: 'Configuracion servicios asistenciales',
          path: 'configuracion-maestros/servicios',
          component: () => import('@/views/dashboard/component/master/config/healthCenter/ConfigService'),
        },
        {
          name: 'Configuracion de permisos',
          path: 'configuracion-maestros/permisos',
          component: () => import('@/views/dashboard/component/master/config/security/ConfigPermission'),
        },
        {
          name: 'Configuracion de usuarios',
          path: 'configuracion-maestros/usuarios',
          component: () => import('@/views/dashboard/component/master/config/security/ConfigUser'),
        },
        {
          name: 'Configuracion de medicamentos',
          path: 'configuracion-maestros/medicamentos',
          component: () => import('@/views/dashboard/component/master/config/fileParameter/ConfigMedicine'),
        },
        {
          name: 'Configuracion de vías',
          path: 'configuracion-maestros/vias',
          component: () => import('@/views/dashboard/component/master/config/fileParameter/ConfigVia'),
        },
        {
          name: 'Configuracion de riesgos',
          path: 'configuracion-maestros/riesgos',
          component: () => import('@/views/dashboard/component/master/config/fileParameter/ConfigRisk'),
        },
        {
          name: 'Ficha familiar',
          path: 'ficha-familiar',
          component: () => import('@/views/dashboard/component/fileFamily/FileFamily'),
        },
        {
          name: 'Agregar ficha familiar',
          path: 'ficha-familiar/agregar',
          component: () => import('@/views/dashboard/component/fileFamily/addFileFamily/Add.vue'),
        },
        {
          name: 'Editar ficha familiar',
          path: 'ficha-familiar/:id',
          props: true,
          component: () => import('@/views/dashboard/component/fileFamily/addFileFamily/Add.vue'),
        },
        {
          name: 'Ficha clinica de neonatología',
          path: 'ficha-clinica-neonatologia',
          component: () => import('@/views/dashboard/component/fileClinicalNeonatology/FileClinicalNeonatology'),
        },
        {
          name: 'Control y seguimiento de ficha clinica de neonatología',
          path: 'ficha-clinica-neonatologia/seguimiento',
          component: () => import('@/views/dashboard/component/fileClinicalNeonatology/tracingFileClinicalNeonatology/TracingFileClinicalNeonatology'),
        },
        {
          name: 'Registro de ficha clinica de neonatología',
          path: 'ficha-clinica-neonatologia/agregar',
          component: () => import('@/views/dashboard/component/fileClinicalNeonatology/addFileClinicalNeonatology/AddFileClinicalNeonatology'),
        },
        {
          name: 'Actualizar de ficha clinica de neonatología',
          path: 'ficha-clinica-neonatologia/actualizar/:id',
          component: () => import('@/views/dashboard/component/fileClinicalNeonatology/addFileClinicalNeonatology/AddFileClinicalNeonatology'),
        },
        {
          name: 'Control y seguimiento de ficha clinica de obstetricia',
          path: 'ficha-clinica-obstetricia/seguimiento',
          component: () => import('@/views/dashboard/component/fileClinicalObstetrics/tracingFileClinicalObstetrics/TracingFileClinicalObstetrics'),
        },
        {
          name: 'Agregar de ficha clinica de obstetricia',
          path: 'ficha-clinica-obstetricia/agregar',
          component: () => import('@/views/dashboard/component/fileClinicalObstetrics/addFileClinicalObstetrics/AddFileClinicalObstetrics'),
        },
        {
          name: 'Actualizar de ficha clinica de obstetricia',
          path: 'ficha-clinica-obstetricia/actualizar/:id',
          props: true,
          component: () => import('@/views/dashboard/component/fileClinicalObstetrics/addFileClinicalObstetrics/AddFileClinicalObstetrics'),
        },
        {
          name: 'Ficha clinica de obstetrícia',
          path: 'ficha-clinica-obstetricia',
          component: () => import('@/views/dashboard/component/fileClinicalObstetrics/FileClinicalObstetrics'),
        },
        {
          name: 'Control de pacientes diabéticos',
          path: 'control-diabetes',
          component: () => import('@/views/dashboard/component/diabetesControl/DiabetesControl'),
        },
        {
          name: 'Evaluar sugerencias y comentarios',
          path: 'evaluar-sugerencias',
          component: () => import('@/views/dashboard/component/patientCare/EvaluateSuggestion'),
        },
        {
          name: 'Reportes',
          path: 'reportes',
          component: () => import('@/views/dashboard/component/report/Report'),
        },
        {
          name: 'Reporte estructurado de las fichas familiares',
          path: 'reportes/estructurados/ficha-familiar',
          component: () => import('@/views/dashboard/component/report/structuredReport/StructuredReportFileFamily'),
        },
        {
          name: 'Reporte estructurado de las fichas clinicas de obstetricia',
          path: 'reportes/estructurados/ficha-clinica-obstetricia',
          component: () => import('@/views/dashboard/component/report/structuredReport/StructuredReportFileClinicalObstetric'),
        },
        {
          name: 'Reporte estructurado de los miembros',
          path: 'reportes/estructurados/miembros',
          component: () => import('@/views/dashboard/component/report/structuredReport/StructuredReportMember'),
        },
        {
          name: 'Administración del sistema',
          path: 'adminsitracion-sistema',
          component: () => import('@/views/dashboard/component/systemAdministration/SystemAdministration'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
        {
          name: 'Configuración de contenido de la movil',
          path: 'configuracion-movil',
          component: () => import('@/views/dashboard/component/master/configMovil/ConfigMovil'),
        },
        {
          name: 'Preguntas de calificación',
          path: 'configuracion-movil/preguntas-calificacion',
          component: () => import('@/views/dashboard/component/master/configMovil/QualificationQuestion'),
        },
        {
          name: 'Niveles de calificación',
          path: 'configuracion-movil/niveles-calificacion',
          component: () => import('@/views/dashboard/component/master/configMovil/QualificationLevel'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const routerProtected = await to.matched.some(record => record.meta.requiresAuth)
  if (routerProtected) {
    var authenticated1 = store.getters['auth/authenticatedGetter']
    if (authenticated1) {
      next()
    } else {
      next({
        name: 'Login',
      })
    }
  } else {
    next()
  }
})

export default router
