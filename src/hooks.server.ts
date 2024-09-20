import { PRIVATE_JWT_KEY } from '$env/static/private'
import { users } from '$lib/server/schema'
import type { Handle } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import jwt from 'jsonwebtoken'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.platform) event.locals.db = drizzle(event.platform.env.DB)

	const token = event.cookies.get('token')

	if (token) {
		const user = jwt.verify(token, PRIVATE_JWT_KEY) as { email: string }
		if (user.email)
			event.locals.user = (
				await event.locals.db.select().from(users).where(eq(users.email, user.email))
			)[0]
	}

	const response = await resolve(event)
	return response
}
