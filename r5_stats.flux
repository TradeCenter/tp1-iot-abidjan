data = from(bucket: "raw_7d")
  |> range(start: -24h)
  |> filter(fn: (r) => r._field == "temperature")

union(tables: [
  data |> min() |> set(key: "stat", value: "min"),
  data |> max() |> set(key: "stat", value: "max"),
  data |> mean() |> set(key: "stat", value: "mean"),
])
  |> yield(name: "statistiques")
