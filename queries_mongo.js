use('iot_abidjan');

// Q1 - Tous les devices actifs
print("=== Q1 : Devices actifs ===");
db.devices.find({ "config.active": true }).forEach(d => print(d.device_id, "-", d.name));

// Q2 - Devices par commune avec aggregation
print("=== Q2 : Nombre de devices par commune ===");
db.devices.aggregate([
  { $group: { _id: "$commune", total: { $sum: 1 }, devices: { $push: "$device_id" } } },
  { $sort: { total: -1 } }
]).forEach(r => print(r._id, ":", r.total, "device(s)"));

// Q3 - Devices avec capteur DHT22 ET MQ135
print("=== Q3 : Devices avec DHT22 ET MQ135 ===");
db.devices.find({
  sensors: { $all: ["DHT22", "MQ135"] }
}, { device_id: 1, commune: 1, sensors: 1, _id: 0 }).forEach(d => print(JSON.stringify(d)));

// Q4 - Requete geospatiale : devices dans un rayon de 5km autour du Plateau
print("=== Q4 : Devices a moins de 5km du Plateau ===");
db.devices.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-4.0167, 5.3211] },
      $maxDistance: 5000
    }
  }
}, { device_id: 1, commune: 1, _id: 0 }).forEach(d => print(JSON.stringify(d)));

// Q5 - Pipeline agregation : firmware version et devices actifs
print("=== Q5 : Devices actifs groupes par version firmware ===");
db.devices.aggregate([
  { $match: { "config.active": true } },
  { $group: {
    _id: "$firmware.version",
    count: { $sum: 1 },
    communes: { $push: "$commune" }
  }},
  { $sort: { _id: -1 } }
]).forEach(r => print("v" + r._id, ":", r.count, "device(s) ->", r.communes.join(", ")));