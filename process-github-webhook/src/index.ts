import { isHubSignatureValid } from './is-hub-signature-valid'

interface EventHeaders {
  'X-Hub-Signature': string | undefined
}

interface Event {
  body: string | null
  headers: EventHeaders
}

interface Context {}

interface Response {
  statusCode: number
}

export const handler = async (event: Event, _context: Context): Promise<Response> => {
  if (!isHubSignatureValid(event.body, event.headers['X-Hub-Signature'])) {
    return { statusCode: 400 }
  }

  return { statusCode: 204 }
}
