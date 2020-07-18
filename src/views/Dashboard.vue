<template>
    <v-container fluid>
      <v-layout mt-5 justify-center wrap>
        <v-flex md5 mb-3 xs12 text-center>
          <TanqueBoard/>
        </v-flex>
        <v-flex :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-3': $vuetify.breakpoint.mdAndUp}" md5 mb-3 xs12 text-center>
          <EstadoTanque/>
        </v-flex>
      </v-layout>
      <!-- <v-layout :class="{'mt-5': $vuetify.breakpoint.mdAndUp}" justify-center wrap>
        <v-flex md5 mb-3 xs12 text-center>
          <GestorWS></GestorWS>
        </v-flex>
        <v-flex :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-3': $vuetify.breakpoint.mdAndUp}" md5 mb-3 xs12 text-center>
          <Demo/>
        </v-flex>
      </v-layout> -->
    </v-container>
</template>



<script>
import Demo from "../components/Demo";
import TanqueBoard from "../components/NivelTanque";
import GestorWS from "../components/GestorWS";
import EstadoTanque from "../components/EstadoTanque";
export default {
  components: {
    Demo,
    TanqueBoard,
    GestorWS,
    EstadoTanque
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
  }
};
</script>
