import * as core from '@actions/core'
import * as github from '@actions/github'
import { wait } from './wait'

/**
 * The main function for the action.
 */
export async function run(): Promise<void> {
  try {
    // Get the action input(s)
    const ms: number = parseInt(core.getInput('milliseconds'), 10)

    // Output the payload for debugging
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )

    // Log the current timestamp, wait, then log the new timestamp
    core.info(new Date().toTimeString())
    await wait(ms)
    core.info(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
