<template>
    <div>
      <v-card raised>
        <v-layout wrap justify-center>
            <v-flex xs6>
                <!--xs12 ocuparia todo el ancho de la pantalla-->
                <v-card-text>LED onboard: {{ledEstado ? 'encendido':'apagado'}}</v-card-text>
            </v-flex>

            <v-flex xs6>
                <v-btn @click="send_GPIO(1)" color="orange darken-2" dark>
                    Cambiar
                    <v-icon dark right>fas fa-edit</v-icon>
                </v-btn>
            </v-flex>
            

            <v-flex xs12 mt-3 mx-3>
              <v-card-text :class="color">Estado boton: {{estadoBoton ? 'presionado' : 'sin presionar'}}</v-card-text>
            </v-flex>
        </v-layout>
        <v-card-text>
            <v-row>
            <v-switch v-model="activarPWM" :label="activarPWM ? 'PWM-Activado':'PWM-Desactivado'"></v-switch>
            </v-row>
        </v-card-text>

    <v-card-text>
        <v-row>
            <v-col class="pr-4">
                <v-slider
                    @end="sendPWM"
                    @click="sendPWM"
                    thumb-label
                    :label="activarPWM ? 'Envia PWM' : 'Desactivado'"
                    :disabled="activarPWM ? false : true"
                    v-model="sliderValue"
                    class="align-center"
                    :max="max"
                    :min="min"
                    hide-details
                >
                <template v-slot:append>
                    <v-text-field
                        v-model="sliderValue"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                        :disabled="activarPWM ? false : true"
                    ></v-text-field>
                </template>
            </v-slider>
            </v-col>
        </v-row>
    </v-card-text>
    </v-card>
    </div>
</template>



<script>

export default {
  data() {
    return {
      drawer: false,
      activarPWM: false,
      sliderValue: 0,
      min: 0,
      max: 255,
      ledEstado: false,
      estadoBoton: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  computed: {
    color() {
      return {
        "green text-xs-center pa-2": this.estadoBoton === true,
        "blue text-xs-center pa-2": this.estadoBoton === false
      };
    }
  },
  methods: {
    sendPWM() {
      console.log("Valor PWM: " + this.sliderValue);
      let data = {
        command: "setPWM",
        id: "Led pwm",
        pwm: this.sliderValue
      };
      // let json = JSON.stringify(data);
      this.$socket.sendObj(data);

    },
    send_GPIO(id) {
      // en el compactado de JSON se le asigna cada vez que se ejecute esta funcion a command el valor "setGPIO"
      //luego se les pasa los valores a id y a status, todo esto sera recibido por el ESP32
      // y ejecutara las acciones pertinentes
      this.ledEstado = !this.ledEstado;

      let datos = {
        command: "setGPIO",
        id: id,
        status: this.ledEstado
      };
      // let json = JSON.stringify(datos);
      // connection.send(json);
      this.$socket.sendObj(datos);
    },

    //esta es la funcion que ejecuta todas las acciones enviadas desde el ESP32 (servidor)
    processReceived(data) {
      json = JSON.parse(data);
      if (json.command == "updateGPIO") {
        this.updateGPIO(json.status);
      }
      if (json.command == "updateSensor") {
        refreshEdit(json.id, json.value);
      }
    },
    updateGPIO(status) {
      if (status === "Encendido") {
        this.estadoBoton = true;
      }
      if (status === "Apagado") {
        this.estadoBoton = false;
      }
    }
  }
};
</script>