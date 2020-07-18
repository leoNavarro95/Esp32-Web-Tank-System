<template>
  <v-app>
    <Navegacion/>
  </v-app>
    
  
  
</template>

<script>
import Navegacion from "./components/Navegacion";
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'App',

  components: {
    Navegacion,
  },

  data: () => ({
    //
  }),
  computed:{
        ...mapState(['socket']),

    },
  mounted(){
    setInterval(() => {
            let conexion = this.socket.isConnected;
        if(conexion){ //si está conectado ejecuta el pedido
            this.$socket.sendObj({command: 'getStateTank'});//el pedido viene con una respuesta en command = stateTank
        }
        }, 3000);//ejecuta la funcion ciclicamente
  }

};
</script>
