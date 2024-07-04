import { kv } from "@vercel/kv"
import crypto from "crypto"

const MAX_SECRET_CODE_USES = 60

function hashKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex")
}

export async function checkSecretCodeValidity(
  secret: string
): Promise<boolean> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  const usageCount: number = (await kv.get(hashedSecretKey)) || 0
  return usageCount <= MAX_SECRET_CODE_USES
}

export async function incrementSecretCodeUsage(secret: string): Promise<void> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  await kv.incr(hashedSecretKey)
}
