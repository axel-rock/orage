// import type { PageServerLoad } from './$types'

import { invalidateAll } from '$app/navigation'
import { PRIVATE_GOOGLE_CLIENT } from '$env/static/private'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
import { redirect, type Actions } from '@sveltejs/kit'
import { OAuth2Client } from 'google-auth-library'

// export const load = (async () => {
// 	return {}
// }) satisfies PageServerLoad

export const actions = {
	login: async ({ request, url }) => {
		const client = new OAuth2Client(
			PUBLIC_GOOGLE_CLIENT_ID,
			PRIVATE_GOOGLE_CLIENT,
			url.origin + '/api/oauth'
		)

		redirect(
			302,
			client.generateAuthUrl({
				access_type: 'offline',
				scope:
					'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
				consent: 'prompt',
			})
		)
	},

	logout: async ({ cookies }) => {
		cookies.delete('token', {
			path: '/',
		})
		redirect(302, '/')
	},
} satisfies Actions
