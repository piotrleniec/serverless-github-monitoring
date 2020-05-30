import { isHubSignatureValid } from './is-hub-signature-valid'
import { createGithubEvent } from './github-event'
import { processGithubEvent } from './process-github-event'

interface EventHeaders {
  'X-Hub-Signature': string | undefined
  'X-GitHub-Event': string
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

  const githubEvent = createGithubEvent(
    event.headers['X-GitHub-Event'],
    event.body!
  )
  processGithubEvent(githubEvent)

  return { statusCode: 204 }
}
