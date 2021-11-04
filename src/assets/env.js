(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["production"] = false;   

    window["env"]["mqtt_server"] = "localhost";
    window["env"]["mqtt_protocol"] = "ws";
    window["env"]["mqtt_port"] = "9001";
    window["env"]["mqtt_path"] = "";

  })(this);