export default {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    setUrlImgApi (state) {
      state.urlImgApi = 'hola'
    },
    alert (state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.multiline = payload.text.length
      // Si es mas de 50 caracteres definirlo como multilinea
      if (payload.multiline > 50) {
        state.snackbar.multiline = payload.multiline
      }
      // Color para mensajes de error o éxito
      if (payload.color) {
        state.snackbar.color = payload.color
      }
     // Tiempo de duración
      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout
      }
      state.snackbar.visible = true
    },
    closeAlert (state) {
      state.snackbar.visible = false
      state.snackbar.multiline = false
      state.snackbar.text = null
    },
}
