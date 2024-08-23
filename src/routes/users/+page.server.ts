import { users } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ request, platform, locals: { db} }) => {
    return {
      users: await db.select().from(users)
      // .limit(5)
      .execute()
    }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals: { db } }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    if (!name) fail(400, { message: 'Please provide a name' });
    const r = await db.insert(users).values({ fullName: name as string }).execute();
    console.log({r});
    return { message: `Hello ${name}!` };
  }
}