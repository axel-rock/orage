import { PRIVATE_GOOGLE_CLIENT } from '$env/static/private'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
import { SvelteKitAuth } from '@auth/sveltekit'
import Google from '@auth/sveltekit/providers/google'

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({
			clientId: PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: PRIVATE_GOOGLE_CLIENT,
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				// User is available during sign-in
				token.id = user.id
			}
			return token
		},
		session({ session, token }) {
			session.user.id = token.id as string
			return session
		},
	},
})
