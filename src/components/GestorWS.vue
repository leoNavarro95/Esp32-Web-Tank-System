<template>
    <div>
        <v-card raised>
            <v-card-text id="titulo" class="primary py-1 px-0"><v-icon dark class="mr-2">fas fa-podcast</v-icon>Gestor Websockets</v-card-text>
            <v-layout wrap>
                <!-- <v-flex xs3><h4>{{count}}</h4></v-flex>
                <v-flex xs3><v-btn @click="increment">+</v-btn></v-flex>
                <v-flex xs3><v-btn @click="decrement">-</v-btn></v-flex> -->
                <v-card-text class="pa-1 ma-1">Mensaje: {{socket.message}}</v-card-text>
                
            </v-layout>
        </v-card>

    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'GestorWS', 
    computed:{
        ...mapState(['count', 'socket'])
    },
    methods:{
        ...mapMutations(['increment','decrement']),
        getState(){
            this.$socket.sendObj({command: 'getStateTank'});//el pedido viene con una respuesta en command = stateTank
        }
    }

}
</script>
<style>
    .titulo { font-family: Helvetica; font-weight: bold; }

</style>