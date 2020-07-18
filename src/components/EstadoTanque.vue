<template>
    <div>
      <v-card raised>
          <v-layout :class="colorBarra" mb-1 pb-0>
              <v-flex xs12><v-card-text id="titulo"> <v-icon dark class="mr-2">fas fa-tasks</v-icon>Estado del sistema</v-card-text></v-flex>
              <!-- <v-flex xs2><v-btn icon dark @click="getState"><v-icon class="mt-1 mr-1">fas fa-recycle</v-icon></v-btn></v-flex> -->
          </v-layout>
            
            <v-layout wrap>
                <v-flex v-if="!(stateTank.estado)" xs12>
                    <!-- <v-icon class="fa-spin">fas fa-spinner</v-icon> -->
                    <v-progress-circular size="48" color="info" indeterminate></v-progress-circular>
                </v-flex>
                <v-flex xs12 v-for="(elemento, index) of stateTank.estado" :key="index">
                    <v-chip :color = setColor(elemento) :class="{'cardmd': $vuetify.breakpoint.mdAndUp, 'cardxs': $vuetify.breakpoint.smAndDown, 'error':parseError(elemento), 'primary': !(parseError(elemento))}" class="ma-1" outlined label><v-icon left>{{parseError(elemento) ? 'fas fa-times': 'fas fa-check'}}</v-icon>{{elemento.label}}: {{elemento.value}}</v-chip>
                    
                </v-flex>
                
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'EstadoTanque',
    data(){
        return{
            colorBarra: 'primary',
        }
    },
    computed:{
        ...mapState(['stateTank','socket']),

    },
    methods:{
        // ...mapMutations(['increment','decrement']),
        getState(){
            this.$socket.sendObj({command: 'getStateTank'});//el pedido viene con una respuesta en command = stateTank
        },
        parseError(elemento){
            if(elemento.value == "Error"){
                return true;
            }
            else{
                return false;
            } 

        },
        setColor(elemento){
            if(elemento.value == "Error"){
                return 'error';
            }
            else return 'primary';
        },

    },
    mounted(){
        // setInterval(() => {
        //     let conexion = this.socket.isConnected;
        // if(conexion){ //si está conectado ejecuta el pedido
        //     this.$socket.sendObj({command: 'getStateTank'});//el pedido viene con una respuesta en command = stateTank
        // }
        // }, 3000);//ejecuta la funcion ciclicamente
        
    }
}


</script>

<style>
    .titulo { 
        font-family: Helvetica;
        font-weight: bold;
    }
    #titulo.v-card__text{
        padding-top: 4px;
        padding-bottom: 1px;
        margin: 0px;
    }
    .cardxs{
        width: 80%
    }
    .cardmd{
        width: 50%
    }

</style>