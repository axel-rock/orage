import { PRIVATE_JWT_KEY } from '$env/static/private'
import { users } from '$lib/server/schema'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { handle as authHandle } from '$lib/auth'
// import jwt from 'jsonwebtoken'

export const dbHandle: Handle = async ({ event, resolve }) => {
	if (event.platform) event.locals.db = drizzle(event.platform.env.DB)

	if (event.locals.auth) {
		const session = await event.locals.auth()
		// @ts-expect-error
		if (session?.user) event.locals.user = session.user
	}

	// const token = event.cookies.get('token')

	// if (token) {
	// 	const user = jwt.verify(token, PRIVATE_JWT_KEY) as { email: string }
	// 	if (user.email)
	// 		event.locals.user = (
	// 			await event.locals.db.select().from(users).where(eq(users.email, user.email))
	// 		)[0]
	// }

	const response = await resolve(event)
	return response
}

export const handle: Handle = sequence(authHandle, dbHandle)
