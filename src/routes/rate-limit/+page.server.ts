import { fail } from '@sveltejs/kit'
// import type { PageServerLoad } from './$types'

// export const load = (async () => {
// 	return {}
// }) satisfies PageServerLoad

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()

		const apikey = formData.get('apikey')

		if (!apikey) return fail(400, { message: 'Missing API key' })

		const response = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: {
				'x-api-key': apikey as string,
				'anthropic-version': '2023-06-01',
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				model: 'claude-3-5-sonnet-20241022',
				max_tokens: 1,
				messages: [{ role: 'user', content: '?' }],
			}),
		})

		const obj: Record<string, string> = {}

		response.headers.forEach((value, key) => {
			if (key.startsWith('anthropic-')) obj[key] = value
		})

		return obj
	},
}
