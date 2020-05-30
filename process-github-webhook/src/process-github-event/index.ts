import { GithubEvent } from '../github-event'
import { processCompletedCheckRunGithubEvent } from './process-completed-check-run-github-event'

export const processGithubEvent = (githubEvent: GithubEvent) => {
  processCompletedCheckRunGithubEvent(githubEvent)
}
