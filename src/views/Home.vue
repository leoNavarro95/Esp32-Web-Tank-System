<template>
  <div class="home">
    <v-card class="mx-auto my-3" max-width="600" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-card-text class="headline">
            <b>Sistema de llenado de tanques Manatí</b>
            <div class="overline mb-1">Problemas con el llenado de su tanque?</div>
          </v-card-text>

          <v-card-text>
            El sistema
            <b>Manatí</b> está diseñado para velar que sus depósitos de agua nunca se encuentren vacíos. El uso de tecnologías avanzadas para el control de nivel a partir de sensores ultrasónicos de nivel y flujómetros, brindan seguridad y confianza. Usted solo debe disponer de su sistema hidráulico instalado y funcionando correctamente, nosotros nos encargaremos del resto.
          </v-card-text>
          <v-list-item-subtitle>Manatí 1.0</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data: () => ({
    message: "Hey!",
    loading: false
  }),

  methods: {
    clickMe() {
      this.loading = true;
      this.message = "Wait for it...";
      setTimeout(() => {
        this.loading = false;
        this.message = "You've clicked me!";
      }, 2000);
    }
  }
};
</script>

<style>
/* .home img{
  width: 200px;
  padding: 5px;
  border-left-style: solid;
  border-bottom-style: solid;
  border-color: #9cb1c5;
  border-width: 2px;
  background: #dae7f5;
  
  
} */
</style>

