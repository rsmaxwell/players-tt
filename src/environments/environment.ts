export const environment = {
  production: getenv<boolean>("production", true),
  mqtt: {
    server: getenv<string>("mqtt_server", "localhost"),
    protocol: getenv<string>("mqtt_protocol", "ws"),
    port: getenv<number>("mqtt_port", 9001),
    path: getenv<string>("mqtt_path", ""),
    clean: getenv<boolean>("mqtt_clean", false),
    connectTimeout: getenv<number>("mqtt_connectTimeout", 4000),
    reconnectPeriod: getenv<number>("mqtt_reconnectPeriod", 30000),
    clientId: getenv<string>("mqtt_clientId", "players-tt-api"),
    username: getenv<string>("mqtt_username", ""),
    password: getenv<string>("mqtt_password", ""),
  }
};


function getenv<Type>(key: string, default_value: Type) {
  let env = (window as { [key1: string]: any })["env"] as { [key2: string]: any };
  let value = env[key];  

  if (value == null) {
    return default_value
  } 
  
  if (typeof value == 'undefined') {
    return default_value
  }
  
  return value as Type;
}
