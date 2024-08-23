import { OAuth2Client } from 'google-auth-library'
import type { RequestHandler } from './$types'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
import { PRIVATE_GOOGLE_CLIENT, PRIVATE_JWT_KEY } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'
import { users } from '$lib/server/schema'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

export const GET: RequestHandler = async ({ url, cookies, locals: { db } }) => {
	try {
		const client = new OAuth2Client(
			PUBLIC_GOOGLE_CLIENT_ID,
			PRIVATE_GOOGLE_CLIENT,
			url.origin + '/api/oauth'
		)

		const r = await client.getToken(url.searchParams.get('code') as string)
		client.setCredentials(r.tokens)
		console.log('credentials:')
		console.log(client.credentials)

		if (!client.credentials.id_token) {
			throw new Error('No id_token')
		}
		const ticket = await client.verifyIdToken({
			idToken: client.credentials.id_token,
		})
		const payload = ticket.getPayload()

		console.log(payload)

		if (!payload) throw new Error('No payload')
		if (!payload.email_verified || !payload.email) throw new Error('No email')

		const matchedUsers = await db.select().from(users).where(eq(users.email, payload.email))

		const user = {
			email: payload.email,
			first_name: payload.given_name,
			last_name: payload.family_name,
			photo: payload.picture,
		}

		if (matchedUsers.length === 0) {
			await db.insert(users).values(user)
		}

		console.log(matchedUsers)

		const token = jwt.sign(user, PRIVATE_JWT_KEY, {
			expiresIn: '1h',
		})

		// if !payload.email_verified

		cookies.set('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7,
			path: '/',
			secure: true,
		})
	} catch (e) {
		console.error(e)
		error(500, e as Error)
	}
	redirect(302, '/')
}
