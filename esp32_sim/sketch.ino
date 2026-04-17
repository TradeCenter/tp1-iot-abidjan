#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";
const char* MQTT_BROKER = "broker.hivemq.com";
const int   MQTT_PORT   = 1883;
const char* MQTT_TOPIC  = "iot/CI/abidjan/cocody/env";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
DHT dht(4, DHT22);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println("WiFi connecte");
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
}

void loop() {
  if (!mqttClient.connected()) {
    mqttClient.connect("ESP32_001");
  }
  mqttClient.loop();

  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  String payload = "environment,";
  payload += "location=cocody,device_id=ESP32_001,sensor=DHT22 ";
  payload += "temperature=" + String(temp) + ",";
  payload += "humidity="    + String(hum);

  mqttClient.publish(MQTT_TOPIC, payload.c_str());
  Serial.println("Published: " + payload);
  delay(30000);
}
