import type { PageServerLoad } from './$types'

import { messages } from '$lib/server/schema'
import { fail, type Actions } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const load = (async ({ locals: { db } }) => {
	return {
		messages: await db.select().from(messages).execute(),
	}
}) satisfies PageServerLoad

export const actions = {
	post: async ({ request, locals: { db, user } }) => {
		const formData = await request.formData()
		const message = formData.get('message') as string

		if (!message) return fail(400, { message: 'Please provide a message' })

		await db.insert(messages).values({
			message,
		})
	},

	delete: async ({ request, locals: { db } }) => {
		const formData = await request.formData()
		const id = formData.get('id')
		if (!id) fail(400, { message: 'Please provide an id' })
		await db
			.delete(messages)
			.where(eq(messages.id, id as string))
			.execute()
	},
} satisfies Actions
