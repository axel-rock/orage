import type { PageServerLoad } from './$types'

import { invalidateAll } from '$app/navigation'
import { PRIVATE_GOOGLE_CLIENT } from '$env/static/private'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
import { messages, users } from '$lib/server/schema'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
// import { OAuth2Client } from 'google-auth-library'

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
		if (!user) return fail(401, { message: 'Please login first' })

		await db.insert(messages).values({
			message,
			user_id: user.id as string,
		})
	},
} satisfies Actions
