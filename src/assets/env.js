(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "http://localhost:4201/players-api";
    window["env"]["production"] = true;
    window["env"]["debug"] = true;    

    window["env"]["mqtt_server"] = "localhost";
    window["env"]["mqtt_protocol"] = "ws";
    window["env"]["mqtt_port"] = "9001";
    window["env"]["mqtt_path"] = "";

  })(this);