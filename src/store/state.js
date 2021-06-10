export default {
    urlApi: process.env.VUE_APP_API_URL_BACKEND,
    urlImageApi: process.env.VUE_APP_API_URL_IMAGE_BACKEND,
    MIX_PUSHER_APP_KEY: process.env.VUE_APP_MIX_PUSHER_APP_KEY,
    MIX_PUSHER_APP_CLUSTER: process.env.VUE_APP_MIX_PUSHER_APP_CLUSTER,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    snackbar: {
      visible: false,
      color: 'success',
      text: null,
      timeout: 10000,
      multiline: false,
    },
}
