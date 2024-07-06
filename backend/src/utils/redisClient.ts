import { createClient } from "redis"

export const redisPersistentClient = createClient({
  url: "redis://redis-persistent:6379",
})

redisPersistentClient.on("error", (err) =>
  console.log("Redis Persistent Client Error", err)
)

export const redisCacheClient = createClient({
  url: "redis://redis-cache:6379",
})

redisCacheClient.on("error", (err) =>
  console.log("Redis Cache Client Error", err)
)
;(async () => {
  await redisPersistentClient.connect()
  await redisCacheClient.connect()
})()
