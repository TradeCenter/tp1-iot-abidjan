use('iot_abidjan');

db.createCollection('devices', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['device_id', 'commune', 'location', 'sensors', 'createdAt'],
      properties: {
        device_id: { bsonType: 'string' },
        commune: { bsonType: 'string',
          enum: ['cocody','yopougon','plateau','marcory','adjame'] },
        location: {
          bsonType: 'object',
          required: ['type','coordinates'],
          properties: {
            type: { bsonType: 'string', enum: ['Point'] },
            coordinates: { bsonType: 'array', minItems: 2, maxItems: 2 }
          }
        },
        sensors: { bsonType: 'array', minItems: 1 },
        config: { bsonType: 'object' }
      }
    }
  },
  validationAction: 'error'
});

db.createCollection('events');
db.events.createIndex({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

db.devices.insertMany([
  {
    device_id: 'ESP32_001', name: 'Capteur Cocody Centre',
    commune: 'cocody',
    location: { type: 'Point', coordinates: [-4.0083, 5.3540] },
    sensors: ['DHT22', 'MQ135'],
    firmware: { version: '2.1.3', updated: new Date('2024-11-01') },
    config: { interval_s: 30, active: true },
    createdAt: new Date()
  },
  {
    device_id: 'ESP32_002', name: 'Capteur Yopougon Marche',
    commune: 'yopougon',
    location: { type: 'Point', coordinates: [-4.0741, 5.3364] },
    sensors: ['DHT22', 'MQ7'],
    firmware: { version: '2.1.1', updated: new Date('2024-10-15') },
    config: { interval_s: 60, active: true },
    createdAt: new Date()
  },
  {
    device_id: 'ESP32_003', name: 'Capteur Plateau Admin',
    commune: 'plateau',
    location: { type: 'Point', coordinates: [-4.0167, 5.3211] },
    sensors: ['DHT22', 'BMP280'],
    firmware: { version: '2.2.0', updated: new Date('2024-11-15') },
    config: { interval_s: 30, active: true },
    createdAt: new Date()
  },
  {
    device_id: 'ESP32_004', name: 'Capteur Marcory Residential',
    commune: 'marcory',
    location: { type: 'Point', coordinates: [-3.9957, 5.3000] },
    sensors: ['DHT22'],
    firmware: { version: '2.0.9', updated: new Date('2024-09-01') },
    config: { interval_s: 120, active: false },
    createdAt: new Date()
  },
  {
    device_id: 'ESP32_005', name: 'Capteur Adjame Commerce',
    commune: 'adjame',
    location: { type: 'Point', coordinates: [-4.0285, 5.3667] },
    sensors: ['DHT22', 'MQ135', 'MQ7'],
    firmware: { version: '2.1.3', updated: new Date('2024-11-01') },
    config: { interval_s: 30, active: true },
    createdAt: new Date()
  }
]);

db.devices.createIndex({ commune: 1 });
db.devices.createIndex({ commune: 1, 'config.active': 1 });
db.devices.createIndex({ location: '2dsphere' });

print('Base iot_abidjan initialisee avec succes !');
print('Devices inseres : ' + db.devices.countDocuments());