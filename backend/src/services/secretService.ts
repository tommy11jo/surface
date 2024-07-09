import crypto from "crypto"
import { redisPersistentClient } from "../utils/redisClient"

const MAX_SECRET_CODE_USES = 50

function hashKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex")
}

export async function checkSecretCodeValidity(
  secret: string
): Promise<boolean> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  let usageCountStr = await redisPersistentClient.get(hashedSecretKey)
  const usageCount: number =
    usageCountStr === null ? 0 : JSON.parse(usageCountStr)
  return usageCount <= MAX_SECRET_CODE_USES
}

export async function incrementSecretCodeUsage(secret: string): Promise<void> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  await redisPersistentClient.incr(hashedSecretKey)
}
