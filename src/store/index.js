import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 10,
    nivel: 0,
    stateTank: '_',
    statePump: 'Apagada',

    //Thresholds (Umbrales)
    thresholds:{levelMax: 0, levelMin: 0, flowMin: 0},

    // SOCKETS para websocket nativo
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    },

  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--,

    // SOCKETS
  SOCKET_ONOPEN(state, event) {
    console.log('SOCKET_ONOPEN');
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },

  SOCKET_ONCLOSE(state, event) {
    console.log('SOCKET_ONCLOSE');
    state.socket.isConnected = false;
  },
 
  SOCKET_ONERROR(state, event) {
    console.log('SOCKET_ONERROR');
    console.error(state, event);
  },
 
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    console.log('SOCKET_ONMESSAGE');
 
      state.socket.message = message;
 
      switch (message.command) {
        case 'actualizaNivel':
          // console.log("actualiza nivel ejecutado");
          state.nivel = message.value;
          break;
        case 'stateTank':
            //this.dispatch('SOCKET_Identification', message.payload);
            state.stateTank = message;
            state.statePump = message.estado[0].value;
            state.thresholds.levelMin = message.estado[3].value; //Umbral de nivel bajo
            state.thresholds.levelMax = message.estado[4].value; //Umbral de nivel alto
            state.thresholds.flowMin = message.estado[5].value; //Umbral de flujo minimo
            break;
        default:
        //console.log('NO SE HA LOCALIZADO EVENTO');
      }

  },

  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.log('SOCKET_RECONNECT');
  },

  SOCKET_RECONNECT_ERROR(state) {
    console.log('SOCKET_RECONNECT_ERROR');
    state.socket.reconnectError = true;
  },
  
  },
  actions: {
    // getLevel({commit}, ValorNivel){
    //   // console.log("en Action getLevel")
    //   commit('obtenNivel',ValorNivel);
    // },
    // countIncrement(context){
    //   console.log("Accion LOCA");
    // },
  },
  modules: {
  }
})
