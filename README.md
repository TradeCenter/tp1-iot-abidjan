# TP1 IoT - Stack MQTT + InfluxDB + Grafana

## Demarrage
docker-compose up -d

## Services
- Mosquitto MQTT : port 1883
- InfluxDB : http://localhost:8086 (admin/ufhb2024!)
- Grafana : http://localhost:3000 (admin/ufhb2024!)

## Structure
- docker-compose.yml : stack complete
- mosquitto/config/mosquitto.conf : config broker MQTT
- telegraf/telegraf.conf : agent de collecte
- esp32_sim/ : simulation ESP32 Wokwi
- r1_last.flux a r5_stats.flux : requetes Flux QL
- dashboard_tp1.json : dashboard Grafana
