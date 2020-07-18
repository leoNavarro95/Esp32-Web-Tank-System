<template>
  <v-layout mt-4 column align-center>
    <!-- SnakBar -->
    <v-snackbar v-model="snackbar" absolute top right :color="snackBarObj.color">
      <span>{{snackBarObj.mensaje}}</span>
      <v-icon dark>{{snackBarObj.icono}}</v-icon>
    </v-snackbar>
    <v-hover>
      <template class="align-center" v-slot="{ hover }">
        <v-card class="mx-3" style="max-width: 500px;" :elevation="hover ? 24 : 6">
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="overline mb-1">Configuración</div> -->
              <v-list-item-title class="headline mb-1">
                <v-icon>fas fa-cog</v-icon>Umbrales
              </v-list-item-title>
              <v-list-item-subtitle>Configure los parámetros de control del sistema</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-layout v-if="!(stateTank.estado)">
            <v-flex xs12>
              <!-- <v-icon class="fa-spin">fas fa-spinner</v-icon> -->
              <v-progress-circular size="48" color="info" indeterminate></v-progress-circular>
            </v-flex>
          </v-layout>

          <!-- Parametros de configuración -->

          <v-container v-if="(stateTank.estado)">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-row v-on="on" class="grey lighten-4" justify="center" no-gutters>
                  <v-col cols="12" sm="3">
                    <h3 class="overline">Nivel máximo</h3>
                  </v-col>
                  <v-col sm="7">
                    <v-slider v-model="nivelMaximo" :min="nivelMinimo + 10" class="align-center" hide-details>
                      <template v-slot:append>
                        <v-text-field
                          v-model="nivelMaximo"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          suffix="%"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </template>
              <span>Nivel a través del cual se detiende la bomba</span>
            </v-tooltip>
            <v-row class="grey lighten-5" justify="center" no-gutters>
              <v-col cols="12" sm="3">
                <h3 class="overline">Nivel mínimo</h3>
              </v-col>
              <v-col sm="7">
                <v-slider v-model="nivelMinimo" :max="nivelMaximo-10" class="align-center" hide-details>
                  <template v-slot:append>
                    <v-text-field
                      v-model="nivelMinimo"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      suffix="%"
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
            <v-row class="grey lighten-4" justify="center" no-gutters>
              <v-col cols="12" sm="3">
                <h3 class="overline">Flujo mínimo</h3>
              </v-col>
              <v-col sm="7">
                <v-slider v-model="flujoMinimo" max="10" class="align-center" hide-details>
                  <template v-slot:append>
                    <v-text-field
                      v-model="flujoMinimo"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 70px"
                      suffix="l/min"
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions dark>
            <v-spacer></v-spacer>Salvar
            <v-btn icon>
              <v-icon @click.stop="dialog = true" style="color:white;">fas fa-save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
    <!-- ####################################################################################################### -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="headline pt-2">
          <b>Desea cambiar los umbrales?</b>
        </v-card-text>

        <v-card-text>Los umbrales son parámetros tomados en cuenta por el sistema de control, debe tener cuidado pues una mala configuración debe incurrir en un mal funcionamiento del sistema.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark text @click="dialog = false">Cancelar</v-btn>
          <v-btn dark text @click="sendNewThresholds">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Umbrales",
  data() {
    return {
      snackBarObj: { icono: "", mensaje: "", color: "" }, //este objeto se llena segun la situacion
      snackbar: false,
      dialog: false,
      nivelMinimo: 0,
      nivelMaximo: 0,
      flujoMinimo: 0,
      ejecutada: false
    };
  },
  computed: {
    ...mapState(["thresholds", "stateTank", "socket"])
  },
  watch: {
    stateTank: function refresh() {
      if (!this.ejecutada) {
        this.ejecutada = true;
        this.nivelMinimo = this.thresholds.levelMin;
        this.nivelMaximo = this.thresholds.levelMax;
        this.flujoMinimo = this.thresholds.flowMin;
      }
    }
  },
  methods: {
    sendNewThresholds() {
      if (this.socket.isConnected) {
        this.snackBarObj.mensaje = "Configuración enviada con éxito!";
        this.snackBarObj.icono = "fas fa-check-circle";
        this.snackBarObj.color = "success";
        let data = {
          command: "actualizarUmbrales",
          nivelMin: this.nivelMinimo,
          nivelMax: this.nivelMaximo,
          flujoMin: this.flujoMinimo
        };
        this.$socket.sendObj(data);
        this.snackbar = true;
      } else {
        this.snackBarObj.mensaje = "No está conectado!";
        this.snackBarObj.icono = "fas fa-times";
        this.snackBarObj.color = "error";
        this.snackbar = true;
        console.log("Error no esta conectado");
      }
      this.dialog = false;
    }
  }
};
</script>