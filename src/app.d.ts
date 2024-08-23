// See https://kit.svelte.dev/docs/types#app

import type { DrizzleD1Database } from "drizzle-orm/d1";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DrizzleD1Database;
		}
		// interface PageData {}
		// interface PageState {}
    interface Platform {
      env: {
        DB: D1Database;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
  }
}

export {};