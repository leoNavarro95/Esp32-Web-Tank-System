
<template>
    <v-card raised>
            <v-card-text id="titulo" class="primary py-1 px-0"><v-icon dark class="mr-2" >fas fa-tachometer</v-icon>Nivel del tanque</v-card-text>
        <v-layout wrap justify-center>
            <!-- Cambian segun tamaño del display -->
            <!--xs es para extrasmall md medium (xs-sm-md-lg-xl) Buscar Display helpers -->
             <v-flex v-if="!(nivel)" xs12>
                    <!-- <v-icon class="fa-spin">fas fa-spinner</v-icon> -->
                    <v-progress-circular size="48" color="info" indeterminate></v-progress-circular>
            </v-flex>
            <v-flex id="medidorNivel" xs12>
                <v-list-item-avatar size = "200" id="gaugeLevel">
                    <div ref="$wrapper"></div>
                </v-list-item-avatar>
                <v-icon color="primary" size="50">{{getArrow}}</v-icon>
            </v-flex>
            <v-flex class="pa-0" xs12>
                <v-card-text class="pa-0 ma-0" id="info">Nivel actual: {{nivelFromStore}}%</v-card-text>
            </v-flex>
        </v-layout>
    </v-card>

</template>

<script>

    import {renderChart, destroyChart } from '../plugins/liquidgauge.js';
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: 'NivelTanque',
        computed:{
            ...mapState(['nivel','stateTank','statePump']),
            nivelFromStore: function(){
                renderChart(this.$refs.$wrapper, this.nivel);
                return this.nivel;
            },
            getArrow(){
                // return this.statePump;
                if (this.statePump === 'Apagada'){
                    return "fas fa-arrow-down"
                }
                else if (this.statePump === 'Encendida'){
                    return "fas fa-arrow-up"
                }
            }
        },
        data() {
            return {
                nivelBajo: 70,
                nivelAlto: 100
            }
        },
        
        beforeDestroy () {
            destroyChart(this.$refs.wrapper)
        },
        methods:{
            
        },
        mounted(){
            renderChart(this.$refs.$wrapper, this.nivel);
            
        }
    }
    
</script>

<style>
    .titulo { font-family: Helvetica; font-weight: bold; }
    #titulo{
        text-align: center;
        font-size: 1rem;
        font-family: Roboto,sans-serif;
        color: white;
    }
    #info{
        margin-top: 5px;
        font-size: 1rem;
        background-color: #b7f3f35a;
        overflow: hidden;
    }
    /* #info:hover{
        margin-left: 0;
        color: black;
    } */
    
    #medidorNivel{
        background-color: #b7f3f3;
    }

</style>