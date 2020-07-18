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
            <v-content class="pt-0">
              <v-row ma="1">
                <v-col cols="2" sm="1">
                  <v-icon color="indigo lighten-1">fas fa-user</v-icon>
                </v-col>
                <v-col cols="7" sm="7"><b>Desarrollado por: </b> Ing.Leonardo Navarro Noa</v-col>
              </v-row>
              <v-row ma="1">
                <v-col cols="2" sm="1">
                <v-icon color="indigo lighten-1">fas fa-envelope</v-icon>
              </v-col>
              <v-col cols="7" sm="7"><b>e-mail: </b> <a href="mailto:potty3800@gmail.com">potty3800@gmail.com</a></v-col>
              </v-row>
              <v-row ma="1">
                <v-col cols="2" sm="1">
                  <v-icon color="indigo lighten-1">fas fa-phone-square</v-icon>
                </v-col>
                <v-col cols="7" sm="7"><b>Telefono móvil: </b> <a href="tel:+5353745850"> 53745850</a>
              </v-col>
              </v-row>
              
            </v-content>
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

