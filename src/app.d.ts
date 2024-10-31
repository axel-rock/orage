// See https://kit.svelte.dev/docs/types#app

import type { users } from '$lib/server/schema'
import type { DrizzleD1Database } from 'drizzle-orm/d1'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DrizzleD1Database
			user?: typeof users.$inferSelect
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DB: D1Database
				TEST_WORKFLOW: Workflow
			}
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {}
