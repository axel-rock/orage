import type { Handle } from "@sveltejs/kit";
import { drizzle } from "drizzle-orm/d1";

export const handle: Handle = async ({ event, resolve }) => {

  const db = drizzle(event.platform.env.DB);

  event.locals.db = db;

	const response = await resolve(event);
	return response;
}; 