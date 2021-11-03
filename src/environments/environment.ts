export const environment = {
  production: getenv<boolean>("production", false),
  apiUrl: getenv<string>("apiUrl", "default"),
  mqtt: {
    server: getenv<string>("mqtt_server", "default"),
    protocol: getenv<string>("mqtt_protocol", "ws"),
    port: getenv<number>("mqtt_port", 9001),
    path: getenv<string>("mqtt_path", ""),
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
