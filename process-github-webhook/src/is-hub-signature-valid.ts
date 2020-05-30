import { createHmac, timingSafeEqual } from 'crypto'

const getGithubWebhookSecret = (): string => {
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    throw new Error('GITHUB_WEBHOOK_SECRET environment variable must be set')
  }

  return process.env.GITHUB_WEBHOOK_SECRET
}

const calculateSignature = (requestBody: string): string => {
  const hmac = createHmac('sha1', getGithubWebhookSecret())
  hmac.update(requestBody)

  return `sha1=${hmac.digest('hex')}`
}

export const isHubSignatureValid = (requestBody: string | null, hubSignature: string | undefined): boolean => {
  if (!requestBody) return false
  if (!hubSignature) return false

  const signature = calculateSignature(requestBody)

  return timingSafeEqual(Buffer.from(signature), Buffer.from(hubSignature))
}
