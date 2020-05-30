import { GithubEvent } from '../github-event'

export const processCompletedCheckRunGithubEvent = (githubEvent: GithubEvent) => {
  if (!(githubEvent.type === 'check_run' && githubEvent.payload.action === 'completed')) return

  const startedAt = new Date(githubEvent.payload.check_run.started_at)
  const completedAt = new Date(githubEvent.payload.check_run.completed_at)
  const durationInMinutes = (completedAt.getTime() - startedAt.getTime()) / 60000
  const conclusion = githubEvent.payload.check_run.conclusion
  const jobName = githubEvent.payload.check_run.name

  console.log({
    type: 'job-duration',
    durationInMinutes,
    conclusion,
    jobName
  })
}
