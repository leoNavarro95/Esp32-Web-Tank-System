<template>
    <div>
        <!-- SnakBar -->
        <v-snackbar v-model="snackbar" absolute top right :color="snackBarObj.color">
        <span>{{snackBarObj.mensaje}}</span>
        <v-icon dark>{{snackBarObj.icono}}</v-icon>
        </v-snackbar>

        <v-layout mt-4 column align-center>
        <v-hover>
            <template class="align-center" v-slot="{ hover }">
            <v-card class="mx-3" :elevation="hover ? 24 : 6">
                <v-list-item three-line>
                <v-list-item-content>
                    <!-- <div class="overline mb-1">Configuración</div> -->
                    <v-list-item-title class="headline mb-1">
                    <v-icon>fas fa-wifi</v-icon>WiFi
                    </v-list-item-title>
                    <v-list-item-subtitle>Configure los parámetros de la wifi del dispositivo</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>

                <v-content class="pa-0">
                <div id="wifi-mode">
                    <!-- Select WIFI Mode -->
                    <v-row align="center" class="px-5 py-0 ma-0">
                    <v-col cols="5" class="pa-0">
                        <p class="mb-0">Select Wifi Mode</p>
                    </v-col>
                    <v-col cols="7" class="pa-0">
                        <v-switch color="deep-purple" v-model="WifiApState" :label="networkType"></v-switch>
                    </v-col>
                    </v-row>
                </div>

                <!-- ip form validator -->
                <v-form ref="form" v-model="form" class="pa-2 pt-4">
                    <v-text-field
                    v-model="ip"
                    :rules="[rules.ipCheck(ip)]"
                    filled
                    color="deep-purple"
                    label="IP Address"
                    style="min-height: 96px"
                    type="text"
                    prepend-icon="fas fa-rss-square"
                    ></v-text-field>
                </v-form>
            </v-content>

            <v-form ref="form" v-model="form" class="pa-2 pt-4">
              <v-text-field
                v-model="ssid"
                maxlength="15"
                new-password
                :rules="[rules.length(ssidlen,ssid)]"
                filled
                color="deep-purple"
                counter="15"
                label="SSID"
                style="min-height: 96px"
                type="text"
                prepend-icon="fas fa-font"
              ></v-text-field>
            </v-form>
            <v-form ref="form" v-model="form" class="pa-2 pt-4">
              <v-text-field
                v-model="password"
                autocomplete="new-password"
                maxlength="15"
                :rules="[rules.password, rules.length(passlen,password), rules.required]"
                filled
                color="deep-purple"
                counter="15"
                label="Contraseña"
                style="min-height: 96px"
                :type="passObj.tipo"
                prepend-icon="fas fa-keyboard"
                :append-icon="passObj.icono"
                @click:append="changeIcon"
              ></v-text-field>
            </v-form>
            <v-card-actions dark>
              <v-spacer></v-spacer>Salvar
              <v-btn :disabled="!Valido" icon @click.stop="dialog = true">
                <v-icon style="color:white;">fas fa-save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-hover>
    </v-layout>
    <!-- ####################################################################################################### -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="headline py-1 px-2">
          <b>Desea cambiar los parámetros de conexión?</b>
        </v-card-text>

        <v-card-text>Debe recordar la contraseña y volver a conectar su dispositivo móvil o PC, al sistema con sus nuevas características.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark text @click="dialog = false">Cancelar</v-btn>
          <v-btn dark text @click="sendConfig">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ConfigWifi",
  methods: {
    changeIcon() {
      this.passObj.activo = !this.passObj.activo;
      if (this.passObj.activo === false) {
        this.passObj.icono = "fas fa-eye";
        this.passObj.tipo = "password";
      } else {
        this.passObj.icono = "fas fa-eye-slash";
        this.passObj.tipo = "text";
      }
    },
    sendConfig() {
      // console.log("Pass: " + this.password);
      // console.log("ssid: " + this.ssid);
      if (this.socket.isConnected) {
        this.snackBarObj.mensaje = "Configuración enviada con éxito!";
        this.snackBarObj.icono = "fas fa-check-circle";
        this.snackBarObj.color = "success";
        let data = {
          command: "guardarConfig",
          id: "2",
          ssid: this.ssid,
          pass: this.password
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
  },
  data() {
    return {
      snackBarObj: { icono: "", mensaje: "", color: "" }, //este objeto se llena segun la situacion
      snackbar: false,
      dialog: false,
      password: undefined,
      passlen: 8,
      ssid: undefined,
      ssidlen: 4,
      ip: undefined,
      form: false,
      WifiApState: false,
      passObj: {
        icono: "fas fa-eye",
        activo: false,
        tipo: "password"
      },
      rules: {
        email: v => (v || "").match(/@/) || "Please enter a valid email",
        // maxLength: len => v => (v || '').length <= len || `No se soprtan más de ${len} carácteres`,
        required: v => !!v || "Este campo es requerido",
        password(v) {
          if (
            (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
          ) {
            return true;
          } else {
            return "La contraseña debe contener una letra mayúscula, un carácter numérico y un carácter especial";
          }
        },
        length(len, v) {
          if ((v || "").length >= len) {
            return true;
          } else {
            return "Se requieren, al menos " + len + " carácteres";
          }
        },
        ipCheck(ip_address) {
          var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

          if ((ip_address || "").match(ipformat)) {
            return true;
          } else {
            return "Dirección ip erronea";
          }
        }
      }
    };
  },
  computed: {
    ...mapState(["socket"]),
    networkType() {
      if (this.WifiApState) {
        return "Access point";
      } else return "Station";
    },
    Valido() {
      var valido = false;

      if (
        this.rules.password(this.password) === true &&
        this.rules.length(this.passlen, this.password) === true &&
        this.rules.length(this.ssidlen, this.ssid) === true
      ) {
        valido = true;
      } else {
        valido = false;
      }
      return valido;
    }
  }
};
</script>

<style>
.v-card .v-icon {
  color: rgb(32, 32, 73);
}
.v-card__actions {
  background-color: rgb(63, 81, 181);
  color: white;
}

#wifi-mode {
  width: 90%;
  margin-left: 15px;
  background-color: rgb(236, 236, 236);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
#wifi-mode:hover {
  background-color: rgb(218, 214, 214);
  border-bottom-style: solid;
  border-bottom-color: grey;
  border-bottom-width: 1px;
  transition: 500ms;
}
</style>