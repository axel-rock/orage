import type { Config } from 'drizzle-kit';
// import { env } from '$env/static/private';

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
  dialect: 'sqlite',
	// driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	// dbCredentials: {
	// 	host: env.DB_HOST,
	// 	user: env.DB_USER,
	// 	password: env.DB_PASSWORD,
	// 	database: env.DB_NAME
	// }
} satisfies Config;