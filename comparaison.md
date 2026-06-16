\# Comparaison InfluxDB vs MongoDB — Cas IoT Abidjan



\## Tableau comparatif



| Critère | InfluxDB | MongoDB |

|---|---|---|

| Type de données | Métriques temporelles | Documents BSON |

| Modèle | Séries temporelles | Collections flexibles |

| Langage requête | Flux QL | MQL / Aggregation |

| Index | Timestamp automatique | Simple, composé, 2dsphere, TTL |

| GeoJSON | Non natif | Natif (2dsphere) |

| Rétention | Configurable (168h, 7j...) | TTL index |

| Usage IoT | Capteurs en temps réel | Métadonnées devices |



\## Choix pour chaque type de donnée IoT



\### InfluxDB → Métriques temps réel

\- Température, humidité, CO2 (valeurs numériques horodatées)

\- Alertes et seuils

\- Agrégations temporelles (moyenne horaire, journalière)



\### MongoDB → Métadonnées

\- Configuration des devices (ESP32\_001, firmware, intervalle)

\- Localisation GeoJSON des capteurs

\- Historique des événements (incidents, maintenances)

\- Requêtes géospatiales ($near, $geoWithin)



\## Conclusion : Polyglot Persistence

Les deux bases sont complémentaires :

InfluxDB stocke le QUAND et le COMBIEN (métriques).

MongoDB stocke le QUI et le OÙ (métadonnées).

