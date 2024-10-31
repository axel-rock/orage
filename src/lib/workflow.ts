import { WorkflowEntrypoint, type WorkflowStep, type WorkflowEvent } from 'cloudflare:workers'

type Params = {
	id: string
	message: string
}

export class TestWorkflow extends WorkflowEntrypoint<App.Platform['env'], Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		await step.sleep('Waitfor a few seconds', '10 seconds')

		step.do('Do something', async () => {
			console.log(this.env.DB)
			console.log('Do something')
		})
	}
}
