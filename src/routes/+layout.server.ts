import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals: { user, auth } }) => {
	const session = await auth()

	console.log(session)

	return {
		session,
		user: session?.user,
	}
}) satisfies LayoutServerLoad
