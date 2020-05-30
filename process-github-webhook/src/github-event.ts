export interface GithubEvent {
  type: string
  payload: any
}

export const createGithubEvent = (eventType: string, requestBody: string): GithubEvent => {
  return { type: eventType, payload: JSON.parse(requestBody) }
}
