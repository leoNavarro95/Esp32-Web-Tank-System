<template>
    <v-container fluid>
      <v-layout mt-5 justify-center wrap>
        <v-flex md5 mb-3 xs12 text-center>
          <ConfigWifi/>
        </v-flex>
        <v-flex :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-3': $vuetify.breakpoint.mdAndUp}" md5 mb-3 xs12 text-center>
            <Umbrales/>
        </v-flex>
      </v-layout>
      <!-- <v-layout :class="{'mt-5': $vuetify.breakpoint.mdAndUp}" justify-center wrap>
        <v-flex md5 mb-3 xs12 text-center>
          <h1>Hola</h1>
        </v-flex>
        <v-flex :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-3': $vuetify.breakpoint.mdAndUp}" md5 mb-3 xs12 text-center>
          <h1>Hola</h1>
        </v-flex>
      </v-layout> -->
    </v-container>
</template>

<script>
import ConfigWifi from "../components/ConfigWifi";
import Umbrales from "../components/Umbrales";
export default {
    components: {
        ConfigWifi,
        Umbrales
    },
    methods:{
        
    },
    data() {
        return{

        }
    },
    computed: {
        
    }
}
</script>

<style>
    
</style>