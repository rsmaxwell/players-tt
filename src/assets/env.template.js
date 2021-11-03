(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["production"] = "${PRODUCTION}";
    window["env"]["debug"] = "${DEBUG}";    

    window["env"]["mqtt_server"] = "${MQTT_SERVER}";
    window["env"]["mqtt_protocol"] = "${MQTT_PROTOCOL}";
    window["env"]["mqtt_port"] = "${MQTT_PORT}";
    window["env"]["mqtt_path"] = "${MQTT_PATH}";

  })(this);