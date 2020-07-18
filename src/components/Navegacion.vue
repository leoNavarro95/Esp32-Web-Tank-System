<template>
    <div>
        <v-app-bar color = "indigo" app dark>
        <!-- <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon> -->
        <v-icon @click="navBarVert = !navBarVert">fas fa-bars</v-icon>
        <!-- <v-app-bar-nav-icon @click="navBarVert = !navBarVert"></v-app-bar-nav-icon> -->
        <v-toolbar-title class="ml-3 headline">
            <span class="font-weight-light">Manatí</span>
        </v-toolbar-title>
        <!-- <img style="width: 80px;" src="img/logo2.png" alt="Blue Manati"> -->
        <v-spacer></v-spacer>
        <v-toolbar-items id="toolbar-items">
            <router-link to="/about" id="about-link">
            <v-btn icon>
                <v-icon>fas fa-question</v-icon>
            </v-btn>
            </router-link>
            
        </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer v-model="navBarVert" app temporary dark> 
        <v-layout mt-4 column align-center>
            <v-flex>
                <!-- <img src="tanque.png" alt="icono" /> -->
                <img style="width: 200px;" src="img/logo3.png" alt="Blue Manati">
            </v-flex>
            <v-flex>
            <p class="white--text mt-3 headline">Manatí v1.0</p>
            </v-flex>
            <router-link id = "enlace-vertical" to="/">
            <v-icon>fas fa-home</v-icon>
            <h3>Inicio</h3>
            </router-link>
            <router-link id = "enlace-vertical" to="/panel">
            <v-icon>fas fa-microchip</v-icon>
            <h3>Panel Visual</h3>
            </router-link>
            <router-link id = "enlace-vertical" to="/settings">
            <v-icon>fas fa-cogs</v-icon>
            <h3>Configuración</h3>
            </router-link>
            <router-link id = "enlace-vertical" to="/about">
            <v-icon>fas fa-question</v-icon>
            <h3>Acerca</h3>
            </router-link>
        </v-layout>
        </v-navigation-drawer>

        
        <v-content>
            <div id="nav" v-if="$vuetify.breakpoint.mdAndUp">
                <v-flex text-center>
                <router-link to="/">Inicio</router-link> |
                <router-link to="/panel">Panel</router-link> |
                <router-link to="/settings">Configuración</router-link> |
                <router-link to="/about">Acerca</router-link> 
                </v-flex>
            </div>      
    
            <router-view/>
        </v-content>

        <v-footer id="footer" height = "40" dark app>
            
            <v-spacer></v-spacer>
            <v-chip class="pa-0 ma-0"  v-bind:class="{success : socket.isConnected, error: !socket.isConnected}"> {{socket.isConnected ? 'Conectado' : 'Desconectado'}}</v-chip>
        </v-footer>
    </div>

</template>


<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "Navegacion",
        computed: {
            ...mapState(['socket'])
        },
        data() {
            return {
                navBarVert: false
        }
    }
};
</script>

<style>
#footer{
    background-color: rgba(63, 81, 181, 0.9);
}
#about-link{
    text-decoration-line: inherit;
    margin: 5px;
}
#toolbar-items{
    height: min-content;
}
#enlace-vertical{
    text-decoration-line: inherit;
    width: 70%;
    color: #135aa1;
    margin-top: 5px;
    border-bottom-style: groove;
}
#enlace-vertical .v-icon{
    float: left;
    margin-right: 10px;
    width: 20px;
    color: #135aa1;
}
#enlace-vertical.router-link-exact-active{
    color:white;
}
#enlace-vertical.router-link-exact-active .v-icon{
    color:white;
}
#enlace-vertical a{
    font-weight: bold;
    color: #135aa1
}
.v-navigation-drawer__content{
    /* background-color:rgb(8, 8, 48); */
    background-color:rgb(129, 189, 230); 
}


#nav{
  padding: 0px;
}
#nav a{
  font-weight: normal;
  color: black;
  text-decoration-line: inherit;
}

#nav a.router-link-exact-active{
  color: white;
  font-weight: bold;
  background-color: rgb(45, 58, 129);
  border-radius: 5px;
  padding: 5px;
  margin: 2px;
}


</style>