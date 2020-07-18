// ######################### WEBSOCKETS #######################################

var connection = new WebSocket("ws://" + location.hostname + "/ws", ["arduino"]);

connection.onopen = function() {
  connection.send("Received from Client");
  console.log("Connected");
};

connection.onerror = function(error) {
  console.log("WebSocket Error", error);
};

//evento que se ejecuta cada vez que existen mensajes entrantes enviados desde el MCU
connection.onmessage = function(e) {
  console.log("Received from server: ", e.data);
  aplicacion.processReceived(e.data);
};

connection.onclose = function() {
  console.log("WebSocket connection closed");
};

function sendAction(id) {
  let data = {
    command: "doAction",
    id: id
  };

  let json = JSON.stringify(data);
  connection.send(json);
}

// #########################END WEBSOCKETS #######################################
